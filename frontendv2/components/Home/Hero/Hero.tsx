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
    <div id="home" className="relative h-screen flex items-center justify-center pt-[14vh] text-white flex-col">
      <ParticlesHero />

      <div className="relative z-10 flex flex-col items-center">
        <span
          data-aos="fade-down"
          className="text-xs font-mono text-cyan-700/80 mb-4 tracking-wider"
        >
          // hello world &mdash; available for hire
        </span>

        <div
          data-aos="fade-up"
          className="relative"
          style={{ filter: "drop-shadow(0 0 24px rgba(34,211,238,0.25))" }}
        >
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl scale-110" />
          <Image
            src="/img/2.svg"
            alt="heroimage"
            width={200}
            height={200}
            className="relative rounded-full border-4 border-cyan-500/30"
          />
          <span className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-green-400 border-2 border-[#0C0D1F] shadow-lg shadow-green-500/50" />
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="flex flex-wrap justify-center gap-2 mt-5"
        >
          {techBadges.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-3 py-1 rounded-full font-mono text-cyan-400 border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <h1
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-6 text-center font-bold tracking-wide"
        >
          Transformando Visões em<br />
          <span className="text-cyan-200">produtos web de alta performance.</span>
        </h1>

        <h2
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-4 text-base px-2 text-center sm:text-xl font-medium flex flex-wrap justify-center items-center gap-2 text-gray-400"
        >
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

        <button
          onClick={scrollToProjects}
          data-aos="fade-up"
          data-aos-delay="600"
          className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 cursor-pointer rounded-full text-base font-semibold flex items-center group text-white outline-none shadow-lg shadow-cyan-900/30 hover:shadow-cyan-700/40"
        >
          <span>Veja meus Projetos</span>
          <BsArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
