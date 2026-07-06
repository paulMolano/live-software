# State Management Strategy

## Clasificación

Antes de añadir estado, clasificar:

- local state;
- derived state;
- UI global state;
- server state;
- persisted preference;
- domain state.

## Zustand

Usar para:

- sidebar;
- theme preference;
- dashboard layout;
- user UI preferences;
- feature flag snapshot local;
- cross-tab UI sync futuro.

No usar para datos del backend.

## TanStack Query

Usar para:

- exercises;
- dashboard summary;
- API cache;
- mutations;
- invalidation;
- optimistic updates;
- retries;
- staleTime/gcTime.

## No Redux

No usar Redux en fase inicial. Puede documentarse como comparación futura.
