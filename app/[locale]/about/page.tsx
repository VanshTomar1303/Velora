import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Team } from "@/components/sections/team";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { getTeam } from "@/lib/api/team";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({ title: t("heading"), description: t("story"), locale, path: "/about" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const team = await getTeam();

  return (
    <div className="pt-24">
      <About />
      <Stats />
      <Team members={team} />
      <Process />
    </div>
  );
}
