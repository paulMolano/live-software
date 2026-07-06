import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentArticle } from "../../../components/content-article";
import { findPatternPage, patternDetailPages } from "../../../content/guide-content";

type PatternPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return patternDetailPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: PatternPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findPatternPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function PatternDetailPage({ params }: PatternPageProps) {
  const { slug } = await params;
  const page = findPatternPage(slug);

  if (!page) {
    notFound();
  }

  return <ContentArticle page={page} />;
}
