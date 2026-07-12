type SeerDocumentChipProps = {
  title: string;
  meta: string;
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

export function SeerDocumentChip({
  title,
  meta,
  time,
  read,
  className = "",
}: SeerDocumentChipProps) {
  return (
    <div
      className={[
        "max-w-[240px] rounded-2xl rounded-br-md bg-[#0B84FF] px-2.5 py-2 text-white shadow-md",
        className,
      ].join(" ")}
    >
      <div className="flex items-center gap-2.5 rounded-xl bg-black/15 px-2.5 py-2">
        <div className="flex h-10 w-9 shrink-0 items-center justify-center rounded-md bg-[#E53935] text-[10px] font-bold tracking-wide">
          PDF
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{title}</p>
          <p className="truncate text-[11px] text-white/75">{meta}</p>
        </div>
      </div>
      <div className="mt-1.5 flex items-center justify-end gap-1 px-1 text-[10px] text-white/80">
        <span>{time}</span>
        <DeliveryTicks read={read} />
      </div>
    </div>
  );
}
