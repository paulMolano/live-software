# Learning Goals

Este documento define qué queremos aprender explícitamente.

## React 19

Objetivos:

- Entender `Suspense` para lazy UI, remotes y estados de carga.
- Usar `useTransition` para filtros, búsqueda y cambios de dashboard.
- Usar `startTransition` para updates no urgentes.
- Explorar `useOptimistic` en creación/edición de ejercicios.
- Explorar `useActionState` en formularios cuando encaje.
- Usar `useDeferredValue` para listas filtradas.
- Explorar `useEffectEvent` si está estable en la versión instalada.
- Entender cuándo NO usar estas APIs.

No objetivo inicial:

- React Server Components.
- Server Actions dependientes de framework.
- React Compiler en la primera fase.

## Microfrontends

Objetivos:

- Entender host/remotes.
- Runtime loading.
- Shared dependencies.
- Fallbacks.
- Contratos entre shell y remotes.
- Route ownership.
- Problemas de versionado.
- Observabilidad por remote.

## Backend

Objetivos:

- NestJS modular.
- Prisma.
- PostgreSQL.
- OpenAPI.
- Validación.
- Auth con Keycloak.
- Cache.
- BFF para dashboard.

## Estado

Objetivos:

- Zustand para estado cliente global.
- TanStack Query para server state.
- Diferenciar local/UI/server/domain state.
- Persistencia local de preferencias.

## Dashboard

Objetivos:

- Cards draggable/resizable.
- Persistencia de layout.
- Responsive dashboard.
- Experimento con React Grid Layout.
- Evaluación futura contra Gridstack.

## PWA / Service Worker

Objetivos:

- Aprender cache de assets.
- Aprender actualización de service worker.
- Aprender offline básico.
- Entender riesgos de cache obsoleta.

## Event bus

Objetivos:

- Event bus tipado dentro de la app.
- Eventos entre shell/remotes sin acoplar dominios.
- BroadcastChannel para sincronización entre pestañas.
- No usar event bus para saltarse contratos.

## IA y agentes

Objetivos:

- Trabajar con GitHub Issues.
- Codex planifica.
- Codex implementa.
- Codex revisa PR.
- Yo reviso decisiones.
- Skills reutilizables.
- Quality gates automáticos.
