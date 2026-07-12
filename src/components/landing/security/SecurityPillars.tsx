import type { SecurityPageContent, SecurityPillar } from "@/content/securityPageContent";

type SecurityPillarsProps = {
  content: SecurityPageContent;
};

function PillarIcon({ icon }: { icon: SecurityPillar["icon"] }) {
  const common = "h-7 w-7 text-foreground";

  if (icon === "timer") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={common} fill="none">
        <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 9v4l2.5 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9 3h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={common} fill="none">
        <path
          d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12.5 11.2 14l3.3-3.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden viewBox="0 0 24 24" className={common} fill="none">
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="16" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function SecurityPillars({ content }: SecurityPillarsProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 md:py-20">
      <h2 className="mx-auto max-w-3xl text-balance text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
        {content.pillarsHeadlineBefore}
        <span className="text-brand">{content.pillarsHeadlineHighlight}</span>
        {content.pillarsHeadlineAfter}
      </h2>

      <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {content.pillars.map((pillar) => (
          <article key={pillar.title} className="mx-auto max-w-xs text-center sm:max-w-none">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
              <PillarIcon icon={pillar.icon} />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">
              {pillar.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
