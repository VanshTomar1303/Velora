import servicesData from "@/data/services.json";
import type { Service } from "@/types/service";
import { mockFetch } from "./client";

export async function getServices(): Promise<Service[]> {
  return mockFetch(servicesData as Service[]);
}
