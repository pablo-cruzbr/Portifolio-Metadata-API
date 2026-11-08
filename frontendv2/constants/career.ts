// Career timeline, oldest first, taken from the CV. Each entry has the Portuguese text and an English version.

export interface CareerText {
  role: string;
  org: string;
  period: string;
  highlights: string[];
}

export interface CareerStep {
  start: string;
  /** Which icon marks the step on the rail. */
  icon: "infra" | "freelance" | "rollout" | "ai" | "industry";
  /** Still in this role: shown with a live marker. */
  current: boolean;
  tags: string[];
  pt: CareerText;
  en: CareerText;
}

const career: CareerStep[] = [
  {
    start: "2023-06",
    icon: "infra",
    current: false,
    tags: ["Active Directory", "Redes", "Telefonia IP 3CX"],
    pt: {
      role: "Técnico de Helpdesk N1 e N2",
      org: "Allti Service · Mogi das Cruzes, SP",
      period: "06/2023 – 12/2025",
      highlights: [
        "Administrei servidores Active Directory e equipamentos de rede, mantendo 99% de disponibilidade da infraestrutura.",
        "Cuidei da telefonia IP 3CX e do suporte N2, com manutenções preventivas e corretivas em hardware.",
      ],
    },
    en: {
      role: "IT Helpdesk Technician (L1 and L2)",
      org: "Allti Service · Mogi das Cruzes, Brazil",
      period: "Jun 2023 – Dec 2025",
      highlights: [
        "Managed Active Directory servers and network equipment, keeping the infrastructure at 99% availability.",
        "Handled 3CX IP telephony and L2 support, with preventive and corrective hardware maintenance.",
      ],
    },
  },
  {
    start: "2025-04",
    icon: "freelance",
    current: false,
    tags: ["Node.js", "Next.js", "React Native", "PostgreSQL"],
    pt: {
      role: "Desenvolvedor Full Stack Freelancer",
      org: "Autônomo · Remoto",
      period: "04/2025 – 01/2026",
      highlights: [
        "Criei sozinho o Fire OS, SaaS de ordens de serviço com app mobile para os técnicos de campo e painel web para os gestores.",
        "Coloquei o sistema em produção numa empresa de TI com 10 funcionários por 2 meses; o projeto levou à minha contratação como desenvolvedor.",
      ],
    },
    en: {
      role: "Freelance Full Stack Developer",
      org: "Self-employed · Remote",
      period: "Apr 2025 – Jan 2026",
      highlights: [
        "Built Fire OS on my own, a service order SaaS with a mobile app for field technicians and a web dashboard for managers.",
        "Put it in production at a 10-person IT company for 2 months; the project got me hired as a developer.",
      ],
    },
  },
  {
    start: "2026-01",
    icon: "rollout",
    current: false,
    tags: ["TypeScript", "Prisma", "React Native"],
    pt: {
      role: "Desenvolvedor Full Stack Júnior",
      org: "Allti Service · Mogi das Cruzes, SP",
      period: "01/2026 – 07/2026",
      highlights: [
        "Liderei a implantação do Fire OS em produção, com o rollout e o treinamento das equipes técnicas de campo.",
        "Migrei os dados do sistema legado (ALVO) para o Fire OS sem interromper a operação.",
      ],
    },
    en: {
      role: "Junior Full Stack Developer",
      org: "Allti Service · Mogi das Cruzes, Brazil",
      period: "Jan 2026 – Jul 2026",
      highlights: [
        "Led the Fire OS rollout to production, including training the field technician teams.",
        "Migrated the legacy system (ALVO) data to Fire OS without stopping operations.",
      ],
    },
  },
  {
    start: "2026-06",
    icon: "ai",
    current: true,
    tags: ["LangGraph", "BullMQ", "Redis", "SSE"],
    pt: {
      role: "Co-founder",
      org: "Hone AI Mock Interview · Borderless Labs (EUA) · Remoto",
      period: "06/2026 – Atual",
      highlights: [
        "2º lugar no Hackathon HB01-2026; hoje o Hone é um dos 3 produtos do Borderless Labs.",
        "Desenvolvi com o time o back-end: leitura de currículos numa fila assíncrona (BullMQ e Redis) e respostas da IA por streaming (SSE).",
      ],
    },
    en: {
      role: "Co-founder",
      org: "Hone AI Mock Interview · Borderless Labs (USA) · Remote",
      period: "Jun 2026 – Present",
      highlights: [
        "2nd place at the HB01-2026 Hackathon; Hone is now one of the 3 Borderless Labs products.",
        "Built the back-end with the team: resume parsing in an async queue (BullMQ and Redis) and AI responses streamed over SSE.",
      ],
    },
  },
  {
    start: "2026-08",
    icon: "industry",
    current: true,
    tags: ["Express", "PostgreSQL", "Playwright", "GitHub Actions"],
    pt: {
      role: "Desenvolvedor Full Stack",
      org: "Aços Vital · Mogi das Cruzes, SP",
      period: "08/2026 – Atual",
      highlights: [
        "Integrei o ERP Omie de 3 empresas do grupo: 88 mil produtos e mais de 6 mil fornecedores sincronizados a cada 15 minutos.",
        "Garanti a qualidade com 437 testes automatizados no CI e levei a tela de proposta de 4,5 s para 50 ms por tecla.",
      ],
    },
    en: {
      role: "Full Stack Developer",
      org: "Aços Vital · Mogi das Cruzes, Brazil",
      period: "Aug 2026 – Present",
      highlights: [
        "Integrated the Omie ERP of 3 group companies: 88k products and 6k+ suppliers synced every 15 minutes.",
        "Ensured quality with 437 automated tests in CI and took the quote screen from 4.5 s to 50 ms per keystroke.",
      ],
    },
  },
];

export default career;
