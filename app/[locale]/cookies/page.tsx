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
  return buildMetadata({ title: t("cookies.title"), description: t("cookies.description"), locale, path: "/cookies" });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const doc = await getLegalDocument("cookies");

  return <LegalPage title={t("cookies.title")} doc={doc} />;
}
