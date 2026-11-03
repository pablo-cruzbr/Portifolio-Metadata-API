import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PostMeta from '@/components/Blog/PostMeta'
import { localize, type PostSummary } from '@/lib/postFormat'
import { useLang } from '@/context/LanguageContext'

const BlogCard = ({ post }: { post: PostSummary }) => {
  const { lang } = useLang()
  const text = localize(post, lang)
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-white/[0.03] transition-all duration-300 hover:bg-white/[0.06] ${
        post.featured ? "border-cyan-400/30" : "border-white/10"
      }`}
    >
      {post.cover && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(min-width: 1280px) 26vw, (min-width: 768px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <PostMeta post={post} />
        <h3 className="text-lg sm:text-xl font-bold leading-snug text-white transition-colors group-hover:text-cyan-300">
          {text.title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-400">{text.description}</p>
      </div>
    </Link>
  )
}

export default BlogCard
