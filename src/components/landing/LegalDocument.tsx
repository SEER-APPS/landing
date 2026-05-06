import type { ReactNode } from "react";

type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

export function LegalDocument({
  title,
  lastUpdated,
  children,
}: LegalDocumentProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <header className="border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {lastUpdated}</p>
      </header>
      <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-muted md:text-base">
        {children}
      </div>
    </article>
  );
}
