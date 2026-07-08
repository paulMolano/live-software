# Issue Refinement Playbook

## Goal

Turn an idea, epic or rough request into one or more GitHub issues that are
small enough for Codex and reviewable in a PR.

Use this playbook before moving work to `Ready`.

## Inputs

Read:

- `AGENTS.md`
- `PLANS.md`
- `docs/github/project-fields.md`
- `docs/github/project-operating-model.md`
- the relevant architecture, product or playbook docs for the area

## Classification

Every refined issue must propose these Project fields:

- `Status`
- `Track`
- `Work type`
- `Size`
- `Codex ready`
- `Guide update`

Use labels only as a secondary signal. The Project fields are the execution
contract.

## Refinement Steps

1. Restate the requested outcome in one sentence.
2. Identify the track: `Platform`, `Product`, `Guide`, `Agents`, `Design` or
   `Research`.
3. Choose the work type: `Epic`, `Feature`, `Foundation`, `Chore`, `Docs`,
   `Spike`, `Bug` or `Review`.
4. Estimate size as `S`, `M`, `L` or `XL`.
5. Decide whether Codex can execute it now.
6. Decide whether docs or the living guide must be updated.
7. Write scope and out of scope.
8. Add acceptance criteria that can be checked.
9. Add validation commands or manual validation.
10. Name likely files, packages, apps or docs areas.
11. Add risks and PR expectations.

## Split Rules

Split the issue when:

- it spans unrelated tracks;
- it mixes planning, implementation and review;
- it needs several independent PRs;
- it has no clear validation path;
- it would touch many apps or packages without one outcome;
- it is `Size: XL`;
- it is an `Epic`.

Split by product or architecture boundary first, then by validation path.

## Codex Readiness

Set `Codex ready: Ready` only when:

- the issue has a concrete goal;
- scope and out of scope are explicit;
- acceptance criteria are testable;
- validation is possible;
- likely files or areas are named;
- `Work type` is not `Epic`;
- `Size` is `S`, `M` or a tightly scoped `L`;
- any required docs or guide update is named.

Set `Codex ready: Needs refinement` when the idea is useful but still needs
scope, acceptance criteria, validation or file boundaries.

Set `Codex ready: No` for epics, vague ideas, intentionally parked work or work
that should not be executed by Codex.

## Issue Template

Use this body for executable work:

```md
## Goal

## Context

## Scope

## Out of scope

## Acceptance criteria

## Validation

## Files likely affected

## Project fields

- Status:
- Track:
- Work type:
- Size:
- Codex ready:
- Guide update:

## Risks

## PR expectations
```

## Epic Template

Use this body for parent issues:

```md
## Goal

## Why

## Child issues

- [ ] 

## Out of scope

## Done means

## Project fields

- Status: Backlog
- Track:
- Work type: Epic
- Size: XL
- Codex ready: No
- Guide update:
```

## Ready Checklist

Before moving an issue to `Ready`, confirm:

- it is not an epic;
- it is not `Size: XL`;
- `Codex ready` is `Ready`;
- validation is listed;
- docs or guide expectations are clear;
- a reviewer can understand the expected diff before opening the branch.
