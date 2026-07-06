# Quality Gates

## Gates obligatorios cuando existan scripts

- install
- lint
- typecheck
- unit tests
- build
- e2e smoke
- accessibility smoke
- Lighthouse CI

## UI quality

Cada pantalla real debe cubrir:

- loading;
- error;
- empty;
- forbidden;
- success si aplica;
- responsive;
- keyboard;
- focus.

## Architecture quality

- no cross-app imports;
- contracts explícitos;
- no shared dumping ground;
- ADR para cambios relevantes;
- boundaries respetados.

## Backend quality

- DTOs;
- validation;
- errors normalizados;
- OpenAPI actualizado;
- auth guard cuando aplique;
- tests para lógica relevante.
