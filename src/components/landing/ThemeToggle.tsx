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
      width="20"
      height="20"
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
      width="20"
      height="20"
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
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>(() => readPreferredTheme());
  const nextMode = useMemo<ThemeMode>(() => (mode === "dark" ? "light" : "dark"), [mode]);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextMode} theme`}
      className={[
        "inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface px-3 text-foreground transition-colors hover:bg-brand-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      ].join(" ")}
      onClick={() => {
        const next: ThemeMode = mode === "dark" ? "light" : "dark";
        window.localStorage.setItem(STORAGE_KEY, next);
        setMode(next);
      }}
    >
      {mode === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
