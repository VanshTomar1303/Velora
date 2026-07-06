import galleryData from "@/data/gallery.json";
import type { GalleryItem } from "@/types/gallery";
import { mockFetch } from "./client";

export async function getGallery(): Promise<GalleryItem[]> {
  return mockFetch(galleryData as GalleryItem[]);
}
