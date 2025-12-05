import "./App.css";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { api } from "./services/api";


interface Project {
    id: string; 
    title: string;
    technologies: string;
    goal: string;
    features: string;
    image_url: string;
}

function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await api.get('/listproject'); 

                console.log("Dados da API:", response.data); 
                
                setProjects(response.data); 
                setError(null);
            } catch (error) {
                console.error('Falha ao obter a lista de projetos:', error);
                setError("Falha ao carregar os projetos.");
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchData(); 
        
    }, []);

    if (isLoading) {
        return <h2 className="heading">Carregando projetos...</h2>;
    }

    if (error) {
        return <h2 className="heading">Erro ao carregar: {error}</h2>;
    }

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

                <div className="lista-projetos">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.id} className="card-projeto">
                                <img src={project.image_url} alt={`Imagem do projeto ${project.title}`} />
                                <h3>{project.title}</h3>
                                <p>Tecnologias: **{project.technologies}**</p>
                                <p>{project.goal}</p>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum projeto encontrado.</p>
                    )}
                </div>

            </section>

        </>
    );
}

export default App;