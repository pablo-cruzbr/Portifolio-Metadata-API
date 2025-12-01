import './App.css'

function App() {


  return (
    <>
      <section className="home" id="home">
        <div className="conteudo-home">
          <h3>Olá, meu nome é</h3>
          <h1>Pablo Cruz</h1>
          <div>
            <div className="texto-1">
              <span> Desenvolvedor Full-Stack </span>
            </div>
            
            <div className="social-media">
              <a href="https://www.linkedin.com/in/pablo-cruz-5b937525b/" target="_blank" rel="noopener noreferrer">
                <i className='bx bxl-linkedin'></i>
              </a>
              <a href="https://www.instagram.com/pablocrzcode/" target="_blank" rel="noopener noreferrer">
                <i className='bx bxl-instagram'></i>
              </a>
              <a href="https://github.com/pablo-cruzbr?tab=repositories" target="_blank" rel="noopener noreferrer">
                <i className='bx bxl-github'></i>
              </a>
              <a href="#" rel="noopener noreferrer">
                <i className='bx bxl-facebook'></i>
              </a>
            </div>
            
            <div id="botao">
              {/* Se o botão precisar de lógica (como baixar o CV), use a função onClick */}
              <button className="btn"> Download CV </button>
            </div>
            
            <div className="conteiner-profissional">
              <div className="box-profissional"> 
                {/* Em Next.js, substitua por: 
                <Image src="/sobre-mim1.png" alt="Imagem do profissional" width={500} height={500} />
                */}
                <img className="img-home" src="/sobre-mim1.png" alt="Imagem do profissional" /> 
              </div> 
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
