# GitHub Project Field Model

## Project

GitHub Project:

```txt
Live Software Roadmap
```

The Project fields are part of the operating model. They define how work enters
the backlog, how Codex should read existing issues and when work is safe to
execute.

Required fields:

- `Status`
- `Track`
- `Work type`
- `Size`
- `Codex ready`
- `Guide update`

## Status

`Status` answers: where is this work in the delivery flow?

| Value | Meaning |
| --- | --- |
| `Backlog` | Not ready to work yet or not currently prioritized. |
| `Ready` | Ready to be picked up. |
| `In Progress` | Currently being worked on. |
| `Review` | PR, plan or result is waiting for review. |
| `Done` | Merged, accepted or completed. |

## Track

`Track` answers: which major line of the project does this belong to?

| Value | Meaning |
| --- | --- |
| `Platform` | Technical foundation such as monorepo, shell, microfrontends, backend, shared packages, CI/CD, Docker, auth and architecture. |
| `Product` | Real app functionality such as dashboard, training, finance, habits, learning and daily use. |
| `Guide` | Living Next.js guide, journey, technology routes, decisions and learning documentation. |
| `Agents` | Codex, prompts, skills, AGENTS.md, PR reviews, automation and issue workflow. |
| `Design` | Figma, visual direction, layouts, responsive behavior, cards, dashboard and UX. |
| `Research` | Spikes, comparisons, proofs of concept and technical alternatives. |

Keep tracks separate unless there is a clear reason to combine them.

## Work Type

`Work type` answers: what kind of work is this?

| Value | Meaning |
| --- | --- |
| `Epic` | Large parent issue grouping child tasks. It should not be sent directly to Codex. |
| `Feature` | User-visible or product functionality. |
| `Foundation` | Technical base needed before features can be built. |
| `Chore` | Maintenance, configuration or cleanup. |
| `Docs` | Internal docs, guide, ADRs, playbooks or knowledge updates. |
| `Spike` | Research/proof of concept before deciding. |
| `Bug` | Fix incorrect behavior. |
| `Review` | Audit or validation of architecture, code, docs or design. |

## Size

`Size` answers: how reviewable is this task?

| Value | Meaning |
| --- | --- |
| `S` | Small task, simple PR. |
| `M` | Medium task, still reviewable in one PR. |
| `L` | Large task, possible in one PR only if tightly scoped. |
| `XL` | Too large for direct implementation; should become an epic or be split. |

Prefer medium-sized, coherent tasks over tiny artificial tasks. Mark oversized
work as `XL` and recommend making it an epic or splitting it.

## Codex Ready

`Codex ready` answers: can Codex safely work on this issue now?

| Value | Meaning |
| --- | --- |
| `No` | Not ready for Codex. |
| `Needs refinement` | Good idea but needs clearer scope, constraints or acceptance criteria. |
| `Ready` | Clear, scoped and safe for Codex to work on. |

Codex should only execute implementation work when `Codex ready` is `Ready`.

## Guide Update

`Guide update` answers: does this work need to update documentation or the
living guide?

| Value | Meaning |
| --- | --- |
| `Required` | Must update internal docs or the living guide because it introduces architecture, workflow, technology setup or learning. |
| `Optional` | Documentation could be useful but should not block the PR. |
| `Not needed` | No documentation or guide update is needed. |

Set `Guide update: Required` when a task introduces a meaningful architecture
decision, workflow, technology setup or learning milestone.

## Creating Or Refining Issues

When Paul asks Codex to create or refine tasks/issues, Codex must suggest:

- `Track`
- `Work type`
- `Size`
- `Codex ready`
- `Guide update`

Executable tasks should include:

- goal
- context
- scope
- out of scope
- expected files or areas
- validation
- acceptance criteria
- PR expectations

Codex should avoid creating tasks that are too vague for execution. It should
never recommend sending an `Epic` directly to Codex for implementation.

## Reading Existing Issues

When Codex is asked to work on an existing issue, it must read the issue body
and use the Project fields when they are available.

Codex must not implement directly when:

- `Work type` is `Epic`
- `Size` is `XL`
- `Codex ready` is `No` or `Needs refinement`

In those cases Codex should stop, explain the blocker and propose clearer child
tasks or refinements.

## Safe For Codex

An issue is safe for Codex execution when:

- the goal and acceptance criteria are clear
- scope and out of scope are explicit
- expected files or areas are named
- validation is possible
- `Work type` is not `Epic`
- `Size` is `S`, `M` or a tightly scoped `L`
- `Codex ready` is `Ready`

## Splitting Work

Split an issue when:

- it spans unrelated tracks
- it mixes planning, implementation and review in one issue
- it requires several independent PRs
- it would touch many apps/packages without a single clear outcome
- it has `Size: XL`
- it is an `Epic`

Split by product or architecture boundary first, then by validation path.

## PR Descriptions And Reviews

PR descriptions for Codex work should include:

- summary
- files changed
- documentation or guide update decision
- commands run
- validation result
- risks
- recommended next issue

Reviewers should check that the PR stayed inside the issue scope, respected the
Project fields and handled any required guide/docs update.
