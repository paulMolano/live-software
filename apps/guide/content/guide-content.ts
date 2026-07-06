import { siteConfig } from "./site";

export type GuideLink = {
  href: string;
  label: string;
  description: string;
};

export type ExternalLink = {
  href: string;
  label: string;
};

export type ContentSection = {
  title: string;
  body?: string[];
  bullets?: string[];
  links?: ExternalLink[];
};

export type GuideContentPage = {
  href: string;
  title: string;
  eyebrow: string;
  description: string;
  sections: ContentSection[];
  related?: GuideLink[];
};

export type GuideDetailPage = GuideContentPage & {
  slug: string;
};

type TechnologyDefinition = {
  slug: string;
  title: string;
  description: string;
  why: string;
  learn: string[];
  where: string[];
  docs: ExternalLink[];
  exercises: string[];
};

const docsUrl = `${siteConfig.repositoryUrl}/tree/main/docs`;

function pageLink(page: GuideContentPage): GuideLink {
  return {
    href: page.href,
    label: page.title,
    description: page.description,
  };
}

function technologyPage(definition: TechnologyDefinition): GuideDetailPage {
  return {
    href: `/technologies/${definition.slug}`,
    slug: definition.slug,
    eyebrow: "Technology",
    title: definition.title,
    description: definition.description,
    sections: [
      {
        title: "Why we use it",
        body: [definition.why],
      },
      {
        title: "What we want to learn",
        bullets: definition.learn,
      },
      {
        title: "Where it appears in the repo",
        bullets: definition.where,
      },
      {
        title: "Official documentation",
        links: definition.docs,
      },
      {
        title: "Future exercises",
        bullets: definition.exercises,
      },
    ],
  };
}

export const homePage: GuideContentPage = {
  href: "/",
  eyebrow: "Living technical playbook",
  title: "Build the product and document the path",
  description:
    "The guide is the second product of live-software: a navigable record of the architecture, workflow and learning behind the personal life-management app.",
  sections: [
    {
      title: "Project story",
      body: [
        "live-software is both a personal life-management webapp and a serious learning lab for frontend architecture, backend architecture, microfrontends, React 19 and applied AI development.",
        "The product starts with dashboard, training, a real backend and authentication prepared for Keycloak. The learning system turns meaningful steps into a reusable technical playbook.",
      ],
      bullets: [
        "Personal life-management app for training, habits, finance, learning, family and technical knowledge.",
        "Full-stack architecture lab using Nx, React 19, TypeScript, NestJS and PostgreSQL over time.",
        "Microfrontend practice through a shell and domain remotes, starting with training-mfe.",
        "AI/Codex workflow practice with issues, branches, validation, reviews and small pull requests.",
        "Living documentation project that summarizes selected internal docs without replacing them.",
      ],
    },
    {
      title: "How to read this guide",
      body: [
        "The internal docs folder remains the source for ADRs, playbooks and planning. This guide presents selected knowledge in a more navigable format for review, learning and future portfolio use.",
        "The first content model is structured TypeScript instead of MDX. That keeps the foundation small, searchable by code review and easy to change before the documentation volume justifies a richer authoring system.",
      ],
    },
  ],
};

export const journeyIndexPage: GuideContentPage = {
  href: "/journey",
  eyebrow: "Project journey",
  title: "The path so far",
  description:
    "A chronological trail of the project seed, GitHub operating model, Nx foundation and current shared package milestone.",
  sections: [
    {
      title: "What has already happened",
      body: [
        "Phase 0 established the product vision, learning goals, architecture principles, ADR trail and GitHub/Codex operating model.",
        "Phase 1 started the implementation foundation with pnpm, Nx, strict TypeScript and shared package skeletons before product features.",
      ],
    },
    {
      title: "Current and next milestone",
      body: [
        "The repository currently contains the monorepo foundation and shared package boundaries. The next platform milestones are shell, training remote, API skeleton and CI validation.",
      ],
    },
  ],
};

