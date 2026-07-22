import type { Metadata } from "next";
import Link from "next/link";

import { FeatureBand } from "@/components/landing/FeatureBand";
import { StoreBadgeLink } from "@/components/landing/StoreBadgeLink";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/constants/storeLinks";
import { SITE_NAME, pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: SITE_NAME,
  description:
    "Private chats, airtime, data bundles, prepaid services, and smarter everyday communication — in one app.",
  path: "/",
});

export default function Home() {
  return (
    <>
      {/* Hero — splash / brand (Screenshot 10) */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-border/60 sm:h-96 sm:w-96"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 top-8 h-48 w-48 rounded-full border border-border/40 sm:h-64 sm:w-64"
        />
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-2 md:py-16">
          <article className="landing-fade-up min-w-0 space-y-5 sm:space-y-6">
            <p className="inline-flex w-fit max-w-full items-center rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-foreground">
              Built for fast, secure communication
            </p>
            <h1 className="text-balance text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
              Fast. Secure.{" "}
              <span className="text-brand">Convenient.</span>
            </h1>
            <p className="max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
              A modern platform for private chats, airtime, data bundles,
              prepaid services, and smarter everyday communication—in one app.
            </p>
            <div
              id="download"
              className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row"
            >
              <StoreBadgeLink
                store="apple"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
              <StoreBadgeLink
                store="google"
                href={PLAY_STORE_URL}
                aria-disabled={PLAY_STORE_URL === "#"}
                className={PLAY_STORE_URL === "#" ? "opacity-70" : ""}
              />
            </div>
          </article>

          <aside className="landing-fade-up landing-fade-up-delay-2 relative mx-auto w-full max-w-[390px] sm:max-w-[442px] md:max-w-[494px]">
            <img
              src="/marketing/splash-hero.jpg"
              alt="Seer app splash screen on a phone"
              className="mx-auto h-auto max-h-[598px] w-full object-contain object-top"
              loading="eager"
            />
          </aside>
        </div>
      </section>

      {/* Protection — Screenshot 2 */}
      <FeatureBand
        eyebrow="Safety"
        title="Protected 24/7"
        body="Advanced monitoring and trusted contacts keep you ready when it matters—so you can focus on the people in your life."
        imageSrc="/marketing/protection-active.jpg"
        imageAlt="Seer home screen showing Protection Active and monitoring status"
        imageSize="home"
        points={[
          "Protection status you can see at a glance",
          "Trusted contacts for emergencies",
          "Built to stay out of the way until you need it",
        ]}
        cta={{ href: "/security", label: "Explore Seer security" }}
      />

      {/* Home dark companion — Screenshot 1 */}
      <FeatureBand
        eyebrow="Home"
        title="Your smart companion"
        body="Send money, buy airtime, pay bills, and stay protected—without jumping between apps."
        imageSrc="/marketing/home-protection-dark.jpg"
        imageAlt="Seer home dashboard with protection and trusted contacts"
        imageSize="home"
        reverse
      />

      {/* Pay in chat — Screenshot 4 */}
      <FeatureBand
        eyebrow="Messaging"
        title="Pay directly in chat"
        body="Access airtime, data, utilities, and quick actions inside the conversation—right where the request came from."
        imageSrc="/marketing/pay-in-chat.jpg"
        imageAlt="Seer chat with quick actions for airtime, data, and utilities"
        imageSize="home"
        points={[
          "Buy airtime and data without leaving the thread",
          "Pay utilities from quick actions",
          "Request a trusted contact when you need backup",
        ]}
      />

      {/* Services — Screenshot 9 */}
      <FeatureBand
        eyebrow="Services"
        title="Fast access to everyday services"
        body="Complete essential purchases quickly with an experience built for convenience across Ghana."
        imageSrc="/marketing/services-duo.jpg"
        imageAlt="Seer services list and network selection screens"
        imageSize="home"
        reverse
        points={[
          "Prepaid credit and utility bills",
          "Airtime and data across networks",
          "School fees, tickets, and more",
        ]}
        cta={{ href: "/services", label: "See all services" }}
      />

      {/* Networks — Screenshot 6 */}
      <FeatureBand
        eyebrow="Airtime & data"
        title="All your networks supported"
        body="Purchase airtime and data across supported mobile carriers with a clear, familiar flow."
        imageSrc="/marketing/networks.jpg"
        imageAlt="Seer network picker showing MTN, AirtelTigo, and Telecel"
        imageSize="home"
        points={["MTN", "AirtelTigo", "Telecel"]}
      />

      {/* Bundles — Screenshot 7 */}
      <FeatureBand
        eyebrow="Data"
        title="Flexible bundles for everyone"
        body="Affordable options, quick top-ups, and multiple bundle choices—picked for how people actually use data."
        imageSrc="/marketing/bundles.jpg"
        imageAlt="Seer MTN data bundle list"
        imageSize="home"
        reverse
      />

      {/* Prepaid — Screenshot 8 */}
      <FeatureBand
        eyebrow="Utilities"
        title="Quick digital purchases"
        body="Buy prepaid credit with saved meters and a smooth, secure checkout—built for home and work."
        imageSrc="/marketing/prepaid-meters.jpg"
        imageAlt="Seer prepaid credit screen with house and office meters"
        imageSize="home"
        cta={{ href: "/services#electricity", label: "Learn about prepaid" }}
      />

      {/* Safe trip — existing asset */}
      <FeatureBand
        eyebrow="On the go"
        title="Protect yourself and loved ones when you’re out"
        body="Share a Safe trip location bubble with a trusted contact for up to 24 hours. If anything feels off, they can open your shared location instantly."
        imageSrc="/location-device.png"
        imageAlt="Seer shared location bubble preview on a phone"
        imageSize="home"
        reverse
        points={[
          "Trusted contacts can follow your shared location",
          "Clear alerts that are easy to understand",
          "Share only when you choose",
        ]}
      />

      {/* Everything list — Screenshot 3 as services closer */}
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl">
          <img
            src="/marketing/services-everything.jpg"
            alt="Everything in one place — Seer services including bills, prepaid, and data"
            className="mx-auto h-auto max-h-[702px] w-full object-contain object-top"
            loading="lazy"
          />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="rounded-[2rem] border border-border bg-brand-soft/50 px-6 py-10 text-center sm:px-10 sm:py-14">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready when you are
          </h2>
          <p className="mx-auto mt-3 max-w-prose text-pretty text-sm leading-relaxed text-muted sm:text-base">
            Download Seer for iOS and Android. Private messaging, everyday
            services, and protection—together.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StoreBadgeLink
              store="apple"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            />
            <StoreBadgeLink
              store="google"
              href={PLAY_STORE_URL}
              aria-disabled={PLAY_STORE_URL === "#"}
              className={PLAY_STORE_URL === "#" ? "opacity-70" : ""}
            />
          </div>
          <p className="mt-6 text-sm text-muted">
            Curious about privacy?{" "}
            <Link href="/security" className="font-medium text-brand underline-offset-4 hover:underline">
              Read how Seer stays secure
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
