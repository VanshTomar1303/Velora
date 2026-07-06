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
  return buildMetadata({ title: t("terms.title"), description: t("terms.description"), locale, path: "/terms" });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const doc = await getLegalDocument("terms");

  return <LegalPage title={t("terms.title")} doc={doc} />;
}