export const journeyDetailPages: GuideDetailPage[] = [
  {
    href: "/journey/phase-0-project-seed",
    slug: "phase-0-project-seed",
    eyebrow: "Journey",
    title: "Phase 0: project seed",
    description:
      "How the repository started as a product vision, architecture seed and controlled learning system.",
    sections: [
      {
        title: "Goal",
        body: [
          "Phase 0 defined the project before implementation. The aim was to avoid building random features and instead create a useful product with visible architecture and a learning trail.",
        ],
      },
      {
        title: "Key decisions",
        bullets: [
          "Use a single monorepo for apps, backend, shared packages and docs.",
          "Use microfrontends by domain for learning, not because the product needs early scale.",
          "Use a modular monolith backend before considering distributed services.",
          "Keep ADRs and architecture docs inside docs/ as the internal source of truth.",
          "Use GitHub Issues, Project fields and Codex tasks as the delivery loop.",
        ],
      },
      {
        title: "Documentation created",
        links: [
          { href: `${docsUrl}/product`, label: "Product docs" },
          { href: `${docsUrl}/architecture`, label: "Architecture docs" },
          { href: `${docsUrl}/adr`, label: "ADRs" },
        ],
      },
    ],
    related: [
      {
        href: "/patterns/agentic-delivery-flow",
        label: "Agentic delivery flow",
        description: "The operating model used to move from issue to PR.",
      },
    ],
  },
  {
    href: "/journey/phase-1-nx-pnpm-foundation",
    slug: "phase-1-nx-pnpm-foundation",
    eyebrow: "Journey",
    title: "Phase 1: Nx + pnpm foundation",
    description:
      "The first implementation phase: workspace foundation, quality gates and shared package boundaries.",
    sections: [
      {
        title: "Goal",
        body: [
          "Phase 1 prepares the repository for real app work. It creates the workspace structure, command contract and shared package boundaries without adding product behavior.",
        ],
      },
      {
        title: "Completed steps",
        bullets: [
          "Initialized pnpm and Nx in the existing documentation repository.",
          "Added strict TypeScript base configuration.",
          "Created shared package skeletons for ui-kit, contracts, config, testing and shared-utils.",
          "Kept product features, authentication, database and deployment out of the foundation PRs.",
        ],
      },
      {
        title: "Next steps",
        bullets: [
          "Create apps/shell as the React host skeleton.",
          "Create apps/training-mfe as the first Module Federation remote.",
          "Create apps/api as the NestJS API skeleton.",
          "Add CI that runs install, lint, typecheck, tests and build as those targets become real.",
        ],
      },
    ],
    related: [
      {
        href: "/technologies/nx-pnpm",
        label: "Nx + pnpm",
        description: "Why Nx and pnpm are the base of the monorepo.",
      },
      {
        href: "/technologies/microfrontends",
        label: "Microfrontends",
        description: "How the shell and remotes will be split by domain.",
      },
    ],
  },
];

export const technologiesIndexPage: GuideContentPage = {
  href: "/technologies",
  eyebrow: "Learning map",
  title: "Technologies",
  description:
    "Starter learning pages for the core stack, each with why it matters, where it appears, official docs and future exercises.",
  sections: [
    {
      title: "How technology pages work",
      body: [
        "Each page uses the same structure: why we use it, what we want to learn, where it appears in the repo, official documentation and future exercises.",
        "Some technologies are already in the repository. Others are documented as planned learning areas so future implementation issues have a clear trail.",
      ],
    },
  ],
};

