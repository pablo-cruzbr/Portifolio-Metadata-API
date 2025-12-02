import "./App.css";

function App() {
  return (
    <>
      <header className="header">
        <a href="#" className="logo">Portifólio.</a>

        <nav className="navbar">
          <a href="#home" className="active">Home</a>
          <a href="#portifolio">Portifólio</a>
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
              <a href="https://www.linkedin.com/in/pablo-cruz-5b937525b/" target="_blank"><i className='bx bxl-linkedin'></i></a>
              <a href="https://www.instagram.com/pablocrzcode/" target="_blank"><i className='bx bxl-instagram'></i></a>
              <a href="https://github.com/pablo-cruzbr?tab=repositories" target="_blank"><i className='bx bxl-github'></i></a>
              <a href="#"><i className='bx bxl-facebook'></i></a>
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
    </>
  );
}

export default App;
