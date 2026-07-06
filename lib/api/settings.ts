import settingsData from "@/data/settings.json";
import type { Settings } from "@/types/settings";
import { mockFetch } from "./client";

export async function getSettings(): Promise<Settings> {
  return mockFetch(settingsData as Settings);
}

export function getSettingsSync(): Settings {
  return settingsData as Settings;
}
