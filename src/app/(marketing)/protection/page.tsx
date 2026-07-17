import type { Metadata } from "next";

import { ProtectionConsole } from "@/components/landing/protection/ProtectionConsole";

export const metadata: Metadata = {
  title: "Protection | Seer",
  description: "Detect threats from live or recorded audio with Seer.",
};

export const dynamic = "force-dynamic";

export default function ProtectionPage() {
  const showComparison =
    process.env.SHOW_COMPARISON?.trim().toLowerCase() === "true";

  return (
    <div className="flex min-h-[calc(100vh-10rem)] w-full">
      <ProtectionConsole showComparison={showComparison} />
    </div>
  );
}
