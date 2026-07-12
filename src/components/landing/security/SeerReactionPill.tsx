type SeerReactionPillProps = {
  reactions: string[];
  className?: string;
};

export function SeerReactionPill({ reactions, className = "" }: SeerReactionPillProps) {
  return (
    <div
      className={[
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-sm shadow-sm",
        className,
      ].join(" ")}
    >
      {reactions.map((reaction) => (
        <span key={reaction} aria-hidden>
          {reaction}
        </span>
      ))}
    </div>
  );
}
