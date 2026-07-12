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
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 md:py-14">
      <div
        className={[
          "grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10 lg:gap-12",
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
              "text-balance text-2xl font-semibold tracking-tight sm:text-3xl",
              eyebrow ? "mt-3" : "",
            ].join(" ")}
          >
            {title}
          </h2>
          <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-muted sm:text-base">
            {body}
          </p>
          {points?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-muted sm:text-[15px]">
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
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand transition-opacity hover:opacity-80"
            >
              {cta.label}
              <span aria-hidden>›</span>
            </Link>
          ) : null}
        </article>

        <aside className="mx-auto w-full min-w-0 max-w-[280px] sm:max-w-[320px] md:max-w-[340px]">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm sm:rounded-[1.35rem]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="mx-auto h-auto max-h-[420px] w-full object-contain object-top"
              loading="lazy"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
