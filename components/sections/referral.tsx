"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Share2, Gift, UserPlus } from "lucide-react";
import { z } from "zod";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { referralSchema } from "@/lib/validations";

const STEP_ICONS = [Share2, UserPlus, Gift] as const;

export function Referral() {
  const t = useTranslations("referral");
  const steps = t.raw("steps") as { title: string; description: string }[];

  const form = useForm<z.infer<typeof referralSchema>>({
    resolver: zodResolver(referralSchema),
    defaultValues: { name: "", email: "", friendEmail: "" },
  });

  function onSubmit() {
    toast.success(t("success"));
    form.reset();
  }

  return (
    <div className="pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i] ?? Share2;
            return (
              <FadeIn key={step.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="font-display mt-4 text-lg">{step.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl">{t("formTitle")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("formSubtitle")}</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
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
                  name="friendEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.friendEmail")}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
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
        </FadeIn>
      </div>
    </div>
  );
}
