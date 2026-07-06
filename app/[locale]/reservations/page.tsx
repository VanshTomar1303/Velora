import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ReservationForm } from "@/components/sections/reservation-form";
import { FadeIn } from "@/components/animations/fade-in";
import { SlideUp } from "@/components/animations/slide-up";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reservations" });
  return buildMetadata({ title: t("heading"), description: t("subheading"), locale, path: "/reservations" });
}

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "reservations" });

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display mt-4 text-4xl sm:text-5xl">{t("heading")}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 max-w-md text-muted-foreground">{t("subheading")}</p>
          </FadeIn>
          <SlideUp delay={0.3} className="mt-8">
            <MediaPlaceholder ratio="portrait" src="/images/interior-4.jpg" label="Dining room" className="w-full max-w-md rounded-2xl" />
          </SlideUp>
        </div>

        <SlideUp delay={0.2}>
          <ReservationForm />
        </SlideUp>
      </div>
    </div>
  );
}
