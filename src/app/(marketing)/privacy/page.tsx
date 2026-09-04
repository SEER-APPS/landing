import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/landing/LegalDocument";

import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: "How Seer collects, uses, and protects your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy policy" lastUpdated="4 September 2026">
      <section>
        <h2 className="text-lg font-semibold text-foreground">Introduction</h2>
        <p>
          This policy describes how Seer (&quot;we&quot;, &quot;us&quot;) handles
          information when you use our website, mobile applications, and
          related services.
        </p>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-foreground">
          Information we may collect
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Account and profile details you provide (such as display name,
            phone number, or contact information).
          </li>
          <li>
            Messages and content you send through the app, processed according
            to our security architecture (including end-to-end encryption where
            enabled).
          </li>
          <li>
            <strong>Location data.</strong> When you use Safe Trip or share live
            location, we access your precise device location — including while
            the app is in the background or not in active use — for as long as
            that trip or live share remains active. Approximate last-known
            location may also be included with a trusted-contact safety alert if
            you have granted location permission and an emergency trigger fires.
            We do not collect location in the background for advertising or
            unrelated analytics.
          </li>
          <li>
            Microphone audio on-device for ambient threat monitoring when you
            enable Protection (processed for safety alerts; not used for ads).
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
          How we use location
        </h2>
        <p>
          Location is used to power safety features you start: showing your
          position to trusted contacts during a Safe Trip or live location
          share, and optionally attaching location context to emergency
          trusted-contact alerts. Location shared during a trip or live share
          is sent to the contacts or conversations you select for that session.
          You can stop sharing in the app at any time and revoke location
          permission in your device settings.
        </p>
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
          app settings, control location and microphone permissions in system
          Settings, opt out of non-essential communications, and contact us
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
