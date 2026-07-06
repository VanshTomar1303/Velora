export type MenuCategory =
  | "coffee"
  | "tea"
  | "desserts"
  | "breakfast"
  | "lunch"
  | "dinner"
  | "drinks"
  | "cocktails";

export interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  description: string;
  price: number;
  calories: number;
  image?: string;
  tags?: string[];
  popular?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
}
