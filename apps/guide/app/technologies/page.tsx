import type { Metadata } from "next";

import { ContentArticle } from "../../components/content-article";
import { technologiesIndexPage, technologyPages } from "../../content/guide-content";

export const metadata: Metadata = {
  title: technologiesIndexPage.title,
  description: technologiesIndexPage.description,
};

export default function TechnologiesPage() {
  return (
    <ContentArticle
      page={{
        ...technologiesIndexPage,
        related: technologyPages.map((page) => ({
          href: page.href,
          label: page.title,
          description: page.description,
        })),
      }}
    />
  );
}
