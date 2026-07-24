import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { supabase, DbPost } from "./supabase";

const postsDir = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingTime: string;
  source: "file" | "db";
  featuredImage?: string;
};

export type Post = PostMeta & { contentHtml: string };

export const categories = [
  "Budgeting",
  "Debt Payoff",
  "Side Hustles & Income",
  "Printables & Planners",
  "Money Mindset",
] as const;

function readingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

function getFilePosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      category: data.category as string,
      date: data.date as string,
      readingTime: readingTime(content),
      source: "file" as const,
      featuredImage: (data.featured_image as string) || undefined,
    };
  });
}

async function getDbPosts(): Promise<PostMeta[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return data.map((p: DbPost) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      category: p.category,
      date: p.created_at.split("T")[0],
      readingTime: readingTime(p.content),
      source: "db" as const,
      featuredImage: p.featured_image || undefined,
    }));
  } catch {
    return [];
  }
}

export async function getAllPostsAsync(): Promise<PostMeta[]> {
  const [filePosts, dbPosts] = await Promise.all([
    Promise.resolve(getFilePosts()),
    getDbPosts(),
  ]);

  const all = [...filePosts, ...dbPosts];
  return all.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): PostMeta[] {
  return getFilePosts().sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function getFilePost(slug: string): Promise<Post | null> {
  const file = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    category: data.category as string,
    date: data.date as string,
    readingTime: readingTime(content),
    contentHtml: processed.toString(),
    source: "file",
    featuredImage: (data.featured_image as string) || undefined,
  };
}

async function getDbPost(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) return null;

    const processed = await remark().use(html).process(data.content);
    return {
      slug: data.slug,
      title: data.title,
      description: data.description,
      category: data.category,
      date: data.created_at.split("T")[0],
      readingTime: readingTime(data.content),
      contentHtml: processed.toString(),
      source: "db",
      featuredImage: data.featured_image || undefined,
    };
  } catch {
    return null;
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePost = await getFilePost(slug);
  if (filePost) return filePost;
  return getDbPost(slug);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
