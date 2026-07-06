import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/sections/product-detail";
import { getMenu, getMenuItem, getMenuIds } from "@/lib/api/menu";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getMenuIds().map((id) => ({ locale, id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const item = await getMenuItem(id);
  if (!item) return {};
  return buildMetadata({ title: item.name, description: item.description, locale, path: `/menu/${id}` });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const item = await getMenuItem(id);
  if (!item) notFound();

  const menu = await getMenu();
  const related = menu.filter((m) => m.category === item.category && m.id !== item.id).slice(0, 3);

  return (
    <>
      <Script
        id={`ld-json-product-${item.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: item.name,
              description: item.description,
              price: item.price,
              path: `/menu/${item.id}`,
            })
          ),
        }}
      />
      <ProductDetail item={item} related={related} />
    </>
  );
}
