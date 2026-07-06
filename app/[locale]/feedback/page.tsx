import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Feedback } from "@/components/sections/feedback";
import { getReviews } from "@/lib/api/reviews";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "feedback" });
  return buildMetadata({ title: t("heading"), description: t("subheading"), locale, path: "/feedback" });
}

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const reviews = await getReviews();

  return <Feedback reviews={reviews} />;
}
