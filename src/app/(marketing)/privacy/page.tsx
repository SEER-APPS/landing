import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/landing/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy policy | Seer",
  description: "How Seer collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy policy" lastUpdated="6 May 2026">
      <section>
        <h2 className="text-lg font-semibold text-foreground">Introduction</h2>
        <p>
          This policy describes how Seer (&quot;we&quot;, &quot;us&quot;) handles
          information when you use our website, mobile applications, and
          related services. Replace this page with counsel-reviewed text before
          production launch.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Information we may collect
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Account and profile details you provide (such as display name or
            contact information).
          </li>
          <li>
            Messages and content you send through the app, processed according
            to our security architecture.
          </li>
          <li>
            Device and technical data (such as app version, diagnostics, and
            crash reports) to improve reliability.
          </li>
          <li>
            Payment-related metadata processed by our payment partners; we do
            not store full card details on our servers where a partner handles
            checkout.
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">
          How we use information
        </h2>
        <p>
          We use information to operate and improve Seer, provide customer
          support, secure accounts, meet legal obligations, and communicate
          important service updates.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">Your choices</h2>
        <p>
          Where applicable, you can access or update certain information in the
          app settings, opt out of non-essential communications, and contact us
          with privacy requests via the{" "}
          <Link href="/contact" className="font-medium text-brand underline">
            contact page
          </Link>
          .
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">Contact</h2>
        <p>
          Questions about this policy should be sent through our contact page.
          We will respond in line with applicable law.
        </p>
      </section>
    </LegalDocument>
  );
}
