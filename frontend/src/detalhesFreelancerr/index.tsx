import "../detalhes/detalhes.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { FaGithub, FaPlayCircle } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import Carrossel from "../components/Carrossel";

interface ProjectImage {
    id: string;
    url: string;
    public_id: string;
    projectId: string | null;
    landingpageId: string;
}

interface Freelancer {
    id: string;
    title: string;
    headline: string;
    subheadline: string;
    technologies: string;
    github_url: string;
    live_demo_url: string;
    imgcapa_url: string;
    imgcapa_public_id: string;
    created_at: string;
    updated_at: string;
    images: ProjectImage[]; 
}

function DetalhesFreelancerr() {
  const { id } = useParams();
  const [landingPage, setLandingPage] = useState<Freelancer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get(`/freelancer/${id}`);
        setLandingPage(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Falha ao carregar a Landing Page.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando Freelancer...</h2>
      </div>
    );
  }

  if (error || !landingPage) {
    return (
      <div className="loading">
        <h2>{error ?? "Landing Page não encontrada."}</h2>
        <Link to="/" className="btn-voltar">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="detalhes-container">
      <div className="detalhes-card">
        <div className="detalhes-info">

          <h1>{landingPage.title}</h1>
          <h3 className="lp-headline">{landingPage.headline}</h3>
          <p className="lp-subheadline">{landingPage.subheadline}</p>

          <div className="carrossel-wrapper">
            <Carrossel
              data={landingPage.images.map(img => ({
                src: img.url,
                alt: landingPage.title
              }))}
            />
          </div>

          <p>
            <strong>Tecnologias:</strong> {landingPage.technologies}
          </p>

          <div className="links">
            {landingPage.live_demo_url && (
              <a
                href={landingPage.live_demo_url}
                className="btn-voltar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPlayCircle size={20} /> Live Demo
              </a>
            )}

            {landingPage.github_url && (
              <a
                href={landingPage.github_url}
                className="btn-voltar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={20} /> GitHub
              </a>
            )}

            <Link to="/" className="btn-voltar">
              <IoArrowBack size={20} /> Voltar
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DetalhesFreelancerr;
