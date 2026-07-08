# @live-software/config

Shared configuration contracts and public configuration types.

## Owns

- Environment names.
- Runtime configuration types.
- Feature flag types when flags are introduced.
- Shared constants with clear ownership.

## Does not own

- Secrets.
- Environment-specific private values.
- Product or domain behavior.

## Current state

This package is a skeleton only. Do not store real environment values here.

## Query foundation

- `src/query.ts` exports the shared `QueryClient` factory.
- Query defaults live here so shell and future remotes use the same cache policy.
- Query keys start with `app`, then the owning boundary, then the domain-specific key.

## State boundary

- Zustand belongs in the app layer for UI preferences only.
- TanStack Query belongs in the app layer for server cache/fetch state.
- Do not store backend payloads in Zustand.
