import type { ReactNode } from "react";

type SeerPhoneFrameProps = {
  children: ReactNode;
  className?: string;
};

export function SeerPhoneFrame({ children, className = "" }: SeerPhoneFrameProps) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-sm",
        className,
      ].join(" ")}
    >
      <div className="flex items-center justify-between bg-surface px-4 py-2.5 text-[10px] font-medium text-muted">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-sm bg-muted/70" />
          <span className="h-1.5 w-2 rounded-sm bg-muted/70" />
          <span className="h-2 w-4 rounded-sm border border-muted/70" />
        </div>
      </div>
      <div className="min-h-[180px] bg-background p-3 sm:min-h-[200px] sm:p-4">
        {children}
      </div>
    </div>
  );
}
