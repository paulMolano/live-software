import { userFromAccessToken } from './jwt';
import type { AuthUser } from './types';

export type AuthConfig = {
	issuer: string;
	clientId: string;
	redirectUri: string;
};

export type TokenSet = {
	accessToken: string;
	idToken?: string;
	refreshToken?: string;
	expiresAt: number;
	user: AuthUser;
};

type TokenResponse = {
	access_token: string;
	id_token?: string;
	refresh_token?: string;
	token_type?: string;
	expires_in?: number;
};

const pkceStateKey = 'live-software:auth:state';
const pkceVerifierKey = 'live-software:auth:verifier';
const pkceReturnToKey = 'live-software:auth:return-to';
const tokenSetKey = 'live-software:auth:token-set';
const refreshSkewMs = 60_000;

function trimTrailingSlash(value: string): string {
	return value.endsWith('/') ? value.slice(0, -1) : value;
}

function authEndpoint(config: AuthConfig): string {
	return `${trimTrailingSlash(config.issuer)}/protocol/openid-connect/auth`;
}

function tokenEndpoint(config: AuthConfig): string {
	return `${trimTrailingSlash(config.issuer)}/protocol/openid-connect/token`;
}

function logoutEndpoint(config: AuthConfig): string {
	return `${trimTrailingSlash(config.issuer)}/protocol/openid-connect/logout`;
}

function randomString(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return base64UrlEncode(bytes);
}

function base64UrlEncode(value: Uint8Array | ArrayBuffer): string {
	const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
	let binary = '';

	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}

	return btoa(binary).replace(/\+/gu, '-').replace(/\//gu, '_').replace(/=+$/u, '');
}

async function createCodeChallenge(verifier: string): Promise<string> {
	const digest = await crypto.subtle.digest(
		'SHA-256',
		new TextEncoder().encode(verifier),
	);

	return base64UrlEncode(digest);
}

function writeSessionValue(key: string, value: string): void {
	try {
		sessionStorage.setItem(key, value);
	} catch {
		// Callback validation will fail safely if temporary storage is blocked.
	}
}

function takeSessionValue(key: string): string | null {
	try {
		const value = sessionStorage.getItem(key);
		sessionStorage.removeItem(key);
		return value;
	} catch {
		return null;
	}
}

function readSessionValue(key: string): string | null {
	try {
		return sessionStorage.getItem(key);
	} catch {
		return null;
	}
}

function isTokenResponse(value: unknown): value is TokenResponse {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	return (
		'access_token' in value &&
		typeof (value as { access_token?: unknown }).access_token === 'string'
	);
}

function isStoredTokenSet(value: unknown): value is TokenSet {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const candidate = value as Partial<TokenSet>;

	return (
		typeof candidate.accessToken === 'string' &&
		typeof candidate.expiresAt === 'number' &&
		typeof candidate.user === 'object' &&
		candidate.user !== null &&
		typeof candidate.user.id === 'string' &&
		Array.isArray(candidate.user.roles)
	);
}

function createTokenSet(response: TokenResponse, previous?: TokenSet): TokenSet {
	const expiresInMs = (response.expires_in ?? 300) * 1000;

	return {
		accessToken: response.access_token,
		...(response.id_token ? { idToken: response.id_token } : previous?.idToken ? { idToken: previous.idToken } : {}),
		...(response.refresh_token
			? { refreshToken: response.refresh_token }
			: previous?.refreshToken
				? { refreshToken: previous.refreshToken }
				: {}),
		expiresAt: Date.now() + expiresInMs,
		user: userFromAccessToken(response.access_token),
	};
}

function persistTokenSet(tokenSet: TokenSet): void {
	try {
		sessionStorage.setItem(tokenSetKey, JSON.stringify(tokenSet));
	} catch {
		// Session persistence is best effort; the in-memory state remains valid.
	}
}

function readStoredTokenSet(): TokenSet | null {
	try {
		const raw = sessionStorage.getItem(tokenSetKey);

		if (!raw) {
			return null;
		}

		const parsed: unknown = JSON.parse(raw);
		return isStoredTokenSet(parsed) ? parsed : null;
	} catch {
		return null;
	}
}

function clearStoredTokenSet(): void {
	try {
		sessionStorage.removeItem(tokenSetKey);
	} catch {
		// Ignore storage failures during logout.
	}
}

function safeReturnTo(candidate: string | null, fallback: string): string {
	if (!candidate) {
		return fallback;
	}

	try {
		const url = new URL(candidate, window.location.origin);
		return url.origin === window.location.origin ? url.toString() : fallback;
	} catch {
		return fallback;
	}
}

