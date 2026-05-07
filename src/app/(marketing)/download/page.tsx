import type { Metadata } from "next";
import Image from "next/image";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/constants/storeLinks";

export const metadata: Metadata = {
  title: "Download | Seer",
  description: "Download Seer for iOS and Android.",
};

export default function DownloadPage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
      <header className="border-b border-border pb-8 text-center md:text-start">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
          Available everywhere
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Download Seer
        </h1>
        <p className="mx-auto mt-3 max-w-prose text-pretty text-sm text-muted md:mx-0 md:text-base">
          Get the mobile app for secure messaging and everyday services—built for iOS and Android.
        </p>
      </header>

      <section
        className="mt-10 rounded-3xl border border-border bg-surface p-6 sm:p-8 md:p-10"
        aria-labelledby="mobile-download-heading"
      >
        <h2 id="mobile-download-heading" className="sr-only">
          Mobile app
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
              <Image
                src="/Apple-black.png"
                alt=""
                width={128}
                height={128}
                className="h-full w-full object-contain dark:hidden"
              />
              <Image
                src="/apple.png"
                alt=""
                width={128}
                height={128}
                className="hidden h-full w-full object-contain dark:block"
              />
            </div>
            <a
              href={APP_STORE_URL}
              className="mt-6 inline-flex min-h-11 max-w-full items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-brand-soft/30"
            >
              Download on the App Store
            </a>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
              <Image
                src="/Playstore.png"
                alt=""
                width={128}
                height={128}
                className="h-full w-full object-contain"
              />
            </div>
            <a
              href={PLAY_STORE_URL}
              className="mt-6 inline-flex min-h-11 max-w-full items-center justify-center rounded-full border border-border bg-background px-5 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-brand-soft/30"
            >
              Get it on Google Play
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8 md:mt-12 md:pt-10">
          <figure className="mx-auto max-w-md">
            <Image
              src="/location-device.png"
              alt="Seer app preview on a phone"
              width={800}
              height={1200}
              className="h-auto w-full rounded-2xl border border-border/60 shadow-sm"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          </figure>
        </div>
      </section>
    </article>
  );
}
