# Hybrid MFE Repositories Strategy

## Objetivo

Documentar una evolucion de aprendizaje desde el modelo actual en monorepo hacia un modelo hibrido:

- shell + algunos remotes dentro del monorepo;
- al menos un remote en repositorio externo.

Se busca aprender arquitectura distribuida sin perder calidad, trazabilidad ni seguridad operativa.

## Estado actual

- Monorepo Nx con Module Federation.
- Contratos compartidos en `packages/contracts`.
- Dependencias base centralizadas con `catalog` en `pnpm-workspace.yaml`.
- Reglas de boundaries activas por lint.

## Target de aprendizaje (hibrido)

- `apps/shell` permanece en monorepo como host principal.
- `apps/training-mfe` permanece en monorepo para iteracion rapida.
- `finance-mfe` migra o se replica a un repo externo como experimento controlado.

## Riesgo principal

Al separar repositorios, se pierde consistencia inmediata de:

- contratos;
- versiones de dependencias;
- validaciones de integracion.

La estrategia compensa esto con versionado estricto y gates de compatibilidad.

## Reglas de versionado

### 1. Contratos publicos versionados

- Publicar `@live-software/contracts` desde CI a un registry privado.
- Usar semver estricto:
  - MAJOR: cambios incompatibles;
  - MINOR: cambios compatibles (aditivos);
  - PATCH: correcciones.
- Mantener una ventana de compatibilidad minima N y N-1 para evitar roturas de despliegue.

### 2. Dependencias runtime criticas

- Tratar `react`, `react-dom`, `@module-federation/runtime` como dependencias gobernadas.
- Definir una policy de versiones permitidas en docs + CI.
- En repos externos, bloquear PRs que salgan de la policy sin ADR.

### 3. Shared singleton en federation

- Declarar `react` y `react-dom` como singleton.
- Definir `requiredVersion` explicito.
- Tener fallback si el remote no cumple contrato o falla carga.

## Modelo de CI/CD recomendado

## CI por repo (obligatorio)

- lint
- typecheck
- test
- build
- contract tests (consumer/provider)

## Integracion cruzada (obligatoria)

- Pipeline de integracion en entorno compartido:
  - shell del monorepo + remote externo candidate;
  - smoke e2e de carga y navegacion;
  - verificaciones de eventos y rutas compartidas.

Sin este pipeline, multi-repo con federation queda fragil.

## Releases y despliegues

### Monorepo

- Despliegues independientes por app usando `affected` o filtros por proyecto.

### Repo externo

- Release versionada del remote.
- Publicacion de `remoteEntry.js` con version y metadatos.
- Actualizacion controlada del manifiesto de remotes en shell.

### Rollback

- Mantener version anterior activa del remote.
- Feature flag o switch de manifiesto para volver a version estable.

## Plan por fases

### Fase 1: endurecer monorepo

- Contratos mas explicitos.
- Contract tests base.
- Manifiesto de remotes interno.

### Fase 2: extraer primer remote externo

- Elegir un dominio acotado (recomendado: finance).
- Crear repo externo con plantilla homologada.
- Consumir `@live-software/contracts` publicado.

### Fase 3: integracion y observabilidad

- Pipeline de integracion cruzada.
- Medicion de tiempos de carga por remote.
- Alertas de fallos de carga y de incompatibilidad de contrato.

## Guardrails tecnicos

- No permitir imports directos entre repo externo y codigo interno del monorepo.
- Todo intercambio por contratos publicos versionados.
- Evitar cambios breaking de contrato sin deprecacion previa.
- Exigir ADR para cambios de policy de versiones runtime.

## Learning checklist

- Publicar y consumir contratos versionados.
- Operar shell estable con remote externo.
- Ejecutar rollback sin downtime total.
- Diagnosticar un fallo real de incompatibilidad y resolverlo.
- Medir impacto de latencia/carga en experiencia real.
