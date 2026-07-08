# Auth Package

Shared frontend authentication foundation for `live-software`.

Current scope:

- React `AuthProvider`;
- `useAuth` hook;
- lightweight OIDC Authorization Code + PKCE browser adapter;
- `sessionStorage` token-set persistence for same-tab reloads;
- automatic refresh-token renewal while the shell is open;
- transient PKCE values in `sessionStorage`.

Intentionally deferred:

- roles/permissions policy model;
- long-lived remember-me sessions across browser restarts;
- remote consumption contract;
- server-side rendering;
- vendor-specific UI.

Security notes:

- Tokens are not stored in `localStorage`.
- The current foundation uses `sessionStorage` to survive page reloads in the
  same tab. A stronger BFF/cookie session can be considered later.
- The frontend may hide UI actions, but the API remains the security boundary.
- Backend JWT validation lives in `apps/api`.
