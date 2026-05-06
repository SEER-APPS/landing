"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type MenuItem = { href: string; label: string };

const menuButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-border bg-surface px-3 text-sm font-semibold text-foreground transition-colors hover:bg-brand-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const panelLinkClass =
  "inline-flex min-h-11 w-full items-center rounded-xl px-4 text-sm font-semibold text-foreground hover:bg-brand-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export function MobileMenu({ items }: { items: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const firstItemHref = useMemo(() => items[0]?.href ?? "/", [items]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, isOpen]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className={menuButtonClass}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={toggle}
      >
        Menu
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
          role="presentation"
          onClick={close}
        >
          <aside
            id="mobile-nav-panel"
            className="absolute right-4 top-16 w-[min(92vw,22rem)] rounded-2xl border border-border bg-background p-2 shadow-xl"
            role="dialog"
            aria-label="Navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={panelLinkClass} onClick={close}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-1 px-4 pb-2">
              <Link
                href={firstItemHref}
                onClick={close}
                className="text-xs text-muted underline-offset-4 hover:text-foreground hover:underline"
              >
                Back
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

