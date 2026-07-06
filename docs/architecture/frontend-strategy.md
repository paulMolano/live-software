# Frontend Strategy

## Stack

- React 19.x estable.
- Nx.
- TypeScript estricto.
- Module Federation.
- Mantine.
- CSS Modules.
- Zustand.
- TanStack Query.
- React Hook Form + Zod.
- React Grid Layout.
- react-i18next.

## HTML y accesibilidad

Quality gate obligatorio:

- semántica;
- keyboard;
- focus;
- labels;
- aria cuando aplique;
- loading/error/empty/forbidden states.

## React 19

Usos previstos:

- Suspense para lazy pages y remotes.
- useTransition para filtros y dashboard.
- useDeferredValue para búsquedas/listas.
- useOptimistic para mutaciones de ejercicios.
- useActionState para formularios si encaja.
- useEffectEvent para analytics/effects estables si disponible.

No usar RSC de inicio.

## Routing

- Shell controla rutas globales.
- Training MFE controla rutas del dominio training.
- Rutas documentadas en `packages/contracts`.

## Forms

- React Hook Form.
- Zod.
- Errores accesibles.
- Prevención de doble submit.
