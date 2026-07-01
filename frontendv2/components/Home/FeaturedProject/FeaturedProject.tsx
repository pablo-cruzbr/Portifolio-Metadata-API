"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import featuredProjects, { FeaturedProjectData } from "@/constants/featuredProjects";

const accentClasses: Record<string, { badge: string; glow: string; button: string; label: string }> = {
  cyan: {
    badge: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    glow: "from-cyan-500/20 to-blue-500/20",
    button: "bg-[#01A7C0] hover:bg-[#019ab1] shadow-cyan-900/20",
    label: "text-cyan-400",
  },
  orange: {
    badge: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    glow: "from-orange-500/20 to-red-500/20",
    button: "bg-[#01A7C0] hover:bg-[#019ab1] shadow-cyan-900/20",
    label: "text-orange-400",
  },
  purple: {
    badge: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    glow: "from-purple-500/20 to-indigo-500/20",
    button: "bg-[#01A7C0] hover:bg-[#019ab1] shadow-cyan-900/20",
    label: "text-purple-400",
  },
};

const ProjectRow = ({ project, index }: { project: FeaturedProjectData; index: number }) => {
  const accent = accentClasses[project.accentColor];
  const reversed = index % 2 !== 0;

  return (
    <div className={`grid grid-cols-1 gap-10 items-center ${reversed ? "lg:grid-cols-[2fr_3fr]" : "lg:grid-cols-[3fr_2fr]"} ${index > 0 ? "mt-32" : ""}`}>
      <div
        data-aos={reversed ? "fade-left" : "fade-right"}
        className={`relative group ${reversed ? "lg:order-2" : ""}`}
      >
        <div className={`absolute -inset-2 bg-gradient-to-r ${accent.glow} rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <video autoPlay loop muted playsInline className="w-full h-auto block">
            <source src={project.video.src} type={project.video.type} />
          </video>
        </div>
      </div>

      <div data-aos={reversed ? "fade-right" : "fade-left"} className={reversed ? "lg:order-1" : ""}>
        <span className={`text-xs font-mono tracking-widest uppercase ${accent.label}`}>
          {project.label}
        </span>
        <h3 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
          {project.title}
        </h3>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-5">
          <p className="text-gray-300 leading-relaxed text-sm">{project.shortDescription}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techs.map((tech) => (
            <span key={tech} className={`px-3 py-1 rounded-full border text-[10px] uppercase tracking-widest font-bold ${accent.badge}`}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.links.map((link) =>
            link.primary ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-semibold text-white text-sm shadow-lg ${accent.button}`}
              >
                <FaExternalLinkAlt className="w-3.5 h-3.5" />
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 font-semibold text-white text-sm"
              >
                <FaGithub className="w-4 h-4" />
                {link.label}
              </a>
            )
          )}

          <Link
            href={`/projeto/featured/${project.slug}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-semibold text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 group"
          >
            Ver Detalhes
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedProject = () => {
  return (
    <section id="featured-projects" className="bg-[#050709] py-24">
      <div className="w-[95%] xl:w-[88%] mx-auto">
        <h2
          data-aos="fade-up"
          className="text-center text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Projetos em <span className="text-cyan-400">Destaque</span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-center text-gray-400 mb-16 max-w-2xl mx-auto"
        >
          Um olhar mais detalhado sobre meus trabalhos mais recentes.
        </p>

        {featuredProjects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProject;
