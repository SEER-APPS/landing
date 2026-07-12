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

/** Shared marketing mockup sizing — homepage + services. */
export const marketingImageFrameClass =
  "mx-auto w-full min-w-0 max-w-[340px] sm:max-w-[380px] md:max-w-[420px]";

export const marketingImageClass =
  "mx-auto h-auto max-h-[520px] w-full object-contain object-top";

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
        <article className="landing-fade-up min-w-0">
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

        <aside className={`landing-fade-up landing-fade-up-delay-2 ${marketingImageFrameClass}`}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={marketingImageClass}
            loading="lazy"
          />
        </aside>
      </div>
    </section>
  );
}
