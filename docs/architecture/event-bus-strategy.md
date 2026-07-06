# Event Bus Strategy

## Objetivo

Aprender comunicación desacoplada sin convertirla en caos.

## Niveles

### Nivel 1 - App event bus tipado

Dentro de la shell:

- navegación;
- analytics;
- notificaciones UI;
- eventos de dashboard.

### Nivel 2 - MFE events

Eventos documentados en `packages/contracts`.

Ejemplos:

- `training.exercise.created`
- `dashboard.widget.updated`
- `auth.session.expired`

### Nivel 3 - BroadcastChannel

Para sincronizar entre pestañas:

- logout global;
- theme preference;
- dashboard layout sync;
- feature flag refresh.

## Reglas

- No usar event bus para saltarse APIs.
- No meter lógica de dominio crítica en eventos invisibles.
- Todo evento público debe tener contrato tipado.
