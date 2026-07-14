"use client";
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import { BsArrowRight } from 'react-icons/bs';
import ParticlesHero from './ParticleBackground';

const techBadges = ["React", "Node.js", "TypeScript", "Next.js", "PostgreSQL"];

const Hero = () => {
  const scrollToProjects = () => {
    const section = document.getElementById('featured-projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative min-h-screen flex items-center pt-[14vh] pb-12 text-white">
      <ParticlesHero />

      <div className="relative z-10 w-[90%] xl:w-[80%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Avatar — first in DOM → appears on top on mobile */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="flex justify-center lg:justify-end lg:order-last"
          >
            <div
              className="relative"
              style={{ filter: "drop-shadow(0 0 48px rgba(34,211,238,0.28))" }}
            >
              <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl scale-125" />
              <Image
                src="/img/2.svg"
                alt="heroimage"
                width={300}
                height={300}
                className="relative rounded-full border-4 border-cyan-500/30"
              />
              <span className="absolute bottom-4 right-4 w-5 h-5 rounded-full bg-green-400 border-2 border-[#0C0D1F] shadow-lg shadow-green-500/50" />
            </div>
          </div>

          {/* Text content — forced to left column on desktop */}
          <div data-aos="fade-right" className="flex flex-col items-start lg:order-first">
            <span className="text-xs font-mono text-cyan-700/80 mb-5 tracking-wider">
              // hello world &mdash; available for hire
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight">
              Transformando Visões em{" "}
              <span className="text-cyan-200">produtos web de alta performance.</span>
            </h1>

            <h2 className="mt-5 text-lg sm:text-2xl font-medium flex flex-wrap items-center gap-2 text-gray-400">
              <span>Pablo Cruz</span>
              <span className="text-white/20">·</span>
              <span className="text-[#01A7C0] font-semibold">
                <Typewriter
                  options={{
                    strings: [
                      "Fullstack Developer",
                      "Typescript & Node.js",
                      "SaaS Builder",
                      "AI & LLM Developer",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 40,
                    wrapperClassName: "pl-1",
                  }}
                />
              </span>
            </h2>

            <div className="flex flex-wrap gap-2 mt-5">
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] px-3 py-1 rounded-full font-mono text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <button
              onClick={scrollToProjects}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 cursor-pointer rounded-full text-base font-semibold flex items-center group text-white outline-none shadow-lg shadow-cyan-900/30 hover:shadow-cyan-700/40"
            >
              <span>Veja meus Projetos</span>
              <BsArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
