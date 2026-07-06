# Dashboard Strategy

## Objetivo

Crear un dashboard responsive con cards configurables, draggable y resizable.

## Decisión actual

Usar `react-grid-layout` como primera opción.

## Por qué

- Es específico de React.
- Tiene soporte para layouts responsive con breakpoints.
- Permite draggable/resizable widgets.
- Encaja con el objetivo de practicar React 19.

## Riesgo

Hay que validar compatibilidad real con React 19.

## Alternativa

`Gridstack.js`.

Ventajas:

- TypeScript;
- dashboard-first;
- mobile-friendly;
- framework agnostic.

## Decisión operativa

Fase 2: spike con `react-grid-layout`.

Acceptance criteria:

- funciona con React 19;
- layout responsive;
- drag;
- resize;
- persistencia en Zustand;
- no rompe accesibilidad básica;
- no genera warnings graves.

Si falla, cambiar a Gridstack mediante ADR.
