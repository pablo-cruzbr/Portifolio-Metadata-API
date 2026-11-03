import React from 'react'
import Image from 'next/image'
import { FaInstagram } from 'react-icons/fa'
import { useLang } from '@/context/LanguageContext'
import { translations } from '@/translations'

const INSTAGRAM = "https://www.instagram.com/pablocruzdev/"

const About = () => {
  const { lang } = useLang()
  const t = translations[lang].about

  return (
    <section id="about" className="scroll-mt-[12vh] bg-[#0C0D1F] py-24">
      <div className="w-[90%] xl:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">

        <div data-aos="fade-right">
          <p className="font-mono text-sm text-cyan-400">{"// about"}</p>
          <h2 className="mt-3 text-3xl md:text-4xl xl:text-5xl font-bold text-white">
            {t.title} <span className="text-cyan-300">{t.highlight}</span>
          </h2>
          <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-gray-400">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <blockquote className="mt-8 border-l-2 border-cyan-400/60 pl-5 text-lg sm:text-xl font-semibold italic text-white">
            “{t.quote}”
            <span className="mt-1 block text-xs font-normal not-italic text-gray-500">{t.quoteSource}</span>
          </blockquote>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-600 via-pink-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-900/20 transition-opacity hover:opacity-90"
          >
            <FaInstagram className="w-4 h-4" />
            {t.follow} @pablocruzdev
            <span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
        </div>

        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noreferrer"
          aria-label={`${t.follow} @pablocruzdev`}
          data-aos="fade-left"
          data-aos-delay="150"
          className="group mx-auto block w-full max-w-md"
        >
          {/* Phone-like frame around the profile print */}
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-3 shadow-2xl shadow-black/40 transition-transform duration-500 group-hover:-translate-y-1">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white">
              <div className="flex items-center gap-2 border-b border-black/5 px-4 py-2.5 text-sm font-semibold text-gray-900">
                <FaInstagram className="w-4 h-4 text-pink-600" />
                Instagram
              </div>
              <Image
                src="/images/instagram-pablocruzdev-perfil.jpg"
                alt={t.alt}
                width={1520}
                height={2550}
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </a>

      </div>
    </section>
  )
}

export default About
