import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";
import { getPostSlugs } from "@/lib/api/blog";
import { getMenuIds } from "@/lib/api/menu";

const PATHS = [
  "",
  "/menu",
  "/gallery",
  "/about",
  "/reservations",
  "/contact",
  "/blog",
  "/offers",
  "/referral",
  "/partners",
  "/locations",
  "/feedback",
  "/privacy",
  "/cookies",
  "/terms",
  ...getPostSlugs().map((slug) => `/blog/${slug}`),
  ...getMenuIds().map((id) => `/menu/${id}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${siteUrl}${locale === routing.defaultLocale ? "" : `/${locale}`}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    }))
  );
}
