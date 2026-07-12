import Link from "next/link";

import type { SecurityPageContent } from "@/content/securityPageContent";

type SecurityHelpLinksProps = {
  content: SecurityPageContent;
};

export function SecurityHelpLinks({ content }: SecurityHelpLinksProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:pb-20">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl">
          {content.helpTitle}
        </h2>
        <Link
          href={content.helpSeeAllHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand transition-opacity hover:opacity-80"
        >
          {content.helpSeeAllLabel}
          <span aria-hidden>›</span>
        </Link>
      </div>

      <ul className="mt-8 space-y-3">
        {content.helpLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="security-help-row flex items-center justify-between gap-4 rounded-2xl border border-border bg-transparent px-4 py-4 text-left transition-colors sm:px-5 sm:py-5"
            >
              <span className="text-sm font-medium text-foreground sm:text-base">
                {link.label}
              </span>
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path
                    d="M7 17 17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
