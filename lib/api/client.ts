import { delay } from "@/lib/utils";

/**
 * Simulates a network round-trip so the calling code already has the shape
 * (await, error boundary friendly, loading states) it needs when this is
 * swapped for a real fetch() to a backend/CMS later.
 */
export async function mockFetch<T>(data: T, ms = 350): Promise<T> {
  await delay(ms);
  return data;
}
