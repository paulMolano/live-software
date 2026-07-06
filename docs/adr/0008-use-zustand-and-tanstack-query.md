# ADR 0008 - Use Zustand and TanStack Query

## Status

Accepted.

## Decision

Use Zustand for client UI state and TanStack Query for server state.

## Reason

Clear separation between UI preferences and backend data/cache.

## Consequences

Avoid duplicating server data in Zustand.
