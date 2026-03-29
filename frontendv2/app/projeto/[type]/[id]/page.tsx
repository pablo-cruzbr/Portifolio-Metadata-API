"use client";

import React, { useEffect, useState, use } from "react";
import { api } from "@/services/api";
import { FaGithub, FaPlayCircle, FaTimes } from "react-icons/fa"; 
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

interface UnifiedProject {
  id: string;
  title: string;
  headline?: string;
  subheadline?: string;
  goal?: string;
  features?: string;
  technologies: string;
  imgcapa_url: string;
  linklivedemo?: string;
  linkgihub?: string;
  live_demo_url?: string;
  github_url?: string;
  images: { id: string; url: string }[];
}

export default function DetalhesUnificado({ params }: { params: Promise<{ type: string, id: string }> }) {
  const { type, id } = use(params);
  const [data, setData] = useState<UnifiedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let endpoint = "";
        if (type === "freelancer") endpoint = `/listfeelancer/${id}`;
        else if (type === "landingpage") endpoint = `/landingpages/${id}`;
        else endpoint = `/listproject/${id}`; 

        const response = await api.get(endpoint);
        setData(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [type, id]);

  if (loading) return <div className="min-h-screen bg-[#050709] flex items-center justify-center text-white text-2xl animate-pulse">Carregando...</div>;
  if (!data) return <div className="min-h-screen bg-[#050709] flex flex-col items-center justify-center text-white"><h2>Não encontrado.</h2><Link href="/">Voltar</Link></div>;

  const liveUrl = data.linklivedemo || data.live_demo_url;
  const githubUrl = data.linkgihub || data.github_url;

  return (
    <div className="min-h-screen bg-[#050709] pt-24 pb-16 text-white relative">
      
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-5 right-5 text-white text-3xl hover:text-cyan-400 transition-colors">
            <FaTimes />
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
            <Image 
              src={selectedImage} 
              alt="Preview" 
              fill 
              className="object-contain"
              quality={100}
            />
          </div>
        </div>
      )}

      <div className="w-[90%] md:w-[70%] mx-auto">
        <Link href="/" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition group font-medium">
          <IoArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform" /> Voltar ao Portfólio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div data-aos="fade-right">
            <div 
              className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl cursor-zoom-in group"
              onClick={() => setSelectedImage(data.imgcapa_url)}
            >
              <Image src={data.imgcapa_url} alt={data.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-black/50 px-4 py-2 rounded-full text-sm border border-white/20">Clique para ampliar</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              {data.images?.map((img) => (
                <div 
                  key={img.id} 
                  className="relative aspect-video rounded-lg overflow-hidden border border-white/5 cursor-zoom-in group"
                  onClick={() => setSelectedImage(img.url)}
                >
                  <Image src={img.url} alt="Screenshot" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>

          <div data-aos="fade-left">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {data.title}
            </h1>
            {data.headline && <h3 className="text-cyan-400 text-xl font-medium mb-4">{data.headline}</h3>}
            
            <div className="flex flex-wrap gap-2 mb-6">
              {data.technologies.split(',').map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-[10px] text-cyan-300 uppercase tracking-widest font-bold">
                  {tech.trim()}
                </span>
              ))}
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              <p>{data.subheadline || data.goal}</p>
              {data.features && (
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 italic text-gray-400 border-l-4 border-l-cyan-500">
                   {data.features}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              {liveUrl && (
                <a href={liveUrl} target="_blank" className="flex items-center px-8 py-3 bg-cyan-600 rounded-xl hover:bg-cyan-500 transition-all font-bold shadow-lg shadow-cyan-900/20">
                  <FaPlayCircle className="mr-2" /> Live Demo
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" className="flex items-center px-8 py-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all border border-white/10 font-bold">
                  <FaGithub className="mr-2" /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}