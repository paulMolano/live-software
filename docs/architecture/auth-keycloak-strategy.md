# Auth Strategy: Keycloak

## Decisión

Usar Keycloak preparado por el usuario.

## Modelo

- Keycloak gestiona login.
- Shell inicializa auth.
- Shell expone contexto auth.
- Remotes consumen auth desde contrato común.
- API valida JWT.
- Backend aplica autorización real.

## Frontend

`packages/auth` contendrá:

- AuthProvider;
- useAuth;
- usePermissions;
- keycloak adapter;
- auth states.

## Backend

`apps/api` tendrá:

- JwtAuthGuard;
- CurrentUser decorator;
- roles/permissions futuro;
- Unauthorized/Forbidden mapping.

## Regla

La UI puede ocultar acciones, pero backend decide seguridad real.
