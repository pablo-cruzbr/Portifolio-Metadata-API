export interface FeaturedLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface ProjectLocale {
  label?: string;
  shortDescription?: string;
  fullDescription?: string;
  features?: string[];
  metrics?: { label: string; value: string }[];
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
  en?: ProjectLocale;
}

const featuredProjects: FeaturedProjectData[] = [
  {
    slug: "hone",
    label: "🥈 2º Lugar — Hackathon",
    title: "Hone AI",
    shortDescription:
      "Plataforma de entrevistas técnicas simuladas com IA, desenvolvida em hackathon com o programa Borderless Coding. O candidato faz upload do currículo e a IA conduz uma entrevista personalizada com base na sua experiência real, gerando feedback automático ao final da sessão.",
    fullDescription:
      "Hone nasceu da necessidade de tornar a preparação para entrevistas técnicas mais realista e acessível. Em vez de perguntas genéricas, a plataforma lê o currículo do candidato e conduz uma entrevista personalizada, adaptando o nível de dificuldade e os tópicos à experiência real de cada pessoa.\n\nAs respostas da IA são transmitidas em tempo real via Server-Sent Events, criando uma experiência de conversa natural. Ao final de cada sessão, o sistema gera feedback automático e um backlog de tópicos para estudo, ajudando o candidato a identificar lacunas e evoluir de forma contínua.",
    techs: ["Next.js", "TypeScript", "OpenAI", "LangChain", "LangGraph", "Bun", "Express", "Prisma", "PostgreSQL", "Redis", "BullMQ"],
    video: { src: "/videos/hone-demo.mp4", type: "video/mp4" },
    accentColor: "purple",
    links: [
      { label: "Live Demo", href: "https://frontend-five-virid-83.vercel.app/", primary: true },
      { label: "GitHub", href: "https://github.com/ProgramadoresSemPatria/HB01-2026-ai-mock-interview" },
    ],
    metrics: [
      { value: "🥈 2nd", label: "place at the hackathon" },
      { value: "3 levels", label: "of difficulty" },
      { value: "Real-time", label: "SSE streaming" },
    ],
    features: [
      "Entrevistas personalizadas baseadas no currículo do candidato (PDF)",
      "Três níveis de dificuldade: iniciante, intermediário e sênior",
      "Respostas em tempo real via Server-Sent Events",
      "Feedback automático ao final de cada sessão",
      "Backlog de tópicos para estudo gerado pela IA",
      "Histórico completo de sessões por usuário",
      "Autenticação JWT com refresh token automático",
    ],
    team: ["Pablo Cruz", "Nathan Vinicius", "Guilherme Resende"],
    en: {
      label: "🥈 2nd Place — Hackathon",
      shortDescription:
        "AI-powered mock technical interview platform built at a hackathon with the Borderless Coding program. The candidate uploads their resume and the AI conducts a personalized interview based on their real experience, generating automatic feedback at the end of each session.",
      fullDescription:
        "Hone was born from the need to make technical interview preparation more realistic and accessible. Instead of generic questions, the platform reads the candidate's resume and conducts a personalized interview, adapting the difficulty level and topics to each person's real experience.\n\nAI responses are streamed in real time via Server-Sent Events, creating a natural conversation experience. At the end of each session, the system generates automatic feedback and a study topic backlog, helping the candidate identify gaps and continuously improve.",
      features: [
        "Personalized interviews based on the candidate's resume (PDF)",
        "Three difficulty levels: beginner, intermediate, and senior",
        "Real-time responses via Server-Sent Events",
        "Automatic feedback at the end of each session",
        "AI-generated study topic backlog",
        "Complete session history per user",
        "JWT authentication with automatic refresh token",
      ],
      metrics: [
        { value: "🥈 2nd", label: "place at the hackathon" },
        { value: "3 levels", label: "of difficulty" },
        { value: "Real-time", label: "SSE streaming" },
      ],
    },
  },
  {
    slug: "bugless",
    label: "Hackathon — Borderless Coding",
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
    en: {
      label: "Hackathon — Borderless Coding",
      shortDescription:
        "AI-powered code review tool built in one week at the Borderless Coding mentorship hackathon — Team 4. Provides instant feedback on bugs, security vulnerabilities, and performance issues via CLI for local reviews and a GitHub App for automatic Pull Request analysis.",
      fullDescription:
        "Bugless was born from a real challenge: manual code reviews are slow, inconsistent, and miss critical issues when the team is overloaded. In one week at the Borderless Coding hackathon, Team 4 built a complete solution that uses AI to automate this process.\n\nThe tool offers two modes of use: a CLI for local reviews directly in the terminal and a GitHub App that analyzes Pull Requests automatically when opened. In both cases, feedback is delivered via real-time streaming, with project-specific context through customizable presets.",
      features: [
        "Review of bugs, security vulnerabilities, and performance issues",
        "CLI for local reviews without leaving the terminal",
        "GitHub App for automatic Pull Request analysis",
        "Real-time streaming of results",
        "Customizable presets per project",
        "Built in a 1-week hackathon — Borderless Coding",
      ],
      metrics: [
        { value: "1 week", label: "of development" },
        { value: "CLI + App", label: "two usage modes" },
        { value: "Real-time", label: "feedback streaming" },
      ],
    },
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
    en: {
      label: "Featured Project",
      shortDescription:
        "SaaS platform that modernizes service order management for IT companies serving public institutions. Replaces bureaucratic systems by reducing a 5–6 screen flow to just 2. Validated in production with 47 real service orders in 2 months — 83% reduction in form-filling effort.",
      fullDescription:
        "IT companies serving public institutions lose hours every day navigating legacy bureaucratic systems. Fire OS solves this by consolidating the entire service order flow into two screens: one for the field technician (mobile) and one for the manager (web dashboard).\n\nValidated in a real work environment with real data, the system processed 47 service orders over 2 months, with 44 successfully completed. The reduction from 5–6 screens to just 2 represents 66% less complexity and 83% less data entry effort.",
      features: [
        "Mobile app for field technicians (React Native + Expo)",
        "Web dashboard for managers (Next.js)",
        "JWT authentication with access control",
        "Digital signatures on service orders",
        "Integrated geolocation with maps",
        "Photo upload via Cloudinary",
        "Timer for service time tracking",
        "Excel report export with filters",
      ],
      metrics: [
        { value: "47", label: "orders processed" },
        { value: "83%", label: "less form filling" },
        { value: "66%", label: "fewer screens" },
      ],
    },
  },
  {
    slug: "mestre-comanda",
    label: "Featured Project",
    title: "Mestre da Comanda",
    shortDescription:
      "Sistema SaaS fullstack de gerenciamento de comandas para restaurantes. Sincronização em tempo real entre o app mobile dos garçons e o painel web da cozinha, com controle completo de mesas, pedidos e itens do cardápio.",
    fullDescription:
      "Mestre da Comanda surgiu para resolver um problema concreto no dia a dia de restaurantes: a comunicação entre salão e cozinha é lenta, propensa a erros e ainda depende de papel em muitos estabelecimentos. A solução une um app mobile para os garçons e um painel web para a cozinha, sincronizados em tempo real.\n\nO app mobile permite abrir mesas, navegar pelo cardápio por categorias, adicionar itens com quantidade e enviar pedidos instantaneamente. O painel web exibe todos os pedidos em aberto, permite gerenciar produtos e categorias, acompanhar o status de cada mesa e concluir atendimentos. Toda a comunicação passa por uma API REST em Node.js com autenticação JWT.",
    techs: ["Next.js", "React Native", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "Express", "JWT"],
    video: { src: "/videos/mestre-comanda-demo.mp4", type: "video/mp4" },
    accentColor: "green",
    links: [
      { label: "Live Demo", href: "https://mestre-da-comanda-saas-y5m2.vercel.app/", primary: true },
      { label: "GitHub", href: "https://github.com/pablo-cruzbr/Mestre_da_Comanda_Saas" },
    ],
    metrics: [
      { value: "2", label: "plataformas integradas" },
      { value: "Real-time", label: "sincronização web-mobile" },
      { value: "REST API", label: "com autenticação JWT" },
    ],
    features: [
      "Painel web com autenticação JWT e proteção de rotas",
      "Gerenciamento completo de categorias e produtos do cardápio",
      "Criação e gerenciamento de mesas e comandas",
      "Adição e remoção de itens nos pedidos em tempo real",
      "Envio e acompanhamento do status de cada pedido",
      "App mobile para garçons abrirem mesas e enviarem pedidos",
      "Seleção de produtos por categoria no app mobile",
      "Sincronização em tempo real entre web e mobile",
    ],
    en: {
      label: "Featured Project",
      shortDescription:
        "Fullstack SaaS system for restaurant order management. Real-time synchronization between the waiters' mobile app and the kitchen's web dashboard, with full control of tables, orders, and menu items.",
      fullDescription:
        "Mestre da Comanda was created to solve a concrete daily problem in restaurants: communication between the dining area and the kitchen is slow, error-prone, and still relies on paper in many establishments. The solution combines a mobile app for waiters and a web dashboard for the kitchen, synchronized in real time.\n\nThe mobile app allows waiters to open tables, browse the menu by category, add items with quantities, and instantly send orders. The web dashboard displays all open orders, manages products and categories, tracks each table's status, and completes services. All communication goes through a REST API in Node.js with JWT authentication.",
      features: [
        "Web dashboard with JWT authentication and route protection",
        "Full management of menu categories and products",
        "Table and order creation and management",
        "Real-time item addition and removal from orders",
        "Order status sending and tracking",
        "Mobile app for waiters to open tables and send orders",
        "Product selection by category in the mobile app",
        "Real-time synchronization between web and mobile",
      ],
      metrics: [
        { value: "2", label: "integrated platforms" },
        { value: "Real-time", label: "web-mobile sync" },
        { value: "REST API", label: "with JWT auth" },
      ],
    },
  },
];

export default featuredProjects;
