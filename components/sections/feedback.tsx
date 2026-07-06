"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { z } from "zod";
import { FadeIn } from "@/components/animations/fade-in";
import { StarRating } from "@/components/common/star-rating";
import { StarRatingInput } from "@/components/common/star-rating-input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { feedbackSchema } from "@/lib/validations";
import type { Review } from "@/types/review";

export function Feedback({ reviews }: { reviews: Review[] }) {
  const t = useTranslations("feedback");

  const average =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: "", email: "", rating: 0, comment: "" },
  });

  function onSubmit() {
    toast.success(t("success"));
    form.reset();
  }

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

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-2 rounded-2xl border border-border bg-card p-8 text-center">
            <span className="font-display text-5xl text-primary">{average.toFixed(1)}</span>
            <StarRating rating={Math.round(average)} className="justify-center" />
            <p className="text-sm text-muted-foreground">
              {t("basedOn", { count: reviews.length })}
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">{t("testimonialsTitle")}</h2>
            <div className="mt-6 space-y-4">
              {reviews.slice(0, 5).map((review) => (
                <div key={review.id} className="glass rounded-2xl p-5">
                  <StarRating rating={review.rating} />
                  <p className="mt-3 text-sm text-foreground/90">&ldquo;{review.text}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/15 text-primary">
                        {review.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl">{t("formTitle")}</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.name")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.email")}</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.rating")}</FormLabel>
                      <FormControl>
                        <StarRatingInput value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.comment")}</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder={t("form.commentPlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full rounded-full">
                  {t("form.submit")}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