export class OidcPkceClient {
	public constructor(private readonly config: AuthConfig) {}

	public readStoredSession(): TokenSet | null {
		const tokenSet = readStoredTokenSet();

		if (!tokenSet) {
			return null;
		}

		if (this.isExpired(tokenSet) && !tokenSet.refreshToken) {
			clearStoredTokenSet();
			return null;
		}

		return tokenSet;
	}

	public async startLogin(returnTo: string): Promise<void> {
		const state = randomString();
		const verifier = randomString();
		const challenge = await createCodeChallenge(verifier);
		const url = new URL(authEndpoint(this.config));

		writeSessionValue(pkceStateKey, state);
		writeSessionValue(pkceVerifierKey, verifier);
		writeSessionValue(pkceReturnToKey, returnTo);

		url.searchParams.set('client_id', this.config.clientId);
		url.searchParams.set('redirect_uri', this.config.redirectUri);
		url.searchParams.set('response_type', 'code');
		url.searchParams.set('scope', 'openid profile email');
		url.searchParams.set('state', state);
		url.searchParams.set('code_challenge', challenge);
		url.searchParams.set('code_challenge_method', 'S256');

		window.location.assign(url.toString());
	}

	public async handleRedirectCallback(): Promise<TokenSet | null> {
		const params = new URLSearchParams(window.location.search);
		const error = params.get('error');

		if (error) {
			throw new Error(params.get('error_description') ?? error);
		}

		const code = params.get('code');
		const returnedState = params.get('state');

		if (!code && !returnedState) {
			return null;
		}

		const expectedState = takeSessionValue(pkceStateKey);
		const verifier = takeSessionValue(pkceVerifierKey);
		const returnTo = safeReturnTo(
			takeSessionValue(pkceReturnToKey),
			this.config.redirectUri,
		);

		if (!code || !returnedState || !expectedState || returnedState !== expectedState) {
			throw new Error('Invalid authentication callback state.');
		}

		if (!verifier) {
			throw new Error('Missing authentication verifier.');
		}

		const response = await fetch(tokenEndpoint(this.config), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				client_id: this.config.clientId,
				redirect_uri: this.config.redirectUri,
				code,
				code_verifier: verifier,
			}),
		});

		const body: unknown = await response.json();

		if (!response.ok || !isTokenResponse(body)) {
			throw new Error('Authentication token exchange failed.');
		}

		window.history.replaceState(null, '', returnTo);

		const tokenSet = createTokenSet(body);
		persistTokenSet(tokenSet);

		return tokenSet;
	}

	public async restoreSession(): Promise<TokenSet | null> {
		const tokenSet = this.readStoredSession();

		if (!tokenSet) {
			return null;
		}

		if (this.needsRefresh(tokenSet)) {
			return this.refreshSession(tokenSet);
		}

		return tokenSet;
	}

	public async refreshSession(tokenSet: TokenSet): Promise<TokenSet | null> {
		if (!tokenSet.refreshToken) {
			clearStoredTokenSet();
			return null;
		}

		const response = await fetch(tokenEndpoint(this.config), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				client_id: this.config.clientId,
				refresh_token: tokenSet.refreshToken,
			}),
		});

		const body: unknown = await response.json();

		if (!response.ok || !isTokenResponse(body)) {
			clearStoredTokenSet();
			return null;
		}

		const refreshed = createTokenSet(body, tokenSet);
		persistTokenSet(refreshed);
		return refreshed;
	}

	public logout(idToken?: string): void {
		clearStoredTokenSet();

		const url = new URL(logoutEndpoint(this.config));
		url.searchParams.set('client_id', this.config.clientId);
		url.searchParams.set('post_logout_redirect_uri', this.config.redirectUri);

		if (idToken) {
			url.searchParams.set('id_token_hint', idToken);
		}

		window.location.assign(url.toString());
	}

	public hasPendingCallback(): boolean {
		const params = new URLSearchParams(window.location.search);
		return Boolean(params.get('code') || params.get('state') || params.get('error'));
	}

	public hasPendingLogin(): boolean {
		return Boolean(readSessionValue(pkceStateKey) && readSessionValue(pkceVerifierKey));
	}

	public isExpired(tokenSet: TokenSet): boolean {
		return tokenSet.expiresAt <= Date.now();
	}

	public needsRefresh(tokenSet: TokenSet): boolean {
		return tokenSet.expiresAt - refreshSkewMs <= Date.now();
	}

	public msUntilRefresh(tokenSet: TokenSet): number {
		return Math.max(tokenSet.expiresAt - Date.now() - refreshSkewMs, 0);
	}
}
