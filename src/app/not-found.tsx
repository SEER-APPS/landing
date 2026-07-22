import type { Metadata } from "next";

import { MarketingShell } from "@/components/landing/MarketingShell";
import { NotFoundContent } from "@/components/landing/NotFoundContent";

import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Page not found",
  description:
    "This page could not be found on Seer. Return home or download the app for secure messaging and everyday services.",
  path: "/",
  noIndex: true,
});

export default function NotFound() {
  return (
    <MarketingShell>
      <NotFoundContent />
    </MarketingShell>
  );
}
