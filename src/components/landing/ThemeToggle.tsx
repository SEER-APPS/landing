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

export function ThemeToggle(): React.ReactElement {
  const [mode, setMode] = useState<ThemeMode>(() => readPreferredTheme());
  const nextMode = useMemo<ThemeMode>(() => (mode === "dark" ? "light" : "dark"), [mode]);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextMode} theme`}
      className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface px-3 text-sm font-medium text-foreground transition-colors hover:bg-brand-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      onClick={() => {
        const next: ThemeMode = mode === "dark" ? "light" : "dark";
        window.localStorage.setItem(STORAGE_KEY, next);
        setMode(next);
      }}
    >
      Theme
    </button>
  );
}

