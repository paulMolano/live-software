# Live Software API

`apps/api` contains the initial backend skeleton for `live-software`.

This app starts as a minimal NestJS modular monolith entry point, with a single
health endpoint, basic runtime configuration, and an initial Prisma/PostgreSQL
database foundation. It also includes the first training API foundation for an
exercise catalog.

## Current scope

Included in this issue:

- NestJS app skeleton;
- `GET /health` endpoint;
- basic config structure (`PORT` support);
- Prisma schema and CLI scripts;
- global `DatabaseModule` / `DatabaseService`;
- PostgreSQL connection configuration via `DATABASE_URL`;
- initial migration with a minimal `User` placeholder;
- persisted training exercise foundation;
- localized `GET /api/training/exercises` endpoint;
- localized `GET /api/training/exercises/:id` endpoint;
- Nx build/typecheck/test targets.

Intentionally deferred:

- Keycloak;
- JWT guards;
- frontend training UI;
- full exercise catalog import;
- workout prescription/routine builder;
- media upload;
- dashboard cards;
- finance, learning and habits modules;
- repositories and domain-specific database queries.

## Database setup

The local PostgreSQL dependency is provided by the root `docker-compose.yml`.

From repository root:

```sh
cp .env.example .env
docker compose up -d postgres
pnpm install --frozen-lockfile
pnpm prisma:validate
pnpm prisma:generate
```

Default local connection:

```txt
postgresql://live_software:live_software@localhost:5432/live_software?schema=public
```

The Prisma schema lives in `prisma/schema.prisma`; Prisma v7 connection
configuration lives in `prisma.config.ts`.

### Schema approach

The initial schema intentionally contains only a minimal `User` placeholder for
future ownership/auth boundaries:

- `id`;
- optional `email`;
- optional `displayName`;
- timestamps.

The training schema includes the first exercise-catalog foundation:

- `Exercise`;
- localized `ExerciseTranslation`;
- `MuscleGroup` and localized names;
- `Equipment` and localized names;
- exercise-muscle and exercise-equipment join tables;
- localized tips and media alt text placeholders;
- exercise references.

The exercise model intentionally stores biomechanical/contextual descriptors,
not fixed adaptation labels like "hypertrophy exercise" or "strength exercise".
Those outcomes depend on future prescription data such as load, repetitions,
sets, rest, volume and proximity to failure.

Dashboard layouts, finance, learning, habits, Keycloak identity fields, JWT
guards, and complex repositories are intentionally deferred to focused future
issues.

### Migrations

The first migration is checked in under `prisma/migrations/`.

For future schema changes:

```sh
pnpm prisma:migrate:dev --name descriptive_change_name
```

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

Training exercise list:

```sh
curl "http://localhost:3000/api/training/exercises?locale=es"
```

Training exercise detail:

```sh
curl "http://localhost:3000/api/training/exercises/barbell-back-squat?locale=es"
```

Supported locales are `en` and `es`; unsupported locales fall back to `en`.

## Validate

From repository root:

```sh
pnpm nx typecheck api
pnpm nx build api
pnpm nx test api
pnpm prisma:validate
```
