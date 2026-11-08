"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaBrain, FaIndustry, FaLaptopCode, FaRocket, FaServer } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import career, { type CareerStep } from '@/constants/career'
import { useLang } from '@/context/LanguageContext'
import { translations } from '@/translations'

const ICONS: Record<CareerStep['icon'], IconType> = {
  infra: FaServer,
  freelance: FaLaptopCode,
  rollout: FaRocket,
  ai: FaBrain,
  industry: FaIndustry,
}

// Horizontal timeline: a rail with one node per step and the cards hanging below it.
// The track scrolls with native scroll-snap (swipe on touch, arrows or the keyboard on desktop).
const Career = () => {
  const { lang } = useLang()
  const t = translations[lang].career
  const trackRef = useRef<HTMLOListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const [progress, setProgress] = useState(0)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 })
    setProgress(max > 0 ? el.scrollLeft / max : 1)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('li')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * (card?.clientWidth ?? 320), behavior: reduce ? 'auto' : 'smooth' })
  }

  const arrow = (disabled: boolean) =>
    `flex h-11 w-11 items-center justify-center rounded-full border transition-all ${
      disabled
        ? 'cursor-not-allowed border-white/5 text-gray-600'
        : 'border-white/15 bg-white/5 text-white hover:border-cyan-400/50 hover:bg-cyan-400/10'
    }`

  return (
    <section id="career" className="scroll-mt-[12vh] bg-[#0C0D1F] py-24">
      <div className="w-[90%] xl:w-[80%] mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-sm text-cyan-400">{"// career"}</p>
            <h2 className="mt-3 text-3xl md:text-4xl xl:text-5xl font-bold text-white">
              {t.title} <span className="text-cyan-300">{t.highlight}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-gray-400">{t.subtitle}</p>
          </div>
          <div className="flex shrink-0 gap-3">
            <button type="button" onClick={() => scroll(-1)} disabled={edges.start} aria-label={t.previous} className={arrow(edges.start)}>
              <FaArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button type="button" onClick={() => scroll(1)} disabled={edges.end} aria-label={t.next} className={arrow(edges.end)}>
              <FaArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* How far along the track the reader is */}
        <div className="mt-10 h-1 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-[width] duration-150"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>

        <div className="relative mt-8">
          {/* Edge fades hint that there is more to scroll */}
          <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#0C0D1F] to-transparent transition-opacity ${edges.start ? 'opacity-0' : 'opacity-100'}`} />
          <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#0C0D1F] to-transparent transition-opacity ${edges.end ? 'opacity-0' : 'opacity-100'}`} />

          <ol
            ref={trackRef}
            onScroll={update}
            tabIndex={0}
            aria-label={t.trackLabel}
            className="flex snap-x snap-mandatory overflow-x-auto pb-4 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-2xl [&::-webkit-scrollbar]:hidden"
          >
            {career.map((step, i) => {
              const text = step[lang]
              const Icon = ICONS[step.icon]
              const last = i === career.length - 1
              return (
                <li key={step.start} className="flex w-[85%] shrink-0 snap-start flex-col pr-5 sm:w-[340px]">
                  {/* Rail segment with the node; segments touch so the rail reads as one line */}
                  <div className="relative flex h-12 items-center">
                    <span
                      className={`absolute left-6 right-0 top-1/2 h-px -translate-y-1/2 ${
                        last ? 'bg-gradient-to-r from-emerald-400/60 to-transparent' : step.current ? 'bg-emerald-400/50' : 'bg-cyan-400/30'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                      {step.current && <span className="absolute inset-0 rounded-full bg-emerald-400/20 motion-safe:animate-ping" aria-hidden="true" />}
                      <span
                        className={`relative flex h-12 w-12 items-center justify-center rounded-full border ${
                          step.current ? 'border-emerald-400/60 bg-emerald-400/15 text-emerald-300' : 'border-cyan-400/40 bg-[#101433] text-cyan-300'
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </span>
                  </div>

                  <p className="mt-4 font-mono text-sm text-cyan-300">{text.period}</p>

                  <article
                    className={`mt-3 flex flex-1 flex-col rounded-2xl border p-5 transition-colors ${
                      step.current ? 'border-emerald-400/30 bg-emerald-400/4' : 'border-white/10 bg-white/3 hover:border-cyan-400/30'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold leading-snug text-white">{text.role}</h3>
                      {step.current && (
                        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                          {t.current}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-400">{text.org}</p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-300">
                      {text.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      {step.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Career
