import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { MenuPreview } from "@/components/sections/menu-preview";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Reviews } from "@/components/sections/reviews";
import { Team } from "@/components/sections/team";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Faq } from "@/components/sections/faq";
import { getMenu } from "@/lib/api/menu";
import { getGallery } from "@/lib/api/gallery";
import { getReviews } from "@/lib/api/reviews";
import { getTeam } from "@/lib/api/team";
import { getFaq } from "@/lib/api/faq";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({ title: t("title"), description: t("description"), locale });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [menu, gallery, reviews, team, faq] = await Promise.all([
    getMenu(),
    getGallery(),
    getReviews(),
    getTeam(),
    getFaq(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <MenuPreview items={menu} />
      <GalleryPreview items={gallery} />
      <Reviews items={reviews} />
      <Team members={team} />
      <Stats />
      <Process />
      <Faq items={faq} />
    </>
  );
}
