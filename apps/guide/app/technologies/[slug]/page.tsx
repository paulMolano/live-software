import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentArticle } from "../../../components/content-article";
import {
  findTechnologyPage,
  technologyPages,
} from "../../../content/guide-content";

type TechnologyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return technologyPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: TechnologyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findTechnologyPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function TechnologyDetailPage({
  params,
}: TechnologyPageProps) {
  const { slug } = await params;
  const page = findTechnologyPage(slug);

  if (!page) {
    notFound();
  }

  return <ContentArticle page={page} />;
}
