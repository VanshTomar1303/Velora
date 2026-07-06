import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Locations } from "@/components/sections/locations";
import { getLocations } from "@/lib/api/locations";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "locations" });
  return buildMetadata({ title: t("heading"), description: t("subheading"), locale, path: "/locations" });
}

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const locations = await getLocations();

  return <Locations locations={locations} />;
}
