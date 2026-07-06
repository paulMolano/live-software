import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentArticle } from "../../../components/content-article";
import { findJourneyPage, journeyDetailPages } from "../../../content/guide-content";

type JourneyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return journeyDetailPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: JourneyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findJourneyPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function JourneyDetailPage({ params }: JourneyPageProps) {
  const { slug } = await params;
  const page = findJourneyPage(slug);

  if (!page) {
    notFound();
  }

  return <ContentArticle page={page} />;
}
