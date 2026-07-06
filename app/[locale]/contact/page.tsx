import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return buildMetadata({ title: t("heading"), description: t("subheading"), locale, path: "/contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-24">
      <Contact />
    </div>
  );
}
