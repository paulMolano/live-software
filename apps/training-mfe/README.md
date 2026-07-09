# training-mfe

Remote frontend de aprendizaje para validar arquitectura Module Federation.

## Exposed modules

- training-mfe/App -> ./src/App.tsx
- training-mfe/RemoteEntry -> ./src/remote-entry.tsx
- training-mfe/TrainingApp -> ./src/routes/TrainingApp.tsx
- training-mfe/TrainingDashboardWidget -> ./src/widgets/TrainingDashboardWidget.tsx

La shell consume las entradas publicas ya envueltas. No debe importar providers,
cards, stores, query keys ni APIs internas del dominio.

## Domain ownership

- `TrainingProvider` y `trainingQueryClient`.
- `trainingApi`, `trainingKeys`, `trainingQueries`, `trainingMutations`.
- `trainingUiStore` para estado UI transitorio.
- Widget y pagina reutilizan la misma cache de TanStack Query.

## Desarrollo local

1. Ejecutar `pnpm nx serve shell` en una terminal.
2. Ejecutar `pnpm nx serve training-mfe` en otra terminal.
3. Abrir `http://localhost:8100/#/training`.

Si el remote no arranca o falla su `remoteEntry.js`, la shell muestra fallback controlado.
