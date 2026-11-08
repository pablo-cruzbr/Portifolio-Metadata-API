"use client";

import Image from "next/image";
import Link from "next/link";
import BorderlessLabsBadge from "@/components/Blog/BorderlessLabsBadge";
import PostMeta from "@/components/Blog/PostMeta";
import { useLang } from "@/context/LanguageContext";
import { localize, type PostSummary } from "@/lib/postFormat";
import { translations } from "@/translations";

const HONE_LIVE = "https://labs.borderlesscoding.com/ai-mock-interview";
const HONE_IMAGE = "/images/blog/hone-landing-page.webp";
const AGNIS_SLUG = "construindo-a-agnis";

const chip = (selected: boolean) =>
  `px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
    selected ? "bg-[#01A7C0] border-[#01A7C0] text-white" : "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
  }`;

/** The /blog page body; client-side so it follows the PT/EN switch in the nav. */
export default function BlogIndex({ all, active }: { all: PostSummary[]; active: string | null }) {
  const { lang } = useLang();
  const t = translations[lang].blogPage;

  const honePost = all.find((p) => p.featured);
  const agnisPost = all.find((p) => p.slug === AGNIS_SLUG);
  // Unfiltered, the featured post already sits in the banner above the list.
  // The filter key is the Portuguese category, so links work in both languages.
  const posts = active ? all.filter((p) => p.category === active) : all.filter((p) => p !== honePost);
  const categories = [...new Map(all.map((p) => [p.category, localize(p, lang).category])).entries()];
  const hone = honePost && localize(honePost, lang);

  return (
    <div className="mx-auto w-[90%] max-w-4xl">
      <p className="font-mono text-sm text-cyan-400">{"// blog"}</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">
        {t.title} <span className="text-cyan-300">{t.highlight}</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-400">{t.subtitle}</p>

      {honePost && hone && (
        <section className="relative mt-12 overflow-hidden rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
          <div className="grid md:grid-cols-[1fr_1.1fr]">
            {/* The landing page is a wide screenshot: contain it on its own light background instead of cropping. */}
            <div className="relative min-h-56 bg-[#eef9f5]">
              <Image
                src={HONE_IMAGE}
                alt="Landing page do Hone: Practice the interview that decides your career"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col gap-4 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-400">
                  {t.cofounder}
                </span>
                <BorderlessLabsBadge />
              </div>
              <h2 className="text-2xl font-bold text-white">{hone.title}</h2>
              <p className="text-sm leading-relaxed text-gray-300">{hone.description}</p>
              <p className="flex items-start gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-2 text-xs leading-relaxed text-emerald-200">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>
                  <span className="font-bold text-emerald-300">{t.newsLabel}</span> {t.news}
                </span>
              </p>
              <dl className="grid grid-cols-3 gap-3 border-y border-white/10 py-4">
                {t.honeStats.map((s) => (
                  <div key={s.label}>
                    <dd className="text-xl font-bold text-white">{s.value}</dd>
                    <dt className="text-xs text-gray-400">{s.label}</dt>
                  </div>
                ))}
              </dl>
              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/blog/${honePost.slug}`}
                  className="px-5 py-2.5 rounded-lg bg-[#01A7C0] hover:bg-[#019ab1] text-sm font-semibold text-white transition-all"
                >
                  {t.readStory}
                </Link>
                <a
                  href={HONE_LIVE}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-all"
                >
                  {t.tryHone}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {agnisPost && (
        <Link
          href={`/blog/${agnisPost.slug}`}
          className="group mt-4 flex flex-col gap-3 rounded-2xl border border-orange-400/20 bg-orange-400/[0.06] p-5 transition-all hover:bg-orange-400/10 sm:flex-row sm:items-center sm:gap-5"
        >
          <span className="w-fit shrink-0 rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-bold text-orange-300">
            {t.agnisBadge}
          </span>
          <span className="flex-1 text-sm text-gray-300">
            <span className="font-bold text-white">Agnis</span>, {t.agnisText}
          </span>
          <span className="shrink-0 text-sm font-semibold text-orange-300 transition-transform group-hover:translate-x-1">
            {t.read}
          </span>
        </Link>
      )}

      <nav aria-label={t.categoriesLabel} className="mt-12 flex flex-wrap gap-2">
        <Link href="/blog" className={chip(!active)}>
          {t.all}
        </Link>
        {categories.map(([key, label]) => (
          <Link key={key} href={`/blog?category=${encodeURIComponent(key)}`} className={chip(active === key)}>
            {label}
          </Link>
        ))}
      </nav>

      {posts.length === 0 && <p className="mt-12 text-gray-400">{t.empty}</p>}

      <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
        {posts.map((post) => {
          const text = localize(post, lang);
          return (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block space-y-3 py-8">
                <PostMeta post={post} />
                <h2 className="text-xl md:text-2xl font-bold text-white transition-colors group-hover:text-cyan-300">
                  {text.title}
                </h2>
                <p className="leading-relaxed text-gray-400">{text.description}</p>
                <span className="inline-block text-sm font-semibold text-cyan-300 opacity-70 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                  {t.read}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
