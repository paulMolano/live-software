import type { MetadataRoute } from "next";

import { allGuideRoutes } from "../content/guide-content";
import { siteConfig } from "../content/site";

export const dynamic = "force-static";

const lastModified = new Date("2026-07-06T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return allGuideRoutes.map((route) => ({
    url: new URL(route.href, siteConfig.url).toString(),
    lastModified,
    changeFrequency: route.href === "/" ? "weekly" : "monthly",
    priority: route.href === "/" ? 1 : 0.7,
  }));
}
