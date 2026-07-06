# System Overview

## Decisión

Monorepo único con:

- shell frontend;
- microfrontend de entrenamiento;
- backend modular;
- paquetes compartidos;
- documentación viva;
- sistema de agentes.

## Estructura objetivo

```txt
live-software/
  apps/
    shell/
    training-mfe/
    api/

  packages/
    ui-kit/
    contracts/
    config/
    auth/
    analytics/
    feature-flags/
    testing/
    shared-utils/

  docs/
  .agents/
  AGENTS.md
  PLANS.md
```

## Principios

- Microfrontends por dominio.
- Backend modular, no microservicios.
- Contratos explícitos.
- TypeScript estricto.
- Accesibilidad desde el inicio.
- Testing por riesgo.
- Performance como quality gate.
- Agentes con supervisión humana.
