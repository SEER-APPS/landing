import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RequestForm } from "@/components/landing/RequestForm";
import { accountRequestOptions } from "@/constants/requests";
import { pageMetadata } from "@/lib/site-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "delete") {
    return pageMetadata({
      title: "Delete account",
      description:
        "Request permanent deletion of your Seer account and associated data.",
      path: "/requests/account/delete",
      noIndex: true,
    });
  }

  const option = accountRequestOptions.find((entry) => entry.slug === slug);
  if (!option) {
    return pageMetadata({
      title: "Account request",
      description: "Submit an account request to the Seer team.",
      path: "/requests/account",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: option.title,
    description: option.description,
    path: `/requests/account/${option.slug}`,
  });
}

export default async function AccountRequestSlugPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "delete") {
    notFound();
  }

  const option = accountRequestOptions.find((entry) => entry.slug === slug);
  if (!option) {
    notFound();
  }

  return (
    <article className="bg-background text-foreground">
      <header className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm text-muted">
          <Link href="/requests" className="underline underline-offset-4 hover:text-foreground">
            Requests
          </Link>
          {" / "}
          <Link
            href="/requests/account"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Account
          </Link>
          {` / ${option.title}`}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {option.title}
        </h1>
        <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {option.description}
        </p>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6">
        <RequestForm type="account" subtype={slug} title={option.title} />
      </div>
    </article>
  );
}
