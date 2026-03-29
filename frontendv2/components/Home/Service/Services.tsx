import React from 'react'
import ServiceCard from './ServiceCard'

const Services = () => {
  return (
    <div className="pt-16 pb-16">
        <h1 className="text-2xl sm:text-2xl md:text-5xl lg:text-6x1 mt-6 text-center font-bold tracking-wide">
           Construindo experiências  <br/>
            modernas, escaláveis e
            <br/>digitais  focadas no usuário
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