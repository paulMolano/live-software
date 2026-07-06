export const siteConfig = {
  title: "Live Software Guide",
  shortName: "Live Guide",
  description:
    "A living technical guide for the live-software project: architecture, journey, technologies, decisions and agentic delivery.",
  url: "https://paulmolano.github.io/live-software/",
  repositoryUrl: "https://github.com/paulMolano/live-software",
};

export const primaryNavigation = [
  {
    href: "/journey",
    label: "Journey",
  },
  {
    href: "/technologies",
    label: "Technologies",
  },
  {
    href: "/decisions",
    label: "Decisions",
  },
  {
    href: "/patterns",
    label: "Patterns",
  },
  {
    href: "/design",
    label: "Design",
  },
  {
    href: "/resources",
    label: "Resources",
  },
] as const;
