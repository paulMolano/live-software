import type { Metadata } from "next";

import { ContentArticle } from "../../components/content-article";
import { designPage } from "../../content/guide-content";

export const metadata: Metadata = {
  title: designPage.title,
  description: designPage.description,
};

export default function DesignPage() {
  return <ContentArticle page={designPage} />;
}
