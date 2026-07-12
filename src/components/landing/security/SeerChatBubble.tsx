type SeerChatBubbleProps = {
  variant: "outgoing" | "incoming";
  text: string;
  time: string;
  read?: boolean;
  className?: string;
};

function DeliveryTicks({ read }: { read?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 11"
      className="ml-0.5 inline-block h-2.5 w-3.5 shrink-0"
    >
      <path
        d="M11.07 1.14 5.4 7.56 2.93 4.9 1.8 6.1l3.6 3.9 6.9-7.7z"
        fill={read ? "#8FD4FF" : "currentColor"}
        opacity={read ? 1 : 0.7}
      />
      <path
        d="M14.2 1.14 8.53 7.56 7.6 6.56l-1.13 1.2 2.06 2.24 6.9-7.7z"
        fill={read ? "#8FD4FF" : "currentColor"}
        opacity={read ? 1 : 0.7}
      />
    </svg>
  );
}

export function SeerChatBubble({
  variant,
  text,
  time,
  read,
  className = "",
}: SeerChatBubbleProps) {
  const isOutgoing = variant === "outgoing";

  return (
    <div
      className={[
        "max-w-[240px] rounded-2xl px-3 py-2 text-sm leading-snug shadow-md",
        isOutgoing
          ? "rounded-br-md bg-[#0B84FF] text-white"
          : "rounded-bl-md bg-[#F2F2F2] text-black dark:bg-[#4A4A4A] dark:text-white",
        className,
      ].join(" ")}
    >
      <p className="whitespace-pre-wrap break-words">{text}</p>
      <div
        className={[
          "mt-1 flex items-center justify-end gap-1 text-[10px]",
          isOutgoing ? "text-white/80" : "text-black/50 dark:text-white/60",
        ].join(" ")}
      >
        <span>{time}</span>
        {isOutgoing ? <DeliveryTicks read={read} /> : null}
      </div>
    </div>
  );
}
