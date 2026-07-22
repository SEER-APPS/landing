import type { Metadata } from "next";
import Link from "next/link";

import { RequestForm } from "@/components/landing/RequestForm";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Delete account",
  description:
    "Request permanent deletion of your Seer account and associated data.",
  path: "/requests/account/delete",
});

export default function DeleteAccountRequestPage() {
  return (
    <article className="bg-background text-foreground">
      <header className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm text-muted">
          <Link href="/requests" className="underline underline-offset-4 hover:text-foreground">
            Requests
          </Link>
          {" / "}
          <Link
            href="/requests/account"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Account
          </Link>
          {" / Delete account"}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Delete account
        </h1>
        <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Submit this form to request permanent deletion of your Seer account. We
          may contact you to confirm identity before processing.
        </p>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6">
        <RequestForm
          type="account"
          subtype="delete"
          title="Account deletion request"
          description="Include the phone number registered on your account and any details that help us verify your identity."
        />
      </div>
    </article>
  );
}
