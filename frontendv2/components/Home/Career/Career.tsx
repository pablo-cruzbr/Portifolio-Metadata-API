import React from 'react'
import career from '@/constants/career'
import { useLang } from '@/context/LanguageContext'
import { translations } from '@/translations'

const Career = () => {
  const { lang } = useLang()
  const t = translations[lang].career

  return (
    <section id="career" className="scroll-mt-[12vh] bg-[#0C0D1F] py-24">
      <div className="w-[90%] xl:w-[80%] mx-auto max-w-5xl">
        <p className="font-mono text-sm text-cyan-400">{"// career"}</p>
        <h2 className="mt-3 text-3xl md:text-4xl xl:text-5xl font-bold text-white">
          {t.title} <span className="text-cyan-300">{t.highlight}</span>
        </h2>
        <p className="mt-4 max-w-2xl text-gray-400">{t.subtitle}</p>

        <ol className="relative mt-14 border-l border-white/10 md:ml-44">
          {career.map((step, i) => {
            const text = step[lang]
            return (
              <li key={step.start} className="relative pb-12 pl-8 last:pb-0" data-aos="fade-up" data-aos-delay={i * 80}>
                {/* Dot on the line; roles still running get a pulsing ring */}
                <span className="absolute -left-[7px] top-1.5 flex h-3.5 w-3.5 items-center justify-center" aria-hidden="true">
                  {step.current && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />}
                  <span className={`relative h-3.5 w-3.5 rounded-full border-2 border-[#0C0D1F] ${step.current ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
                </span>

                {/* Period: beside the line on desktop, above the card on mobile */}
                <p className="mb-2 font-mono text-sm text-cyan-300 md:absolute md:-left-44 md:top-0.5 md:mb-0 md:w-36 md:text-right">
                  {text.period}
                </p>

                <div className="rounded-2xl border border-white/10 bg-white/3 p-5 sm:p-6 transition-colors hover:border-cyan-400/30">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{text.role}</h3>
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
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default Career
