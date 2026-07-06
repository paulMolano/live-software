# Caching Strategy

## Frontend

Usar TanStack Query para server state.

Políticas iniciales:

- exercise catalog: staleTime corto/medio;
- reference data: staleTime largo;
- dashboard summary: staleTime corto;
- mutations invalidan queries relacionadas.

Persistencia:

- dashboard layout en Zustand persist/localStorage;
- preferencias de UI en localStorage.

## Backend

Fase inicial:

- Nest CacheModule para endpoints simples;
- cache headers donde aplique.

Fase posterior:

- Redis;
- cache tags;
- invalidación explícita;
- cache hit/miss metrics.

## No cachear

- tokens;
- datos sensibles;
- respuestas con permisos complejos sin clave de usuario;
- datos financieros delicados sin estrategia clara.
