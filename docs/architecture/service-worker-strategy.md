# Service Worker and PWA Strategy

## Objetivo

Aprender PWA, offline y cache.

## Fase inicial

No activar service worker en la primera release.

## Fase posterior

Usar Workbox.

Aprender:

- precache de assets;
- runtime caching;
- stale-while-revalidate;
- update flow;
- offline fallback;
- cache invalidation;
- problemas de versiones obsoletas.

## Riesgos

- servir JS obsoleto;
- cachear datos sensibles;
- romper deploys de microfrontends;
- remoteEntry cacheado incorrectamente.

## Regla

Service worker tendrá ADR propia antes de activarse.
