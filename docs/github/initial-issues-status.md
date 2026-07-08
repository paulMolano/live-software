# Initial Issues Status Audit

Last updated: 2026-07-08

## Purpose

This audit reconciles three views that have drifted:

- the initial GitHub issues;
- the current repository implementation;
- the documented implementation order.

The goal is not to close issues automatically. The goal is to make the next
review step obvious and keep the work small, traceable and reviewable.

## Sources Checked

- `docs/github/initial-issues.md`
- `docs/product/implementation-order.md`
- GitHub issue list for `paulMolano/live-software`
- local repository structure under `apps/`, `packages/`, `prisma/`, `.github/`

## GitHub Snapshot

As of this audit, GitHub has issues `#8` to `#14` open:

| Issue | Title | GitHub state |
| --- | --- | --- |
| `#8` | `[UI] Add Mantine, CSS Modules, dark mode and i18n foundation` | Open |
| `#9` | `[DEVOPS] Add Docker Compose and initial GitHub Actions CI` | Open |
| `#10` | `[ARCH] Wire shell to training-mfe with Module Federation` | Open |
| `#11` | `[STATE] Add Zustand and TanStack Query foundation` | Open |
| `#12` | `[DB] Add PostgreSQL and Prisma foundation` | Open |
| `#13` | `[AUTH] Add Keycloak authentication foundation` | Open |
| `#14` | `[TRAINING] Add exercise domain contracts and API foundation` | Open |

Earlier foundation issues `#1`, `#3`, `#5`, `#6`, `#7`, `#15`, and `#16`
are closed. PRs `#2`, `#4`, and `#17` are also closed.

## Local Status By Open Issue

| Issue | Local status | Evidence | Recommended action |
| --- | --- | --- | --- |
| `#8` UI foundation | Mostly implemented | Shell has Mantine provider, CSS Modules, dark mode controls, i18n provider, semantic layout, and theme exports through `packages/ui-kit`. | Run validation and close if the issue acceptance criteria still match. |
| `#9` DevOps foundation | Mostly implemented | Root `docker-compose.yml`, `.env.example`, and `.github/workflows/ci.yml` exist. README documents local Postgres/Keycloak startup. | Validate `docker compose config` and CI command contract before closing. |
| `#10` Module Federation | Implemented locally | `apps/shell` registers and loads `training-mfe`; `apps/training-mfe` exposes `RemoteEntry`; shell has loading and error fallback behavior. | Run manual smoke with both dev servers, then close or update the issue with validation notes. |
| `#11` State foundation | Implemented locally | Shell uses Zustand for UI preferences and TanStack Query provider from `packages/config`; docs describe state boundaries. | Validate no server data is stored in Zustand, then close. |
| `#12` DB/Prisma foundation | Implemented and expanded | Prisma schema, migrations, generated client, `DatabaseModule`, `DatabaseService`, and database docs exist. Training schema is already present, beyond the minimal DB foundation. | Validate Prisma and decide whether to close as completed or mention that training schema landed with `#14`. |
| `#13` Auth foundation | In progress | Keycloak exists as a local dependency. The current implementation adds `packages/auth`, shell `AuthProvider`, login/logout flow, session persistence, JWT strategy, API auth guard, and a protected route check. | Keep open until local Keycloak login and API JWT acceptance/rejection are verified. |
| `#14` Training contracts/API | Mostly implemented | Training contracts exist in `packages/contracts`; API has training module, exercise endpoints, mapping, seed data, and controller tests. | Validate API tests and endpoint behavior, then close or split remaining frontend work into a new issue. |

## Current Gaps

These items are still missing or incomplete after the initial foundation work:

- Auth with Keycloak across shell and API is in progress and still needs real
  local Keycloak verification.
- OpenAPI/Swagger setup for `apps/api`.
- Real frontend/backend training integration using TanStack Query.
- React Hook Form + Zod forms for create/edit exercise flows.
- Dashboard learning slice with `react-grid-layout`.
- Quality gates beyond the current base: Vitest/Testing Library frontend tests,
  Playwright smoke, axe accessibility smoke, and Lighthouse CI.
- Package foundations still planned by `AGENTS.md`: `packages/auth`,
  `packages/analytics`, and `packages/feature-flags`.
- Guide/content drift: `apps/guide` still describes some implemented apps and
  technologies as future work.
- Validation/dependency health: recent local validation attempts hit pnpm peer
  dependency issues and restricted registry access.

## Recommended Next Order

1. Reconcile and close implemented GitHub issues after validation:
   `#8`, `#9`, `#10`, `#11`, `#12`, and `#14`.
2. Add a small maintenance issue to stabilize validation/dependency health:
   TypeScript peer compatibility, missing peers such as `eslint`/`vite`, and
   repeatable `pnpm install --frozen-lockfile`.
3. Add OpenAPI/Swagger to the API before auth grows the backend surface.
4. Verify and close `#13` Keycloak authentication foundation.
5. Create the first full vertical slice: training MFE consumes the training API
   through TanStack Query with loading, error and empty states.
6. Update `apps/guide` after the issue reconciliation so the public learning
   guide matches the actual repository state.

## Do Not Do Yet

- Do not create new remotes before an ADR.
- Do not implement finance, learning, habits, or family modules.
- Do not introduce analytics or feature flags directly in app components.
- Do not build dashboard drag/resizing until validation and issue drift are
  under control.

## Follow-Up Issue Proposal

Title:

`[CHORE] Reconcile initial issue state and stabilize validation`

Scope:

- confirm which open issues are already implemented;
- run or repair validation commands;
- close or update completed issues;
- document any issue that needs to be split;
- leave `#13` open until auth validation is complete;
- create follow-up issues for OpenAPI, quality gates, guide drift, and the first
  training front-back slice.

Acceptance criteria:

- GitHub issue state matches repository reality;
- validation commands and known blockers are documented;
- no product feature work is mixed into the reconciliation;
- next implementation issue is clear and Codex-ready.
