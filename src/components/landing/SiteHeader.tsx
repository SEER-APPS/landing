import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/landing/MobileMenu";

const navLinkClass =
  "inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-brand-soft/40 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function SiteHeader() {
  const items = [
    { href: "/#download", label: "Download" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ];

  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-4">
          <Link
            href="/"
            aria-label="Seer home"
            className="inline-flex min-h-11 w-fit max-w-full items-center gap-2.5 rounded-lg pr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Image
              src="/logo.png"
              alt=""
              width={93}
              height={90}
              className="h-9 w-auto sm:h-10"
              priority
            />
            <span className="font-semibold tracking-tight text-foreground" aria-hidden>
              Seer
            </span>
          </Link>
          <div className="flex items-center justify-between gap-3">
            <MobileMenu items={items} />
            <nav aria-label="Primary" className="hidden sm:block">
              <ul className="flex flex-wrap items-center justify-end gap-1">
              <li>
                <Link href="/#download" className={navLinkClass}>
                  Download
                </Link>
              </li>
              <li>
                <Link href="/contact" className={navLinkClass}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={navLinkClass}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={navLinkClass}>
                  Terms
                </Link>
              </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
