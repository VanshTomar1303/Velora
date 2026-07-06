import menuData from "@/data/menu.json";
import type { MenuItem, MenuCategory } from "@/types/menu";
import { mockFetch } from "./client";

export async function getMenu(): Promise<MenuItem[]> {
  return mockFetch(menuData as MenuItem[]);
}

export async function getMenuByCategory(
  category: MenuCategory | "all"
): Promise<MenuItem[]> {
  const all = menuData as MenuItem[];
  return mockFetch(category === "all" ? all : all.filter((item) => item.category === category));
}
