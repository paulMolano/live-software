# Phase 1 Implementation Plan

## Goal

Prepare Phase 1 as a sequence of small, reviewable implementation issues. Phase 1 creates the repository foundation for `live-software`; it does not create product features.

## Inputs

- GitHub issue: `#1 [ARCH] Prepare Phase 1 implementation plan`
- `AGENTS.md`
- `PLANS.md`
- `README.md`
- `docs/product/implementation-order.md`
- `docs/architecture/operating-model.md`
- `docs/architecture/agentic-delivery-flow.md`
- `docs/github/task-operating-model.md`

## Phase 1 Scope

In scope:

- Nx + pnpm monorepo foundation
- React 19 setup for frontend app skeletons
- `apps/shell`
- `apps/training-mfe`
- `apps/api`
- `packages/ui-kit`
- `packages/contracts`
- `packages/config`
- Base scripts for install, lint, typecheck, test and build
- Initial CI direction

Out of scope:

- Product features
- Database implementation
- Keycloak integration
- Dashboard implementation
- Analytics
- Feature flags
- Next.js

Note: `docs/product/implementation-order.md` currently mentions Docker Compose for PostgreSQL and Keycloak in Phase 1. This plan intentionally defers that work because the current issue scope explicitly excludes database and Keycloak implementation.

## Completion Target

Phase 1 is complete when the repository installs with pnpm, Nx can discover all initial projects, every generated project has a small independent build/test/lint surface, and the initial CI direction can run the same root validation commands that contributors run locally.

## Proposed Issue Order

1. `[CHORE] Bootstrap Nx + pnpm monorepo foundation`
2. `[CHORE] Add base scripts and TypeScript quality gates`
3. `[PKG] Create shared package skeletons`
4. `[FE] Create shell React host skeleton`
5. `[FE] Create training MFE React remote skeleton`
6. `[BE] Create API NestJS skeleton`
7. `[CI] Add initial GitHub Actions validation workflow`

## Issue 1: `[CHORE] Bootstrap Nx + pnpm monorepo foundation`

### Title

`[CHORE] Bootstrap Nx + pnpm monorepo foundation`

### Goal

Create the minimal Nx workspace foundation in the existing repository using pnpm as the only package manager.

### Scope

- Initialize Nx in the existing documentation-only repository.
- Add pnpm workspace metadata.
- Add root TypeScript/Nx configuration needed before apps or packages exist.
- Preserve existing docs and ADRs.
- Do not generate apps, packages or product code in this issue.

### Files Expected

- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `nx.json`
- `tsconfig.base.json`
- `.npmrc`
- `.gitignore`

### Commands

- `corepack enable`
- `npx nx@latest init`
- `pnpm install`
- `pnpm nx show projects`

### Validation

- `pnpm install --frozen-lockfile`
- `pnpm nx show projects`
- Confirm no `apps/` or `packages/` implementation code was introduced.

### Risks

- Nx initialization may add defaults that conflict with the planned `apps/` and `packages/` layout.
- Generator defaults may choose npm or yarn if pnpm is not selected explicitly.
- Empty workspaces can make early scripts look successful without proving much.

### Acceptance Criteria

- The repository uses pnpm consistently.
- Nx is installed and configured.
- Existing documentation remains intact.
- No app, API, package or product feature is generated.

## Issue 2: `[CHORE] Add base scripts and TypeScript quality gates`

### Title

`[CHORE] Add base scripts and TypeScript quality gates`

### Goal

Create the root command contract that every later Phase 1 issue must satisfy.

### Scope

- Add root scripts for `lint`, `typecheck`, `test`, `build` and `format`.
- Configure strict TypeScript defaults.
- Add formatting and linting configuration if not already generated.
- Configure Nx target defaults for future projects.
- Keep scripts useful before all projects exist.

### Files Expected

- `package.json`
- `nx.json`
- `tsconfig.base.json`
- `eslint.config.mjs`
- `.prettierrc`
- `.prettierignore`

### Commands

- `pnpm add -D typescript eslint prettier`
- `pnpm nx show projects`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

### Validation

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- Confirm each script has a clear no-project behavior or documents why it is a placeholder until apps/packages are added.

### Risks

- Root scripts can fail before projects exist if they assume app targets too early.
- Lint/typecheck settings can become too loose if the team optimizes only for passing checks.
- Adding tooling before generators run may create duplicate config later.

### Acceptance Criteria

- Root scripts exist and are documented by their names.
- TypeScript strictness is enabled at the base level.
- The command contract is ready for CI.
- No product behavior is introduced.

## Issue 3: `[PKG] Create shared package skeletons`

### Title

`[PKG] Create shared package skeletons`

### Goal

Create the initial shared package boundaries without adding domain behavior.

### Scope

