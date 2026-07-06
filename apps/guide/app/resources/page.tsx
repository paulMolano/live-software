import type { Metadata } from "next";

import { ContentArticle } from "../../components/content-article";
import { resourcesPage } from "../../content/guide-content";

export const metadata: Metadata = {
  title: resourcesPage.title,
  description: resourcesPage.description,
};

export default function ResourcesPage() {
  return <ContentArticle page={resourcesPage} />;
}
