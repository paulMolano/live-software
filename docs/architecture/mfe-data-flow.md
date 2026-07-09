# MFE Data Flow

## Product context

`live-software` is a personal operating system. The first domain surfaces are:

- Training: sessions, progress, goals and exercise history.
- Finance: monthly summary, expenses, income, transactions and debt.
- Dashboard: a shell-owned composition page that shows high-level widgets from domain MFEs.

The goal is to learn professional microfrontend ownership, not to build one large SPA with remote-shaped files.

## Application context vs domain context

Application/platform context belongs to `apps/shell/src/platform`.

It includes auth/session, current user, theme, locale, feature flags, permissions, app navigation, event bus and observability. The first version exposes a mocked `AppContextValue` with app name, user id, display name, preferred locale, default dashboard range and currency.

Domain context belongs inside the owning MFE.

Training owns selected training range, active training view, compact mode, training query keys, training cache and training mutations. Finance owns selected month, active finance view, sensitive amount visibility, finance query keys, finance cache and finance mutations.

AppContext must not contain sessions, transactions, debts, workout history or measurements.

## Shell responsibilities

The shell owns:

- bootstrap and global providers;
- platform context under `apps/shell/src/platform`;
- top-level hash routing;
- layout and navigation;
- dashboard composition;
- remote loading boundaries;
- widget error isolation;
- app-level event observation and logging.

The shell does not own domain API calls, query keys, mutation invalidation, domain stores, endpoint details or domain data shaping.

## Dashboard ownership

The dashboard lives in the shell for now because it is a composition surface, not an independent domain.

A `dashboard-mfe` becomes justified only if dashboard work gains its own team or lifecycle, dynamic user-managed layouts, complex dashboard-specific state, many dashboard-owned pages or heavy cross-domain orchestration.

If the dashboard needs aggregated cross-domain data, that belongs behind an API/BFF endpoint such as `GET /dashboard/overview`. The shell must not read `trainingQueryClient` or `financeQueryClient` caches.

## Domain MFE responsibilities

`training-mfe` owns:

- `TrainingProvider`;
- singleton `trainingQueryClient`;
- `trainingApi`, `trainingKeys`, `trainingQueries`, `trainingMutations`;
- `trainingUiStore`;
- `TrainingDashboardWidget`;
- `TrainingApp`, `TrainingRoutes`, `TrainingPage`;
- loading, error, empty and success states for training.

`finance-mfe` owns the same shape for finance:

- `FinanceProvider`;
- singleton `financeQueryClient`;
- `financeApi`, `financeKeys`, `financeQueries`, `financeMutations`;
- `financeUiStore`;
- `FinanceDashboardWidget`;
- `FinanceApp`, `FinanceRoutes`, `FinancePage`;
- loading, error, empty and success states for finance.

The shell mounts only public wrapped entrypoints:

- `training-mfe/TrainingDashboardWidget`;
- `training-mfe/TrainingApp`;
- `finance-mfe/FinanceDashboardWidget`;
- `finance-mfe/FinanceApp`.

## Provider and cache ownership

Each public MFE entrypoint wraps itself in its domain provider. This keeps shell composition clean:

```tsx
<>
  <TrainingDashboardWidget />
  <FinanceDashboardWidget />
</>
```

The shell must not do this:

```tsx
<TrainingProvider>
  <TrainingDashboardCard />
</TrainingProvider>
```

Each MFE owns one singleton `QueryClient` module. The client is created outside React render, so widget and page share the same cache when loaded in the same remote runtime.

React Query itself is shared as a Module Federation singleton. The `QueryClient` instances are not shared globally.

## Server state flow

Training widget:

```text
Shell Dashboard -> TrainingDashboardWidget -> useTrainingSummary()
```

Training page:

```text
/training -> TrainingApp -> TrainingPage -> useTrainingSummary()
```

Both use `trainingKeys.summary()` and the same `trainingQueryClient`.

Finance widget:

```text
Shell Dashboard -> FinanceDashboardWidget -> useFinanceMonthlySummary(month)
```

Finance page:

```text
/finance -> FinanceApp -> FinancePage -> useFinanceMonthlySummary(month)
```

Both use `financeKeys.monthlySummary(month)` and the same `financeQueryClient`.

## UI state and URL state

Use URL query params for navigable or shareable filters:

- `/training?range=30d&view=progress`;
- `/finance?month=2026-07&view=debts`;
- `/dashboard?range=30d`.

