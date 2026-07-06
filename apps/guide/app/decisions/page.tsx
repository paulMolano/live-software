import type { Metadata } from "next";

import { ContentArticle } from "../../components/content-article";
import { decisionsPage } from "../../content/guide-content";

export const metadata: Metadata = {
  title: decisionsPage.title,
  description: decisionsPage.description,
};

export default function DecisionsPage() {
  return <ContentArticle page={decisionsPage} />;
}
