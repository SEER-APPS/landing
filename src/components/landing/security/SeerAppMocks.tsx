import { SeerPhoneFrame } from "./SeerPhoneFrame";

export function MockEncryptionScreen() {
  return (
    <SeerPhoneFrame>
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 border-b border-border pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
            <LockIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Mum</p>
            <p className="text-[11px] text-muted">tap for contact info</p>
          </div>
        </div>
        <div className="mx-auto max-w-[230px] rounded-2xl border border-border bg-surface px-3 py-2.5 text-center">
          <p className="text-[11px] font-medium leading-snug text-foreground">
            Messages are end-to-end encrypted.
          </p>
          <p className="mt-1 text-[10px] leading-relaxed text-muted">
            Only people in this chat can read or listen to them.
          </p>
          <p className="mt-2 text-[10px] font-medium text-brand">Learn more</p>
        </div>
        <div className="ml-auto max-w-[70%] rounded-2xl rounded-br-md bg-[#0B84FF] px-3 py-2 text-xs text-white">
          Sharing the safety checklist now
          <div className="mt-1 text-right text-[9px] text-white/75">9:41 ✓✓</div>
        </div>
      </div>
    </SeerPhoneFrame>
  );
}

export function MockMediaTimersScreen() {
  return (
    <SeerPhoneFrame>
      <div className="space-y-3">
        <p className="text-center text-xs font-semibold text-foreground">
          Photo privacy
        </p>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {[
            {
              label: "View once",
              detail: "Recipient opens it once, then it disappears",
              active: true,
            },
            {
              label: "View for 1 hour",
              detail: "Expires one hour after send",
              active: false,
            },
            {
              label: "View for 24 hours",
              detail: "Expires a day after send",
              active: false,
            },
          ].map((option) => (
            <div
              key={option.label}
              className="flex items-center gap-3 border-b border-border px-3 py-2.5 last:border-b-0"
            >
              <span
                className={[
                  "flex h-4 w-4 items-center justify-center rounded-full border",
                  option.active
                    ? "border-brand bg-brand"
                    : "border-muted bg-transparent",
                ].join(" ")}
              >
                {option.active ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                ) : null}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground">{option.label}</p>
                <p className="text-[10px] text-muted">{option.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SeerPhoneFrame>
  );
}

export function MockReportBlockScreen() {
  return (
    <SeerPhoneFrame>
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 border-b border-border pb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4A4A4A] text-xs font-semibold text-white">
            A
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              Unknown contact
            </p>
            <p className="text-[11px] text-muted">Contact info</p>
          </div>
        </div>

        <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-[#4A4A4A] px-3 py-2 text-xs text-white">
          Click this link to claim your prize…
          <div className="mt-1 text-right text-[9px] text-white/55">14:02</div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="flex gap-1.5 overflow-x-auto border-b border-border px-2.5 py-2">
            {["👍", "❤️", "😂", "😮", "😢", "🙏"].map((emoji) => (
              <span
                key={emoji}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-sm"
              >
                {emoji}
              </span>
            ))}
          </div>
          {[
            { label: "Reply", danger: false },
            { label: "Forward", danger: false },
            { label: "Copy", danger: false },
            { label: "Delete", danger: true },
          ].map((action) => (
            <div
              key={action.label}
              className={[
                "border-b border-border px-3 py-2 text-xs last:border-b-0",
                action.danger
                  ? "font-medium text-[#FF5252]"
                  : "font-medium text-foreground",
              ].join(" ")}
            >
              {action.label}
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="border-b border-border px-3 py-2.5 text-xs font-medium text-[#FF453A]">
            Report
          </div>
          <div className="px-3 py-2.5 text-xs font-medium text-[#FF453A]">
            Block contact
          </div>
        </div>
      </div>
    </SeerPhoneFrame>
  );
}

export function MockOfficialAppScreen() {
  return (
    <SeerPhoneFrame>
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto text-[10px] text-muted">
          {["All", "Unread", "Favorites"].map((filter, index) => (
            <span
              key={filter}
              className={[
                "rounded-full px-2.5 py-1",
                index === 0
                  ? "bg-brand text-white"
                  : "bg-surface text-muted ring-1 ring-border",
              ].join(" ")}
            >
              {filter}
            </span>
          ))}
        </div>
        <div className="rounded-2xl border border-border bg-surface p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
              S
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground">Seer</p>
              <p className="truncate text-[10px] text-muted">
                Get the official app from the App Store or Play Store
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-dashed border-border bg-brand-soft/40 px-3 py-2 text-center text-[10px] text-muted">
          Always download Seer from official stores
        </div>
      </div>
    </SeerPhoneFrame>
  );
}

function LockIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}
