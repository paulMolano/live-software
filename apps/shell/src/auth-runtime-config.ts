import type { AuthConfig } from '@live-software/auth';

type AuthRuntimeConfig = {
	keycloakUrl?: string;
	realm?: string;
	clientId?: string;
	apiBaseUrl?: string;
};

declare global {
	interface Window {
		__LIVE_SOFTWARE_AUTH__?: AuthRuntimeConfig;
	}
}

function trimTrailingSlash(value: string): string {
	return value.endsWith('/') ? value.slice(0, -1) : value;
}

function runtimeConfig(): AuthRuntimeConfig {
	return window.__LIVE_SOFTWARE_AUTH__ ?? {};
}

export function createShellAuthConfig(): AuthConfig {
	const config = runtimeConfig();
	const keycloakUrl = trimTrailingSlash(config.keycloakUrl ?? 'http://localhost:8080');
	const realm = config.realm ?? 'live-software';

	return {
		issuer: `${keycloakUrl}/realms/${realm}`,
		clientId: config.clientId ?? 'live-software-shell',
		redirectUri: `${window.location.origin}${window.location.pathname}`,
	};
}

export function getShellApiBaseUrl(): string {
	return trimTrailingSlash(runtimeConfig().apiBaseUrl ?? 'http://localhost:3000');
}
