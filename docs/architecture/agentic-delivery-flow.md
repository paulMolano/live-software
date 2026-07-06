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
2. Codex reads the issue + AGENTS.md + relevant docs
3. Codex creates a short plan
4. Human approves or corrects the plan
5. Codex implements in a branch
6. Codex runs validation commands
7. Codex opens or updates a PR
8. CI runs
9. Codex reviews the PR
10. Human reviews the diff
11. Human merges or requests changes
```

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
- validation commands
- screenshots if UI changed
- risks
- follow-up tasks

## Human review checklist

Before merging:

- Is the diff small enough?
- Does it respect the issue scope?
- Does it respect boundaries?
- Does TypeScript pass?
- Are tests adequate for the risk?
- Are docs updated if architecture changed?
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
