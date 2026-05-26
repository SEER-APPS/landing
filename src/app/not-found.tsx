import type { Metadata } from "next";

import { MarketingShell } from "@/components/landing/MarketingShell";
import { NotFoundContent } from "@/components/landing/NotFoundContent";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "This page could not be found on Seer. Return home or download the app for secure messaging and everyday services.",
};

export default function NotFound() {
  return (
    <MarketingShell>
      <NotFoundContent />
    </MarketingShell>
  );
}
