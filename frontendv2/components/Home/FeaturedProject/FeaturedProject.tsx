"use client";

import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface FeaturedProjectData {
  label: string;
  title: string;
  description: string;
  techs: string[];
  video: { src: string; type: string };
  accentColor: string;
  links: { label: string; href: string; primary?: boolean }[];
}

const projects: FeaturedProjectData[] = [
  {
    label: "Featured Project",
    title: "Bugless",
    description:
      "AI-powered code review tool built during a one-week hackathon with the Borderless Coding mentorship program. Provides instant feedback on bugs, security vulnerabilities and performance issues via a CLI for local reviews and a GitHub App for automated Pull Request analysis.",
    techs: ["Next.js", "Node.js", "TypeScript", "AI", "GitHub API"],
    video: { src: "/videos/bugless-demo.webm", type: "video/webm" },
    accentColor: "cyan",
    links: [
      { label: "Live Demo", href: "https://bugless-psi.vercel.app/", primary: true },
      { label: "GitHub", href: "https://github.com/ProgramadoresSemPatria/HB03-2025_bugless" },
    ],
  },
  {
    label: "Featured Project",
    title: "Fire OS",
    description:
      "SaaS platform that streamlines service order management for IT companies serving public institutions. Replaces bureaucratic legacy systems by reducing a 5–6 screen workflow down to just 2. Validated in production with 47 real service orders over 2 months — 83% reduction in data entry effort.",
    techs: ["Next.js", "React Native", "Expo", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "Cloudinary"],
    video: { src: "/videos/fire-os-demo.mp4", type: "video/mp4" },
    accentColor: "orange",
    links: [
      { label: "GitHub", href: "https://github.com/pablo-cruzbr/Fire-OS-Service-Order-SaaS" },
    ],
  },
];

const accentClasses: Record<string, { badge: string; glow: string; button: string; border: string }> = {
  cyan: {
    badge: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    glow: "from-cyan-500/20 to-blue-500/20",
    button: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-900/20",
    border: "border-cyan-400",
  },
  orange: {
    badge: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    glow: "from-orange-500/20 to-red-500/20",
    button: "bg-orange-600 hover:bg-orange-500 shadow-orange-900/20",
    border: "border-orange-400",
  },
};

const ProjectRow = ({ project, index }: { project: FeaturedProjectData; index: number }) => {
  const accent = accentClasses[project.accentColor];
  const reversed = index % 2 !== 0;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index > 0 ? "mt-32" : ""}`}>
      <div
        data-aos={reversed ? "fade-left" : "fade-right"}
        data-aos-delay="0"
        className={`relative group ${reversed ? "lg:order-2" : ""}`}
      >
        <div className={`absolute -inset-1 bg-gradient-to-r ${accent.glow} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <video autoPlay loop muted playsInline className="w-full h-auto">
            <source src={project.video.src} type={project.video.type} />
          </video>
        </div>
      </div>

      <div data-aos={reversed ? "fade-right" : "fade-left"} className={reversed ? "lg:order-1" : ""}>
        <span className={`text-sm font-mono tracking-widest uppercase ${accent.badge.split(" ")[0]}`}>
          {project.label}
        </span>
        <h3 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
          {project.title}
        </h3>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <p className="text-gray-300 leading-relaxed">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.techs.map((tech) => (
            <span key={tech} className={`px-3 py-1 rounded-full border text-[11px] uppercase tracking-widest font-bold ${accent.badge}`}>
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {project.links.map((link) =>
            link.primary ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-semibold text-white shadow-lg ${accent.button}`}
              >
                <FaExternalLinkAlt className="w-4 h-4" />
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
    </div>
  );
};

const FeaturedProject = () => {
  return (
    <section className="bg-[#050709] py-24">
      <div className="w-[90%] xl:w-[80%] mx-auto">
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

        {projects.map((project, index) => (
          <ProjectRow key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProject;
