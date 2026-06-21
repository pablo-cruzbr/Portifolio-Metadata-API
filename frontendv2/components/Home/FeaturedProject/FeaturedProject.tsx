"use client";

import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const techs = ["Next.js", "Node.js", "TypeScript", "AI", "GitHub API"];

const FeaturedProject = () => {
  return (
    <section className="bg-[#050709] py-24">
      <div className="w-[90%] xl:w-[80%] mx-auto">
        <h2
          data-aos="fade-up"
          className="text-center text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Projeto em <span className="text-cyan-400">Destaque</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
        >
          Um olhar mais detalhado sobre meu trabalho mais recente.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              >
                <source src="/videos/bugless-demo.webm" type="video/webm" />
              </video>
            </div>
          </div>

          <div data-aos="fade-left">
            <span className="text-cyan-400 text-sm font-mono tracking-widest uppercase">
              Featured Project
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Bugless
            </h3>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
              <p className="text-gray-300 leading-relaxed">
                Ferramenta de revisão de código com inteligência artificial, criada durante
                uma semana de hackathon com o programa de mentoria Borderless Coding.
                Fornece feedback instantâneo sobre bugs, vulnerabilidades de segurança e
                problemas de desempenho por meio de uma CLI para revisões locais e um
                GitHub App para análise automática de Pull Requests.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {techs.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-[11px] text-cyan-300 uppercase tracking-widest font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://bugless-psi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-cyan-600 rounded-xl hover:bg-cyan-500 transition-all font-semibold text-white shadow-lg shadow-cyan-900/20"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                Live Demo
              </a>
              <a
                href="https://github.com/ProgramadoresSemPatria/HB03-2025_bugless"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 font-semibold text-white"
              >
                <FaGithub className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
