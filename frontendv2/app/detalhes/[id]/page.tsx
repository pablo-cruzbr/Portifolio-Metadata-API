"use client";

import React, { useEffect, useState, use } from "react";
import { api } from "@/services/api";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  technologies: string;
  goal: string;
  features: string;
  imgcapa_url: string;
  linklivedemo: string;
  linkgihub: string;
  images?: {
    id: string;
    url: string;
  }[];
}

export default function DetalhesProjeto({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const response = await api.get(`/listproject/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050709] flex items-center justify-center">
        <h2 className="text-white text-2xl animate-pulse font-semibold">Carregando detalhes do projeto...</h2>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050709] flex flex-col items-center justify-center">
        <h2 className="text-white text-2xl mb-4">Projeto não encontrado.</h2>
        <Link href="/" className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition">
          Voltar para Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050709] pt-24 pb-16">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
        
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition mb-8 group">
          <IoArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform" size={24} />
          <span className="font-semibold text-lg">Voltar ao Portfólio</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div data-aos="fade-right">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src={project.imgcapa_url} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {project.images.map((img) => (
                  <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden border border-white/5 hover:border-cyan-500/50 transition">
                    <Image src={img.url} alt="Screenshot" fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div data-aos="fade-left" className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.split(',').map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-bold uppercase tracking-widest">
                  {tech.trim()}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <section>
                <h3 className="text-white text-xl font-bold mb-2 flex items-center">
                  <span className="w-8 h-[2px] bg-cyan-500 mr-3"></span> Objetivo
                </h3>
                <p>{project.goal}</p>
              </section>

              <section>
                <h3 className="text-white text-xl font-bold mb-2 flex items-center">
                  <span className="w-8 h-[2px] bg-cyan-500 mr-3"></span> Sobre o Software
                </h3>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 italic">
                  {project.features}
                </div>
              </section>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <a 
                href={project.linklivedemo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-8 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 hover:scale-105 transition-all shadow-lg shadow-cyan-900/20"
              >
                <FaExternalLinkAlt className="mr-2" /> Live Demo
              </a>
              
              <a 
                href={project.linkgihub} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 hover:scale-105 transition-all border border-white/10"
              >
                <FaGithub className="mr-2" /> View Code
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}