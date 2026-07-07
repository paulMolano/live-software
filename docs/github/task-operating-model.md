# GitHub Task Operating Model

## Repository

Use one GitHub repository:

```txt
live-software
```

## Project

Create one GitHub Project:

```txt
Live Software Roadmap
```

The Project field model is documented in
[`docs/github/project-fields.md`](project-fields.md). Those fields are not
decorative; they define whether a task is ready, too large, requires docs or
should be split before Codex works on it.

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

## Project fields

Every issue should be classified with:

- `Status`
- `Track`
- `Work type`
- `Size`
- `Codex ready`
- `Guide update`

Codex must suggest these fields when creating or refining issues. When executing
an existing issue, Codex must read them before planning or editing files.

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

## PR expectations
```

If `Guide update` is `Required`, the issue should name the expected docs or
guide area when known.

## Codex readiness rules

Codex may execute an issue only when:

- `Work type` is not `Epic`
- `Size` is not `XL`
- `Codex ready` is `Ready`
- scope, acceptance criteria and validation are clear

If an issue fails any of these checks, Codex should stop and propose a split or
refinement instead of implementing.

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
Read AGENTS.md, PLANS.md, docs/github/project-fields.md and the linked issue.

Do not implement immediately.

First:
1. summarize the issue
2. read the Project fields if available
3. confirm whether Work type, Size and Codex ready allow execution
4. inspect the relevant files
5. propose a plan
6. list files you expect to touch
7. list validation commands
8. identify risks

Wait for approval before implementation if the change is architectural or touches multiple apps/packages.
```
