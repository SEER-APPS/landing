import Image from "next/image";
import Link from "next/link";

const navLinkClass =
  "inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-brand-soft/40 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function SiteHeader() {
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
          <nav aria-label="Primary">
            <ul className="-mx-4 flex gap-1 overflow-x-auto overscroll-x-contain px-4 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-end sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
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
    </header>
  );
}
