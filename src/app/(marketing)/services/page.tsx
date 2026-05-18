import Image from "next/image";

type ServiceBlock = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const services: ServiceBlock[] = [
  {
    title: "Secure messaging & protection",
    description:
      "End‑to‑end private chats, safer contact handling, and built‑in protection tooling for high‑signal communication.",
    imageSrc: "/globe.svg",
    imageAlt: "Shielded communication illustration",
  },
  {
    title: "Airtime top‑ups",
    description:
      "Buy airtime quickly and keep receipts in one place—designed for fast checkout and clear status updates.",
    imageSrc: "/file.svg",
    imageAlt: "Airtime service illustration",
  },
  {
    title: "Data bundles",
    description:
      "Browse bundles, confirm pricing, and purchase with fewer steps—no guessing, no clutter.",
    imageSrc: "/window.svg",
    imageAlt: "Data bundles illustration",
  },
  {
    title: "Utilities & TV payments",
    description:
      "Pay essentials with a clean flow: query, confirm, checkout, and track completion from the same screen.",
    imageSrc: "/next.svg",
    imageAlt: "Utilities and TV illustration",
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
    <section className="py-10 sm:py-14">
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
          key={service.title}
          service={service}
          reverse={idx % 2 === 1}
        />
      ))}
    </article>
  );
}

