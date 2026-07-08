# training-mfe

Remote frontend de aprendizaje para validar arquitectura Module Federation.

## Exposed modules

- training-mfe/App -> ./src/App.tsx
- training-mfe/RemoteEntry -> ./src/remote-entry.tsx

La shell consume training-mfe/RemoteEntry para mantener un contrato publico estable.

## Desarrollo local

1. Ejecutar `pnpm nx serve shell` en una terminal.
2. Ejecutar `pnpm --filter training-mfe dev` en otra terminal.
3. Abrir `http://localhost:8100/#/training`.

Si el remote no arranca o falla su `remoteEntry.js`, la shell muestra fallback controlado.
