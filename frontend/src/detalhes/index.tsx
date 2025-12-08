import "./detalhes.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { FaGithub, FaPlayCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Carrossel from "../components/Carrossel";

interface Project {
  id: string;
  title: string;
  technologies: string;
  goal: string;
  features: string;
  imgcapa_url: string;
  images?: {
  id: string;
  url: string;
  projectId: string;
}[];

}

function Detalhes() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        const response = await api.get(`/listproject/${id}`);

        setProject(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err);
        setError("Não foi possível carregar os detalhes do projeto.");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando detalhes do projeto...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading">
        <h2>{error}</h2>
        <Link to="/" className="btn-voltar">Voltar</Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="loading">
        <h2>Nenhum projeto encontrado.</h2>
        <Link to="/" className="btn-voltar">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="detalhes-container">
      <div className="detalhes-card">
      
        <div className="detalhes-info">
          <h1>{project.title}</h1>

        <div>
              {project.images && project.images.length > 0 ? (
          <Carrossel 
          data={project.images.map((img) => ({
          src: `http://localhost:3333/files/${img.url}`,   
          alt: project.title
          }))}
            />
          ) : (
              <p>Nenhuma imagem enviada para este projeto.</p>
          )}
          </div>

          <p>
            <strong>Tecnologias:</strong> {project.technologies}
          </p>

          <p>
            <strong>Objetivo:</strong> {project.goal}
          </p>

          <p>
            <strong>Funcionalidades:</strong>
          </p>

          <div className="features-box">
            {project.features}
          </div>

          <div className="links">

            <Link to="/" className="btn-voltar"> <IoArrowBack size={20}/> Voltar</Link>

            <Link to="/" className="btn-voltar"> <FaPlayCircle  size={20}/> LiveDemo</Link>

             <Link to="/" className="btn-voltar"><FaGithub size={20}/>  Github</Link>
          </div>
        </div>

      </div>
          
    
    </div>
  );
}

export default Detalhes;
