"use client"
import React from 'react'
import { SiJavascript, SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiTypescript, SiPrisma, SiOpenai, SiVercel, SiExpo, SiRedis, SiTailwindcss } from 'react-icons/si';
import Tilt from "react-parallax-tilt";
import { useLang } from '@/context/LanguageContext';
import { translations } from '@/translations';

const skills = [
  {
    name: "JavaScript",
    icon: <SiJavascript />,
    color: "#F7DF1E",
    label: "ES2024+",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "#3178C6",
    label: "v5",
  },
  {
    name: "React.js",
    icon: <SiReact />,
    color: "#61DAFB",
    label: "v19",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    color: "#ffffff",
    label: "v16",
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs />,
    color: "#339933",
    label: "v22",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    color: "#4169E1",
    label: "v16",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "#06B6D4",
    label: "v4",
  },
  {
    name: "Prisma",
    icon: <SiPrisma />,
    color: "#5a67d8",
    label: "ORM",
  },
  {
    name: "OpenAI",
    icon: <SiOpenai />,
    color: "#ffffff",
    label: "GPT & API",
  },
  {
    name: "Vercel AI SDK",
    icon: <SiVercel />,
    color: "#ffffff",
    label: "LLM SDK",
  },
  {
    name: "Expo",
    icon: <SiExpo />,
    color: "#ffffff",
    label: "React Native",
  },
  {
    name: "Redis",
    icon: <SiRedis />,
    color: "#DC382D",
    label: "Cache & Queue",
  },
]

const Skills = () => {
  const { lang } = useLang()
  const t = translations[lang].skills

  return (
    <div id="skills" className="pt-16 pb-16 text-white">
      <div className="text-center mb-3">
        <span className="text-xs font-mono text-cyan-600 tracking-widest">{t.tag}</span>
      </div>
      <h1 className="text-center text-2xl md:text-4xl xl:text-5xl font-bold text-white">
        {t.title} <span className="text-cyan-300">{t.titleSpan}</span>
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mt-16">
        {skills.map((skil, i) => (
          <Tilt key={skil.name} scale={1.12} transitionSpeed={400} glareEnable glareMaxOpacity={0.08} glareColor={skil.color}>
            <div
              data-aos="flip-right"
              data-aos-delay={i * 100}
              className="relative text-center w-40 h-48 rounded-3xl flex flex-col items-center justify-center shadow-lg transition-all duration-300 overflow-hidden cursor-default"
              style={{
                background: `linear-gradient(145deg, ${skil.color}10, #090d1a)`,
                border: `1px solid ${skil.color}25`,
                boxShadow: `0 4px 30px ${skil.color}10`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 40px ${skil.color}08` }}
              />

              <div
                className="text-5xl mb-3 transition-transform duration-300 hover:scale-110"
                style={{ color: skil.color, filter: `drop-shadow(0 0 8px ${skil.color}60)` }}
              >
                {skil.icon}
              </div>

              <p className="font-bold text-sm text-gray-200">{skil.name}</p>

              <span
                className="mt-2 text-[10px] font-mono px-2 py-0.5 rounded-full"
                style={{
                  color: skil.color,
                  background: `${skil.color}15`,
                  border: `1px solid ${skil.color}30`,
                }}
              >
                {skil.label}
              </span>
            </div>
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default Skills
