# ADR 0011 - Use Docker Compose

## Status

Accepted.

## Decision

Use Docker Compose for local dependencies and backend environment.

## Reason

Backend, Postgres, Keycloak and Redis need reproducible local setup.

## Consequences

Frontend can still run outside Docker for better DX.
