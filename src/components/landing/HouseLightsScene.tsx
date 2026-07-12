"use client";

import { useEffect, useState } from "react";

const LIGHTS_ON_MS = 3200;
const LIGHTS_OFF_MS = 2400;

export function HouseLightsScene() {
  const [lightsOn, setLightsOn] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = (currentlyOn: boolean) => {
      const delay = currentlyOn ? LIGHTS_ON_MS : LIGHTS_OFF_MS;
      timeoutId = setTimeout(() => {
        if (cancelled) {
          return;
        }
        const next = !currentlyOn;
        setLightsOn(next);
        tick(next);
      }, delay);
    };

    tick(true);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="house-night-scene relative overflow-hidden rounded-[1.75rem] border border-white/10 sm:rounded-[2rem]"
      aria-label={
        lightsOn
          ? "Mansion at night with lights on"
          : "Mansion at night with lights off"
      }
    >
      <div className="house-night-sky absolute inset-0" aria-hidden />
      <div className="house-stars absolute inset-0" aria-hidden />

      <div className="relative z-10 flex min-h-[280px] items-end justify-center px-4 pb-6 pt-10 sm:min-h-[340px] sm:px-8 sm:pb-8 sm:pt-12">
        <div
          className={[
            "house-mansion relative w-full max-w-lg transition-[filter,opacity,transform] duration-700 ease-in-out",
            lightsOn ? "house-mansion--on" : "house-mansion--off",
          ].join(" ")}
        >
          <img
            src="/house.png"
            alt="Grand mansion at night"
            className="h-auto w-full select-none"
            draggable={false}
          />
          <div
            className={[
              "house-window-glow pointer-events-none absolute inset-0 transition-opacity duration-700",
              lightsOn ? "opacity-100" : "opacity-0",
            ].join(" ")}
            aria-hidden
          />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20 sm:bottom-5 sm:left-5">
        <span
          className={[
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm transition-colors duration-500",
            lightsOn
              ? "border-amber-300/30 bg-amber-400/15 text-amber-100"
              : "border-white/15 bg-black/40 text-white/70",
          ].join(" ")}
        >
          <span
            className={[
              "h-1.5 w-1.5 rounded-full transition-colors duration-500",
              lightsOn ? "bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.9)]" : "bg-white/40",
            ].join(" ")}
          />
          {lightsOn ? "Power on" : "Power off"}
        </span>
      </div>
    </div>
  );
}
