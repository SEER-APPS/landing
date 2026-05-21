import Link from "next/link";

import { accountRequestOptions } from "@/constants/requests";

const cardClass =
  "block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-foreground/20 hover:bg-brand-soft/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function AccountRequestsPage() {
  return (
    <article className="bg-background text-foreground">
      <header className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm text-muted">
          <Link href="/requests" className="underline underline-offset-4 hover:text-foreground">
            Requests
          </Link>
          {" / Account"}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Account requests
        </h1>
        <p className="mt-3 max-w-prose text-pretty text-base leading-relaxed text-muted sm:text-lg">
          Select the type of account help you need.
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 pb-14 sm:px-6">
        {accountRequestOptions.map((option) => (
          <Link
            key={option.slug}
            href={`/requests/account/${option.slug}`}
            className={cardClass}
          >
            <h2 className="text-base font-semibold">{option.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{option.description}</p>
          </Link>
        ))}
      </div>
    </article>
  );
}
