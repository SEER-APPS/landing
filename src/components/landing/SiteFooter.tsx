import Link from "next/link";
import { StoreBadgeLink } from "@/components/landing/StoreBadgeLink";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/constants/storeLinks";

const footerLinkClass =
  "text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline";

const socialRowLinkClass =
  "text-xs font-medium text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <nav
          className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
          aria-label="Footer"
        >
          <section className="max-w-sm">
            <h2 className="text-sm font-semibold text-foreground">Seer</h2>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Secure messaging and everyday services in one app.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                Connect
              </span>
              <ul className="flex flex-wrap items-center gap-x-2 gap-y-1" aria-label="Social links">
                <li>
                  <a href="#" className={socialRowLinkClass}>
                    WhatsApp
                  </a>
                </li>
                <li className="text-muted" aria-hidden>
                  ·
                </li>
                <li>
                  <a href="#" className={socialRowLinkClass}>
                    Instagram
                  </a>
                </li>
                <li className="text-muted" aria-hidden>
                  ·
                </li>
                <li>
                  <a href="#" className={socialRowLinkClass}>
                    X
                  </a>
                </li>
                <li className="text-muted" aria-hidden>
                  ·
                </li>
                <li>
                  <a href="#" className={socialRowLinkClass}>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <StoreBadgeLink
                store="apple"
                href={APP_STORE_URL}
                compact
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-full sm:max-w-[11.5rem]"
              />
              <StoreBadgeLink
                store="google"
                href={PLAY_STORE_URL}
                compact
                aria-disabled={PLAY_STORE_URL === "#"}
                className={`max-w-full sm:max-w-[11.5rem] ${PLAY_STORE_URL === "#" ? "opacity-70" : ""}`}
              />
            </div>
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
                <Link href="/services#airtime" className={footerLinkClass}>
                  Airtime top-ups
                </Link>
              </li>
              <li>
                <Link href="/services#data" className={footerLinkClass}>
                  Data bundles
                </Link>
              </li>
              <li>
                <Link href="/services#electricity" className={footerLinkClass}>
                  Electricity (ECG)
                </Link>
              </li>
              <li>
                <Link href="/services#water" className={footerLinkClass}>
                  Water (Ghana Water)
                </Link>
              </li>
              <li>
                <Link href="/services#tv" className={footerLinkClass}>
                  TV (DSTV, GOtv, Startimes)
                </Link>
              </li>
              <li>
                <Link href="/services#messaging" className={footerLinkClass}>
                  Safe trip location sharing
                </Link>
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-sm font-semibold text-foreground">Support</h2>
            <ul className="mt-3 flex flex-col gap-2">
              <li>
                <Link href="/protection" className={footerLinkClass}>
                  Protection
                </Link>
              </li>
              <li>
                <Link href="/security" className={footerLinkClass}>
                  Security
                </Link>
              </li>
              <li>
                <Link href="/contact" className={footerLinkClass}>
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/requests" className={footerLinkClass}>
                  Requests
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
