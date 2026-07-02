import React from 'react'
import ServiceCard from './ServiceCard'

const Services = () => {
  return (
    <div className="pt-16 pb-16">
        <p className="text-center text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-3">
          O que eu faço
        </p>
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-white">
          Do design ao deploy —{" "}
          <span className="text-cyan-400">do início ao fim.</span>
        </h1>
       <div data-aos="fade-right" data-aos-anchor-placement="top-center" className="w-[90%] sm:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-20 items-start">

            <div data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-delay="100" >
            <ServiceCard 
                icon='/img/s5.webp'
                name='Branding & UI/UX:'
                description='Criação de interfaces intuitivas que fortalecem a identidade da sua marca.'
            />
            </div>   


             <div data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-delay="200" >
            <ServiceCard 
                icon='/img/s2.webp'
                name='Sistemas Web, Saas e Apps'
                description='Desenvolvimento de aplicativos e plataformas complexas com arquitetura moderna e segura.'
            />
            </div>
             <div data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-delay="300" >
            <ServiceCard 
                icon='/img/s3.webp'
                name='Design e Creatividade'
                description='Páginas otimizadas e velozes para transformar visitantes em clientes.'
            />
            </div>

            <div data-aos="fade-right" data-aos-anchor-placement="top-center" data-aos-delay="400" >
            <ServiceCard 
                icon='/img/s4.webp'
                name='Consultoria Técnica'
                description='Apoio estratégico para escolher as melhores tecnologias para o seu negócio.'
            />
            </div>
    </div>
    </div>
  )
}

export default Services