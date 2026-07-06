import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Referral } from "@/components/sections/referral";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "referral" });
  return buildMetadata({ title: t("heading"), description: t("subheading"), locale, path: "/referral" });
}

export default async function ReferralPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Referral />;
}
