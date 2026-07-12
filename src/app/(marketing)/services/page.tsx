import Link from "next/link";

import {
  marketingImageClass,
  marketingImageFrameClass,
} from "@/components/landing/FeatureBand";
import { HouseLightsScene } from "@/components/landing/HouseLightsScene";
import { WaterFlowScene } from "@/components/landing/WaterFlowScene";

type ServiceBlock = {
  id: string;
  title: string;
  description: string;
  points?: string[];
  imageSrc?: string;
  imageAlt?: string;
  visual: "image" | "house" | "water";
};

const services: ServiceBlock[] = [
  {
    id: "messaging",
    title: "Secure messaging & protection",
    description:
      "Private chats, safer contact handling, and protection tooling for high-signal communication—plus quick actions when someone asks for airtime in the thread.",
    points: ["End-to-end protected conversations", "Quick actions in chat", "Trusted contacts"],
    visual: "image",
    imageSrc: "/marketing/pay-in-chat.jpg",
    imageAlt: "Seer chat with quick actions for airtime and utilities",
  },
  {
    id: "airtime",
    title: "Airtime top-ups",
    description:
      "Buy airtime across supported networks with a clear flow and receipts that stay easy to find.",
    points: ["MTN", "AirtelTigo", "Telecel"],
    visual: "image",
    imageSrc: "/marketing/networks.jpg",
    imageAlt: "Seer network picker for airtime top-ups",
  },
  {
    id: "data",
    title: "Data bundles",
    description:
      "Browse bundles, confirm pricing, and purchase with fewer steps—affordable options without the clutter.",
    points: ["Flexible sizes", "Quick top-ups", "Clear pricing"],
    visual: "image",
    imageSrc: "/marketing/bundles.jpg",
    imageAlt: "Seer data bundle list",
  },
  {
    id: "electricity",
    title: "Electricity",
    description:
      "Keep the lights on. Pay ECG prepaid credit with a clean flow: pick your meter, confirm the amount, checkout, and track completion from the same place.",
    points: ["Saved house & office meters", "Fast prepaid credit", "Clear payment status"],
    visual: "house",
  },
  {
    id: "water",
    title: "Water",
    description:
      "Settle Ghana Water bills quickly—look up your account, review charges, and pay without switching apps.",
    points: ["Account lookup", "Clear charges", "One-place checkout"],
    visual: "water",
  },
  {
    id: "tv",
    title: "TV payments",
    description:
      "Renew DSTV, GOtv, and Startimes subscriptions in one place with clear pricing and payment status.",
    points: ["DSTV", "GOtv", "Startimes"],
    visual: "image",
    imageSrc: "/marketing/services-duo.jpg",
    imageAlt: "Seer services hub for everyday purchases",
  },
];

function ServiceVisual({ service }: { service: ServiceBlock }) {
  if (service.visual === "house") {
    return <HouseLightsScene />;
  }

  if (service.visual === "water") {
    return <WaterFlowScene />;
  }

  return (
    <div className={marketingImageFrameClass}>
      <img
        src={service.imageSrc!}
        alt={service.imageAlt!}
        className={marketingImageClass}
        loading="lazy"
      />
    </div>
  );
}

function ServiceRow({
  service,
  reverse,
}: {
  service: ServiceBlock;
  reverse: boolean;
}) {
  return (
    <section id={service.id} className="scroll-mt-24 py-10 sm:py-14">
      <div
        className={[
          "mx-auto grid w-full max-w-6xl items-center gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-10",
          reverse ? "md:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        <div className="landing-fade-up min-w-0">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {service.title}
          </h2>
          <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {service.description}
          </p>
          {service.points?.length ? (
            <ul className="mt-5 space-y-2 text-sm text-muted sm:text-base">
              {service.points.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {service.id === "electricity" ? (
            <p className="mt-5 text-sm text-muted">
              Prefer meters in the app?{" "}
              <Link href="/download" className="font-medium text-brand underline-offset-4 hover:underline">
                Download Seer
              </Link>
            </p>
          ) : null}
        </div>
        <div className="landing-fade-up landing-fade-up-delay-2 min-w-0">
          <ServiceVisual service={service} />
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <article className="bg-background text-foreground">
      <header className="landing-fade-up mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Everyday essentials
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Services that keep life running
        </h1>
        <p className="mt-4 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Messaging at the core—plus airtime, data, electricity, water, and TV
          payments in one calm experience.
        </p>
      </header>

      {services.map((service, index) => (
        <ServiceRow
          key={service.id}
          service={service}
          reverse={index % 2 === 1}
        />
      ))}
    </article>
  );
}
