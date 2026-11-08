import React from 'react'
import Link from 'next/link'
import PostCover from '@/components/Blog/PostCover'
import PostMeta from '@/components/Blog/PostMeta'
import { localize, type PostSummary } from '@/lib/postFormat'
import { useLang } from '@/context/LanguageContext'
import { translations } from '@/translations'

/** "featured" is the large card that opens the home's latest posts; "compact" is a row in the list beside it. */
const BlogCard = ({ post, variant }: { post: PostSummary; variant: 'featured' | 'compact' }) => {
  const { lang } = useLang()
  const text = localize(post, lang)
  const t = translations[lang].blogPage

  if (variant === 'compact') {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-3 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/6"
      >
        <div className="relative aspect-4/3 w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
          <PostCover cover={post.cover} category={text.category} sizes="144px" />
        </div>
        <div className="min-w-0 flex-1 space-y-2 pr-2">
          <PostMeta post={post} />
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-white transition-colors group-hover:text-cyan-300">
            {text.title}
          </h3>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-400/30 bg-white/3 transition-all duration-300 hover:bg-white/6"
    >
      <div className="relative aspect-video overflow-hidden">
        <PostCover cover={post.cover} category={text.category} sizes="(min-width: 1024px) 50vw, 90vw" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <PostMeta post={post} />
        <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-white transition-colors group-hover:text-cyan-300">
          {text.title}
        </h3>
        <p className="line-clamp-3 leading-relaxed text-gray-400">{text.description}</p>
        <span className="mt-auto inline-block text-sm font-semibold text-cyan-300 transition-transform group-hover:translate-x-1">
          {t.read}
        </span>
      </div>
    </Link>
  )
}

export default BlogCard
