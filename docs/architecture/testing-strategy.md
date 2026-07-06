# Testing Strategy

## Principio

Testing por riesgo.

## Herramientas

- Vitest.
- Testing Library.
- Playwright.
- axe.
- Supertest/Nest testing.
- MSW.
- Lighthouse CI.

## Qué testear primero

- domain logic;
- API services;
- permissions;
- forms;
- dashboard layout persistence;
- remote fallback;
- error/loading/empty states;
- API contracts.

## E2E smoke inicial

- shell carga;
- training remote carga;
- dashboard visible;
- exercise list visible;
- API health responde;
- login futuro.

## Accessibility

- axe automático en smoke;
- revisión manual con teclado en pantallas importantes.
