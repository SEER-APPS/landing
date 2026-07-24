import type { Metadata } from "next";
import Link from "next/link";

import { APP_STORE_URL, PLAY_STORE_URL } from "@/constants/storeLinks";
import { pageMetadata } from "@/lib/site-metadata";

type PageProps = {
  params: Promise<{ username: string }>;
};

function normalizeUsername(raw: string): string {
  return decodeURIComponent(raw)
    .trim()
    .replace(/^@+/, "")
    .toLowerCase();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username: raw } = await params;
  const username = normalizeUsername(raw);
  const handle = username ? `@${username}` : "Seer user";
  return pageMetadata({
    title: `Add ${handle} on Seer`,
    description: `Open Seer to add ${handle} and start a secure chat.`,
    path: `/u/${encodeURIComponent(username || raw)}`,
  });
}

export default async function UsernameInvitePage({ params }: PageProps) {
  const { username: raw } = await params;
  const username = normalizeUsername(raw);
  const handle = username ? `@${username}` : "@user";
  const appLink = username ? `seer://u/${encodeURIComponent(username)}` : "seer://";
  const playStoreHref = PLAY_STORE_URL === "#" ? "/download" : PLAY_STORE_URL;

  return (
    <article className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col justify-center px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
        Seer invite
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        Add {handle}
      </h1>
      <p className="mt-3 text-pretty text-sm text-muted md:text-base">
        This QR code opens Seer so you can add {handle} and message them securely.
        If the app is installed, continue below. Otherwise download Seer first.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={appLink}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Open in Seer
        </a>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-brand-soft/30"
        >
          Download on the App Store
        </a>
        <a
          href={playStoreHref}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-brand-soft/30"
        >
          Get it on Google Play
        </a>
        <Link
          href="/download"
          className="pt-2 text-center text-sm font-medium text-muted underline-offset-4 hover:underline"
        >
          More download options
        </Link>
      </div>
    </article>
  );
}
