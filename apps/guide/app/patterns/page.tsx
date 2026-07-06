import type { Metadata } from "next";

import { ContentArticle } from "../../components/content-article";
import { patternDetailPages, patternsIndexPage } from "../../content/guide-content";

export const metadata: Metadata = {
  title: patternsIndexPage.title,
  description: patternsIndexPage.description,
};

export default function PatternsPage() {
  return (
    <ContentArticle
      page={{
        ...patternsIndexPage,
        related: patternDetailPages.map((page) => ({
          href: page.href,
          label: page.title,
          description: page.description,
        })),
      }}
    />
  );
}
