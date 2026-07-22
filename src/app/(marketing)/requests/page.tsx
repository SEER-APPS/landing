import type { Metadata } from "next";
import Link from "next/link";

import { requestCategories } from "@/constants/requests";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Requests",
  description:
    "Submit a support or account request to the Seer team. We will respond by email.",
  path: "/requests",
});

const cardClass =
  "block rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-foreground/20 hover:bg-brand-soft/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function RequestsPage() {
  return (
    <article className="bg-background text-foreground">
      <header className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Requests
        </h1>
        <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Choose a category below to submit a support or account request. We will
          respond by email.
        </p>
      </header>

      <div className="mx-auto grid w-full max-w-3xl gap-4 px-4 pb-14 sm:px-6">
        {requestCategories.map((category) => (
          <Link key={category.id} href={category.href} className={cardClass}>
            <h2 className="text-lg font-semibold">{category.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </article>
  );
}
