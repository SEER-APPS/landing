import type { Metadata } from "next";
import { LegalDocument } from "@/components/landing/LegalDocument";

export const metadata: Metadata = {
  title: "Terms and conditions | Seer",
  description: "Rules for using Seer products and services.",
};

export default function TermsPage() {
  return (
    <LegalDocument title="Terms and conditions" lastUpdated="6 May 2026">
      <section>
        <h2 className="text-lg font-semibold text-foreground">Agreement</h2>
        <p>
          By accessing or using Seer, you agree to these terms. If you do not
          agree, do not use the service. Replace this document with
          counsel-reviewed terms before production launch.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">The service</h2>
        <p>
          Seer provides messaging and related digital services. Features may
          change over time. We may suspend or discontinue parts of the service
          where reasonably necessary for security, legal compliance, or
          operational reasons.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">Accounts</h2>
        <p>
          You are responsible for safeguarding your credentials and for activity
          under your account. Notify us promptly if you suspect unauthorized
          access.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Acceptable use
        </h2>
        <p>
          You agree not to misuse Seer, including by attempting to interfere
          with the service, scrape data without permission, harass others,
          violate law, or infringe third-party rights.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Third-party services
        </h2>
        <p>
          Payments, telecom top-ups, or other integrations may be provided by
          third parties. Their terms and privacy practices may also apply.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Disclaimers and limitation of liability
        </h2>
        <p>
          The service is provided on an &quot;as is&quot; basis to the extent
          permitted by law. Our liability is limited as described in the final
          legal agreement you adopt for your jurisdiction.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">Changes</h2>
        <p>
          We may update these terms. Material changes will be communicated as
          required by law or through in-product notices.
        </p>
      </section>
    </LegalDocument>
  );
}
