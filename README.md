# Software Vida Personal

`live-software` — proyecto personal full-stack y laboratorio de aprendizaje para arquitectura frontend/backend moderna.

## Qué es esto

Este proyecto es a la vez:

1. Una webapp personal para gestionar entrenamiento, hábitos, finanzas, aprendizaje, familia y agenda.
2. Un laboratorio serio para aprender arquitectura frontend/backend, microfrontends, React 19, IA aplicada al desarrollo, agentes (Codex/Copilot), GitHub Projects y automatización.

No se busca solo velocidad: cada cambio debe aportar valor de producto o de aprendizaje. Detalle completo en [AGENTS.md](AGENTS.md) y en [docs/product/vision.md](docs/product/vision.md).

## Estado actual

El repo ya tiene estructura Nx activa con aplicaciones iniciales y paquetes compartidos.

- `apps/shell` (host/consumer frontend)
- `apps/training-mfe` (primer remote/provider frontend)
- `apps/api` (backend NestJS base)
- `apps/guide` (documentación web)

La shell y `training-mfe` están conectados por Module Federation runtime para validar arquitectura host/remote con fallback.

## Objetivo de producto

Construir primero una vertical real, no todos los módulos a la vez:

- Dashboard
- Entrenamiento
- Backend real
- Autenticación con Keycloak

Módulos futuros documentados (no implementados todavía): finanzas, aprendizaje, hábitos, familia. Ver [docs/product/modules.md](docs/product/modules.md) y [docs/product/roadmap.md](docs/product/roadmap.md).

## Objetivo de aprendizaje

Usar el proyecto para aprender con criterio:

- React 19 (`Suspense`, `useTransition`, `useOptimistic`, `useActionState`, `useDeferredValue`...)
- Microfrontends y Module Federation
- Backend modular monolítico
- TypeScript estricto
- Accesibilidad
- CSS Modules + Mantine
- Zustand + TanStack Query
- Testing por riesgo
- Performance como quality gate
- Docker
- GitHub Projects
- Codex y agentes
- Feature flags, analytics y observabilidad
- SEO/rendering, Service Workers, event bus

Detalle completo en [docs/product/learning-goals.md](docs/product/learning-goals.md).

## Stack aprobado (provisional)

**Frontend:** React 19, Nx, TypeScript estricto, Module Federation, Mantine, CSS Modules, Zustand, TanStack Query, React Hook Form + Zod, React Grid Layout, react-i18next.

**Backend:** NestJS, PostgreSQL, Prisma, OpenAPI/Swagger, Keycloak, CacheModule (Redis en fase posterior).

**Infra:** pnpm, Docker Compose, GitHub Actions, GitHub Pages para el frontend estático inicial; backend local primero, deploy posterior.

Reglas y justificación de cada decisión en [AGENTS.md](AGENTS.md) y en [docs/adr/](docs/adr/).

## Arquitectura objetivo

Monorepo único, no microservicios ni repos separados:

```txt
live-software/
  apps/
    shell/
    training-mfe/
    api/

  packages/
    ui-kit/
    contracts/
    config/
    auth/
    analytics/
    feature-flags/
    testing/
    shared-utils/

  docs/
  .agents/
  AGENTS.md
  PLANS.md
```

Reglas de microfrontends (un remote no importa código de otro, contratos públicos en `packages/contracts`, fallback ante fallos) y de backend modular en [AGENTS.md](AGENTS.md).

## Estructura de este repositorio (hoy)

- [`AGENTS.md`](AGENTS.md) — reglas, stack aprobado y flujo de trabajo obligatorio para agentes.
- [`PLANS.md`](PLANS.md) — plantilla para planificar tareas complejas.
- `docs/adr/` — decisiones de arquitectura (ADRs numerados).
- `docs/architecture/` — estrategias por área (frontend, backend, testing, performance, caching, auth, etc.).
- `docs/product/` — visión, roadmap, backlog, módulos y orden de implementación.
- `docs/github/` — labels, project board y modelo operativo de issues.
- `docs/playbooks/` — guías paso a paso para tareas recurrentes (crear MFE, módulo backend, PR review...).
- `.agents/skills/` — skills reutilizables para los agentes (accesibilidad, arquitectura, testing, etc.).