- Create `packages/ui-kit`, `packages/contracts` and `packages/config`.
- Add minimal public entry points for each package.
- Add package-level project configuration and tests if generated.
- Add README notes explaining each package boundary.
- Do not create `packages/auth`, `packages/analytics`, `packages/feature-flags`, `packages/testing` or `packages/shared-utils` yet.

### Files Expected

- `packages/ui-kit/README.md`
- `packages/ui-kit/src/index.ts`
- `packages/ui-kit/project.json`
- `packages/contracts/README.md`
- `packages/contracts/src/index.ts`
- `packages/contracts/project.json`
- `packages/config/README.md`
- `packages/config/src/index.ts`
- `packages/config/project.json`
- Package-specific `tsconfig*.json` and test config files as generated
- `tsconfig.base.json`
- `nx.json`

### Commands

- `pnpm nx g @nx/js:lib packages/contracts --dry-run`
- `pnpm nx g @nx/js:lib packages/config --dry-run`
- `pnpm nx g @nx/react:lib packages/ui-kit --dry-run`
- Run the accepted generator commands after reviewing dry-run output.
- `pnpm nx show projects`

### Validation

- `pnpm nx lint contracts config ui-kit`
- `pnpm nx typecheck contracts config ui-kit`
- `pnpm nx test contracts config ui-kit`
- `pnpm nx build contracts config ui-kit`

### Risks

- `ui-kit` can accidentally become domain-specific if it receives training or dashboard concerns.
- `contracts` can become a dumping ground if boundaries are not documented.
- Generator naming may not match the desired Nx project names without explicit review.

### Acceptance Criteria

- The three packages exist and are discoverable by Nx.
- Each package exports only a minimal placeholder API.
- Each package README states what belongs there and what does not.
- No auth, analytics, feature flag or product domain code is added.

## Issue 4: `[FE] Create shell React host skeleton`

### Title

`[FE] Create shell React host skeleton`

### Goal

Create `apps/shell` as the React 19 shell application skeleton.

### Scope

- Generate the shell as a React app using the installed Nx React generator.
- Use React 19 dependencies.
- Keep the UI to a minimal semantic app placeholder.
- Prepare shell to become the Module Federation host, but do not mount real product routes.
- Do not add dashboard, auth, i18n, analytics, feature flags or product navigation.

### Files Expected

- `apps/shell/project.json`
- `apps/shell/index.html`
- `apps/shell/src/main.tsx`
- `apps/shell/src/app/app.tsx`
- `apps/shell/src/app/app.module.css` or equivalent CSS Module
- `apps/shell/tsconfig*.json`
- Frontend build config generated by Nx
- `package.json`
- `tsconfig.base.json`
- `nx.json`

### Commands

- `pnpm nx g @nx/react:host apps/shell --dry-run`
- Run the accepted host generator command after reviewing dry-run output.
- `pnpm install`
- `pnpm nx show project shell`

### Validation

- `pnpm nx lint shell`
- `pnpm nx typecheck shell`
- `pnpm nx test shell`
- `pnpm nx build shell`

### Risks

- Nx templates may add welcome/demo UI that should be reduced to a small project placeholder.
- Host configuration can overreach into remote routing before `training-mfe` exists.
- Adding Mantine or routing now may pull Phase 2 work into Phase 1.

### Acceptance Criteria

- `apps/shell` exists and builds.
- Shell uses React 19.
- Shell contains no dashboard or product feature.
- Shell remains ready for later provider, routing and remote loading work.

## Issue 5: `[FE] Create training MFE React remote skeleton`

### Title

`[FE] Create training MFE React remote skeleton`

### Goal

Create `apps/training-mfe` as the first React 19 remote skeleton and connect only the minimal Module Federation boundary.

### Scope

- Generate `training-mfe` as a React Module Federation remote.
- Register it with the shell host if the chosen generator supports `--host=shell`.
- Keep the remote independently buildable and testable.
- Replace generated demo content with a minimal semantic placeholder.
- Do not add exercise models, exercise lists, forms, API calls or training product behavior.

### Files Expected

- `apps/training-mfe/project.json`
- `apps/training-mfe/module-federation.config.ts`
- `apps/training-mfe/src/main.ts`
- `apps/training-mfe/src/bootstrap.tsx`
- `apps/training-mfe/src/remote-entry.ts`
- `apps/training-mfe/src/app/app.tsx`
- `apps/training-mfe/src/app/app.module.css` or equivalent CSS Module
- `apps/training-mfe/tsconfig*.json`
- `apps/shell/module-federation.config.ts`
- `package.json`
- `tsconfig.base.json`
- `nx.json`

### Commands

- `pnpm nx g @nx/react:remote apps/training-mfe --host=shell --dry-run`
- Run the accepted remote generator command after reviewing dry-run output.
- `pnpm nx show project training-mfe`
- `pnpm nx serve shell`

### Validation

