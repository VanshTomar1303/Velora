import type { Metadata } from "next";
import { getSettingsSync } from "@/lib/api/settings";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://velora.example.com";

export function buildMetadata({
  title,
  description,
  locale,
  path = "",
}: {
  title: string;
  description: string;
  locale: string;
  path?: string;
}): Metadata {
  const settings = getSettingsSync();
  const url = `${siteUrl}${path}`;
  const fullTitle = path ? `${title} — ${settings.brand}` : title;

  return {
    title: path ? title : { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: settings.brand,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function businessJsonLd() {
  const settings = getSettingsSync();
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: settings.brand,
    description: settings.description,
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.map.lat,
      longitude: settings.map.lng,
    },
    sameAs: Object.values(settings.social),
    openingHoursSpecification: settings.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.hours.split("–")[0]?.trim(),
      closes: h.hours.split("–")[1]?.trim(),
    })),
  };
}

export { siteUrl };
