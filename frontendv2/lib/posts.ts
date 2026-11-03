import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { PostSummary } from "./postFormat";

// Posts are Markdown files in content/posts, one per post; the file name is the slug.

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const WORDS_PER_MINUTE = 200;

export interface Post extends PostSummary {
  content: string;
}

function readPost(file: string): Post {
  const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    description: String(data.description ?? ""),
    date: String(data.date),
    category: String(data.category ?? "Geral"),
    featured: data.featured === true,
    draft: data.draft === true,
    cover: typeof data.cover === "string" ? data.cover : null,
    readingMinutes: Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE)),
    content,
  };
}

export function getPosts(): Post[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  return getPosts().find((p) => p.slug === slug) ?? null;
}

export const categories = (posts: PostSummary[]) => [...new Set(posts.map((p) => p.category))];

/** What a list needs: everything but the body, safe to pass to a client component. */
export const getPostSummaries = (): PostSummary[] =>
  getPosts().map((post) => {
    const summary: Partial<Post> = { ...post };
    delete summary.content;
    return summary as PostSummary;
  });

export { formatDate, type PostSummary } from "./postFormat";