- `pnpm nx lint training-mfe shell`
- `pnpm nx typecheck training-mfe shell`
- `pnpm nx test training-mfe shell`
- `pnpm nx build training-mfe`
- `pnpm nx build shell`
- Manual smoke: shell dev server can start with the remote configured, even if the remote only shows a placeholder.

### Risks

- Module Federation defaults may choose Rspack/Webpack details that should be accepted deliberately.
- Host/remote coupling can grow too early if shell imports remote internals directly.
- Placeholder content can accidentally look like product scope.

### Acceptance Criteria

- `training-mfe` exists and builds independently.
- Shell knows about the remote through Module Federation config only.
- No remote imports code from another remote.
- No training product feature is implemented.

## Issue 6: `[BE] Create API NestJS skeleton`

### Title

`[BE] Create API NestJS skeleton`

### Goal

Create `apps/api` as the initial NestJS API skeleton without persistence, auth or business modules.

### Scope

- Add the Nx Nest plugin aligned to the installed Nx version.
- Generate `apps/api`.
- Keep only the generated app shell and a minimal health-style placeholder if generated by default.
- Do not add Prisma, PostgreSQL, database migrations, Keycloak, users, auth, dashboard or training modules.
- Do not wire frontend apps to the API.

### Files Expected

- `apps/api/project.json`
- `apps/api/src/main.ts`
- `apps/api/src/app/app.module.ts`
- `apps/api/src/app/app.controller.ts`
- `apps/api/src/app/app.service.ts`
- `apps/api/src/app/*.spec.ts`
- `apps/api/tsconfig*.json`
- API build config generated by Nx
- `package.json`
- `tsconfig.base.json`
- `nx.json`

### Commands

- `pnpm nx add @nx/nest`
- `pnpm nx g @nx/nest:app apps/api --dry-run`
- Run the accepted app generator command after reviewing dry-run output.
- `pnpm nx show project api`

### Validation

- `pnpm nx lint api`
- `pnpm nx typecheck api`
- `pnpm nx test api`
- `pnpm nx build api`
- Optional local smoke: `pnpm nx serve api`

### Risks

- Nest generator defaults may include example controller behavior that should stay generic.
- It is tempting to add Prisma or OpenAPI immediately, but those belong to later backend foundation work.
- Frontend proxy wiring could pull product integration into Phase 1.

### Acceptance Criteria

- `apps/api` exists and builds.
- The API skeleton has no database, auth or domain module implementation.
- Generated tests pass.
- Frontend apps are not coupled to the API.

## Issue 7: `[CI] Add initial GitHub Actions validation workflow`

### Title

`[CI] Add initial GitHub Actions validation workflow`

### Goal

Add the first CI workflow direction for Phase 1 validation without introducing deployment or external services.

### Scope

- Add a GitHub Actions workflow that installs with pnpm and runs the root command contract.
- Keep CI limited to install, lint, typecheck, test and build.
- Use Nx affected commands only if base/head behavior is clear and documented.
- Do not add GitHub Pages deployment, backend deployment, database services, Keycloak services, analytics or feature flag checks.

### Files Expected

- `.github/workflows/ci.yml`
- `package.json`
- `nx.json`
- `README.md` or `docs/architecture/github-workflow.md` only if the command contract needs a short note

### Commands

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

### Validation

- Review workflow YAML for pull request and push triggers.
- Run the same commands locally before opening the PR.
- Confirm the workflow does not require secrets or service containers.

### Risks

- Running all builds on every PR may be slower than affected-only CI, but simpler at first.
- Affected-only CI can be misconfigured if the default branch and fetch depth are not handled carefully.
- Adding deployment too early would mix foundation and delivery concerns.

### Acceptance Criteria

- CI runs the same root validation commands expected locally.
- CI does not depend on external services, databases or Keycloak.
- CI does not deploy.
- Future issues can tighten the workflow after the foundation is stable.

## Whole-Phase Acceptance Criteria

- `pnpm install --frozen-lockfile` succeeds.
- `pnpm nx show projects` lists `shell`, `training-mfe`, `api`, `ui-kit`, `contracts` and `config`.
- `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build` succeed.
- `apps/shell`, `apps/training-mfe` and `apps/api` each build independently.
- `training-mfe` is only connected to shell through the public Module Federation boundary.
- No product feature, database, Keycloak, dashboard, analytics, feature flag or Next.js work is included.

## References for Future Implementation

- Nx existing repository setup: https://nx.dev/docs/getting-started/installation
- Nx new workspace setup: https://nx.dev/docs/getting-started/start-new-project
- Nx Module Federation host and remote generators: https://nx.dev/docs/technologies/module-federation/guides/create-a-host and https://nx.dev/docs/technologies/module-federation/guides/create-a-remote
- Nx with NestJS: https://nx.dev/docs/technologies/node/nest/introduction
- React 19 stable release note: https://react.dev/blog/2024/12/05/react-19
- GitHub Actions Node.js CI guidance: https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs
