# finance-mfe

Remote frontend de aprendizaje para validar limites de dominio con Module Federation.

## Exposed modules

- finance-mfe/App -> ./src/App.tsx
- finance-mfe/RemoteEntry -> ./src/remote-entry.tsx
- finance-mfe/FinanceApp -> ./src/routes/FinanceApp.tsx
- finance-mfe/FinanceDashboardWidget -> ./src/widgets/FinanceDashboardWidget.tsx

La shell consume las entradas publicas ya envueltas. No debe importar providers,
cards, stores, query keys ni APIs internas del dominio.

## Domain ownership

- `FinanceProvider` y `financeQueryClient`.
- `financeApi`, `financeKeys`, `financeQueries`, `financeMutations`.
- `financeUiStore` para estado UI transitorio.
- Widget y pagina reutilizan la misma cache de TanStack Query.

## Desarrollo local

1. Ejecutar `pnpm nx serve shell` en una terminal.
2. Ejecutar `pnpm nx serve finance-mfe` en otra terminal.
3. Abrir `http://localhost:8100/#/finance`.

Si el remote no arranca o falla su `remoteEntry.js`, la shell muestra fallback controlado.

