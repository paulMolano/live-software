# GitHub Project Operating Model

## Goal

`Live Software Roadmap` is the operating system for `live-software`.

It should make it obvious:

- what is only an idea;
- what is ready for Codex;
- what belongs to an epic;
- what needs guide or docs updates;
- what is too large and must be split;
- what is waiting for human review.

This Project configuration is workflow infrastructure. It does not implement
application code.

## Required Fields

Use the field model from [`project-fields.md`](project-fields.md):

- `Status`
- `Track`
- `Work type`
- `Size`
- `Codex ready`
- `Guide update`

GitHub single-select fields do not carry enough useful description in the board
itself, so this repository documentation is the source of truth for option
meanings and Codex execution rules.

## Starter Epics

Create these as parent issues and add them to the Project.

| Epic | Track | Work type | Size | Codex ready | Guide update |
| --- | --- | --- | --- | --- | --- |
| `[EPIC] Project operating system and Codex workflow` | `Agents` | `Epic` | `XL` | `No` | `Required` |
| `[EPIC] Platform foundation: monorepo, shell, API and CI` | `Platform` | `Epic` | `XL` | `No` | `Required` |
| `[EPIC] Training vertical slice` | `Product` | `Epic` | `XL` | `No` | `Required` |
| `[EPIC] Dashboard product experience` | `Product` | `Epic` | `XL` | `No` | `Optional` |
| `[EPIC] Living guide and learning journey` | `Guide` | `Epic` | `XL` | `No` | `Required` |
| `[EPIC] Design direction and responsive UX` | `Design` | `Epic` | `XL` | `No` | `Optional` |
| `[EPIC] Research spikes and decision log` | `Research` | `Epic` | `XL` | `No` | `Required` |

Epics should normally stay in `Backlog`, `In Progress`, `Review` or `Done`.
They should not be moved to `Ready` as executable Codex work.

## Starter Sub-Issues

Use GitHub native sub-issues when available. If native sub-issues are not
enabled, link child issues from the epic body with a task list and add each
child issue to the Project with its own fields.

| Parent epic | Child issue | Work type | Size | Codex ready | Guide update |
| --- | --- | --- | --- | --- | --- |
| Project operating system and Codex workflow | `[AGENTS] Configure GitHub Project operating model` | `Docs` | `M` | `Ready` | `Required` |
| Project operating system and Codex workflow | `[AGENTS] Add issue refinement playbook` | `Docs` | `S` | `Ready` | `Required` |
| Project operating system and Codex workflow | `[REVIEW] Validate one Codex issue-to-PR workflow` | `Review` | `S` | `Needs refinement` | `Optional` |
| Platform foundation | `[FOUNDATION] Create Nx + pnpm monorepo foundation` | `Foundation` | `M` | `Ready` | `Required` |
| Platform foundation | `[FOUNDATION] Create shell app skeleton` | `Foundation` | `M` | `Ready` | `Optional` |
| Platform foundation | `[FOUNDATION] Create training-mfe skeleton` | `Foundation` | `M` | `Ready` | `Optional` |
| Platform foundation | `[FOUNDATION] Create NestJS API skeleton` | `Foundation` | `M` | `Ready` | `Optional` |
| Platform foundation | `[DEVOPS] Add base GitHub Actions quality gates` | `Chore` | `M` | `Needs refinement` | `Required` |
| Training vertical slice | `[PRODUCT] Define training domain contracts` | `Feature` | `S` | `Ready` | `Required` |
| Training vertical slice | `[PRODUCT] Add training exercise list with mock data` | `Feature` | `M` | `Needs refinement` | `Optional` |
| Training vertical slice | `[API] Add training module health and placeholder routes` | `Foundation` | `M` | `Needs refinement` | `Optional` |
| Dashboard product experience | `[PRODUCT] Add dashboard route placeholder` | `Feature` | `S` | `Ready` | `Optional` |
| Dashboard product experience | `[SPIKE] Validate react-grid-layout with React 19` | `Spike` | `M` | `Ready` | `Required` |
| Dashboard product experience | `[PRODUCT] Persist dashboard layout preferences` | `Feature` | `M` | `Needs refinement` | `Optional` |
| Living guide and learning journey | `[GUIDE] Add guide information architecture` | `Docs` | `M` | `Ready` | `Required` |
| Living guide and learning journey | `[GUIDE] Publish ADR and journey routes` | `Docs` | `M` | `Needs refinement` | `Required` |
| Design direction and responsive UX | `[DESIGN] Define first visual direction for shell and dashboard` | `Spike` | `M` | `Needs refinement` | `Required` |
| Design direction and responsive UX | `[DESIGN] Review dashboard card layout and responsive states` | `Review` | `S` | `Needs refinement` | `Optional` |
| Research spikes and decision log | `[SPIKE] Compare free analytics and observability options` | `Spike` | `M` | `Ready` | `Required` |
| Research spikes and decision log | `[SPIKE] Validate service worker strategy timing` | `Spike` | `S` | `Ready` | `Required` |

