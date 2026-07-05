"use client";

import React, { use } from "react";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaCheckCircle, FaUsers } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import featuredProjects from "@/constants/featuredProjects";
import { notFound } from "next/navigation";

const accentClasses: Record<string, { badge: string; button: string; border: string; text: string; metric: string }> = {
  cyan: {
    badge: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    button: "bg-[#01A7C0] hover:bg-[#019ab1] shadow-cyan-900/20",
    border: "border-l-cyan-400",
    text: "text-cyan-400",
    metric: "bg-cyan-400/10 border-cyan-400/20",
  },
  orange: {
    badge: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    button: "bg-[#01A7C0] hover:bg-[#019ab1] shadow-orange-900/20",
    border: "border-l-orange-400",
    text: "text-orange-400",
    metric: "bg-orange-400/10 border-orange-400/20",
  },
  purple: {
    badge: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    button: "bg-[#01A7C0] hover:bg-[#019ab1] shadow-purple-900/20",
    border: "border-l-purple-400",
    text: "text-purple-400",
    metric: "bg-purple-400/10 border-purple-400/20",
  },
  green: {
    badge: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    button: "bg-[#01A7C0] hover:bg-[#019ab1] shadow-cyan-900/20",
    border: "border-l-emerald-400",
    text: "text-emerald-400",
    metric: "bg-emerald-400/10 border-emerald-400/20",
  },
};

export default function FeaturedProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) notFound();

  const accent = accentClasses[project.accentColor];

  return (
    <div className="min-h-screen bg-[#050709] pt-28 pb-20 text-white">
      <div className="w-[90%] md:w-[80%] mx-auto">

        <Link
          href="/#projects"
          className="inline-flex items-center text-gray-400 hover:text-white mb-10 transition group font-medium text-sm"
        >
          <IoArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar ao Portfólio
        </Link>

        {/* Hero — video full width */}
        <div data-aos="fade-up" className="relative group mb-14">
          <div className={`absolute -inset-2 bg-gradient-to-r ${
            project.accentColor === "cyan" ? "from-cyan-500/15 to-blue-500/15"
            : project.accentColor === "purple" ? "from-purple-500/15 to-indigo-500/15"
            : project.accentColor === "green" ? "from-emerald-500/15 to-teal-500/15"
            : "from-orange-500/15 to-red-500/15"
          } rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <video autoPlay loop muted playsInline className="w-full h-auto block">
              <source src={project.video.src} type={project.video.type} />
            </video>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">

          {/* Left — content */}
          <div>
            <span className={`text-xs font-mono tracking-widest uppercase ${accent.text}`}>
              {project.label}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mt-2 mb-6">
              {project.title}
            </h1>

            <div className={`border-l-4 ${accent.border} pl-5 mb-8`}>
              <p className="text-gray-300 leading-relaxed">{project.shortDescription}</p>
            </div>

            <p className="text-gray-400 leading-relaxed whitespace-pre-line mb-10">
              {project.fullDescription}
            </p>

            {/* Features */}
            <h2 className="text-xl font-bold text-white mb-4">Funcionalidades</h2>
            <ul className="space-y-3 mb-10">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                  <FaCheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${accent.text}`} />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Team */}
            {project.team && project.team.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FaUsers className={`w-5 h-5 ${accent.text}`} />
                  Time
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.team.map((member) => (
                    <span
                      key={member}
                      className={`px-4 py-2 rounded-full border text-sm font-medium ${
                        member === "Pablo Cruz"
                          ? `${accent.badge} font-bold`
                          : "text-gray-300 bg-white/5 border-white/10"
                      }`}
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) =>
                link.primary ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-semibold text-white shadow-lg ${accent.button}`}
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
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 font-semibold text-white"
                  >
                    <FaGithub className="w-5 h-5" />
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right — sidebar */}
          <div className="space-y-6">

            {/* Metrics */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Resultados</h3>
              <div className="space-y-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className={`rounded-xl p-4 border ${accent.metric} text-center`}>
                    <p className={`text-3xl font-bold ${accent.text}`}>{m.value}</p>
                    <p className="text-gray-400 text-xs mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span key={tech} className={`px-3 py-1 rounded-full border text-[10px] uppercase tracking-widest font-bold ${accent.badge}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
