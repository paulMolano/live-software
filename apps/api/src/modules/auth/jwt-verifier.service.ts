import {
	createPublicKey,
	verify as verifySignature,
	type webcrypto,
} from 'node:crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AuthenticatedUser } from '@live-software/contracts';
import type { AuthConfig, RootConfig } from '../../config/app.config.js';

type JwtHeader = {
	alg: string;
	kid: string;
};

type JwtPayload = Record<string, unknown>;

type Jwk = webcrypto.JsonWebKey & {
	kid?: string;
	alg?: string;
	use?: string;
};

type JwksCache = {
	fetchedAt: number;
	keys: Jwk[];
};

const jwksCacheTtlMs = 5 * 60 * 1000;

function decodeJson<T>(encoded: string): T {
	const json = Buffer.from(encoded, 'base64url').toString('utf8');
	const parsed: unknown = JSON.parse(json);

	if (typeof parsed !== 'object' || parsed === null) {
		throw new UnauthorizedException('Invalid JWT payload.');
	}

	return parsed as T;
}

function readString(payload: JwtPayload, key: string): string | undefined {
	const value = payload[key];
	return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function readNumber(payload: JwtPayload, key: string): number | undefined {
	const value = payload[key];
	return typeof value === 'number' ? value : undefined;
}

function readRoles(payload: JwtPayload): string[] {
	const realmAccess = payload['realm_access'];

	if (
		typeof realmAccess !== 'object' ||
		realmAccess === null ||
		!('roles' in realmAccess)
	) {
		return [];
	}

	const roles = (realmAccess as { roles?: unknown }).roles;
	return Array.isArray(roles)
		? roles.filter((role): role is string => typeof role === 'string')
		: [];
}

function hasAudience(payload: JwtPayload, expectedAudience: string): boolean {
	const audience = payload['aud'];

	if (typeof audience === 'string') {
		return audience === expectedAudience;
	}

	return Array.isArray(audience)
		? audience.some((value) => value === expectedAudience)
		: false;
}

function parseToken(token: string): {
	header: JwtHeader;
	payload: JwtPayload;
	signingInput: string;
	signature: Buffer;
} {
	const parts = token.split('.');

	if (parts.length !== 3) {
		throw new UnauthorizedException('Invalid bearer token.');
	}

	const [encodedHeader, encodedPayload, encodedSignature] = parts;

	if (!encodedHeader || !encodedPayload || !encodedSignature) {
		throw new UnauthorizedException('Invalid bearer token.');
	}

	const header = decodeJson<JwtHeader>(encodedHeader);
	const payload = decodeJson<JwtPayload>(encodedPayload);

	if (header.alg !== 'RS256' || typeof header.kid !== 'string') {
		throw new UnauthorizedException('Unsupported bearer token.');
	}

	return {
		header,
		payload,
		signingInput: `${encodedHeader}.${encodedPayload}`,
		signature: Buffer.from(encodedSignature, 'base64url'),
	};
}

function isJwk(value: unknown): value is Jwk {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	return 'kty' in value && typeof (value as { kty?: unknown }).kty === 'string';
}

function isJwksBody(value: unknown): value is { keys: Jwk[] } {
	if (typeof value !== 'object' || value === null || !('keys' in value)) {
		return false;
	}

	const keys = (value as { keys?: unknown }).keys;
	return Array.isArray(keys) && keys.every(isJwk);
}

@Injectable()
export class JwtVerifierService {
	private jwksCache: JwksCache | null = null;

	public constructor(private readonly configService: ConfigService<RootConfig, true>) {}

	public async verify(token: string): Promise<AuthenticatedUser> {
		const authConfig = this.getAuthConfig();
		const parsed = parseToken(token);
		const nowSeconds = Math.floor(Date.now() / 1000);
		const issuer = readString(parsed.payload, 'iss');
		const subject = readString(parsed.payload, 'sub');
		const expiresAt = readNumber(parsed.payload, 'exp');
		const notBefore = readNumber(parsed.payload, 'nbf');

		if (!subject || issuer !== authConfig.issuer) {
			throw new UnauthorizedException('Invalid bearer token.');
		}

		if (!expiresAt || expiresAt + authConfig.clockSkewSeconds < nowSeconds) {
			throw new UnauthorizedException('Bearer token expired.');
		}

		if (notBefore && notBefore - authConfig.clockSkewSeconds > nowSeconds) {
			throw new UnauthorizedException('Bearer token is not active yet.');
		}

		if (authConfig.audience && !hasAudience(parsed.payload, authConfig.audience)) {
			throw new UnauthorizedException('Bearer token has invalid audience.');
		}

		const key = await this.getSigningKey(parsed.header.kid, authConfig);
		const keyObject = createPublicKey({ key, format: 'jwk' });
		const validSignature = verifySignature(
			'RSA-SHA256',
			Buffer.from(parsed.signingInput),
			keyObject,
			parsed.signature,
		);

		if (!validSignature) {
			throw new UnauthorizedException('Invalid bearer token signature.');
		}

		const username = readString(parsed.payload, 'preferred_username');
		const email = readString(parsed.payload, 'email');
		const name = readString(parsed.payload, 'name');

		return {
			id: subject,
			roles: readRoles(parsed.payload),
			...(username ? { username } : {}),
			...(email ? { email } : {}),
			...(name ? { name } : {}),
		};
	}

	private getAuthConfig(): AuthConfig {
		return this.configService.getOrThrow<AuthConfig>('auth');
	}

	private async getSigningKey(kid: string, authConfig: AuthConfig): Promise<Jwk> {
		const keys = await this.getJwks(authConfig);
		const key = keys.find((candidate) => candidate.kid === kid);

		if (!key) {
			this.jwksCache = null;
			const refreshedKeys = await this.getJwks(authConfig);
			const refreshedKey = refreshedKeys.find((candidate) => candidate.kid === kid);

			if (!refreshedKey) {
				throw new UnauthorizedException('Unknown bearer token signing key.');
			}

			return refreshedKey;
		}

		return key;
	}

	private async getJwks(authConfig: AuthConfig): Promise<Jwk[]> {
		if (
			this.jwksCache &&
			Date.now() - this.jwksCache.fetchedAt < jwksCacheTtlMs
		) {
			return this.jwksCache.keys;
		}

		const response = await fetch(authConfig.jwksUri);
		const body: unknown = await response.json();

		if (!response.ok || !isJwksBody(body)) {
			throw new UnauthorizedException('Unable to read bearer token keys.');
		}

		this.jwksCache = {
			fetchedAt: Date.now(),
			keys: body.keys,
		};

		return body.keys;
	}
}
