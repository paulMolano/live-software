# MFE Data Flow Verification

Use this checklist when validating the architecture manually.

1. Shell renders with `PlatformProvider`.
2. AppContext provides app-level values.
3. AppContext does not contain domain data.
4. Dashboard page renders at `#/`.
5. Dashboard mounts `TrainingDashboardWidget`.
6. Dashboard mounts `FinanceDashboardWidget`.
7. Training widget loads mocked training summary.
8. Finance widget loads mocked finance summary.
9. Navigating to `#/training` uses `TrainingApp`.
10. Navigating to `#/finance` uses `FinanceApp`.
11. Training widget and TrainingPage use `trainingKeys.summary()`.
12. Finance widget and FinancePage use `financeKeys.monthlySummary(month)`.
13. Training mutation invalidates only `trainingKeys.all`.
14. Finance mutation invalidates only `financeKeys.all`.
15. Training mutation emits `training.session.created`.
16. Finance mutation emits `finance.transaction.created`.
17. Dashboard event feed records domain events.
18. Widget error boundary isolates a failing remote/widget.
19. Module Federation shares React, React DOM and React Query as singleton.
20. Shell does not import internal MFE data layers.
21. MFEs do not import internals from other MFEs.
22. Documentation explains app context vs domain context.

## Cache reuse checks

1. Open the shell with `training-mfe` running.
2. Load `#/` and wait for the Training widget.
3. Navigate to `#/training`.
4. Confirm the page uses the same summary values and refetches only if stale.
5. Repeat with Finance: load `#/`, then navigate to `#/finance`.

## Event bus checks

1. Click `Registrar sesion` in the Training widget or `Nueva sesion` in the Training page.
2. Confirm the dashboard event feed shows `training.session.created`.
3. Click `Anadir gasto` in the Finance widget or `Nuevo movimiento` in the Finance page.
4. Confirm the dashboard event feed shows `finance.transaction.created`.

## Complete Demo Verification Scenarios

1. Open `http://localhost:8100/#/`.
2. Confirm the dashboard renders these panels: Platform Context, Platform Query, Platform Controls, Training widget, Finance widget, Event Feed, Observability Feed, Error Boundary Test Controls and Navigation Links.
3. Confirm Platform Context shows AppContext, Auth, current theme, locale, permissions and feature flags.
4. Confirm Platform Context does not show Training sessions, Finance transactions or other domain data.
5. Confirm Platform Query uses `['app','platform','config']` and displays `fetchCount`, `fetchedAt` and enabled domains.
6. Toggle theme and confirm the dashboard updates through the Mantine provider.
7. Toggle locale and confirm dates/money in both remotes update through the public platform runtime.
8. Toggle `training-mfe` and `finance-mfe`; each widget mount should be controlled by the shell feature flag with fallback text.
9. Toggle `dashboard-event-feed`; the Event Feed panel should show/hide without affecting remotes.
10. Toggle `showDashboardAggregatePlaceholder`; only the shell-owned aggregate placeholder changes.
11. Toggle `showTrainingProgressWidget`; the Training progress bar should show/hide.
12. Toggle `enableTrainingSessionCreation`; Training create actions should enable/disable.
13. Toggle `training.canView`; Training widget/page should render restricted state.
14. Toggle `training.canCreateSession`; Training mutation controls should enable/disable.
15. Toggle `showFinanceDebtWidget`; Finance debt UI should show/hide.
16. Toggle `enableFinanceTransactions`; Finance mutation controls should enable/disable.
17. Toggle `finance.canView`; Finance widget/page should render restricted state.
18. Toggle `finance.canCreateTransaction`; Finance mutation controls should enable/disable.
19. Toggle `finance.canViewSensitiveAmounts`; Finance amounts should mask/unmask from remote code.
20. Click `Registrar sesion` or `Nueva sesion`; Event Feed should show `training.session.created`.
21. Click `Anadir gasto` or `Nuevo movimiento`; Event Feed should show `finance.transaction.created`.
22. Confirm Observability Feed shows shell platform entries plus Training and Finance load/mutation entries.
23. Confirm Training widget query debug shows `trainingKeys.summary()`, `fetchCount` and `fetchedAt`.
24. Confirm Training page query debug shows summary/session query keys plus summary fetch metadata.
25. Confirm Finance widget query debug shows `financeKeys.monthlySummary(month)`, `fetchCount` and `fetchedAt`.
26. Confirm Finance page query debug shows monthly/debt query keys plus monthly fetch metadata.
27. Trigger Training widget error; only Training should fall back and the dashboard should remain interactive.
28. Trigger Finance widget error; only Finance should fall back and the dashboard should remain interactive.
29. Click reset error controls; widgets should render again.
30. Use Navigation Links; `#/training`, `#/finance` and `#/` should route through public route contracts.

## Local dev commands

Run remotes and shell in separate terminals:

```bash
pnpm nx serve training-mfe
pnpm nx serve finance-mfe
pnpm nx serve shell
```

Then open `http://localhost:8100`.
