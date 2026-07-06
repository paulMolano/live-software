# AI Agent Workflow

## Objetivo

Tener agentes trabajando para el usuario, pero con control humano.

## Flujo estándar

```txt
GitHub Issue
  -> Codex plan
  -> revisión humana
  -> Codex implementation
  -> CI
  -> Codex PR review
  -> revisión humana final
  -> merge
```

## Roles de agentes

### Planner Agent

Lee issue y docs. Produce plan.

### Implementation Agent

Implementa solo el scope aprobado.

### Review Agent

Revisa diff: bugs, arquitectura, accesibilidad, tests, performance.

### Documentation Agent

Actualiza docs/ADRs/playbooks.

### QA Agent

Propone y/o ejecuta validaciones.

## Regla

Ningún agente trabaja sobre una tarea grande sin plan.

## Uso de Codex

- VS Code para implementación.
- Codex web/app para análisis/review.
- GitHub integration para PR review.
- CLI más adelante para automatización.

## Skills

Los workflows repetibles viven en `.agents/skills`.
