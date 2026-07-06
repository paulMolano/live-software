# Docker Strategy

## Decisión

Sí usar Docker desde fase temprana.

## Objetivo

Entorno local reproducible.

## Servicios iniciales

- postgres;
- keycloak;
- api;
- redis futuro.

## No dockerizar al principio

- shell;
- training-mfe;

Motivo: el DX frontend suele ser mejor local con Vite/Nx. Docker se usará primero para dependencias y backend.

## Futuro

- Dockerfile API;
- Dockerfile frontend build;
- compose completo;
- CI build images si tiene sentido.
