import Link from "next/link";

type FeatureBandProps = {
  eyebrow?: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  points?: string[];
  cta?: { href: string; label: string };
};

export function FeatureBand({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  reverse = false,
  points,
  cta,
}: FeatureBandProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
      <div
        className={[
          "grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16",
          reverse ? "md:[&>aside]:order-first" : "",
        ].join(" ")}
      >
        <article className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className={[
              "text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl",
              eyebrow ? "mt-3" : "",
            ].join(" ")}
          >
            {title}
          </h2>
          <p className="mt-4 max-w-prose text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {body}
          </p>
          {points?.length ? (
            <ul className="mt-5 space-y-2.5 text-sm text-muted sm:text-base">
              {points.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {cta ? (
            <Link
              href={cta.href}
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand transition-opacity hover:opacity-80"
            >
              {cta.label}
              <span aria-hidden>›</span>
            </Link>
          ) : null}
        </article>

        <aside className="min-w-0">
          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-sm sm:rounded-[2rem]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
