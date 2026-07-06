export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  author: string;
  date: string;
  category: string;
  readingTime: number;
  image?: string;
}
