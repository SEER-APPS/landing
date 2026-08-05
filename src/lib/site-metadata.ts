import type { Metadata } from "next";

export const SITE_NAME = "Seer";

export const SITE_DESCRIPTION =
  "Secure messaging and everyday services in one app.";

/** Fallback share image when file-based opengraph-image is not used. */
export const DEFAULT_OG_IMAGE_PATH = "/marketing/splash-hero.jpg";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) {
    return `https://${vercelProduction.replace(/^https?:\/\//, "")}`;
  }

  return "https://seermessenger.com";
}

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  noIndex?: boolean;
  /** Use for the home page so the title template does not become "Seer | Seer". */
  absoluteTitle?: boolean;
};

/**
 * Per-page title/description + Open Graph / Twitter card fields.
 * Pass bare titles (e.g. "Security") — the root title template appends "| Seer".
 */
export function pageMetadata({
  title,
  description,
  path,
  imagePath = DEFAULT_OG_IMAGE_PATH,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = path === "/" ? "/" : path.replace(/\/$/, "") || "/";
  const canonicalUrl =
    canonicalPath === "/" ? siteUrl : `${siteUrl}${canonicalPath}`;
  const ogTitle =
    absoluteTitle || title === SITE_NAME
      ? SITE_NAME
      : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle || title === SITE_NAME ? { absolute: SITE_NAME } : title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      images: [
        {
          url: imagePath,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [imagePath],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}