const technologyDefinitions: TechnologyDefinition[] = [
  {
    slug: "react-19",
    title: "React 19",
    description: "The UI runtime for shell, remotes and product experiences.",
    why:
      "React 19 is the frontend learning target for the project. The app will use it deliberately for client UI, remote loading and interaction patterns without introducing React Server Components in the first phase.",
    learn: [
      "Suspense for lazy UI and remote loading states.",
      "useTransition and startTransition for non-urgent dashboard updates.",
      "useOptimistic and useActionState where product forms make sense.",
      "useDeferredValue for filtered lists and search-style interactions.",
      "When not to use advanced React APIs.",
    ],
    where: [
      "Future apps/shell React host.",
      "Future apps/training-mfe React remote.",
      "Future packages/ui-kit shared UI primitives.",
    ],
    docs: [
      { href: "https://react.dev/", label: "React documentation" },
      {
        href: "https://react.dev/blog/2024/12/05/react-19",
        label: "React 19 release notes",
      },
    ],
    exercises: [
      "Create a Suspense fallback around a remote route.",
      "Measure a dashboard filter with and without useTransition.",
      "Prototype an optimistic training exercise create flow.",
    ],
  },
  {
    slug: "nx-pnpm",
    title: "Nx + pnpm",
    description:
      "The monorepo foundation and package manager contract for every app and package.",
    why:
      "Nx gives the repository project discovery, task targets and a path toward affected validation. pnpm keeps dependency installation strict, fast and reproducible.",
    learn: [
      "How Nx discovers apps and packages through project.json.",
      "How targets become the local and CI command contract.",
      "How pnpm workspaces keep apps and packages aligned.",
      "How to keep generated defaults small and intentional.",
    ],
    where: [
      "Root package.json scripts.",
      "nx.json named inputs and future target defaults.",
      "pnpm-workspace.yaml for apps/* and packages/*.",
      "packages/*/project.json and apps/guide/project.json.",
    ],
    docs: [
      { href: "https://nx.dev/docs", label: "Nx documentation" },
      { href: "https://pnpm.io/", label: "pnpm documentation" },
    ],
    exercises: [
      "Add CI around the same root command contract.",
      "Introduce affected builds once the branch strategy is stable.",
      "Document how to add a new package without blurring boundaries.",
    ],
  },
  {
    slug: "microfrontends",
    title: "Module Federation / microfrontends",
    description:
      "The learning architecture for splitting domains into a shell and remotes.",
    why:
      "The project uses microfrontends to learn host/remote boundaries, runtime loading, shared dependencies, fallback behavior and independent builds.",
    learn: [
      "How the shell owns global layout and providers.",
      "How a remote owns its domain routes and behavior.",
      "How contracts prevent direct remote-to-remote imports.",
      "How to observe remote loading and failure states.",
    ],
    where: [
      "Future apps/shell as the host.",
      "Future apps/training-mfe as the first remote.",
      "packages/contracts for shared public contracts.",
    ],
    docs: [
      {
        href: "https://module-federation.io/",
        label: "Module Federation documentation",
      },
      {
        href: "https://nx.dev/docs/technologies/module-federation",
        label: "Nx Module Federation documentation",
      },
    ],
    exercises: [
      "Generate the shell host and keep it free of product features.",
      "Generate training-mfe and connect only the Module Federation boundary.",
      "Add an error boundary and visible fallback for a failing remote.",
    ],
  },
  {
    slug: "nextjs",
    title: "Next.js",
    description:
      "The framework used for this living guide, App Router practice and static documentation output.",
    why:
      "The guide uses Next.js directly to learn App Router fundamentals, layouts, route metadata, SEO, sitemap, robots and static generation without hiding those concepts behind a docs framework.",
    learn: [
      "App Router route organization.",
      "Route-level metadata and Open Graph basics.",
      "Static export for documentation-style sites.",
      "Sitemap and robots metadata routes.",
      "Documentation design without Nextra.",
    ],
    where: [
      "apps/guide/app for routes and layouts.",
      "apps/guide/content for structured human-editable content.",
      "apps/guide/styles for CSS Modules around Mantine components.",
    ],
    docs: [
      { href: "https://nextjs.org/docs", label: "Next.js documentation" },
      {
        href: "https://nextjs.org/docs/app",
        label: "Next.js App Router documentation",
      },
    ],
    exercises: [
      "Compare structured content with MDX after the route model is stable.",
      "Add generated Open Graph images later if the guide becomes public.",
      "Evaluate search only after content volume justifies it.",
    ],
  },
  {
    slug: "codex-agents",
    title: "Codex / AI agents",
    description:
      "The operating model for turning issues into reviewable, validated pull requests.",
    why:
      "Codex is part of the learning system. It helps turn scoped issues into small branches, implementation diffs, validation runs and PR summaries while the human owner keeps architecture and product direction.",
    learn: [
      "How to write issues that are safe for agent execution.",
      "How Project fields influence scope and readiness.",
      "How to use small PRs as reviewable learning artifacts.",
      "How Codex can implement, review and document without owning final decisions.",
    ],
    where: [
      "AGENTS.md for permanent collaboration rules.",
      "PLANS.md for complex task planning shape.",
      "docs/architecture/agentic-delivery-flow.md.",
      "docs/github/task-operating-model.md.",
    ],
    docs: [
      {
        href: "https://platform.openai.com/docs",
        label: "OpenAI developer documentation",
      },
      { href: "https://openai.com/codex/", label: "OpenAI Codex" },
    ],
    exercises: [
      "Review one PR with Codex against AGENTS.md and ADRs.",
      "Create a repeatable guide update checklist for relevant PRs.",
      "Measure which issue templates lead to the smallest review loops.",
    ],
  },
  {
    slug: "backend-modular-monolith",
    title: "Backend modular monolith",
    description:
      "The planned NestJS backend architecture with domain modules and clear boundaries.",
    why:
      "A modular monolith gives the project backend boundaries without the operational cost of microservices. It fits the learning goal: real backend structure first, distribution later only if justified.",
    learn: [
      "NestJS module boundaries.",
      "DTOs, validation and normalized errors.",
      "OpenAPI documentation.",
      "BFF-style composition for dashboard data.",
    ],
    where: [
      "Future apps/api.",
      "Future dashboard, training, users and auth backend modules.",
      "packages/contracts for frontend/backend contracts where useful.",
    ],
    docs: [
      { href: "https://docs.nestjs.com/", label: "NestJS documentation" },
      {
        href: "https://swagger.io/specification/",
        label: "OpenAPI specification",
      },
    ],
    exercises: [
      "Generate apps/api without persistence or auth first.",
      "Create a health endpoint and testing baseline.",
      "Add the first training module only after contracts are clear.",
    ],
  },
  {
    slug: "keycloak",
    title: "Keycloak",
    description:
      "The planned identity provider for authentication and authorization learning.",
    why:
      "Keycloak is planned so the project can learn real identity boundaries, JWT validation and auth flows without building custom authentication from scratch.",
    learn: [
      "Realm and client setup for local development.",
      "JWT validation in NestJS.",
      "Frontend auth provider boundaries.",
      "Forbidden and unauthenticated UI states.",
    ],
    where: [
      "Future packages/auth.",
      "Future apps/api auth module.",
      "Future Docker Compose local services.",
    ],
    docs: [
      {
        href: "https://www.keycloak.org/documentation",
        label: "Keycloak documentation",
      },
      {
        href: "https://openid.net/developers/how-connect-works/",
        label: "OpenID Connect overview",
      },
    ],
    exercises: [
      "Document the local Keycloak realm setup.",
      "Add API auth guard validation once the API skeleton exists.",
      "Add shell-level forbidden and loading states.",
    ],
  },
  {
    slug: "testing",
    title: "Testing",
    description:
      "The risk-based validation strategy for logic, components, API behavior and smoke coverage.",
    why:
      "Testing is a quality gate, not decoration. The project scales test depth with risk and uses small validation surfaces for early foundation work.",
    learn: [
      "Vitest for logic.",
      "Testing Library for React components.",
      "Supertest and Nest testing for API behavior.",
      "Playwright and axe for smoke and accessibility checks.",
    ],
    where: [
      "Future package and app test targets.",
      "packages/testing for shared test utilities.",
      "Future CI workflow.",
    ],
    docs: [
      { href: "https://vitest.dev/", label: "Vitest documentation" },
      {
        href: "https://testing-library.com/docs/",
        label: "Testing Library documentation",
      },
      { href: "https://playwright.dev/", label: "Playwright documentation" },
    ],
    exercises: [
      "Add component tests when shell and training UI exist.",
      "Add API tests when apps/api has a real module.",
      "Add accessibility smoke once user-facing screens exist.",
    ],
  },
  {
    slug: "performance",
    title: "Performance",
    description:
      "The planned quality gate for bundle size, remotes, Web Vitals and backend latency.",
    why:
      "Performance is part of the architecture learning goal. The project should measure remote loading, bundle growth and user-facing responsiveness instead of guessing.",
    learn: [
      "Bundle budgets and Nx build output review.",
      "Remote load timing and fallback behavior.",
      "Web Vitals for user-facing routes.",
      "API latency and cache hit/miss observations later.",
    ],
    where: [
      "Future shell and remote build checks.",
      "Future Lighthouse CI workflow.",
      "Future backend observability hooks.",
    ],
    docs: [
      { href: "https://web.dev/vitals/", label: "Web Vitals" },
      {
        href: "https://developer.chrome.com/docs/lighthouse",
        label: "Lighthouse documentation",
      },
    ],
    exercises: [
      "Add bundle budgets once frontend apps exist.",
      "Measure shell startup with and without the training remote.",
      "Add Lighthouse CI after there is a deployed or served page to test.",
    ],
  },
  {
    slug: "observability",
    title: "Observability",
    description:
      "The future instrumentation layer for analytics, events and system visibility.",
    why:
      "Observability will help the project learn from real behavior without coupling components directly to vendors. The first rule is to keep calls behind internal contracts.",
    learn: [
      "Analytics through packages/analytics.",
      "Backend request timing and cache observations.",
      "Remote load metrics.",
      "Privacy-aware event design.",
    ],
    where: [
      "Future packages/analytics.",
      "Future shell provider.",
      "Future API interceptors or middleware.",
    ],
    docs: [
      {
        href: "https://opentelemetry.io/docs/",
        label: "OpenTelemetry documentation",
      },
      { href: "https://posthog.com/docs", label: "PostHog documentation" },
    ],
    exercises: [
      "Define the internal analytics contract before choosing a vendor.",
      "Track remote load timing without leaking domain details.",
      "Add backend latency metrics after API modules exist.",
    ],
  },
  {
    slug: "i18n",
    title: "i18n",
    description:
      "The planned internationalization layer for Spanish-first product text and future language expansion.",
    why:
      "The app is personal and Spanish-first, but i18n creates useful discipline around copy, accessibility labels and route/domain ownership.",
    learn: [
      "react-i18next provider boundaries.",
      "Namespace ownership per domain.",
      "Accessible translated labels and errors.",
      "How remotes receive or own translation resources.",
    ],
    where: [
      "Future shell i18n provider.",
      "Future training-mfe namespace.",
      "Future packages/contracts if route labels become shared.",
    ],
    docs: [
      {
        href: "https://react.i18next.com/",
        label: "react-i18next documentation",
      },
      { href: "https://www.i18next.com/", label: "i18next documentation" },
    ],
    exercises: [
      "Add a Spanish base namespace after shell exists.",
      "Document where remote translations live.",
      "Test accessible labels in translated UI.",
    ],
  },
  {
    slug: "feature-flags",
    title: "Feature flags",
    description:
      "The planned internal contract for gradual rollout and experiments without vendor lock-in.",
    why:
      "Feature flags will let the project learn rollout discipline, but they should not leak a vendor API into components or become permanent conditional complexity.",
    learn: [
      "Internal flag contracts.",
      "Flag lifecycle and cleanup.",
      "Safe defaults for unavailable flag data.",
      "How flags interact with tests and documentation.",
    ],
    where: [
      "Future packages/feature-flags.",
      "Future shell provider.",
      "Future domain feature entry points.",
    ],
    docs: [
      {
        href: "https://martinfowler.com/articles/feature-toggles.html",
        label: "Feature Toggles by Martin Fowler",
      },
      {
        href: "https://openfeature.dev/docs/reference/concepts/",
        label: "OpenFeature concepts",
      },
    ],
    exercises: [
      "Create a minimal local flag provider before adopting a service.",
      "Add tests for enabled, disabled and unavailable flag states.",
      "Document flag removal criteria in the package README.",
    ],
  },
];

