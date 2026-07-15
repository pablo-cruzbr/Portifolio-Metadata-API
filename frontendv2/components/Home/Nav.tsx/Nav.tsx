"use client"
import { NavLinks } from '@/constant/constant'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiCloudDownload } from 'react-icons/bi'
import { FaCode, FaGithub } from "react-icons/fa"
import { HiBars3BottomRight, HiLanguage } from 'react-icons/hi2'
import { useLang } from '@/context/LanguageContext'
import { translations } from '@/translations'

type Props = {
  openNav: () => void;
}

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false)
  const { lang, setLang } = useLang()
  const t = translations[lang].nav

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed w-full transition-all duration-200 h-[12vh] z-[100] flex items-center
            ${navBg ? "bg-[#0C0D1F] shadow-lg" : "bg-transparent"}
            ${!navBg && "backdrop-blur-sm bg-[#0C0D1F]/50"}`}>
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-cyan-400 transition-colors duration-300">
            <FaCode className="w-5 h-5 text-black" />
          </div>
          <h1 className="text-xl hidden sm:block md:text-2xl text-white font-bold">
            Pablo
          </h1>
        </Link>

        <div className="hidden lg:flex items-center space-x-10">
          {NavLinks.map((link, i) => (
            <Link
              key={link.id}
              href={link.url}
              className="text-base hover:text-cyan-300 text-white font-medium transition-all duration-200"
            >
              {t.links[i]}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/pablo-cruzbr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 transition-all duration-200 text-white"
          >
            <FaGithub className="w-5 h-5" />
          </a>

          <button
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 text-white"
          >
            <HiLanguage className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className={lang === 'pt' ? 'text-white' : 'text-white/35'}>PT</span>
            <span className="text-white/20">/</span>
            <span className={lang === 'en' ? 'text-white' : 'text-white/35'}>EN</span>
          </button>

          <button className="px-6 py-2.5 text-sm cursor-pointer rounded-lg bg-[#01A7C0] hover:bg-[#019ab1] transition-all duration-300 text-white flex items-center space-x-2">
            <BiCloudDownload className="w-5 h-5" />
            <span className="font-semibold">{t.downloadCV}</span>
          </button>

          <HiBars3BottomRight onClick={openNav} className="w-8 h-8 cursor-pointer text-white lg:hidden" />
        </div>
      </div>
    </nav>
  )
}

export default Nav
