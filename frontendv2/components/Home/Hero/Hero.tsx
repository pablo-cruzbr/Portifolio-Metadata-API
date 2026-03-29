"use client";
import React from 'react';
import Image from 'next/image';
import Typewriter from 'typewriter-effect';
import { BsArrowRight } from 'react-icons/bs';
import ParticlesHero from './ParticleBackground';

const Hero = () => {
  const scrollToProjects = () => {
    const section = document.getElementById('projects');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden flex-col">
      <ParticlesHero />
      <div className="relative z-10 flex-col items-center"></div>
      <Image
        src="/img/2.svg"
        alt='heroimage'
        width={200}
        height={200}
        className='rounded-full border-8 border-[#0c0c48aa]'
        data-aos="fade-up"
      />
      <h1 data-aos="fade-up" data-aos-delay="200" className="text-2xl sm:text-2xl md:text-5xl lg:text-6xl mt-6 text-center font-bold tracking-wide">
        Transformando Visões em<br /> 
        <span className="text-cyan-200">produtos web de alta performance.</span>
      </h1>

      <h2 data-aos="fade-up" data-aos-delay="400" className="mt-5 text-base px-2 text-center sm:text-2xl font-medium flex flex-wrap justify-center items-center">
        Olá, Me chamo Pablo
        <span className="text-cyan-200 font-bold ml-2">
          <Typewriter
            options={{
              strings: [
                "Desenvolvedor Fullstack",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 50,
              wrapperClassName: "pl-1"
            }}
          />
        </span>
      </h2>

      <button
        onClick={scrollToProjects}
        data-aos="fade-up"
        data-aos-delay="600"
        className="mt-6 px-4 py-2 bg-blue-800 hover:bg-blue-900 transition-all duration-300 cursor-pointer rounded-full text-lg font-medium flex items-center group text-white outline-none"
      >
        <span>Veja meus Trabalhos</span>
        <BsArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}

export default Hero