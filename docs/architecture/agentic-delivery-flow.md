# Agentic Delivery Flow

## Goal

The goal is not to ask Codex to build the whole project.

The goal is to create a controlled delivery system where Codex works on small GitHub issues, produces reviewable changes, runs validations and opens pull requests for human review.

## Roles

### Human owner

The human owner decides:

- product direction
- architecture decisions
- priorities
- acceptance criteria
- whether a PR is merged

### Codex planner

Codex can help turn a vague goal into:

- issue proposal
- implementation plan
- affected files
- risks
- validation commands

### Codex implementer

Codex can implement a small approved issue in a branch.

### Codex reviewer

Codex can review a PR against:

- AGENTS.md
- ADRs
- architecture docs
- tests
- accessibility
- TypeScript rules
- microfrontend boundaries

## Golden workflow

```txt
1. Human creates or approves a GitHub issue
2. Issue is classified in Live Software Roadmap
3. Codex reads the issue + Project fields + AGENTS.md + relevant docs
4. Codex confirms whether the issue is safe to execute
5. Codex creates a short plan
6. Human approves or corrects the plan
7. Codex implements in a branch
8. Codex runs validation commands
9. Codex opens or updates a PR
10. CI runs
11. Codex reviews the PR
12. Human reviews the diff
13. Human merges or requests changes
```

Project field definitions live in
[`docs/github/project-fields.md`](../github/project-fields.md).

## What Codex should never do automatically

- create large architecture changes without ADR
- create new microfrontends without approval
- add dependencies without justification
- bypass tests
- merge its own PRs
- implement multiple roadmap phases in one PR
- invent product scope beyond the issue

## Issue size rule

A good issue should be finishable in one focused PR.

Use `Size` to make that explicit:

- `S` and `M` are normally good Codex tasks.
- `L` is acceptable only when tightly scoped.
- `XL` should become an epic or be split.

Bad issue:

```txt
Build the full training module
```

Good issue:

```txt
Create Exercise domain types and mock data for training-mfe
```

Bad issue:

```txt
Add auth
```

Good issue:

```txt
Create Keycloak AuthProvider in packages/auth with mocked configuration and shell integration placeholder
```

## Branch naming

```txt
codex/docs-operating-model
codex/setup-nx-workspace
codex/create-shell-app
codex/create-training-mfe
codex/create-api-skeleton
```

## PR requirements

Each PR must include:

- linked issue
- summary
- files changed
- guide/docs update decision
- validation commands
- validation result
- screenshots if UI changed
- risks
- recommended next issue

If `Guide update` is `Required`, the PR must update internal docs, update the
future Next.js guide or explicitly explain why the documentation update was
deferred.

## Human review checklist

Before merging:

- Is the diff small enough?
- Does it respect the issue scope?
- Does it respect the Project fields?
- Does it respect boundaries?
- Does TypeScript pass?
- Are tests adequate for the risk?
- Are docs updated when `Guide update` is `Required`?
- Did Codex add unnecessary dependencies?
- Can the change be reverted easily?

## Working cadence

Do not run many dependent Codex tasks at once initially.

Start with one task at a time until the workflow is stable.

After the workflow works, allow parallel tasks only when they touch independent areas:

- docs task
- backend task
- frontend UI task
- test task

Do not run two agents that touch the same files unless one is explicitly a reviewer.
