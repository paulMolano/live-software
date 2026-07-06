# Backend Strategy

## Decisión

Backend desde el principio.

Arquitectura:

- NestJS;
- modular monolith;
- PostgreSQL;
- Prisma;
- OpenAPI;
- Keycloak JWT validation;
- cache inicial;
- Docker Compose.

## Por qué modular monolith

Permite boundaries por dominio sin coste de microservicios.

## Módulos iniciales

- dashboard;
- training;
- users;
- auth.

## Módulos futuros

- finance;
- learning;
- habits;
- family.

## BFF

La API también actúa como BFF inicial.

Especialmente para:

- dashboard summary;
- composición de datos;
- normalización de errores;
- permisos;
- reducción de lógica de composición en frontend.

## Endpoints iniciales

```txt
GET /api/health
GET /api/dashboard/summary
GET /api/training/exercises
GET /api/training/exercises/:id
POST /api/training/exercises
PATCH /api/training/exercises/:id
DELETE /api/training/exercises/:id
```
