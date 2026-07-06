# Live Software Guide

`apps/guide` is the living technical guide for `live-software`.

It is a Next.js App Router app built directly, without Nextra, so the project can
learn routing, layouts, metadata, static export, sitemap, robots and
documentation design.

## Purpose

The repository now has two products:

1. the personal life-management app;
2. this guide, which explains how the app is being built.

Internal docs under `docs/` remain the source of ADRs, playbooks and planning.
The guide presents selected knowledge in a more navigable format.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Mantine as the shared UI foundation
- CSS Modules for guide-specific composition
- Structured TypeScript content in `content/`

Mantine is used from the start so the guide is not a one-off UI island. The
local `theme.ts` file is intentionally small and can later be aligned with or
extracted into `packages/ui-kit` once the shared design system matures.

## Run

From the repository root:

```sh
pnpm --filter @live-software/guide dev
```

Or through Nx:

```sh
pnpm nx dev guide
```

## Validate

```sh
pnpm --filter @live-software/guide lint
pnpm --filter @live-software/guide typecheck
pnpm --filter @live-software/guide build
```

Repository-level validation:

```sh
pnpm lint
pnpm typecheck
pnpm build
```

## Content model

Content lives in `apps/guide/content/guide-content.ts`.

Use the existing `GuideContentPage`, `GuideDetailPage`, `ContentSection` and
`GuideLink` types when adding pages. Technology pages should keep this shape:

- why we use it;
- what we want to learn;
- where it appears in the repo;
- official documentation;
- future exercises.

This first version avoids MDX to keep the PR focused and reviewable. MDX can be
introduced later if the editing experience needs it.

## Routes

Initial routes:

- `/`
- `/journey`
- `/journey/phase-0-project-seed`
- `/journey/phase-1-nx-pnpm-foundation`
- `/technologies`
- `/technologies/react-19`
- `/technologies/nx-pnpm`
- `/technologies/microfrontends`
- `/technologies/nextjs`
- `/technologies/codex-agents`
- `/decisions`
- `/patterns`
- `/patterns/agentic-delivery-flow`
- `/design`
- `/resources`

Additional starter technology pages are generated from the same content model
for backend modular monolith, Keycloak, testing, performance, observability,
i18n and feature flags.

## Deferred intentionally

- Nextra or another docs framework
- Authentication
- Backend integration
- CMS
- Analytics
- Search
- Comments
- MDX
- Dark mode toggle
