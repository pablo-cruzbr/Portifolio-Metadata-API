import "./App.css";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { api } from "./services/api";
import { Link } from "react-router-dom";

interface Project {
    id: string; 
    title: string;
    technologies: string;
    goal: string;
    features: string;
    imgcapa_url: string;
}

interface LandingPage {
    id: string,
    title: string,
    headline: string,
    subheadline: string,
    technologies: string,
    imgcapa_url: string;
}

interface Freelancer {
    id: string,
    title: string,
    headline: string,
    subheadline: string,
    technologies: string,
    imgcapa_url: string;
}

function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
    const [freelancers, setFreelancer] = useState<Freelancer[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await api.get('/listfreelancer'); 

                console.log("Dados da API:", response.data); 
                
                setFreelancer(response.data); 
                setError(null);
            } catch (error) {
                console.error('Falha ao obter a lista de Freelancer:', error);
                setError("Falha ao carregar os Freelancer.");
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchData();     
    }, []);
    
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

      useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await api.get('/landingpages'); 

                console.log("Dados da API:", response.data); 
                
               setLandingPages(response.data); 
                setError(null);
            } catch (error) {
                console.error('Falha ao obter a lista de Landing Pages:', error);
                setError("Falha ao carregar os Landing Pages.");
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
                    <a href="https://github.com/pablo-cruzbr" target="_blank">Github</a>
                    <a href="#about">Sobre mim</a>
                    <a href="#contato">Contato</a>
                </nav>

                <div className="bx bx-menu" id="menu-icon"></div>
            </header>
            <section className="home" id="home">
                <div className="conteudo-home">

                    <div className="conteudo-texto-mobile">
                        <div className="conteiner-profissional- mobile">
                        <div className="box-profissional-mobile">
                           <img className="img-home-mobile" src="/fotoperfil.svg" alt="..." />
                        </div>
                     </div>
                    
                        <h1>Pablo Cruz</h1>

                        <div className="typing">
                            <span>Desenvolvedor Full-Stack</span>
                        </div>

                        <p className="stacks"> Stacks: TypeScript | React | ReactNative | NextJs | NodeJS | PostgreSQL</p>

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

                        <Link className="btn" to={`/detalhesApp/`}>
                            Baixar Aplicativo
                        </Link>     
                    </div>

                    <div className="conteiner-profissional">
                        <div className="box-profissional">
                           <img className="img-home" src="/fotoperfil.svg" alt="..." />
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="projetos" id="projetos">
                <h2 className="heading">Portifólio de Projetos: Transformando Ideias<span> em Código de Alta Performance.</span></h2>

                <h3 className="heading">Projetos Freelancer: <span>Transformando Desafios em Soluções Digitais</span></h3>

                  <div className="lista-projetos">
                    {freelancers.length > 0 ? (
                        freelancers.map((freelancer) => (
                            <div key={freelancer.id} className="card-projeto">
                                 <img 
                                //src={`http://localhost:3333/files/${freelancer.imgcapa_url}`} 
                                src={freelancer.imgcapa_url} 
                                alt={`Imagem do projeto ${freelancer.title}`}
                            />
                                 <h3>{freelancer.title}</h3>
                                <p>Tecnologias: **{freelancer.technologies}**</p>

                                <Link className="btn" to={`/detalhesFreelancerr/${freelancer.id}`}>
                                    Ver Detalhes
                                </Link>      
                            </div>
                        ))
                    ) : (
                        <p>Nenhum projeto encontrado.</p>
                    )}
                </div>

                <h3 className="heading">Sistemas SaaS Fullstack:  <span>Eficiência de Ponta a Ponta (Web & Mobile)</span></h3>

                <div className="lista-projetos">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.id} className="card-projeto">
                                 <img 
                                //src={`http://localhost:3333/files/${project.imgcapa_url}`} 
                                src={project.imgcapa_url} 
                                alt={`Imagem do projeto ${project.title}`}
                            />
                                 <h3>{project.title}</h3>
                                <p>Tecnologias: **{project.technologies}**</p>
                                <p>{project.goal}</p>


                                <Link className="btn" to={`/detalhes/${project.id}`}>
                                    Ver Detalhes
                                </Link>      
                            </div>
                        ))
                    ) : (
                        <p>Nenhum projeto encontrado.</p>
                    )}
                </div>

                <h3 className="heading">Do Design ao Código: <span>Landing Pages Prontas para o Mercado</span></h3>
                    <div className="lista-projetos">
                    {landingPages.length > 0 ? (
                        landingPages.map((landingPage) => (
                            <div key={landingPage.id} className="card-projeto">
                                 <img 
                                //src={`http://localhost:3333/files/${project.imgcapa_url}`} 
                                src={landingPage.imgcapa_url} 
                                alt={`Imagem do projeto ${landingPage.title}`}
                            />
                                 <h3>{landingPage.title}</h3>
                                <p>Tecnologias: **{landingPage.technologies}**</p>
                                <p>{landingPage.subheadline}</p>

                               <Link
                                    className="btn"
                                    to={`/detalhesLandingPage/${landingPage.id}`}> Ver Detalhes Landing Page
                                </Link>
                                    
                            </div>
                        ))
                    ) : (
                        <p>Nenhum projeto encontrado.</p>
                    )}
                </div>
            </section>

            <section className="home" id="home">
                <div className="conteudo-home">

                    <div className="conteiner-profissional">
                        <div className="box-profissional">
                            <img className=".img-sobre-mim" src="/sobre_mim.svg" alt="Imagem do profissional" />
                        </div>
                    </div>

                    <div className="conteudo-texto" id="about">
                        <h3>Sobre Mim</h3>
                        <h1>Pablo Cruz</h1>
                        <p> Desenvolvedor Full Stack, atuando como freelancer, com experiência prática em linguagens e frameworks como JavaScript, TypeScript, React, React Native, Next.js, Node.js, GraphQL e PostgreSQL. Atualmente, trabalho em uma empresa de informática como Help Desk Nível 2, onde atuo com redes de internet, manutenção de racks de infraestrutura, Active Directory, PABX em nuvem 3CX e manutenção de hardware.</p>
                    </div>                  
                </div>
            </section>
        </>
    );
}

export default App;