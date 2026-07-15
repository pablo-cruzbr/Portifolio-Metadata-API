"use client"
import React from 'react'
import { NavLinks } from '@/constant/constant'
import Link from 'next/link'
import { CgClose } from 'react-icons/cg'
import { useLang } from '@/context/LanguageContext'
import { translations } from '@/translations'

type Props = {
  showNav: boolean;
  closeNav: () => void;
}

const MobileNav = ({ closeNav, showNav }: Props) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-full";
  const { lang, setLang } = useLang()
  const t = translations[lang].nav

  return (
    <div>
      <div className={`fixed inset-0 ${navOpen} transform transition-all duration-500 z-[100002] bg-black opacity-70 w-full h-screen`} />

      <div className={`text-white ${navOpen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-cyan-950 space-y-6 z-[100050] right-0`}>
        <CgClose
          onClick={closeNav}
          className="absolute top-[2rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 text-white cursor-pointer"
        />
        {NavLinks.map((link, i) => (
          <Link key={link.id} href={link.url} onClick={closeNav}>
            <p className="text-white w-fit text-xl ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">
              {t.links[i]}
            </p>
          </Link>
        ))}

        <button
          onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
          className="ml-12 w-fit flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border border-white/20 bg-white/10 hover:bg-white/20 transition-all"
        >
          <span className={lang === 'pt' ? 'text-white' : 'text-white/40'}>PT</span>
          <span className="text-white/30">/</span>
          <span className={lang === 'en' ? 'text-white' : 'text-white/40'}>EN</span>
        </button>
      </div>
    </div>
  )
}

export default MobileNav
