"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import BorderlessLabsBadge from "@/components/Blog/BorderlessLabsBadge";
import PostMeta from "@/components/Blog/PostMeta";
import UsFlag from "@/components/Helper/UsFlag";
import { useLang } from "@/context/LanguageContext";
import { localize, type PostSummary } from "@/lib/postFormat";
import { translations } from "@/translations";

const HONE_LIVE = "https://labs.borderlesscoding.com/ai-mock-interview";

interface Props {
  post: PostSummary;
  /** Both bodies are rendered on the server; the PT/EN switch picks one. */
  bodyPt: ReactNode;
  bodyEn: ReactNode | null;
  newer?: PostSummary;
  older?: PostSummary;
}

export default function PostView({ post, bodyPt, bodyEn, newer, older }: Props) {
  const { lang } = useLang();
  const t = translations[lang].blogPage;
  const text = localize(post, lang);
  const body = lang === "en" && bodyEn ? bodyEn : bodyPt;

  return (
    <article className="mx-auto w-[90%] max-w-2xl" lang={lang === "en" && bodyEn ? "en" : "pt-BR"}>
      <Link href="/blog" className="group inline-flex items-center text-sm text-gray-400 transition-colors hover:text-cyan-300">
        <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> {t.back}
      </Link>

      <header className="mt-8 space-y-5">
        <PostMeta post={post} />
        {post.category === "Hone" && <BorderlessLabsBadge />}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white">{text.title}</h1>
        <p className="text-lg leading-relaxed text-gray-400">{text.description}</p>
        {lang === "en" && !bodyEn && <p className="text-sm text-amber-300">{t.untranslated}</p>}
      </header>

      <hr className="my-10 border-dashed border-white/10" />

      <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-cyan-300 prose-strong:text-white prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-code:text-cyan-200">
        {body}
      </div>

      <hr className="my-12 border-dashed border-white/10" />

      <aside className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <Image
          src="/images/blog/pablo-borderless-conference.jpg"
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full border border-white/10 object-cover object-[92%_center]"
        />
        <div className="space-y-2">
          <p className="font-bold text-white">Pablo Cruz</p>
          <p className="text-sm leading-relaxed text-gray-400">
            {t.authorBio}{" "}
            <a href={HONE_LIVE} target="_blank" rel="noreferrer" className="font-semibold text-cyan-300 hover:underline">
              Hone AI Mock Interview
            </a>
            {t.authorLabs} <UsFlag className="inline h-3 w-auto -translate-y-px rounded-[2px]" /> {t.authorCountry}{" "}
            <Link href="/blog/construindo-a-agnis" className="font-semibold text-cyan-300 hover:underline">
              Agnis
            </Link>
            {t.authorAgnis}
          </p>
          <div className="flex gap-4 text-sm font-semibold">
            <a href="https://www.linkedin.com/in/pablo-cruz-5b937525b/" target="_blank" rel="noreferrer" className="text-white hover:text-cyan-300">
              LinkedIn
            </a>
            <a href="https://github.com/pablo-cruzbr" target="_blank" rel="noreferrer" className="text-white hover:text-cyan-300">
              GitHub
            </a>
          </div>
        </div>
      </aside>

      {(newer || older) && (
        <nav aria-label={t.otherPosts} className="mt-8 grid gap-4 sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="rounded-xl border border-white/10 p-4 transition-all hover:bg-white/5">
              <span className="text-xs text-gray-400">{t.previous}</span>
              <span className="mt-1 block text-sm font-semibold text-white">{localize(older, lang).title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="rounded-xl border border-white/10 p-4 text-right transition-all hover:bg-white/5">
              <span className="text-xs text-gray-400">{t.next}</span>
              <span className="mt-1 block text-sm font-semibold text-white">{localize(newer, lang).title}</span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