export const technologyPages = technologyDefinitions.map(technologyPage);

export const decisionsPage: GuideContentPage = {
  href: "/decisions",
  eyebrow: "Architecture memory",
  title: "Decisions",
  description:
    "A public-facing index of key decisions while ADRs remain in docs/ as the source of truth.",
  sections: [
    {
      title: "Current decision trail",
      body: [
        "The guide summarizes decisions for navigation and learning. Detailed ADRs stay in docs/adr and should be updated there when a decision changes.",
      ],
      bullets: [
        "Single monorepo for apps, packages, backend and docs.",
        "Microfrontends are used deliberately as a learning tool.",
        "Module Federation is the first microfrontend strategy.",
        "Nx + React are the frontend foundation.",
        "Mantine plus CSS Modules is the UI styling direction.",
        "Backend starts as a NestJS modular monolith.",
        "Keycloak is the planned auth provider.",
        "Next.js is separate from the shell and used first for this guide.",
      ],
      links: [{ href: `${docsUrl}/adr`, label: "ADR folder" }],
    },
  ],
};

export const patternsIndexPage: GuideContentPage = {
  href: "/patterns",
  eyebrow: "Reusable ways of working",
  title: "Patterns",
  description:
    "Repeatable delivery and architecture patterns that emerge as the project grows.",
  sections: [
    {
      title: "Pattern library",
      body: [
        "Patterns are lighter than ADRs. They describe how the team repeats work safely, especially when Codex is involved.",
      ],
    },
  ],
};

