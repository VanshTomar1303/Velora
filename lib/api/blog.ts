import blogData from "@/data/blog.json";
import type { BlogPost } from "@/types/blog";
import { mockFetch } from "./client";

export async function getPosts(): Promise<BlogPost[]> {
  const posts = [...(blogData as BlogPost[])].sort((a, b) => b.date.localeCompare(a.date));
  return mockFetch(posts);
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const post = (blogData as BlogPost[]).find((p) => p.slug === slug);
  return mockFetch(post);
}

export function getPostSlugs(): string[] {
  return (blogData as BlogPost[]).map((p) => p.slug);
}
