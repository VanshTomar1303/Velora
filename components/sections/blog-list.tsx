"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/types/blog";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations("blog");

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
                data-cursor-hover
              >
                <MediaPlaceholder
                  ratio="landscape"
                  src={post.image}
                  label={post.title}
                  className="rounded-none transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" aria-hidden="true" /> {t("readingTime", { minutes: post.readingTime })}
                    </span>
                  </div>
                  <h2 className="font-display mt-4 text-xl leading-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1 text-primary">
                      {t("readMore")} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
