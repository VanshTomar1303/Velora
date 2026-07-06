import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Offers } from "@/components/sections/offers";
import { getOffers } from "@/lib/api/offers";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "offers" });
  return buildMetadata({ title: t("heading"), description: t("subheading"), locale, path: "/offers" });
}

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const offers = await getOffers();

  return <Offers offers={offers} />;
}
