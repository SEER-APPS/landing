import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "@/components/landing/MobileMenu";

const navLinkClass =
  "inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-lg px-3 text-sm font-medium text-muted transition-colors hover:bg-brand-soft/40 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function SiteHeader() {
  const items = [
    { href: "/download", label: "Download" },
    { href: "/services", label: "Services" },
    { href: "/security", label: "Security" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="relative z-[120] border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-3 sm:py-4">
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
          <MobileMenu items={items} />
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex flex-wrap items-center justify-end gap-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={navLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
