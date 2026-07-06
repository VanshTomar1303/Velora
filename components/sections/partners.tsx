"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Handshake, Building2, Leaf, Coffee } from "lucide-react";
import { z } from "zod";
import { FadeIn } from "@/components/animations/fade-in";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { partnershipSchema } from "@/lib/validations";

const TYPE_ICONS = [Building2, Coffee, Leaf, Handshake] as const;

export function Partners() {
  const t = useTranslations("partners");
  const types = t.raw("types") as { title: string; description: string }[];

  const form = useForm<z.infer<typeof partnershipSchema>>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: { company: "", contact: "", email: "", type: "", message: "" },
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((type, i) => {
            const Icon = TYPE_ICONS[i] ?? Handshake;
            return (
              <FadeIn key={type.title} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h2 className="font-display mt-4 text-lg">{type.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-2xl">{t("formTitle")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("formSubtitle")}</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.company")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.contact")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
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
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.type")}</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t("form.typePlaceholder")} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {types.map((type) => (
                              <SelectItem key={type.title} value={type.title}>
                                {type.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("form.message")}</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder={t("form.messagePlaceholder")} {...field} />
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
