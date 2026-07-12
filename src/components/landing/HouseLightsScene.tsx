"use client";

import { useEffect, useState } from "react";

const TOKEN = "84729156304821736590";
const DIGIT_MS = 90;
const GOOD_HOLD_MS = 700;
const LIGHTS_ON_MS = 3400;
const POWER_OFF_TO_LIGHTS_OFF_MS = 200;
const RESTART_PAUSE_MS = 600;

type MeterPhase = "typing" | "good" | "powered" | "powerOff";

function formatToken(digits: string) {
  const chunks: string[] = [];
  for (let index = 0; index < digits.length; index += 5) {
    chunks.push(digits.slice(index, index + 5));
  }
  return chunks.join(" ");
}

export function HouseLightsScene() {
  const [lightsOn, setLightsOn] = useState(false);
  const [phase, setPhase] = useState<MeterPhase>("typing");
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(
          setTimeout(() => {
            resolve();
          }, ms),
        );
      });

    const runCycle = async () => {
      while (!cancelled) {
        setLightsOn(false);
        setPhase("typing");
        setTypedCount(0);

        for (let digitIndex = 1; digitIndex <= TOKEN.length; digitIndex++) {
          if (cancelled) {
            return;
          }
          setTypedCount(digitIndex);
          await wait(DIGIT_MS);
        }

        if (cancelled) {
          return;
        }
        setPhase("good");
        await wait(GOOD_HOLD_MS);

        if (cancelled) {
          return;
        }
        setPhase("powered");
        setLightsOn(true);
        await wait(LIGHTS_ON_MS);

        if (cancelled) {
          return;
        }
        setPhase("powerOff");
        await wait(POWER_OFF_TO_LIGHTS_OFF_MS);

        if (cancelled) {
          return;
        }
        setLightsOn(false);
        await wait(RESTART_PAUSE_MS);
      }
    };

    void runCycle();

    return () => {
      cancelled = true;
      for (const timer of timers) {
        clearTimeout(timer);
      }
    };
  }, []);

  const displayText =
    phase === "powerOff"
      ? "power off"
      : phase === "good" || phase === "powered"
        ? "good"
        : formatToken(TOKEN.slice(0, typedCount));

  return (
    <div
      className="house-night-scene relative overflow-hidden rounded-[1.75rem] border border-white/10 sm:rounded-[2rem]"
      aria-label="Prepaid meter token entry powering a mansion at night"
    >
      <div className="house-night-sky absolute inset-0" aria-hidden />
      <div className="house-stars absolute inset-0" aria-hidden />

      <div className="relative z-10 flex flex-col items-center gap-5 px-4 pb-6 pt-8 sm:gap-6 sm:px-6 sm:pb-8 sm:pt-10">
        <div
          className={[
            "house-mansion relative w-full max-w-xl transition-[filter,opacity] duration-500 ease-in-out sm:max-w-2xl",
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
              "house-window-glow pointer-events-none absolute inset-0 transition-opacity duration-500",
              lightsOn ? "opacity-100" : "opacity-0",
            ].join(" ")}
            aria-hidden
          />
        </div>

        <div className="relative w-full max-w-[220px] sm:max-w-[250px]">
          <img
            src="/meter-input.png"
            alt="Prepaid electricity meter keypad"
            className="h-auto w-full select-none"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute flex items-center justify-center overflow-hidden rounded-[0.35rem] bg-[#dfe6df]"
            style={{
              left: "7.8%",
              top: "8.2%",
              width: "46.5%",
              height: "17.8%",
            }}
            aria-live="polite"
          >
            <span
              className={[
                "px-1 text-center font-mono leading-none tracking-tight text-[#1a1f1a]",
                displayText === "good" || displayText === "power off"
                  ? "text-[11px] font-semibold sm:text-xs"
                  : "text-[8px] sm:text-[9px]",
              ].join(" ")}
            >
              {displayText}
            </span>
          </div>
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
              lightsOn
                ? "bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.9)]"
                : "bg-white/40",
            ].join(" ")}
          />
          {lightsOn ? "Power on" : "Power off"}
        </span>
      </div>
    </div>
  );
}
