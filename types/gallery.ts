export interface GalleryItem {
  id: string;
  type: "image" | "video";
  title: string;
  category: string;
  width: number;
  height: number;
  image?: string;
}
