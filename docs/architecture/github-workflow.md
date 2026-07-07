# GitHub Workflow

## Repositorio

Un único repo:

`live-software`

## GitHub Project

Crear o usar proyecto:

`Live Software Roadmap`

## Campos

- Status: Backlog / Ready / In Progress / Review / Done
- Track: Platform / Product / Guide / Agents / Design / Research
- Work type: Epic / Feature / Foundation / Chore / Docs / Spike / Bug / Review
- Size: S / M / L / XL
- Codex ready: No / Needs refinement / Ready
- Guide update: Required / Optional / Not needed

La definición completa está en
[`docs/github/project-fields.md`](../github/project-fields.md).

## Issues

Cada issue debe tener:

- objetivo;
- contexto;
- scope;
- out of scope;
- criterios de aceptación;
- validación;
- restricciones;
- archivos o áreas esperadas;
- expectativas de PR;
- learning goal.

Codex debe proponer los campos del Project al crear o refinar issues. Si una
issue es `Epic`, `Size: XL` o no tiene `Codex ready: Ready`, no debe
implementarla directamente.

## Branches

Formato:

`feat/<area>-<short-name>`

## PRs

Pequeños y revisables.

Cada PR debe incluir:

- resumen;
- archivos cambiados;
- decisión de docs/guide;
- capturas si UI;
- comandos ejecutados;
- resultado de validación;
- riesgos.
