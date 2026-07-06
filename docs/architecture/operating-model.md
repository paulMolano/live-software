# Operating Model

## Core decision

This project uses one single monorepo.

The monorepo contains:

- frontend shell
- frontend microfrontends
- backend API
- shared packages
- architecture documentation
- Codex/agent instructions
- GitHub task workflow documentation

## Why one monorepo

One monorepo is the best starting point because it keeps the learning system coherent:

- one source of truth
- one backlog
- one GitHub Project
- one CI pipeline family
- shared contracts close to consumers
- easier Codex context
- easier refactors
- simpler local development

This does not mean everything is coupled.

The repo is one. The architecture boundaries are still strict.

## Initial apps

```txt
apps/shell
apps/training-mfe
apps/api
```

## Initial packages

```txt
packages/ui-kit
packages/contracts
packages/config
packages/auth
packages/analytics
packages/feature-flags
packages/testing
packages/shared-utils
```

## Deployment model

The monorepo can produce multiple deployable artifacts:

- shell frontend
- training remote frontend
- API backend
- future frontend remotes
- future Next.js web app

Monorepo does not mean one deployment.

## First rule

Do not create all applications at once.

The first technical milestone is:

```txt
shell + training-mfe + api skeleton
```

Nothing else.
