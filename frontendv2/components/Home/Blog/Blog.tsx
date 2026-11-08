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
  // The featured post (the Hone story) opens the section as the large card; the next ones go in the list beside it.
  const [main, ...rest] = [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)].slice(0, 4)

  if (!main) return null

  return (
    <section id="blog" className='bg-[#0C0D1F] pt-24 pb-24'>
      <div className="w-[90%] xl:w-[80%] mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-sm text-cyan-400">{"// blog"}</p>
            <h2 className="mt-3 text-2xl md:text-4xl xl:text-5xl font-bold text-white">
              {t.title} <span className="text-cyan-300">{t.highlight}</span>
            </h2>
            <p className="mt-4 text-gray-400">{t.subtitle}</p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex w-fit shrink-0 items-center gap-2 px-6 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-semibold text-white transition-all"
          >
            {t.all}
            <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div data-aos="fade-right" data-aos-anchor-placement="top-center">
            <BlogCard post={main} variant="featured" />
          </div>
          {rest.length > 0 && (
            <div className="flex flex-col gap-4">
              {rest.map((post, i) => (
                <div key={post.slug} data-aos="fade-left" data-aos-anchor-placement="top-center" data-aos-delay={(i + 1) * 100}>
                  <BlogCard post={post} variant="compact" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Blog