export const patternDetailPages: GuideDetailPage[] = [
  {
    href: "/patterns/agentic-delivery-flow",
    slug: "agentic-delivery-flow",
    eyebrow: "Pattern",
    title: "Agentic delivery flow",
    description:
      "The operating model for moving from GitHub Issue to branch, validation, review and guide update.",
    sections: [
      {
        title: "Flow",
        bullets: [
          "Human creates or approves a GitHub Issue.",
          "Issue is classified in Live Software Roadmap.",
          "Codex reads the issue, Project fields, AGENTS.md and relevant docs.",
          "Codex confirms scope is safe, then creates a short plan.",
          "Codex implements in a branch and runs validation.",
          "Codex opens a PR with summary, routes, files, commands, risks and documentation decision.",
          "CI validates the branch.",
          "Codex can review the PR against repo rules.",
          "Paul reviews the result and decides whether to merge.",
          "The guide or internal docs are updated when the PR changes the trail.",
        ],
      },
      {
        title: "Safety rules",
        bullets: [
          "Do not send Epic or XL issues directly to implementation.",
          "Do not let a remote import another remote.",
          "Do not add architecture changes without an ADR or explicit issue scope.",
          "Do not merge agent-created PRs automatically.",
          "Keep product features out of foundation tasks.",
        ],
      },
      {
        title: "Documentation trail",
        body: [
          "Every meaningful PR must decide whether it updates docs, updates the guide, records future guide work or explicitly states that no guide update is needed.",
        ],
      },
    ],
    related: [
      {
        href: "/journey/phase-0-project-seed",
        label: "Phase 0: project seed",
        description: "Where the operating model was created.",
      },
    ],
  },
];

