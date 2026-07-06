import type { Metadata } from "next";

import { ContentArticle } from "../../components/content-article";
import { journeyDetailPages, journeyIndexPage } from "../../content/guide-content";

export const metadata: Metadata = {
  title: journeyIndexPage.title,
  description: journeyIndexPage.description,
};

export default function JourneyPage() {
  return (
    <ContentArticle
      page={{
        ...journeyIndexPage,
        related: journeyDetailPages.map((page) => ({
          href: page.href,
          label: page.title,
          description: page.description,
        })),
      }}
    />
  );
}
