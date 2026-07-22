import type { Metadata } from "next";

import { ProtectionConsole } from "@/components/landing/protection/ProtectionConsole";

import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Protection",
  description: "Detect threats from live or recorded audio with Seer.",
  path: "/protection",
  imagePath: "/marketing/protection-active.jpg",
});

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
