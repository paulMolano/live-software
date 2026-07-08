# Shell App

`apps/shell` is the host frontend for `live-software`.

Current responsibilities:

- global providers;
- Mantine theme and color scheme;
- i18n;
- Zustand UI preferences;
- TanStack Query provider;
- Keycloak authentication foundation;
- Module Federation runtime loading for `training-mfe`.

## Auth

The shell uses `@live-software/auth` for the initial Keycloak/OIDC foundation.

Local defaults:

- Keycloak URL: `http://localhost:8080`
- Realm: `live-software`
- Client ID: `live-software-shell`
- Redirect URI: `http://localhost:8100/*`
- API base URL: `http://localhost:3000`

Runtime overrides can be provided before the shell bundle loads:

```html
<script>
  window.__LIVE_SOFTWARE_AUTH__ = {
    keycloakUrl: 'http://localhost:8080',
    realm: 'live-software',
    clientId: 'live-software-shell',
    apiBaseUrl: 'http://localhost:3000'
  };
</script>
```

Session behavior:

- access tokens and refresh tokens are stored in `sessionStorage`;
- session survives same-tab reloads;
- refresh token renewal keeps the session alive while the shell is open;
- tokens are not stored in `localStorage`;
- longer-lived remember-me behavior is deferred until a BFF/cookie strategy is
  designed.

The shell includes a protected API check button that calls:

```txt
GET /api/auth/session
```

with the current bearer token when available.
