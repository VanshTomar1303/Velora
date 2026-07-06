import legalData from "@/data/legal.json";
import type { LegalDocument, LegalKey } from "@/types/legal";
import { mockFetch } from "./client";

export async function getLegalDocument(key: LegalKey): Promise<LegalDocument> {
  const doc = (legalData as Record<LegalKey, LegalDocument>)[key];
  return mockFetch(doc);
}
