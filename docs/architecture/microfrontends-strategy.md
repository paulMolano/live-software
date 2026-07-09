# Microfrontends Strategy

## Decisión

Usamos Module Federation dentro de un monorepo Nx.

## Por qué

No porque sea siempre la mejor opción, sino porque es la mejor para este objetivo de aprendizaje:

- host/remotes;
- runtime loading;
- shared dependencies;
- independent builds;
- fallback;
- boundaries;
- contratos;
- observabilidad por remote.

## Apps iniciales

- `apps/shell`
- `apps/training-mfe`

## Shell owns

- layout global;
- providers globales;
- routing top-level;
- remote loading;
- fallback si remote falla;
- auth provider;
- i18n provider;
- theme provider;
- query provider;
- future analytics provider.

## Remote owns

- dominio;
- rutas propias;
- pantallas;
- estado del dominio;
- API calls del dominio;
- tests;
- documentación local.

## Reglas

- No direct imports entre apps.
- Contratos en `packages/contracts`.
- UI genérica en `packages/ui-kit`.
- Error boundary por remote.
- Fallback visible.
- Métrica de carga por remote.

## Evolucion de aprendizaje

El objetivo inicial sigue siendo monorepo por velocidad de aprendizaje y bajo costo operativo.

Tambien se documenta la evolucion a modelo hibrido (monorepo + remote externo) para aprender versionado y operacion distribuida sin perder control:

- [Hybrid MFE Repositories Strategy](./hybrid-mfe-repositories-strategy.md)
