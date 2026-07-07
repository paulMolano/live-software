# Live Software API

`apps/api` contains the initial backend skeleton for `live-software`.

This app starts as a minimal NestJS modular monolith entry point, with a single
health endpoint and basic runtime configuration.

## Current scope

Included in this issue:

- NestJS app skeleton;
- `GET /health` endpoint;
- basic config structure (`PORT` support);
- Nx build/typecheck/test targets.

Intentionally deferred:

- PostgreSQL;
- Prisma;
- Keycloak;
- JWT guards;
- product modules (`training`, `dashboard`, etc.);
- Docker.

## Run

From repository root:

```sh
pnpm install
pnpm nx dev api
```

By default the API listens on `http://localhost:3000`.

Health check:

```sh
curl http://localhost:3000/health
```

Expected response:

```json
{ "status": "ok" }
```

## Validate

From repository root:

```sh
pnpm nx typecheck api
pnpm nx build api
pnpm nx test api
```
