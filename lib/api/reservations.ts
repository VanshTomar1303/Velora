import type { ReservationInput, ReservationResult } from "@/types/reservation";
import { mockFetch } from "./client";

/**
 * Stands in for a POST to a future /api/reservations route (or a
 * Supabase/Firebase call). Same async shape, so swapping the body for a
 * real request later doesn't touch the calling form component.
 */
export async function createReservation(
  input: ReservationInput
): Promise<ReservationResult> {
  const result: ReservationResult = {
    ...input,
    id: `RSV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    confirmedAt: new Date().toISOString(),
  };
  return mockFetch(result, 900);
}
