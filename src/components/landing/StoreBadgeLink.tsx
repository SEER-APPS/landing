import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";

type StoreBadgeLinkProps = Omit<ComponentPropsWithoutRef<"a">, "children"> & {
  store: "apple" | "google";
  compact?: boolean;
};

const lineTopApple = "Download on the";
const lineBottomApple = "App Store";
const lineTopGoogle = "Get it on";
const lineBottomGoogle = "Google Play";

function AppleBadgeIcon({ compact }: { compact: boolean }) {
  const size = compact ? 32 : 40;
  const className = compact ? "h-8 w-auto object-contain" : "h-10 w-auto object-contain";
  return (
    <>
      <Image
        src="/Apple-black.png"
        alt=""
        width={size}
        height={size}
        className={`${className} dark:hidden`}
      />
      <Image
        src="/apple.png"
        alt=""
        width={size}
        height={size}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}

function GoogleBadgeIcon({ compact }: { compact: boolean }) {
  const size = compact ? 32 : 40;
  return (
    <Image
      src="/Playstore.png"
      alt=""
      width={size}
      height={size}
      className={compact ? "h-8 w-auto object-contain" : "h-10 w-auto object-contain"}
    />
  );
}

export function StoreBadgeLink({
  store,
  compact = false,
  className = "",
  href,
  ...rest
}: StoreBadgeLinkProps) {
  const lineTop = store === "apple" ? lineTopApple : lineTopGoogle;
  const lineBottom = store === "apple" ? lineBottomApple : lineBottomGoogle;
  const padding = compact ? "px-3 py-2" : "px-5 py-3";
  const minH = compact ? "min-h-10" : "min-h-12";
  const topText = compact ? "text-[9px] leading-tight" : "text-[10px] leading-tight";
  const bottomText = compact ? "text-xs font-semibold" : "text-sm font-semibold";

  return (
    <a
      href={href}
      className={`inline-flex ${minH} w-full max-w-full items-center justify-center gap-2.5 rounded-2xl border border-border bg-surface text-start transition-colors hover:bg-brand-soft/30 sm:w-auto ${padding} ${className}`.trim()}
      {...rest}
    >
      <span className="inline-flex shrink-0 items-center justify-center">
        {store === "apple" ? (
          <AppleBadgeIcon compact={compact} />
        ) : (
          <GoogleBadgeIcon compact={compact} />
        )}
      </span>
      <span className={`flex min-w-0 flex-col ${compact ? "gap-0" : "gap-0.5"}`}>
        <span className={`text-muted ${topText}`}>{lineTop}</span>
        <span className={`text-foreground ${bottomText}`}>{lineBottom}</span>
      </span>
    </a>
  );
}
