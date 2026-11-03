"use client";
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
import { FiAward, FiBriefcase, FiCheckCircle, FiCode, FiDatabase, FiFolder, FiMapPin, FiUser, FiZap } from 'react-icons/fi';
import ParticlesHero from './ParticleBackground';
import UsFlag from '@/components/Helper/UsFlag';
import { useLang } from '@/context/LanguageContext';
import { translations } from '@/translations';

const STAT_ICONS = [FiDatabase, FiCheckCircle, FiZap, FiAward];

const LIVE = [
  { label: "Hone AI", href: "https://labs.borderlesscoding.com/ai-mock-interview" },
  { label: "Fire OS", href: "https://fire-os-saas.vercel.app/" },
];

// A Link to "/#section" does nothing once the URL already ends in that hash,
// so scroll to the section on every click instead of relying on the router.
const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  const section = document.getElementById(id)
  if (!section) return
  e.preventDefault()
  section.scrollIntoView({ behavior: 'smooth' })
  history.replaceState(null, '', `#${id}`)
}

const Hero = () => {
  const { lang } = useLang()
  const t = translations[lang].hero

  return (
    <div id="home" className="relative isolate min-h-screen flex items-center pt-[16vh] pb-16 bg-[#0C0D1F] text-white overflow-hidden">
      <ParticlesHero />

      <div className="relative z-10 w-[90%] xl:w-[80%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">

          {/* Text */}
          <div data-aos="fade-right" className="flex flex-col items-start">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-200 backdrop-blur-sm">
                <FiMapPin className="w-3.5 h-3.5 text-cyan-400" />
                {t.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm">
                <FiBriefcase className="w-3.5 h-3.5" />
                {t.cofounder}
              </span>
            </div>

            <p className="mt-8 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              {t.eyebrow}
            </p>

            <h1 className="mt-4 text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight">
              Pablo <span className="text-cyan-300">Cruz</span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-gray-400">
              {t.bio}
            </p>

            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {t.highlights.map((h) => (
                <li key={h.text} className="flex items-start gap-2.5 text-sm text-gray-200">
                  {h.icon === "us" ? (
                    <UsFlag className="mt-1 h-3 w-auto shrink-0 rounded-[2px]" />
                  ) : (
                    <span className="shrink-0" aria-hidden="true">{h.icon}</span>
                  )}
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/#featured-projects"
                onClick={scrollToSection('featured-projects')}
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0C0D1F] shadow-lg shadow-cyan-900/20 transition-all hover:bg-cyan-50"
              >
                <FiFolder className="w-4 h-4" />
                {t.cta}
                <BsArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <FiCode className="w-4 h-4" />
                {t.blog}
                <BsArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#about"
                onClick={scrollToSection('about')}
                className="group inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <FiUser className="w-4 h-4" />
                {t.about}
                <BsArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="text-gray-500">{t.liveLabel}</span>
              {LIVE.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-300 transition-colors hover:text-cyan-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  {l.label} ↗
                </a>
              ))}
              <span className="rounded-full border border-orange-400/30 bg-orange-400/10 px-2.5 py-0.5 text-xs font-semibold text-orange-300">
                {t.building}
              </span>
            </div>
          </div>

          {/* Photo and floating cards */}
          <div data-aos="fade-left" data-aos-delay="200" className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
            <div
              className="relative aspect-square lg:aspect-[5/4] overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              style={{ boxShadow: "0 0 80px rgba(34,211,238,0.12)" }}
            >
              <Image
                src="/img/2.svg"
                alt="Pablo Cruz"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-[center_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D1F]/50 via-transparent to-transparent" />
            </div>

            <div className="hero-float absolute -bottom-6 right-4 sm:-right-4 flex items-center gap-2.5 rounded-2xl border border-emerald-400/30 bg-[#0C0D1F]/90 px-5 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-900/20 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              {t.available}
            </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4">
              {t.stats.map((s, i) => {
                const Icon = STAT_ICONS[i]
                return (
                  <div
                    key={s.label}
                    className="hero-float flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 backdrop-blur-md transition-colors hover:border-cyan-400/30"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span>
                      <span className="block text-xl sm:text-2xl font-bold leading-none">{s.value}</span>
                      <span className="mt-1.5 block text-xs text-gray-400">{s.label}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
