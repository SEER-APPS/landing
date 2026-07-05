import type { Metadata } from "next";
import Link from "next/link";

import { resolveSecurityPageContent } from "@/content/securityPageContent";

export const metadata: Metadata = {
  title: "Security | Seer",
  description:
    "Learn how Seer protects private chats, media, and shared moments.",
};

type SecurityPageProps = {
  searchParams: Promise<{
    lg?: string;
    lc?: string;
    eea?: string;
  }>;
};

export default async function SecurityPage({
  searchParams,
}: SecurityPageProps) {
  const resolvedSearchParams = await searchParams;
  const languageCode = resolvedSearchParams.lg?.trim().toLowerCase() ?? "en";
  const securityContent = resolveSecurityPageContent(languageCode);

  return (
    <article
      lang={securityContent.languageCode}
      className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:py-16"
    >
      <div className="max-w-3xl">
        <p className="inline-flex rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-black">
          {securityContent.eyebrow}
        </p>
        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {securityContent.title}
        </h1>
        <p className="mt-4 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {securityContent.description}
        </p>
        <p className="mt-3 text-sm text-muted">
          {securityContent.languageTitle}:{" "}
          <span className="font-medium text-foreground">
            {securityContent.languageLabel}
          </span>
        </p>
      </div>

      <section className="mt-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
        <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {securityContent.heroTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {securityContent.heroBody}
          </p>
        </div>

        <aside className="rounded-3xl border border-border bg-background p-6">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {securityContent.highlightsTitle}
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
            {securityContent.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="mt-10 grid gap-5">
        {securityContent.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
              {section.body}
            </p>
          </section>
        ))}
      </section>

      <section className="mt-10 rounded-3xl border border-border bg-background p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          {securityContent.note}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
          <Link href="/contact" className="font-medium text-brand underline underline-offset-4">
            {securityContent.contactLabel}
          </Link>
        </p>
      </section>
    </article>
  );
}
