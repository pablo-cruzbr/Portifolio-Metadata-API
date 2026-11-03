// Post helpers without Node APIs, so client components (the home's blog section) can use them.

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  /** ISO date, "2026-11-03". */
  date: string;
  category: string;
  featured: boolean;
  /** Still being reviewed: shown with a "Rascunho" badge. */
  draft: boolean;
  readingMinutes: number;
  /** Optional image for cards, "/images/blog/...". */
  cover: string | null;
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
