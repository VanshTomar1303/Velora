import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Partners } from "@/components/sections/partners";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  return buildMetadata({ title: t("heading"), description: t("subheading"), locale, path: "/partners" });
}

export default async function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Partners />;
}
