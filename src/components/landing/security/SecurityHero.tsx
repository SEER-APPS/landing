import type { SecurityHeroBubble, SecurityPageContent } from "@/content/securityPageContent";

import { SeerChatBubble } from "./SeerChatBubble";
import { SeerDocumentChip } from "./SeerDocumentChip";
import { SeerReactionPill } from "./SeerReactionPill";

type SecurityHeroProps = {
  content: SecurityPageContent;
};

function HeroBubbleLayer({ bubble, className }: { bubble: SecurityHeroBubble; className: string }) {
  if (bubble.variant === "document") {
    return (
      <div className={className}>
        <SeerDocumentChip
          title={bubble.documentTitle ?? "Document"}
          meta={bubble.documentMeta ?? ""}
          time={bubble.time}
          read={bubble.read}
        />
      </div>
    );
  }

  if (bubble.variant === "sticker") {
    return (
      <div className={className}>
        <div className="flex flex-col items-end gap-1">
          <span className="text-5xl drop-shadow-md sm:text-6xl" aria-hidden>
            {bubble.text}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-white/90 drop-shadow">
            {bubble.time}
            <svg aria-hidden viewBox="0 0 16 11" className="h-2.5 w-3.5">
              <path
                d="M11.07 1.14 5.4 7.56 2.93 4.9 1.8 6.1l3.6 3.9 6.9-7.7z"
                fill="#8FD4FF"
              />
              <path
                d="M14.2 1.14 8.53 7.56 7.6 6.56l-1.13 1.2 2.06 2.24 6.9-7.7z"
                fill="#8FD4FF"
              />
            </svg>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <SeerChatBubble
        variant={bubble.variant}
        text={bubble.text ?? ""}
        time={bubble.time}
        read={bubble.read}
      />
      {bubble.reactions?.length ? (
        <SeerReactionPill reactions={bubble.reactions} className="-mt-1 ml-2" />
      ) : null}
    </div>
  );
}

export function SecurityHero({ content }: SecurityHeroProps) {
  const [outgoing, documentBubble, incoming, sticker] = content.heroBubbles;

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-14 md:py-20">
      <article className="min-w-0">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.05]">
          <span className="text-brand">{content.heroHighlight}</span>{" "}
          <span className="text-foreground">{content.heroRest}</span>
        </h1>
        <p className="mt-5 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {content.heroBody}
        </p>
      </article>

      <aside className="relative mx-auto w-full max-w-md px-3 sm:px-4 md:max-w-none md:px-6">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
          <img
            src="/security-hero.jpg"
            alt="Someone using Seer Messenger on their phone"
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        {outgoing ? (
          <HeroBubbleLayer
            bubble={outgoing}
            className="security-bubble-enter absolute right-1 top-[4%] z-10 w-[min(78%,240px)] sm:right-0 sm:top-[3%] md:-right-2"
          />
        ) : null}
        {documentBubble ? (
          <HeroBubbleLayer
            bubble={documentBubble}
            className="security-bubble-enter absolute right-2 top-[18%] z-10 hidden w-[min(78%,240px)] [animation-delay:120ms] sm:right-1 sm:top-[16%] sm:block md:-right-1"
          />
        ) : null}
        {incoming ? (
          <HeroBubbleLayer
            bubble={incoming}
            className="security-bubble-enter absolute left-1 bottom-[8%] z-10 w-[min(78%,240px)] [animation-delay:220ms] sm:left-0 sm:bottom-[7%] md:-left-2"
          />
        ) : null}
        {sticker ? (
          <HeroBubbleLayer
            bubble={sticker}
            className="security-bubble-enter absolute bottom-[1%] right-[8%] z-10 hidden [animation-delay:320ms] sm:bottom-[2%] sm:right-[6%] sm:block"
          />
        ) : null}
      </aside>
    </section>
  );
}
