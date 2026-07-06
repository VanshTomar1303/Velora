import offersData from "@/data/offers.json";
import type { Offer } from "@/types/offer";
import { mockFetch } from "./client";

export async function getOffers(): Promise<Offer[]> {
  return mockFetch(offersData as Offer[]);
}
