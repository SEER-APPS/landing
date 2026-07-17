"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type MenuItem = { href: string; label: string };

const menuButtonClass =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:bg-brand-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const panelLinkClass =
  "inline-flex min-h-11 w-full items-center rounded-xl px-4 text-sm font-semibold text-foreground hover:bg-brand-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const subscribeToClient = () => () => undefined;

export function MobileMenu({ items }: { items: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const overlay =
    mounted && isOpen ? (
      <>
        <div
          className="fixed inset-0 z-[100] touch-manipulation bg-background/70 backdrop-blur-sm"
          role="presentation"
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        />
        <aside
          id="mobile-nav-panel"
          className="fixed right-4 top-[4.5rem] z-[101] w-[min(92vw,22rem)] rounded-2xl border border-border bg-background p-2 shadow-xl"
          role="dialog"
          aria-label="Navigation"
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
        </aside>
      </>
    ) : null;

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
        <span className="flex w-5 flex-col gap-1.5" aria-hidden>
          <span className="h-0.5 w-full rounded-full bg-foreground" />
          <span className="h-0.5 w-full rounded-full bg-foreground" />
          <span className="h-0.5 w-full rounded-full bg-foreground" />
        </span>
      </button>
      {overlay ? createPortal(overlay, document.body) : null}
    </div>
  );
}
