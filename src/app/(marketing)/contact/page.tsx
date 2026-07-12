import type { Metadata } from "next";
import { ContactForm } from "@/components/landing/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Seer",
  description: "Reach the Seer team for support and partnerships.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <header className="landing-fade-up border-b border-border pb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Contact us
        </h1>
        <p className="mt-3 max-w-prose text-sm text-muted md:text-base">
          Questions about Seer, partnerships, or support? Use the form below.
        </p>
      </header>

      <div className="landing-fade-up landing-fade-up-delay-2">
        <ContactForm />
      </div>
    </article>
  );
}
