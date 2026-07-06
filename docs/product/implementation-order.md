# Implementation Order

## Principle

Many things are planned. Only a few are active.

The project must move in thin vertical layers, not by building every future system at once.

## Phase 0 - Operating system for the project

Goal: create the project brain before implementation.

Deliverables:

- AGENTS.md
- PLANS.md
- architecture docs
- ADRs
- skills
- GitHub labels
- GitHub Project design
- issue templates
- operating model

Success criteria:

- Codex knows how to work
- GitHub issues can be created consistently
- architecture decisions are explicit
- no code implementation yet

## Phase 1 - Repository foundation

Goal: create the monorepo foundation.

Deliverables:

- Nx workspace
- pnpm
- basic scripts
- shell app skeleton
- training-mfe skeleton
- api skeleton
- shared packages skeleton
- Docker Compose for PostgreSQL, Keycloak and future Redis

Success criteria:

- repo installs
- apps build or have placeholder build
- CI can run lint/typecheck/build
- no real product feature yet

## Phase 2 - Shell foundation

Goal: create the host application.

Deliverables:

- React 19 shell
- Mantine provider
- CSS Modules strategy
- dark mode
- i18n provider
- React Router
- ErrorBoundary
- remote loading placeholder
- dashboard route placeholder

Success criteria:

- shell runs locally
- dark mode works
- i18n works with Spanish initial copy
- shell can show remote loading fallback

## Phase 3 - Training MFE foundation

Goal: create the first real remote.

Deliverables:

- training-mfe exposed module
- route mounted from shell
- mock Exercise domain model
- basic exercise list page
- loading/empty/error states
- accessibility baseline

Success criteria:

- shell loads training-mfe
- training route works
- remote failure has fallback
- no cross-domain coupling

## Phase 4 - Backend foundation

Goal: create the API skeleton.

Deliverables:

- NestJS app
- health endpoint
- config module
- Prisma setup
- PostgreSQL via Docker
- OpenAPI setup
- training module skeleton

Success criteria:

- API runs locally
- database connects
- OpenAPI is available
- health endpoint works

## Phase 5 - Keycloak authentication

Goal: secure shell and API with real auth.

Deliverables:

- Keycloak in Docker Compose or external config
- packages/auth
- shell AuthProvider
- API JWT validation
- unauthorized/forbidden states

Success criteria:

- user can login
- shell knows session state
- API validates JWT
- protected endpoint rejects unauthenticated request

## Phase 6 - First full vertical slice

Goal: connect frontend and backend.

Deliverables:

- GET exercises endpoint
- POST exercise endpoint
- TanStack Query integration
- React Hook Form + Zod form
- optimistic UI experiment if appropriate
- query invalidation
- tests

Success criteria:

- user can list exercises
- user can create exercise
- UI has loading, error and empty states
- frontend and backend contracts are typed

## Phase 7 - Dashboard learning slice

Goal: build draggable/resizable dashboard cards.

Deliverables:

- react-grid-layout spike
- dashboard layout persisted in Zustand/localStorage
- training summary card
- placeholder cards for future domains
- performance measurement

Success criteria:

- cards can be moved/resized
- layout persists locally
- dashboard remains usable on desktop and mobile

## Phase 8 - CI/CD and GitHub project flow

Goal: make delivery repeatable.

Deliverables:

- GitHub Actions
- lint/typecheck/test/build
- Lighthouse CI for frontend
- GitHub Pages deploy for frontend static artifacts
- backend remains local or deployed separately later
- GitHub Project populated with issues

Success criteria:

- PR validates automatically
- frontend can deploy to GitHub Pages
- tasks are traceable from issue to PR

## Future phases

- finance-mfe
- learning-mfe
- Next.js app for SEO/knowledge base
- PostHog analytics/flags/session replay free tier
- Sentry or OpenTelemetry if needed
- service worker/PWA
- event bus experiments
- BFF dashboard aggregation
- Redis cache
- GitHub/Codex automation refinements
