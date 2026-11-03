"use client";

import { formatDate, localize, type PostSummary } from "@/lib/postFormat";
import { useLang } from "@/context/LanguageContext";
import { translations } from "@/translations";

export default function PostMeta({ post }: { post: PostSummary }) {
  const { lang } = useLang();
  const t = translations[lang].blogPage;
  const text = localize(post, lang);

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-400">
      <span className="rounded-full bg-blue-950 px-3 py-1 font-bold text-white">{text.category}</span>
      <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
      <span aria-hidden="true">·</span>
      <span>
        {text.readingMinutes} {t.minRead}
      </span>
      {post.draft && (
        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-bold text-amber-300">
          {t.draft}
        </span>
      )}
    </div>
  );
}
