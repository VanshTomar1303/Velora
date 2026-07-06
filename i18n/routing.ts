import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fr", "es", "de", "ja", "ar", "hi"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  ja: "日本語",
  ar: "العربية",
  hi: "हिन्दी",
};

export const rtlLocales: Locale[] = ["ar"];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});
