import type { Metadata } from "next";

import { SecurityControlGrid } from "@/components/landing/security/SecurityControlGrid";
import { SecurityHelpLinks } from "@/components/landing/security/SecurityHelpLinks";
import { SecurityHero } from "@/components/landing/security/SecurityHero";
import { SecurityPillars } from "@/components/landing/security/SecurityPillars";
import { resolveSecurityPageContent } from "@/content/securityPageContent";

export const metadata: Metadata = {
  title: "Security | Seer",
  description:
    "Learn how Seer protects private chats, media, and shared moments with end-to-end security.",
};

type SecurityPageProps = {
  searchParams: Promise<{
    lg?: string;
    lc?: string;
    eea?: string;
  }>;
};

export default async function SecurityPage({
  searchParams,
}: SecurityPageProps) {
  const resolvedSearchParams = await searchParams;
  const languageCode = resolvedSearchParams.lg?.trim().toLowerCase() ?? "en";
  const content = resolveSecurityPageContent(languageCode);

  return (
    <div lang={content.languageCode} className="w-full">
      <SecurityHero content={content} />
      <SecurityPillars content={content} />
      <SecurityControlGrid content={content} />
      <SecurityHelpLinks content={content} />
    </div>
  );
}
