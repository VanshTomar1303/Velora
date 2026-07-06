import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { getLegalDocument } from "@/lib/api/legal";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return buildMetadata({ title: t("privacy.title"), description: t("privacy.description"), locale, path: "/privacy" });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const doc = await getLegalDocument("privacy");

  return <LegalPage title={t("privacy.title")} doc={doc} />;
}
