import type { AuthUser } from './types';

type JwtPayload = Record<string, unknown>;

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function decodeBase64Url(value: string): string {
	const normalized = value.replace(/-/gu, '+').replace(/_/gu, '/');
	const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
	return atob(padded);
}

function readString(payload: JwtPayload, key: string): string | undefined {
	const value = payload[key];
	return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function readRoles(payload: JwtPayload): string[] {
	const realmAccess = payload['realm_access'];

	if (
		!isRecord(realmAccess) ||
		!('roles' in realmAccess)
	) {
		return [];
	}

	const roles = realmAccess['roles'];
	return Array.isArray(roles)
		? roles.filter((role): role is string => typeof role === 'string')
		: [];
}

export function parseJwtPayload(token: string): JwtPayload {
	const [, encodedPayload] = token.split('.');

	if (!encodedPayload) {
		throw new Error('Invalid JWT payload.');
	}

	const decoded = decodeBase64Url(encodedPayload);
	const parsed: unknown = JSON.parse(decoded);

	if (!isRecord(parsed)) {
		throw new Error('Invalid JWT payload.');
	}

	return parsed;
}

export function userFromAccessToken(token: string): AuthUser {
	const payload = parseJwtPayload(token);
	const subject = readString(payload, 'sub');
	const username = readString(payload, 'preferred_username');
	const email = readString(payload, 'email');
	const name = readString(payload, 'name');

	if (!subject) {
		throw new Error('Access token does not include a subject.');
	}

	return {
		id: subject,
		roles: readRoles(payload),
		...(username ? { username } : {}),
		...(email ? { email } : {}),
		...(name ? { name } : {}),
	};
}
