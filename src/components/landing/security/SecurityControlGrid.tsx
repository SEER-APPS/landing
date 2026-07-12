import Link from "next/link";

import type { SecurityControlCard, SecurityPageContent } from "@/content/securityPageContent";

import {
  MockEncryptionScreen,
  MockMediaTimersScreen,
  MockOfficialAppScreen,
  MockReportBlockScreen,
} from "./SeerAppMocks";

type SecurityControlGridProps = {
  content: SecurityPageContent;
};

function ControlMock({ id }: { id: SecurityControlCard["id"] }) {
  switch (id) {
    case "encryption":
      return <MockEncryptionScreen />;
    case "mediaTimers":
      return <MockMediaTimersScreen />;
    case "reportBlock":
      return <MockReportBlockScreen />;
    case "officialApp":
      return <MockOfficialAppScreen />;
    default:
      return null;
  }
}

export function SecurityControlGrid({ content }: SecurityControlGridProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          {content.controlHeadlineBefore}
          <span className="text-brand">{content.controlHeadlineHighlight}</span>
          {content.controlHeadlineAfter}
        </h2>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-muted sm:text-base">
          {content.controlBody}
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
        {content.controlCards.map((card) => (
          <article
            key={card.id}
            className="group security-control-card flex flex-col gap-5"
          >
            <ControlMock id={card.id} />
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted sm:text-[15px]">
                {card.body}
              </p>
              <Link
                href={card.learnMoreHref}
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand transition-opacity hover:opacity-80"
              >
                {card.learnMoreLabel}
                <span aria-hidden>›</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
