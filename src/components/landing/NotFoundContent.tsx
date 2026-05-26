import Link from "next/link";

const primaryLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--cta-bg)] px-6 text-sm font-semibold text-[var(--cta-fg)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const secondaryLinkClass =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-colors hover:bg-brand-soft/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const quickLinkClass =
  "text-sm font-medium text-brand underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function NotFoundContent() {
  return (
    <article className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-14 sm:px-6 sm:py-20 md:py-24">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-14">
        <div className="min-w-0 space-y-5 sm:space-y-6">
          <p className="inline-flex w-fit max-w-full items-center rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-foreground">
            Error 404
          </p>
          <h1 className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
            We looked everywhere, but this page wandered off.
          </h1>
          <p className="max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
            The link may be outdated, or the address might have a typo. Let&apos;s get you back to
            Seer—secure messaging and everyday services, right where you expect them.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <Link href="/" className={primaryLinkClass}>
              Back to home
            </Link>
            <Link href="/download" className={secondaryLinkClass}>
              Download the app
            </Link>
          </div>

          <nav aria-label="Helpful links" className="pt-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Popular pages
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <Link href="/services" className={quickLinkClass}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className={quickLinkClass}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/requests" className={quickLinkClass}>
                  Help & requests
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={quickLinkClass}>
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <aside
          className="min-w-0 rounded-2xl border border-border bg-surface p-6 sm:rounded-3xl sm:p-8"
          aria-hidden
        >
          <div className="rounded-2xl bg-gradient-to-br from-brand-soft to-background p-6 sm:p-8">
            <p
              className="select-none text-[clamp(5rem,18vw,9rem)] font-semibold leading-none tracking-tighter text-brand/25"
            >
              404
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Nothing broken on our side—just a missing route. Try home or download if you were
              looking for the Seer app.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}
