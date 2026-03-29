"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';

interface BaseProject {
    id: string;
    title: string;
    technologies: string;
    imgcapa_url: string;
    goal?: string;
    subheadline?: string;
    headline?: string; 
}

const Projects = () => {
    const [projects, setProjects] = useState<BaseProject[]>([]);
    const [landingPages, setLandingPages] = useState<BaseProject[]>([]);
    const [freelancers, setFreelancers] = useState<BaseProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const [resFree, resProj, resLP] = await Promise.all([
                    api.get('/listfreelancer'),
                    api.get('/listproject'),
                    api.get('/landingpages')
                ]);

                setFreelancers(resFree.data);
                setProjects(resProj.data);
                setLandingPages(resLP.data);
            } catch (error) {
                console.error('Erro ao buscar projetos:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <div className="py-16 text-center text-white">Carregando Galeria...</div>;
    }

    const renderCard = (
        item: BaseProject, 
        type: 'detalhes' | 'freelancer' | 'landingpage', 
        delay: number
    ) => (
        <div 
            key={item.id} 
            data-aos="fade-up" 
            data-aos-anchor-placement="top-center" 
            data-aos-delay={delay}
            className="group cursor-pointer"
        >
            <div className="overflow-hidden rounded-lg border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                <Image
                    src={item.imgcapa_url}
                    alt={item.title}
                    width={800}
                    height={650}
                    className="rounded-lg transform group-hover:scale-105 transition-all duration-500 w-full h-auto object-cover"
                    unoptimized 
                />
            </div>
            
            <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {item.title}
            </h2>
            
            <p className="pt-2 font-medium text-cyan-200 text-xs uppercase tracking-[0.2em]">
                {item.technologies}
            </p>
            
            <p className="text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                {item.goal || item.subheadline || item.headline}
            </p>
            
            <Link 
                href={`/projeto/${type}/${item.id}`}
                className="inline-block mt-4 text-white font-bold border-b-2 border-cyan-500 hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300 pb-1 text-sm"
            >
                Explorar Projeto →
            </Link>
        </div>
    );

    return (
        <div id="projects" className="pt-16 pb-16 bg-[#050709]">
            <div className="w-[80%] mx-auto">
                <h1 className="text-center text-3xl sm:text-4xl font-bold text-white">
                    Minha Galeria de <span className="text-cyan-400">Projetos</span>
                </h1>

                <h2 className="mt-20 text-2xl font-bold text-white border-l-4 border-cyan-500 pl-4">
                   Freelancer: Soluções Customizadas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {freelancers.map((item, index) => renderCard(item, 'freelancer', index * 100))}
                </div>

                <h2 className="mt-24 text-2xl font-bold text-white border-l-4 border-purple-500 pl-4">
                    Plataformas & Dashboards
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {projects.map((item, index) => renderCard(item, 'detalhes', index * 100))}
                </div>

                <h2 className="mt-24 text-2xl font-bold text-white border-l-4 border-green-500 pl-4">
                    Páginas de Venda & Captura
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {landingPages.map((item, index) => renderCard(item, 'landingpage', index * 100))}
                </div>
            </div>
        </div>
    );
};

export default Projects;