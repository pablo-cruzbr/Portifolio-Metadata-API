import "../detalhesApp/detalhes.css";
import { Link } from "react-router-dom";

import {FaAndroid} from "react-icons/fa"; 
import { CiMobile4 } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";

function Detalhes() {
  const project = {
    nome: "Meu Apps - Pablo Cruz",
    descricao: "Allti-Control desenvolvido com React Native versão 1.0.2.",
    descricao2: " Aplicativo feito para técnicos de Informática para atendimentos em campo",
    linkgihub: "https://github.com/seu-usuario",
    linklivedemo: "#", 
    apkPath: "/TechOS-App.apk" 
  };

  return (
    <div className="detalhes-container">
      <div className="detalhes-card">
        <div className="detalhes-info">
          <h1>{project.nome}</h1>

            <div className="conteiner-profissional">
              <div className="box-profissional">
                  <img className=".img-sobre-mim" src="/allti_control.svg" alt="Imagem do profissional" />
              </div>
            </div>

          <p className="app-title-container">
            <strong> <CiMobile4 size={20}/> TechOs - App</strong>
          </p>
          <p>
            <strong>Sobre o Software:</strong>
            <br />
            {project.descricao}
            <p>{project.descricao2}</p>
          </p>
            <p className="app-title-container"><strong>Android</strong></p>
          <div className="links">
          
          
          <a 
            href="https://drive.google.com/uc?export=download&id=1J5WRWivC2cG9eL9r_aMQ0E3PdAcOI9u-" 
            className="btn-voltar" 
            style={{ 
              backgroundColor: '#3DDC84', 
              color: '#000', 
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
              gap: '8px'
            }}
          >
            <FaAndroid size={20}/> Download APK Oficial
          </a>
            <Link to="/" className="btn-voltar"> 
              <IoArrowBack size={20}/> Voltar
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Detalhes;