import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
import { BlogPostView } from "@/components/sections/blog-post";
import { getPost, getPostSlugs } from "@/lib/api/blog";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, locale, path: `/blog/${slug}` });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Script
        id={`ld-json-article-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: post.title,
              description: post.excerpt,
              author: post.author,
              date: post.date,
              path: `/blog/${post.slug}`,
            })
          ),
        }}
      />
      <BlogPostView post={post} />
    </>
  );
}
