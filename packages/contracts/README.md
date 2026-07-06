# @live-software/contracts

Shared TypeScript contracts for public boundaries between apps, remotes, and the backend.

## Owns

- Public API contracts.
- Shared DTOs.
- Route contracts.
- Event contracts when eventing is introduced.
- Remote contracts when Module Federation boundaries need typed APIs.

## Does not own

- UI components.
- Runtime business logic.
- Backend-only implementation details.

## Current state

This package is a skeleton only. Add contracts only when at least two boundaries need them.
