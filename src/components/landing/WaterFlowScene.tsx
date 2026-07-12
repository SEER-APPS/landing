"use client";

import { useEffect, useState } from "react";

const WATER_ON_MS = 3200;
const WATER_OFF_MS = 2400;

export function WaterFlowScene() {
  const [waterOn, setWaterOn] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = (currentlyOn: boolean) => {
      const delay = currentlyOn ? WATER_ON_MS : WATER_OFF_MS;
      timeoutId = setTimeout(() => {
        if (cancelled) {
          return;
        }
        const next = !currentlyOn;
        setWaterOn(next);
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
      className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[1.75rem] border border-border sm:max-w-[380px] sm:rounded-[2rem] md:max-w-[420px]"
      aria-label={waterOn ? "Faucet with water running" : "Faucet with water off"}
    >
      <div className="relative aspect-square bg-[#152238]">
        <img
          src="/water-faucet-off.jpg"
          alt="Kitchen faucet over a sink"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <img
          src="/water-faucet-on.jpg"
          alt=""
          aria-hidden
          className={[
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out",
            waterOn ? "opacity-100" : "opacity-0",
          ].join(" ")}
          draggable={false}
        />

        <div className="absolute bottom-4 right-4 z-10">
          <span
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-sm transition-colors duration-500",
              waterOn
                ? "border-sky-300/35 bg-sky-400/20 text-sky-50"
                : "border-white/15 bg-black/40 text-white/70",
            ].join(" ")}
          >
            <span
              className={[
                "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                waterOn
                  ? "bg-sky-300 shadow-[0_0_8px_rgba(125,211,252,0.9)]"
                  : "bg-white/40",
              ].join(" ")}
            />
            {waterOn ? "Water on" : "Water off"}
          </span>
        </div>
      </div>
    </div>
  );
}
