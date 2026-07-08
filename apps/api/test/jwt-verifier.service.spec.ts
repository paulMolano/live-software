import assert from 'node:assert/strict';
import { generateKeyPairSync, sign, type webcrypto } from 'node:crypto';
import { describe, it } from 'node:test';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtVerifierService } from '../src/modules/auth/jwt-verifier.service.js';
import type { AuthConfig, RootConfig } from '../src/config/app.config.js';

const issuer = 'http://localhost:8080/realms/live-software';
const jwksUri = `${issuer}/protocol/openid-connect/certs`;

function encodeJson(value: object): string {
	return Buffer.from(JSON.stringify(value)).toString('base64url');
}

function createConfigService(auth: AuthConfig): ConfigService<RootConfig, true> {
	return {
		getOrThrow: (key: string) => {
			assert.equal(key, 'auth');
			return auth;
		},
	} as unknown as ConfigService<RootConfig, true>;
}

function createJwt(input: {
	privateKey: Parameters<typeof sign>[2];
	kid: string;
	payload: object;
}): string {
	const encodedHeader = encodeJson({
		alg: 'RS256',
		kid: input.kid,
		typ: 'JWT',
	});
	const encodedPayload = encodeJson(input.payload);
	const signingInput = `${encodedHeader}.${encodedPayload}`;
	const signature = sign('RSA-SHA256', Buffer.from(signingInput), input.privateKey)
		.toString('base64url');

	return `${signingInput}.${signature}`;
}

describe('JwtVerifierService', () => {
	it('validates a Keycloak-style RS256 access token from JWKS', async () => {
		const { privateKey, publicKey } = generateKeyPairSync('rsa', {
			modulusLength: 2048,
		});
		const kid = 'test-key';
		const jwk: webcrypto.JsonWebKey & { kid: string; alg: string; use: string } = {
			...publicKey.export({ format: 'jwk' }),
			kid,
			alg: 'RS256',
			use: 'sig',
		};
		const originalFetch = globalThis.fetch;

		globalThis.fetch = async () =>
			new Response(JSON.stringify({ keys: [jwk] }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});

		try {
			const token = createJwt({
				privateKey,
				kid,
				payload: {
					iss: issuer,
					sub: 'user-1',
					exp: Math.floor(Date.now() / 1000) + 300,
					preferred_username: 'paul',
					email: 'paul@example.com',
					name: 'Paul',
					realm_access: {
						roles: ['default-roles-live-software'],
					},
				},
			});
			const verifier = new JwtVerifierService(
				createConfigService({
					issuer,
					jwksUri,
					clockSkewSeconds: 30,
				}),
			);

			assert.deepEqual(await verifier.verify(token), {
				id: 'user-1',
				roles: ['default-roles-live-software'],
				username: 'paul',
				email: 'paul@example.com',
				name: 'Paul',
			});
		} finally {
			globalThis.fetch = originalFetch;
		}
	});

	it('rejects malformed bearer tokens', async () => {
		const verifier = new JwtVerifierService(
			createConfigService({
				issuer,
				jwksUri,
				clockSkewSeconds: 30,
			}),
		);

		await assert.rejects(
			() => verifier.verify('not-a-jwt'),
			UnauthorizedException,
		);
	});
});
