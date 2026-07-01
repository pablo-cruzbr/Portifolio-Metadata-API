export interface FeaturedLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface FeaturedProjectData {
  slug: string;
  label: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  techs: string[];
  video: { src: string; type: string };
  accentColor: string;
  links: FeaturedLink[];
  metrics: { label: string; value: string }[];
  features: string[];
  team?: string[];
}

const featuredProjects: FeaturedProjectData[] = [
  {
    slug: "bugless",
    label: "Featured Project",
    title: "Bugless",
    shortDescription:
      "Ferramenta de revisão de código com inteligência artificial, criada em uma semana de hackathon com o programa de mentoria Borderless Coding — Time 4. Fornece feedback instantâneo sobre bugs, vulnerabilidades de segurança e problemas de performance via CLI para revisões locais e GitHub App para análise automática de Pull Requests.",
    fullDescription:
      "Bugless nasceu de um desafio real: revisões de código manuais são lentas, inconsistentes e deixam passar problemas críticos quando o time está sobrecarregado. Em uma semana de hackathon com o programa Borderless Coding, o Time 4 construiu uma solução completa que usa IA para automatizar esse processo.\n\nA ferramenta oferece dois modos de uso: uma CLI para revisões locais diretamente no terminal e um GitHub App que analisa Pull Requests automaticamente ao abrir. Em ambos os casos, o feedback é entregue em streaming em tempo real, com contexto específico para cada projeto via presets personalizáveis.",
    techs: ["Next.js", "Node.js", "TypeScript", "AI", "GitHub API"],
    video: { src: "/videos/bugless-demo.webm", type: "video/webm" },
    accentColor: "cyan",
    links: [
      { label: "Live Demo", href: "https://bugless-psi.vercel.app/", primary: true },
      { label: "GitHub", href: "https://github.com/ProgramadoresSemPatria/HB03-2025_bugless" },
    ],
    metrics: [
      { value: "1 semana", label: "de desenvolvimento" },
      { value: "CLI + App", label: "dois modos de uso" },
      { value: "Real-time", label: "streaming de feedback" },
    ],
    features: [
      "Revisão de bugs, vulnerabilidades de segurança e problemas de performance",
      "CLI para revisões locais sem sair do terminal",
      "GitHub App para análise automática de Pull Requests",
      "Streaming em tempo real dos resultados",
      "Presets personalizáveis por projeto",
      "Construído em hackathon de 1 semana — Borderless Coding",
    ],
    team: ["Mario Yuri", "Felipe Torres", "Levy Rodrigues", "Francisco Alexandro", "Pablo Cruz"],
  },
  {
    slug: "fire-os",
    label: "Featured Project",
    title: "Fire OS",
    shortDescription:
      "Plataforma SaaS que moderniza o gerenciamento de ordens de serviço para empresas de TI que atendem instituições públicas. Substitui sistemas burocráticos reduzindo um fluxo de 5 a 6 telas para apenas 2. Validado em produção com 47 ordens de serviço reais em 2 meses — 83% de redução no esforço de preenchimento.",
    fullDescription:
      "Empresas de TI que atendem instituições públicas perdem horas por dia navegando em sistemas legados burocráticos. O Fire OS resolve isso consolidando todo o fluxo de ordens de serviço em duas telas: uma para o técnico em campo (mobile) e outra para o gestor (dashboard web).\n\nValidado em ambiente real de trabalho com dados reais, o sistema processou 47 ordens de serviço ao longo de 2 meses, com 44 concluídas com sucesso. A redução de 5-6 telas para apenas 2 representa 66% menos complexidade e 83% menos esforço de preenchimento de dados.",
    techs: ["Next.js", "React Native", "Expo", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "Cloudinary"],
    video: { src: "/videos/fire-os-demo.mp4", type: "video/mp4" },
    accentColor: "orange",
    links: [
      { label: "Live Demo", href: "https://landing-page-fire-os.vercel.app/", primary: true },
      { label: "GitHub", href: "https://github.com/pablo-cruzbr/Fire-OS-Service-Order-SaaS" },
    ],
    metrics: [
      { value: "47", label: "ordens processadas" },
      { value: "83%", label: "menos preenchimento" },
      { value: "66%", label: "menos telas" },
    ],
    features: [
      "App mobile para técnicos em campo (React Native + Expo)",
      "Dashboard web para gestores (Next.js)",
      "Autenticação JWT com controle de acesso",
      "Assinatura digital nas ordens de serviço",
      "Geolocalização integrada com mapas",
      "Upload de fotos via Cloudinary",
      "Timer para controle de tempo de atendimento",
      "Exportação de relatórios em Excel com filtros",
    ],
  },
];

export default featuredProjects;
