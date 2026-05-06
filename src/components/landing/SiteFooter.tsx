import Link from "next/link";

const footerLinkClass =
  "text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <nav
          className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
          aria-label="Footer"
        >
          <section>
            <h2 className="text-sm font-semibold text-foreground">Seer</h2>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Secure messaging and everyday services in one app.
            </p>
          </section>
          <section>
            <h2 className="text-sm font-semibold text-foreground">Legal</h2>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link href="/privacy" className={footerLinkClass}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={footerLinkClass}>
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link href="/cookies" className={footerLinkClass}>
                  Cookie policy
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-sm font-semibold text-foreground">Services</h2>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <span className="text-sm text-muted">Airtime top-ups</span>
              </li>
              <li>
                <span className="text-sm text-muted">Data bundles</span>
              </li>
              <li>
                <span className="text-sm text-muted">Utilities (ECG, Ghana Water)</span>
              </li>
              <li>
                <span className="text-sm text-muted">TV (DSTV, GOtv, Startimes)</span>
              </li>
              <li>
                <span className="text-sm text-muted">Safe trip location sharing</span>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-sm font-semibold text-foreground">Support</h2>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link href="/contact" className={footerLinkClass}>
                  Contact us
                </Link>
              </li>
            </ul>
          </section>
        </nav>
        <p className="mt-8 border-t border-border pt-6 text-sm text-muted">
          © {year} Seer.
        </p>
      </div>
    </footer>
  );
}
