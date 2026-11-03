import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import BlogCard from './BlogCard'
import type { PostSummary } from '@/lib/postFormat'
import { useLang } from '@/context/LanguageContext'
import { translations } from '@/translations'

const Blog = ({ posts }: { posts: PostSummary[] }) => {
  const { lang } = useLang()
  const t = translations[lang].blog
  // The featured post (the Hone story) always comes first.
  const latest = [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)].slice(0, 3)

  if (latest.length === 0) return null

  return (
    <section id="blog" className='bg-[#0C0D1F] pt-24 pb-24'>
      <h2 className="text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white">
        {t.title} <span className="text-cyan-300">{t.highlight}</span>
      </h2>
      <p className="mt-4 text-center text-gray-400">{t.subtitle}</p>
      <div className="w-[90%] xl:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-16">
        {latest.map((post, i) => (
          <div key={post.slug} data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-delay={i * 100}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-all"
        >
          {t.all}
          <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}

export default Blog
