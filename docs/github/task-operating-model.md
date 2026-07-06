# GitHub Task Operating Model

## Repository

Use one GitHub repository:

```txt
software-vida
```

## Project

Create one GitHub Project:

```txt
Software Vida Roadmap
```

## Views

- Backlog
- Ready
- In Progress
- Review
- Done
- Architecture
- Learning Goals

## Labels

Use labels from `docs/github/labels.md`.

Essential labels:

- type:feature
- type:bug
- type:chore
- type:doc
- type:adr
- area:shell
- area:training-mfe
- area:api
- area:ui-kit
- area:contracts
- area:agents
- phase:0
- phase:1
- phase:2
- priority:p0
- priority:p1
- learning-goal

## Issue template

Every implementation issue should include:

```md
## Goal

## Context

## Scope

## Out of scope

## Acceptance criteria

## Validation

## Files likely affected

## Risks
```

## First issues to create manually

1. `[DOC] Add operating model and implementation order`
2. `[CHORE] Create Nx + pnpm monorepo foundation`
3. `[FE] Create shell app skeleton`
4. `[FE] Create training-mfe skeleton`
5. `[BE] Create NestJS API skeleton`
6. `[DEVOPS] Add Docker Compose for PostgreSQL and Keycloak`
7. `[ARCH] Wire Module Federation shell -> training-mfe`
8. `[UI] Add Mantine provider, CSS Modules and dark mode`
9. `[I18N] Add i18n provider with Spanish base namespace`
10. `[AGENT] Validate Codex workflow on one small issue`

## Codex prompt for an issue

```txt
Read AGENTS.md, PLANS.md and the linked issue.

Do not implement immediately.

First:
1. summarize the issue
2. inspect the relevant files
3. propose a plan
4. list files you expect to touch
5. list validation commands
6. identify risks

Wait for approval before implementation if the change is architectural or touches multiple apps/packages.
```
