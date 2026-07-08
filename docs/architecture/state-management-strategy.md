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

### Ejemplos iniciales

- sidebar open/closed.
- dashboard layout placeholder.
- preferencias de UI persistidas.

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

### Convención inicial de query keys

- `['app']` como raíz compartida.
- `['app', 'shell']` para estado y queries de shell.
- `['app', 'training']` para queries del dominio training.
- Queries concretas debajo de su dominio, por ejemplo `['app', 'training', 'exercises', trainingId]`.

### Defaults iniciales

- `staleTime`: 60s.
- `gcTime`: 5m.
- `retry`: 1 en queries.
- `retry`: 0 en mutations.
- `refetchOnWindowFocus`: false.

## No Redux

No usar Redux en fase inicial. Puede documentarse como comparación futura.
