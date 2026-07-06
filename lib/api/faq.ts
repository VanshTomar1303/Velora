import faqData from "@/data/faq.json";
import type { FaqItem } from "@/types/faq";
import { mockFetch } from "./client";

export async function getFaq(): Promise<FaqItem[]> {
  return mockFetch(faqData as FaqItem[]);
}
