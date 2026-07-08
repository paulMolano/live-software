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

## Uso inicial

- `docker-compose.yml` arranca solo dependencias locales.
- PostgreSQL y Keycloak quedan disponibles para futuras issues de backend/auth.
- No hay wiring aún entre la shell/API y estos servicios.

### Arranque local

```bash
docker compose up -d postgres keycloak
```

Variables de ejemplo en [.env.example](../../.env.example).

## No dockerizar al principio

- shell;
- training-mfe;

Motivo: el DX frontend suele ser mejor local con Vite/Nx. Docker se usará primero para dependencias y backend.

## Futuro

- Dockerfile API;
- Dockerfile frontend build;
- compose completo;
- CI build images si tiene sentido.
