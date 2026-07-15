"use client"
import React from 'react'
import ServiceCard from './ServiceCard'
import { useLang } from '@/context/LanguageContext'
import { translations } from '@/translations'

const Services = () => {
  const { lang } = useLang()
  const t = translations[lang].services

  return (
    <div className="pt-16 pb-16">
      <p className="text-center text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-3">
        {t.label}
      </p>
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-white">
        {t.headline}{" "}
        <span className="text-cyan-400">{t.headlineSpan}</span>
      </h1>
      <div data-aos="fade-right" data-aos-anchor-placement="top-center" className="w-[90%] sm:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20 items-start">
        {t.cards.map((card, i) => (
          <div key={i} data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-delay={(i + 1) * 100}>
            <ServiceCard
              icon={`/img/s${i === 0 ? 5 : i + 1}.webp`}
              name={card.name}
              description={card.description}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
