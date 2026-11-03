// Post helpers without Node APIs, so client components (the home's blog section) can use them.

import type { Lang } from "@/translations";

/** The parts of a post that change with the language. */
export interface PostText {
  title: string;
  description: string;
  category: string;
  readingMinutes: number;
}

export interface PostSummary extends PostText {
  slug: string;
  /** ISO date, "2026-11-03". */
  date: string;
  featured: boolean;
  /** Still being reviewed: shown with a "Rascunho" badge. */
  draft: boolean;
  /** Optional image for cards, "/images/blog/...". */
  cover: string | null;
  /** English title, description and category; null falls back to Portuguese. */
  en: PostText | null;
}

/** The post's text in the chosen language, falling back to Portuguese. */
export const localize = (post: PostSummary, lang: Lang): PostText => (lang === "en" && post.en ? post.en : post);

export const formatDate = (iso: string, lang: Lang = "pt") =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString(lang === "en" ? "en-US" : "pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