export const designPage: GuideContentPage = {
  href: "/design",
  eyebrow: "Guide design",
  title: "Design direction",
  description:
    "The documentation site should feel clean, technical, readable, responsive and ready for future portfolio use.",
  sections: [
    {
      title: "Principles",
      bullets: [
        "Use Mantine as the project UI library from the start.",
        "Use semantic HTML and real navigation.",
        "Prefer readable pages over decorative documentation chrome.",
        "Keep cards shallow and purposeful.",
        "Use CSS Modules only for guide-specific layout and composition.",
        "Prepare for dark mode later through Mantine theme and CSS variables.",
      ],
    },
    {
      title: "Current implementation",
      body: [
        "The foundation wraps the app in MantineProvider, defines a guide theme and uses Mantine primitives for layout, cards, navigation text and accessible UI defaults. CSS Modules remain for the documentation-specific composition that does not belong in ui-kit yet.",
      ],
    },
  ],
};

export const resourcesPage: GuideContentPage = {
  href: "/resources",
  eyebrow: "Reference shelf",
  title: "Resources",
  description:
    "Internal docs and external references that help extend the guide without losing the architecture trail.",
  sections: [
    {
      title: "Internal sources",
      links: [
        { href: `${docsUrl}/product/vision.md`, label: "Product vision" },
        {
          href: `${docsUrl}/product/learning-goals.md`,
          label: "Learning goals",
        },
        {
          href: `${docsUrl}/architecture/phase-1-implementation-plan.md`,
          label: "Phase 1 implementation plan",
        },
        {
          href: `${docsUrl}/architecture/agentic-delivery-flow.md`,
          label: "Agentic delivery flow",
        },
        {
          href: `${docsUrl}/github/task-operating-model.md`,
          label: "GitHub task operating model",
        },
      ],
    },
    {
      title: "External references",
      links: [
        { href: "https://nextjs.org/docs", label: "Next.js documentation" },
        { href: "https://mantine.dev/", label: "Mantine documentation" },
        { href: "https://react.dev/", label: "React documentation" },
        { href: "https://nx.dev/docs", label: "Nx documentation" },
        { href: "https://pnpm.io/", label: "pnpm documentation" },
      ],
    },
  ],
};

export const guideRouteGroups = [
  {
    title: "Journey",
    description: "Follow the build chronologically.",
    links: [pageLink(journeyIndexPage), ...journeyDetailPages.map(pageLink)],
  },
  {
    title: "Technologies",
    description: "Learn why each technology exists in the project.",
    links: [pageLink(technologiesIndexPage), ...technologyPages.map(pageLink)],
  },
  {
    title: "Operating model",
    description: "Review decisions, patterns, design and resources.",
    links: [
      pageLink(decisionsPage),
      pageLink(patternsIndexPage),
      ...patternDetailPages.map(pageLink),
      pageLink(designPage),
      pageLink(resourcesPage),
    ],
  },
];

export const allGuideRoutes: GuideLink[] = [
  pageLink(homePage),
  ...guideRouteGroups.flatMap((group) => group.links),
];

export function findJourneyPage(slug: string): GuideDetailPage | undefined {
  return journeyDetailPages.find((page) => page.slug === slug);
}

export function findTechnologyPage(slug: string): GuideDetailPage | undefined {
  return technologyPages.find((page) => page.slug === slug);
}

export function findPatternPage(slug: string): GuideDetailPage | undefined {
  return patternDetailPages.find((page) => page.slug === slug);
}
