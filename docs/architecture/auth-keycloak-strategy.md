# Auth Strategy: Keycloak

## Decision

Use Keycloak prepared by the user.

## Model

- Keycloak owns login.
- The shell initializes authentication.
- The shell exposes auth context.
- Remotes consume auth through a common contract later.
- The API validates JWTs.
- The backend remains the real authorization boundary.

## Frontend

`packages/auth` contains the initial frontend auth foundation:

- `AuthProvider`;
- `useAuth`;
- `usePermissions`;
- OIDC Authorization Code + PKCE browser adapter;
- auth states.

Initial session behavior:

- the shell redirects to Keycloak for login;
- tokens are kept in `sessionStorage`, not `localStorage`;
- access tokens survive same-tab page reloads;
- refresh tokens renew the session while the shell remains open;
- longer-lived remember-me behavior is deferred until we choose a safer BFF or
  cookie-backed session strategy.

## Backend

`apps/api` contains the initial backend auth foundation:

- `JwtAuthGuard`;
- `CurrentUser` decorator;
- protected `GET /api/auth/session` endpoint;
- Unauthorized mapping through Nest exceptions;
- future roles/permissions policy model.

Initial JWT behavior:

- validate RS256 signatures through Keycloak JWKS;
- validate issuer;
- validate expiration and not-before claims;
- optionally validate audience when `KEYCLOAK_API_AUDIENCE` is configured.

## Local Keycloak Defaults

- URL: `http://localhost:8080`
- Realm: `live-software`
- Shell public client: `live-software-shell`
- Shell redirect URI: `http://localhost:8100/*`
- Optional API audience: `live-software-api`

## Rule

The UI can hide actions, but the backend decides real security.
