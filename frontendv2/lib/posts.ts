import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { PostSummary, PostText } from "./postFormat";

// Posts are Markdown files in content/posts, one per post; the file name is the slug.
// The English version, when there is one, lives in content/posts/en with the same file
// name and only sets title, description and category: the rest comes from the original.

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const EN_DIR = path.join(POSTS_DIR, "en");
const WORDS_PER_MINUTE = 200;

export interface Post extends PostSummary {
  content: string;
  /** English body; null when the post has no translation. */
  contentEn: string | null;
}

const minutes = (content: string) =>
  Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / WORDS_PER_MINUTE));

function readText(file: string): { text: PostText; content: string; data: Record<string, unknown> } {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    data,
    content,
    text: {
      title: String(data.title),
      description: String(data.description ?? ""),
      category: String(data.category ?? "Geral"),
      readingMinutes: minutes(content),
    },
  };
}

function readPost(file: string): Post {
  const { data, content, text } = readText(path.join(POSTS_DIR, file));
  const enFile = path.join(EN_DIR, file);
  const en = fs.existsSync(enFile) ? readText(enFile) : null;
  return {
    slug: file.replace(/\.md$/, ""),
    ...text,
    date: String(data.date),
    featured: data.featured === true,
    draft: data.draft === true,
    cover: typeof data.cover === "string" ? data.cover : null,
    en: en?.text ?? null,
    content,
    contentEn: en?.content ?? null,
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

/** What a list needs: everything but the bodies, safe to pass to a client component. */
export const getPostSummaries = (): PostSummary[] =>
  getPosts().map((post) => {
    const summary: Partial<Post> = { ...post };
    delete summary.content;
    delete summary.contentEn;
    return summary as PostSummary;
  });

export { formatDate, type PostSummary } from "./postFormat";
