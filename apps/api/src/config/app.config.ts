export type AppConfig = {
	port: number;
	corsOrigin: string;
};

export type DatabaseConfig = {
	url: string;
};

export type AuthConfig = {
	issuer: string;
	jwksUri: string;
	audience?: string;
	clockSkewSeconds: number;
};

export type RootConfig = {
	app: AppConfig;
	database: DatabaseConfig;
	auth: AuthConfig;
};

const localDatabaseUrl = 'postgresql://live_software:live_software@localhost:5432/live_software?schema=public';
const localKeycloakUrl = 'http://localhost:8080';
const localKeycloakRealm = 'live-software';

function trimTrailingSlash(value: string): string {
	return value.endsWith('/') ? value.slice(0, -1) : value;
}

export default function appConfig(): RootConfig {
	const keycloakUrl = trimTrailingSlash(process.env['KEYCLOAK_URL'] ?? localKeycloakUrl);
	const realm = process.env['KEYCLOAK_REALM'] ?? localKeycloakRealm;
	const issuer = `${keycloakUrl}/realms/${realm}`;
	const audience = process.env['KEYCLOAK_API_AUDIENCE'];

	return {
		app: {
			port: Number(process.env['PORT'] ?? 3000),
			corsOrigin: process.env['CORS_ORIGIN'] ?? 'http://localhost:8100',
		},
		database: {
			url: process.env['DATABASE_URL'] ?? localDatabaseUrl,
		},
		auth: {
			issuer,
			jwksUri:
				process.env['KEYCLOAK_JWKS_URI'] ??
				`${issuer}/protocol/openid-connect/certs`,
			...(audience ? { audience } : {}),
			clockSkewSeconds: Number(process.env['KEYCLOAK_CLOCK_SKEW_SECONDS'] ?? 30),
		},
	};
}
