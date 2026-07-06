import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { MenuExplorer } from "@/components/sections/menu-explorer";
import { FloatingCartButton } from "@/components/cart/floating-cart-button";
import { FadeIn } from "@/components/animations/fade-in";
import { getMenu } from "@/lib/api/menu";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu" });
  return buildMetadata({ title: t("heading"), description: t("subheading"), locale, path: "/menu" });
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "menu" });
  const menu = await getMenu();

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <FadeIn>
            <span className="text-xs uppercase tracking-[0.35em] text-primary">{t("eyebrow")}</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display mt-4 text-4xl sm:text-5xl">{t("heading")}</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-muted-foreground">{t("subheading")}</p>
          </FadeIn>
        </div>

        <div className="mt-16">
          <MenuExplorer items={menu} />
        </div>
      </div>
      <FloatingCartButton />
    </div>
  );
}
