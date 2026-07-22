import type { MetadataRoute } from "next";

import { accountRequestOptions } from "@/constants/requests";
import { getSiteUrl } from "@/lib/site-metadata";

const staticPaths = [
  "/",
  "/services",
  "/protection",
  "/security",
  "/download",
  "/contact",
  "/privacy",
  "/cookies",
  "/terms",
  "/requests",
  "/requests/account",
  "/requests/account/delete",
  "/requests/billing/payment-issue",
  "/requests/technical/app-issue",
  "/requests/other/general",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const accountSlugs = accountRequestOptions
    .filter((option) => option.slug !== "delete")
    .map((option) => `/requests/account/${option.slug}`);

  const paths = [...staticPaths, ...accountSlugs];

  return paths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/requests") ? 0.5 : 0.7,
  }));
}