## Cómo usar este seed

1. Crea un repositorio vacío llamado `live-software` (o usa este mismo repo).
2. Descomprime este contenido en la raíz del repo, si partes del zip.
3. Lee la documentación clave (ver abajo) antes de escribir código.
4. Abre Codex/Copilot en VS Code.
5. Usa el prompt de [docs/playbooks/start-with-codex.md](docs/playbooks/start-with-codex.md) para arrancar la Fase 1.
6. No generes código grande antes de aprobar el plan de Fase 1.

## Documentación clave (orden de lectura)

1. [`AGENTS.md`](AGENTS.md)
2. [`docs/product/vision.md`](docs/product/vision.md)
3. [`docs/architecture/system-overview.md`](docs/architecture/system-overview.md)
4. [`docs/architecture/operating-model.md`](docs/architecture/operating-model.md)
5. [`docs/architecture/agentic-delivery-flow.md`](docs/architecture/agentic-delivery-flow.md)
6. [`docs/product/implementation-order.md`](docs/product/implementation-order.md)
7. [`docs/github/task-operating-model.md`](docs/github/task-operating-model.md)

## Flujo de trabajo con agentes

Para cualquier tarea no trivial, el flujo obligatorio es:

1. Leer documentación relevante.
2. Explorar el repo.
3. Proponer un plan, usando la plantilla de [`PLANS.md`](PLANS.md).
4. Listar los archivos a tocar.
5. Implementar un diff pequeño.
6. Ejecutar validaciones (lint/typecheck/tests/build).
7. Resumir cambios.
8. Declarar riesgos.
9. Proponer la siguiente tarea.

No se producen cambios enormes de una vez. Detalle completo en [AGENTS.md](AGENTS.md).

## Requisitos

- [pnpm](https://pnpm.io/) — versión fijada en `packageManager` dentro de [`package.json`](package.json) (`pnpm@11.7.0`); workspaces definidos en [`pnpm-workspace.yaml`](pnpm-workspace.yaml).
- [Nx](https://nx.dev/) — gestor del monorepo, instalado como dependencia de desarrollo.
- Node.js — versión aún no fijada en este seed.

## Ejecutar shell + training-mfe en local

1. Instalar dependencias:

```bash
pnpm install --frozen-lockfile
```

2. Levantar la shell:

```bash
pnpm nx serve shell
```

3. En otra terminal, levantar el remote:

```bash
pnpm --filter training-mfe dev
```

4. Abrir:

- `http://localhost:8100/#/` para la shell.
- `http://localhost:8100/#/training` para cargar el remote.

### Contrato Module Federation actual

- Consumer/host: `apps/shell`.
- Provider/remote: `apps/training-mfe`.
- URL remote entry: `http://localhost:8101/remoteEntry.js`.
- Exposed module recomendado para shell: `training-mfe/RemoteEntry`.

Si el remote no está disponible, la shell renderiza fallback de error controlado en la ruta de training en lugar de dejar la pantalla en blanco.

## Dependencias locales

Para preparar la base de backend y autenticación sin integrarlas todavía:

```bash
docker compose up -d postgres keycloak
```

Usa [`docker-compose.yml`](docker-compose.yml) y [.env.example](.env.example) como referencia de variables locales. Por ahora estos servicios no están conectados a la API ni a la shell.

## Roadmap

- **Fase 0** — Documentación y sistema de trabajo (este seed).
- **Fase 1** — Monorepo base: Nx, pnpm, `apps/shell`, `apps/training-mfe`, `apps/api`, packages base.
- **Fase 2** — Shell: Mantine, dark mode, i18n, routing, dashboard inicial.
- **Fase 3** — Training MFE: remote cargado por la shell, Suspense/ErrorBoundary, datos mock.

Detalle completo en [docs/product/roadmap.md](docs/product/roadmap.md).
