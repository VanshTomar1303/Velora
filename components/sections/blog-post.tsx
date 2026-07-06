"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/types/blog";
import { MediaPlaceholder } from "@/components/common/media-placeholder";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export function BlogPostView({ post }: { post: BlogPost }) {
  const t = useTranslations("blog");

  return (
    <article className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          data-cursor-hover
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> {t("backToBlog")}
        </Link>

        <FadeIn>
          <div className="mt-8 flex items-center gap-3">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" aria-hidden="true" /> {t("readingTime", { minutes: post.readingTime })}
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display mt-4 text-4xl leading-tight sm:text-5xl">{post.title}</h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("by", { author: post.author })} · {formatDate(post.date)}
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <MediaPlaceholder ratio="wide" src={post.image} label={post.title} className="mt-10 w-full rounded-2xl" priority />
        </FadeIn>

        <div className="mt-10 space-y-6">
          {post.body.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
