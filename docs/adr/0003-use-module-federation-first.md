# ADR 0003 - Use Module Federation first

## Status

Accepted.

## Decision

Use Module Federation as first microfrontend strategy.

## Alternatives

- monolith modular;
- build-time packages;
- single-spa/import maps;
- Next Multi-Zones;
- Web Components;
- iframes.

## Reason

Best fit for learning host/remotes, runtime loading, shared dependencies and fallback.

## Consequences

Need strong contracts, fallback, shared dependency governance and runtime observability.
