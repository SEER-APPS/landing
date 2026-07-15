"use client";

import { useEffect, useState } from "react";

const TOKEN = "84729156304821736590";
const PURCHASE_AMOUNT = "GHS 100";
const DIGIT_MS = 90;
const COMPLETE_HOLD_MS = 1000;
const GOOD_HOLD_MS = 1600;
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

  const displayLines =
    phase === "powerOff"
      ? ["power off"]
      : phase === "good" || phase === "powered"
        ? ["good", PURCHASE_AMOUNT]
        : [formatToken(TOKEN.slice(0, typedCount))];

  const isStatusMessage = displayLines.length > 1 || phase === "powerOff";

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
            "house-mansion relative aspect-[5/4] w-full max-w-xl overflow-hidden transition-[filter,opacity] duration-500 ease-in-out sm:max-w-2xl",
            lightsOn ? "house-mansion--on" : "house-mansion--off",
          ].join(" ")}
        >
          <img
            src="/marketing/house-23.png"
            alt="Modern house at dusk with architectural lighting"
            className="absolute inset-0 h-full w-full scale-[1.38] object-cover object-[52%_32%] select-none"
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

        <div className="relative z-20 w-full max-w-[210px] self-start sm:max-w-[240px]">
          <img
            src="/marketing/dail-pad.png"
            alt="Prepaid electricity dial pad"
            className="relative z-0 h-auto w-full select-none"
            draggable={false}
          />
          <div
            className="pointer-events-none absolute z-10 flex flex-col items-center justify-center"
            style={{
              left: "9.5%",
              top: "10.5%",
              width: "39%",
              height: "20%",
            }}
            aria-live="polite"
          >
            {displayLines.map((line) => (
              <span
                key={`${phase}-${line}`}
                className={[
                  "meter-lcd-text block whitespace-nowrap px-0.5 text-center leading-tight tracking-wide text-[#121812]",
                  isStatusMessage
                    ? "text-[12px] sm:text-[14px]"
                    : "text-[7.5px] sm:text-[8.5px]",
                ].join(" ")}
              >
                {line.length > 0 ? line : "\u00a0"}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