Use MFE UI stores for transient domain UI state:

- training compact mode;
- finance hide sensitive amounts.

Use local React state for component-only state.

Use TanStack Query for server state.

Use AppContext for global non-domain app values only.

## Mutation and invalidation flow

Training session creation:

```text
useCreateTrainingSession
  -> createTrainingSession
  -> invalidate trainingKeys.all
  -> emit training.session.created
```

Finance transaction creation:

```text
useCreateFinanceTransaction
  -> createFinanceTransaction
  -> invalidate financeKeys.all
  -> emit finance.transaction.created
```

Training mutations do not invalidate finance queries. Finance mutations do not invalidate training queries.

## Cross-MFE event flow

Public app events are typed in `packages/contracts/src/events`.

The current event bus API is:

- `emit(event)`;
- `subscribe(type, handler)`;
- `unsubscribe(type, handler)`.

The bus is for notifications, observability and UI reactions. It is not a data store and must not replace backend/API contracts.

## Platform runtime bridge

The shell owns the concrete platform providers, but remotes read only the public platform runtime exported by `packages/contracts`.

Shell providers publish:

- feature flags;
- locale;
- domain permissions.

Training and Finance subscribe to that snapshot with `useSyncExternalStore` inside their own MFE source. They do not import shell providers, shell hooks or shell stores.

Platform Query remains shell-owned. The dashboard demo query loads app/platform config only, with query key `['app', 'platform', 'config']`. Domain server state stays in each remote query cache.

Observability also goes through the public contract. Shell, Training and Finance can emit typed observability entries, and the dashboard feed displays the latest entries without reading remote internals.

## Module Federation shared dependencies

Critical shared dependencies are configured as singletons in shell and remotes:

- `react`;
- `react-dom`;
- `@tanstack/react-query`;
- `zustand`;
- `@live-software/contracts`.

The singleton for `@tanstack/react-query` prevents multiple React Query runtimes. It does not imply one global domain cache.

## Error boundary strategy

Shell widgets are mounted through `RemoteWidgetBoundary`, which wraps `Suspense` and `WidgetErrorBoundary`.

If Training fails, Finance still renders. If Finance fails, Training still renders. Boundary failures are logged through shell observability and emitted as `platform.remote.error`.

## Anti-patterns

- Shell owning all domain queries.
- Shell knowing all domain endpoints.
- Shell passing all domain data manually to remote widgets.
- MFEs importing internal components from other MFEs.
- A global Zustand store for all app data.
- Server data stored in Zustand instead of TanStack Query.
- Shell reading internal MFE query caches.
- Event bus used as a database.
- QueryClient created inside React render.
- Duplicated query key strings.
- Dashboard becoming a hidden domain orchestrator.
- Domain data inside AppContext.
- App/platform state inside domain stores.

## Complete Demo Verification Scenarios

Use the shell dashboard as the visible verification surface.

1. Open `http://localhost:8100/#/`.
2. Confirm the dashboard shows Platform Context, Platform Query, Platform Controls, Navigation Links, Training widget, Finance widget, Error Boundary Test Controls, Event Feed and Observability Feed.
3. In Platform Context, confirm AppContext/Auth/theme/locale values are present and no domain data appears there.
4. In Platform Query, confirm the query key is shell/platform-only and shows `fetchCount` and `fetchedAt`.
5. Toggle light/dark mode and confirm Mantine theme changes without remounting the remotes.
6. Switch locale between `es-ES` and `en-US`; dates and money in Training/Finance should react through the public platform runtime.
7. Toggle `showTrainingProgressWidget`; only the Training progress section should hide/show.
8. Toggle `enableTrainingSessionCreation`; Training create buttons should disable/enable.
9. Toggle `showFinanceDebtWidget`; only Finance debt UI should hide/show.
10. Toggle `enableFinanceTransactions`; Finance mutation buttons should disable/enable.
11. Toggle Training and Finance permissions; each remote should show restricted/disabled states from contracts, not shell internals.
12. Click Training and Finance mutation buttons; Event Feed should receive `training.session.created` and `finance.transaction.created`.
13. Confirm Observability Feed receives shell, Training and Finance entries.
14. Click the Training and Finance navigation links; routes should use public route contracts.
15. Compare widget/page query debug for each domain; query keys, `fetchCount` and `fetchedAt` should be visible.
16. Trigger each widget demo error; the failing widget should be isolated by the boundary and resettable without taking down the dashboard.
