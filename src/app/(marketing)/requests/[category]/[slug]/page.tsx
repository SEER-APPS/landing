import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RequestForm } from "@/components/landing/RequestForm";
import {
  categoryRequestSlugMeta,
  requestCategories,
} from "@/constants/requests";
import { pageMetadata } from "@/lib/site-metadata";

type PageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const meta = categoryRequestSlugMeta[category]?.[slug];
  if (!meta) {
    return pageMetadata({
      title: "Request",
      description: "Submit a request to the Seer team.",
      path: "/requests",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/requests/${category}/${slug}`,
  });
}

export default async function CategoryRequestPage({ params }: PageProps) {
  const { category, slug } = await params;

  if (category === "account") {
    notFound();
  }

  const categoryMeta = requestCategories.find((entry) => entry.id === category);
  const meta = categoryRequestSlugMeta[category]?.[slug];
  if (!categoryMeta || !meta) {
    notFound();
  }

  return (
    <article className="bg-background text-foreground">
      <header className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm text-muted">
          <Link href="/requests" className="underline underline-offset-4 hover:text-foreground">
            Requests
          </Link>
          {` / ${categoryMeta.title}`}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {meta.description}
        </p>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6">
        <RequestForm type={category} subtype={slug} title={meta.title} />
      </div>
    </article>
  );
}
