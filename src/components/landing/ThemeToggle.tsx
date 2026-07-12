"use client";

import { useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "seer.theme";

function readPreferredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function applyTheme(mode: ThemeMode): void {
  document.documentElement.setAttribute("data-theme", mode);
}

function SunIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

type ThemeToggleProps = {
  className?: string;
  /** Circular fixed control for the bottom-right corner. */
  variant?: "button" | "orb";
};

export function ThemeToggle({ className = "", variant = "button" }: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>(() => readPreferredTheme());
  const nextMode = useMemo<ThemeMode>(() => (mode === "dark" ? "light" : "dark"), [mode]);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const toggle = () => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, next);
    setMode(next);
  };

  if (variant === "orb") {
    return (
      <button
        type="button"
        aria-label={`Switch to ${nextMode} theme`}
        className={[
          "fixed bottom-5 right-5 z-[130] inline-flex h-14 w-14 items-center justify-center rounded-full",
          "border border-border/80 bg-surface/90 text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
          "backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          "sm:bottom-6 sm:right-6",
          className,
        ].join(" ")}
        onClick={toggle}
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-brand/15 blur-md"
          aria-hidden
        />
        <span className="relative">{mode === "dark" ? <SunIcon /> : <MoonIcon />}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextMode} theme`}
      className={[
        "inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface px-3 text-foreground transition-colors hover:bg-brand-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      ].join(" ")}
      onClick={toggle}
    >
      {mode === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
