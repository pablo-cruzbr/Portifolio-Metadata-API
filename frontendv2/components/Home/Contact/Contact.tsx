import React from 'react'
import { BiEnvelope, BiMap, BiPhone } from 'react-icons/bi'
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

const Contact = () => {
  const whatsappUrl = "https://api.whatsapp.com/send/?phone=5511972523448&text=Ol%C3%A1+Pablo%2C+vi+seu+portifolio+e+me+interessei+pelo+seu+servi%C3%A7o%2C+vamos+conversar+%21%3F&type=phone_number&app_absent=0";

  return (
    <div id='contact' className="pt-16 pb-16 bg-[#050709]">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] md:w-[80%] lg:w-[70%] mx-auto gap-12 items-start">
        
        {/* Informações de Contato */}
        <div data-aos="fade-right">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-200 leading-tight">
            Pronto para escalar seu <span className="text-cyan-400">próximo projeto?</span>
          </h1>
          <p className="text-gray-400 mt-6 text-base sm:text-lg">
            Estou disponível para novos desafios e parcerias. Seja para um sistema complexo ou uma landing page estratégica, vamos conversar sobre como posso ajudar o seu negócio a crescer.
          </p>
          
          <div className="mt-10 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center border border-white/5">
                <BiMap className="w-6 h-6 text-cyan-300" />
              </div>
              <p className="text-lg font-medium text-gray-400">
                Mogi das Cruzes, São Paulo
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center border border-white/5">
                <BiEnvelope className="w-6 h-6 text-cyan-300" />
              </div>
              <p className="text-lg font-medium text-gray-400">
                pablocruz.dev@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center mt-10 space-x-4">
            <a href="https://github.com/pablo-cruzbr" target="_blank" rel="noopener noreferrer"
               className="w-14 h-14 bg-blue-950/40 border border-white/5 justify-center rounded-2xl flex items-center cursor-pointer hover:bg-blue-800 hover:border-cyan-400 transition-all duration-300">
              <FaGithub className="text-white w-6 h-6"/>
            </a>
            <a href="https://www.linkedin.com/in/pablo-cruz-5b937525b/" target="_blank" rel="noopener noreferrer"
               className="w-14 h-14 bg-blue-950/40 border border-white/5 justify-center rounded-2xl flex items-center cursor-pointer hover:bg-blue-800 hover:border-cyan-400 transition-all duration-300">
              <FaLinkedin className="text-white w-6 h-6"/>
            </a>
            <a href="https://www.instagram.com/pablocruzdev/" target="_blank" rel="noopener noreferrer"
               className="w-14 h-14 bg-blue-950/40 border border-white/5 justify-center rounded-2xl flex items-center cursor-pointer hover:bg-blue-800 hover:border-cyan-400 transition-all duration-300">
              <FaInstagram className="text-white w-6 h-6"/>
            </a>

               <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
               className="w-14 h-14 bg-blue-950/40 border border-white/5 justify-center rounded-2xl flex items-center cursor-pointer hover:bg-blue-800 hover:border-cyan-400 transition-all duration-300">
              <FaWhatsapp className="text-white w-6 h-6"/>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact