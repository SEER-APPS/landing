import Image from "next/image";

type ServiceBlock = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const services: ServiceBlock[] = [
  {
    id: "messaging",
    title: "Secure messaging & protection",
    description:
      "End‑to‑end private chats, safer contact handling, and built‑in protection tooling for high‑signal communication.",
    imageSrc: "/globe.svg",
    imageAlt: "Shielded communication illustration",
  },
  {
    id: "airtime",
    title: "Airtime top‑ups",
    description:
      "Buy airtime quickly and keep receipts in one place—designed for fast checkout and clear status updates.",
    imageSrc: "/file.svg",
    imageAlt: "Airtime service illustration",
  },
  {
    id: "data",
    title: "Data bundles",
    description:
      "Browse bundles, confirm pricing, and purchase with fewer steps—no guessing, no clutter.",
    imageSrc: "/window.svg",
    imageAlt: "Data bundles illustration",
  },
  {
    id: "electricity",
    title: "Electricity",
    description:
      "Pay ECG bills with a clean flow: query your meter, confirm the amount, checkout, and track completion from the same screen.",
    imageSrc: "/next.svg",
    imageAlt: "Electricity payments illustration",
  },
  {
    id: "water",
    title: "Water",
    description:
      "Settle Ghana Water bills quickly—look up your account, review charges, and pay without switching apps.",
    imageSrc: "/vercel.svg",
    imageAlt: "Water bill payments illustration",
  },
  {
    id: "tv",
    title: "TV payments",
    description:
      "Renew DSTV, GOtv, and Startimes subscriptions in one place with clear pricing and payment status.",
    imageSrc: "/next.svg",
    imageAlt: "TV subscription payments illustration",
  },
];

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
          "mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2",
          reverse ? "md:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        <div className="min-w-0">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {service.title}
          </h2>
          <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {service.description}
          </p>
        </div>
        <div className="min-w-0 rounded-2xl border border-border bg-surface p-6 sm:rounded-3xl">
          <div className="bg-brand-soft/40 flex items-center justify-center rounded-2xl p-6">
            <Image
              src={service.imageSrc}
              alt={service.imageAlt}
              width={520}
              height={360}
              className="h-48 w-auto sm:h-56"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <article className="bg-background text-foreground">
      <header className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Services
        </h1>
        <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          A secure core, plus everyday services that are simple to use and easy to
          track.
        </p>
      </header>

      {services.map((service, idx) => (
        <ServiceRow
          key={service.id}
          service={service}
          reverse={idx % 2 === 1}
        />
      ))}
    </article>
  );
}
