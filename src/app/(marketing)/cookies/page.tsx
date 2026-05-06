import type { Metadata } from "next";
import { LegalDocument } from "@/components/landing/LegalDocument";

export const metadata: Metadata = {
  title: "Cookie policy | Seer",
  description: "How Seer uses cookies and similar technologies on the web.",
};

export default function CookiesPage() {
  return (
    <LegalDocument title="Cookie policy" lastUpdated="6 May 2026">
      <section>
        <h2 className="text-lg font-semibold text-foreground">Overview</h2>
        <p>
          This policy explains how cookies and similar technologies may be used
          on Seer websites. Our native apps may use local storage or platform
          equivalents; refer to your device settings and in-app notices where
          applicable. Replace this text with counsel-reviewed wording before
          production.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Types of technologies
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-foreground">Essential</span> —
            required for security, load balancing, or core site functionality.
          </li>
          <li>
            <span className="font-medium text-foreground">Preferences</span> —
            remember choices such as theme where offered on the web.
          </li>
          <li>
            <span className="font-medium text-foreground">Analytics</span> —
            help us understand aggregate usage if enabled (we aim to minimise
            invasive tracking).
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">Your controls</h2>
        <p>
          You can control cookies through your browser settings. Blocking
          essential cookies may affect how the site functions.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">Updates</h2>
        <p>
          We may update this policy when our practices change. Review the date
          at the top of this page periodically.
        </p>
      </section>
    </LegalDocument>
  );
}