Before moving a child issue to `Ready`, refine it with
[`../playbooks/refine-issue.md`](../playbooks/refine-issue.md) and ensure its
body includes the issue template sections from
[`task-operating-model.md`](task-operating-model.md).

## Required Views

Create these views first. They are the daily operating views.

| View | Filter | Grouping | Purpose |
| --- | --- | --- | --- |
| `Backlog` | `Status = Backlog` | `Track` | Ideas, rough tasks and work not currently prioritized. |
| `Ready` | `Status = Ready` and `Codex ready = Ready` | `Track` | The queue Paul can safely hand to Codex. |
| `In Progress` | `Status = In Progress` | `Assignee` or `Track` | Work currently being executed. |
| `Review` | `Status = Review` | `Track` | PRs, plans or results waiting for review. |
| `Done` | `Status = Done` | `Track` | Merged, accepted or completed work. |
| `Epics` | `Work type = Epic` | `Track` | Parent issues and roadmap structure. |
| `Needs refinement` | `Codex ready = Needs refinement` or `Size = XL` | `Track` | Work that should be clarified or split. |
| `Guide required` | `Guide update = Required` and `Status != Done` | `Track` | Work that must update docs or guide before completion. |

## Track Views

Create one filtered view per track:

- `Platform`: `Track = Platform`
- `Product`: `Track = Product`
- `Guide`: `Track = Guide`
- `Agents`: `Track = Agents`
- `Design`: `Track = Design`
- `Research`: `Track = Research`

Each track view should show at least:

- `Status`
- `Work type`
- `Size`
- `Codex ready`
- `Guide update`

## Status Rules

Use this status flow:

```txt
Backlog -> Ready -> In Progress -> Review -> Done
```

Rules:

- `Backlog`: default for epics, rough ideas and unprioritized issues.
- `Ready`: only executable child issues with clear scope and `Codex ready: Ready`.
- `In Progress`: work currently assigned to a human or Codex thread.
- `Review`: PR, plan, docs output or research result is waiting for review.
- `Done`: merged, accepted or intentionally completed.

## Codex Execution Rules

Codex may execute only when all are true:

- `Work type` is not `Epic`;
- `Size` is `S`, `M` or a tightly scoped `L`;
- `Codex ready` is `Ready`;
- the issue has scope, out of scope, acceptance criteria and validation;
- any `Guide update: Required` work names the expected docs or guide area.

Codex must stop and propose refinement when:

- `Work type` is `Epic`;
- `Size` is `XL`;
- `Codex ready` is `No` or `Needs refinement`;
- the issue mixes unrelated tracks;
- validation is impossible or unclear.

## Review Rules

When a PR reaches `Review`, check:

- the diff stays inside the issue scope;
- Project fields match the actual work;
- validation commands are listed and results are reported;
- risks are explicit;
- docs or guide updates are handled when `Guide update` is `Required`;
- the recommended next issue is small and reviewable.
