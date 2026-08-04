export type Lang = 'pt' | 'en'

export const translations = {
  pt: {
    nav: {
      downloadCV: "Download CV",
      links: ["Home", "Alfred", "Projetos", "Skills", "Contato", "Planos"],
    },
    hero: {
      comment: "// hello world — disponível para contratação",
      headline1: "Transformando Visões em",
      headline2: "produtos web de alta performance.",
      cta: "Veja meus Projetos",
      typewriter: ["Fullstack Developer", "Typescript & Node.js", "SaaS Builder", "AI & LLM Developer"],
    },
    services: {
      label: "O que eu faço",
      headline: "Do design ao deploy —",
      headlineSpan: "do início ao fim.",
      cards: [
        { name: "Branding & UI/UX:", description: "Criação de interfaces intuitivas que fortalecem a identidade da sua marca." },
        { name: "Sistemas Web, SaaS e Apps", description: "Desenvolvimento de aplicativos e plataformas complexas com arquitetura moderna e segura." },
        { name: "Design e Criatividade", description: "Páginas otimizadas e velozes para transformar visitantes em clientes." },
        { name: "Consultoria Técnica", description: "Apoio estratégico para escolher as melhores tecnologias para o seu negócio." },
      ],
    },
    featured: {
      sectionTitle: "Projetos em",
      sectionTitleSpan: "Destaque",
      subtitle: "Um olhar mais detalhado sobre meus trabalhos mais recentes.",
      viewDetails: "Ver Detalhes",
    },
    skills: {
      tag: "<skills />",
      title: "My",
      titleSpan: "Skills",
    },
    contact: {
      title: "Pronto para escalar seu",
      titleSpan: "próximo projeto?",
      description: "Estou disponível para novos desafios e parcerias. Seja para um sistema complexo ou uma landing page estratégica, vamos conversar sobre como posso ajudar o seu negócio a crescer.",
      location: "Mogi das Cruzes, São Paulo",
    },
    projects: {
      loading: "Carregando Galeria...",
      systems: "Sistemas em Desenvolvimento",
      landingPages: "Páginas de Venda & Captura",
      explore: "Explorar Projeto →",
    },
    alfred: {
      eyebrow: "Inteligência Artificial",
      heading1: "Conheça Pablo",
      heading2: "através do",
      description: "Um assistente com informações sobre minha trajetória, projetos e áreas de atuação. Pergunte o que quiser.",
      suggestLabel: "Experimente perguntar",
      questions: [
        "Em quais projetos o Pablo trabalha?",
        "Como o Pablo pode ajudar minha empresa?",
        "Quais são as principais habilidades dele?",
      ],
      subtext: "Assistente do Pablo",
      clear: "Limpar",
      placeholder: "Pergunte algo sobre o Pablo...",
      initialMessage: "Olá, sou Alfred, o assistente virtual do Pablo. Posso apresentar sua trajetória, projetos, áreas de atuação e explicar como ele pode ajudar seu negócio.",
    },
    footer: {
      text: "Pablo Cruz — Portfólio Pessoal",
    },
  },
  en: {
    nav: {
      downloadCV: "Download CV",
      links: ["Home", "Alfred", "Projects", "Skills", "Contact", "Plans"],
    },
    hero: {
      comment: "// hello world — available for hire",
      headline1: "Turning Visions into",
      headline2: "high-performance web products.",
      cta: "See my Projects",
      typewriter: ["Fullstack Developer", "Typescript & Node.js", "SaaS Builder", "AI & LLM Developer"],
    },
    services: {
      label: "What I do",
      headline: "From design to deploy —",
      headlineSpan: "start to finish.",
      cards: [
        { name: "Branding & UI/UX:", description: "Creating intuitive interfaces that strengthen your brand identity." },
        { name: "Web Systems, SaaS & Apps", description: "Development of complex applications and platforms with modern, secure architecture." },
        { name: "Design & Creativity", description: "Optimized, fast pages to turn visitors into customers." },
        { name: "Technical Consulting", description: "Strategic support to choose the best technologies for your business." },
      ],
    },
    featured: {
      sectionTitle: "Featured",
      sectionTitleSpan: "Projects",
      subtitle: "A closer look at my most recent work.",
      viewDetails: "View Details",
    },
    skills: {
      tag: "<skills />",
      title: "My",
      titleSpan: "Skills",
    },
    contact: {
      title: "Ready to scale your",
      titleSpan: "next project?",
      description: "I'm available for new challenges and partnerships. Whether it's a complex system or a strategic landing page, let's talk about how I can help your business grow.",
      location: "Mogi das Cruzes, São Paulo",
    },
    projects: {
      loading: "Loading Gallery...",
      systems: "Systems in Development",
      landingPages: "Sales & Capture Pages",
      explore: "Explore Project →",
    },
    alfred: {
      eyebrow: "Artificial Intelligence",
      heading1: "Meet Pablo",
      heading2: "through",
      description: "An assistant with information about my background, projects and areas of expertise. Ask whatever you want.",
      suggestLabel: "Try asking",
      questions: [
        "What projects has Pablo worked on?",
        "How can Pablo help my company?",
        "What are his main skills?",
      ],
      subtext: "Pablo's Assistant",
      clear: "Clear",
      placeholder: "Ask something about Pablo...",
      initialMessage: "Hi, I'm Alfred, Pablo's virtual assistant. I can introduce his background, projects, areas of expertise and explain how he can help your business.",
    },
    footer: {
      text: "Pablo Cruz — Personal Portfolio",
    },
  },
} as const
