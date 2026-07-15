"use client"
import React from 'react'
import { NavLinks } from '@/constant/constant'
import Link from 'next/link'
import { CgClose } from 'react-icons/cg'
import { HiLanguage } from 'react-icons/hi2'
import { FaCode, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { BiCloudDownload } from 'react-icons/bi'
import { useLang } from '@/context/LanguageContext'
import { translations } from '@/translations'

type Props = {
  showNav: boolean;
  closeNav: () => void;
}

const socials = [
  { icon: FaGithub,    href: "https://github.com/pablo-cruzbr" },
  { icon: FaLinkedin,  href: "https://www.linkedin.com/in/pablo-cruz-5b937525b/" },
  { icon: FaInstagram, href: "https://www.instagram.com/pablocruzdev/" },
]

const MobileNav = ({ closeNav, showNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-full";
  const { lang, setLang } = useLang()
  const t = translations[lang].nav

  return (
    <div>
      {/* Backdrop */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 ${navOpen} transform transition-all duration-500 z-[100002] bg-black/70 backdrop-blur-sm w-full h-screen`}
      />

      {/* Drawer */}
      <div className={`${navOpen} fixed right-0 top-0 h-full w-[85%] sm:w-[60%] md:w-[45%] transform transition-all duration-500 delay-100 z-[100050] flex flex-col`}
        style={{ background: "linear-gradient(160deg, #080d1a 0%, #0a1020 60%, #061018 100%)" }}
      >
        {/* Top border accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <Link href="/" onClick={closeNav} className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center group-hover:bg-cyan-400 transition-colors duration-300">
              <FaCode className="w-4 h-4 text-black" />
            </div>
            <span className="text-white font-bold text-lg">Pablo Cruz</span>
          </Link>

          <button
            onClick={closeNav}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all"
          >
            <CgClose className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
          {NavLinks.map((link, i) => (
            <Link
              key={link.id}
              href={link.url}
              onClick={closeNav}
              className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/[0.08] transition-all group"
            >
              <span className="text-[10px] font-mono text-cyan-500/60 w-4 shrink-0">
                0{i + 1}
              </span>
              <span className="text-white/80 group-hover:text-white font-medium text-base transition-colors">
                {t.links[i]}
              </span>
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-500/0 group-hover:bg-cyan-500/60 transition-all" />
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mx-6 h-px bg-white/[0.06]" />

        {/* Bottom actions */}
        <div className="px-6 py-6 space-y-3">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-all"
          >
            <HiLanguage className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-sm font-medium text-white/60">Language</span>
            <div className="ml-auto flex items-center gap-1.5 text-xs font-bold">
              <span className={lang === 'pt' ? 'text-white' : 'text-white/30'}>PT</span>
              <span className="text-white/20">/</span>
              <span className={lang === 'en' ? 'text-white' : 'text-white/30'}>EN</span>
            </div>
          </button>

          {/* CV button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#01A7C0] hover:bg-[#019ab1] transition-all text-white font-semibold text-sm">
            <BiCloudDownload className="w-5 h-5" />
            {t.downloadCV}
          </button>

          {/* Social links */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {socials.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all text-white/60 hover:text-white"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </div>
    </div>
  )
}

export default MobileNav
