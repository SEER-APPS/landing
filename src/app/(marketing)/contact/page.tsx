import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Seer",
  description: "Reach the Seer team for support, partnerships, and press.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <header className="border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Contact us
        </h1>
        <p className="mt-3 max-w-prose text-sm text-muted md:text-base">
          We will publish official support channels before public launch. Until
          then, use the placeholders below and replace them with your real
          addresses in configuration or environment-specific content.
        </p>
      </header>

      <section className="mt-10 space-y-8">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">General</h2>
          <p className="mt-2 text-sm text-muted md:text-base">
            For product questions and feedback, email{" "}
            <a
              href="mailto:support@example.com"
              className="font-medium text-brand underline underline-offset-2"
            >
              support@example.com
            </a>{" "}
            (placeholder—replace with your domain).
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">Legal</h2>
          <p className="mt-2 text-sm text-muted md:text-base">
            For privacy or legal notices, email{" "}
            <a
              href="mailto:legal@example.com"
              className="font-medium text-brand underline underline-offset-2"
            >
              legal@example.com
            </a>{" "}
            (placeholder).
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">Policies</h2>
          <p className="mt-2 text-sm text-muted md:text-base">
            Read our{" "}
            <Link href="/privacy" className="font-medium text-brand underline">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="font-medium text-brand underline">
              terms and conditions
            </Link>
            .
          </p>
        </div>
      </section>
    </article>
  );
}
