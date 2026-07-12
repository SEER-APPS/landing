"use client";

import { useEffect, useState } from "react";

const TOKEN = "84729156304821736590";
const DIGIT_MS = 90;
const COMPLETE_HOLD_MS = 1000;
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
        await wait(COMPLETE_HOLD_MS);

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

        <div className="relative w-full max-w-[220px] self-start sm:max-w-[250px]">
          <img
            src="/meter-input.png"
            alt="Prepaid electricity meter keypad"
            className="h-auto w-full select-none"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute flex items-center justify-center overflow-hidden bg-transparent"
            style={{
              left: "8.2%",
              top: "10.5%",
              width: "45.5%",
              height: "15.5%",
            }}
            aria-live="polite"
          >
            <span
              className={[
                "whitespace-nowrap px-0.5 text-center font-mono leading-none tracking-tight text-[#1a1f1a]",
                displayText === "good" || displayText === "power off"
                  ? "text-[10px] font-semibold sm:text-[11px]"
                  : "text-[6.5px] sm:text-[7px]",
              ].join(" ")}
            >
              {displayText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
