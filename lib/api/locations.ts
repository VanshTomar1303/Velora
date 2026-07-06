import locationsData from "@/data/locations.json";
import type { Location } from "@/types/location";
import { mockFetch } from "./client";

export async function getLocations(): Promise<Location[]> {
  return mockFetch(locationsData as Location[]);
}
