import reviewsData from "@/data/reviews.json";
import type { Review } from "@/types/review";
import { mockFetch } from "./client";

export async function getReviews(): Promise<Review[]> {
  return mockFetch(reviewsData as Review[]);
}
