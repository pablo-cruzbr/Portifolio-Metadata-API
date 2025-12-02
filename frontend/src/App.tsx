import "./App.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function App() {
  return (
    <>
      <header className="header">
        <h1 className="portifolio">Portifólio. </h1>

        <nav className="navbar">
          <a href="#home" className="active">Home</a>
          <a href="#projetos">Portifólio</a>
          <a href="#services">Serviços</a>
          <a href="https://github.com/pablo-cruzbr?tab=repositories" target="_blank">Github</a>
          <a href="#about">Sobre mim</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="bx bx-menu" id="menu-icon"></div>
      </header>

      <section className="home" id="home">
        <div className="conteudo-home">

          <div className="conteudo-texto">
            <h3>Olá, meu nome é</h3>
            <h1>Pablo Cruz</h1>

            <div className="typing">
              <span>Desenvolvedor Full-Stack</span>
            </div>

            <div className="social-media">
              <a href="https://www.linkedin.com/in/pablo-cruz-5b937525b/" target="_blank">
                <FaLinkedin/>
              </a>

              <a href="https://www.instagram.com/pablocruzdev/" target="_blank">
                <FaInstagram />
              </a>

              <a href="https://github.com/pablo-cruzbr" target="_blank">
                <FaGithub />
              </a>
            </div>


            <button className="btn">Download CV</button>
          </div>

          <div className="conteiner-profissional">
            <div className="box-profissional">
              <img className="img-home" src="/sobre-mim1.png" alt="Imagem do profissional" />
            </div>
          </div>
        </div>
      </section>
      <section className="projetos" id="projetos">
      <h2 className="heading">Projetos que Representam Minha Evolução <span> como Desenvolvedor</span></h2>

      </section>

    </>
  );
}

export default App;
