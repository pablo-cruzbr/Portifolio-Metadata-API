# Pablo Cruz — Portfolio & Metadata API

Solução full-stack que centraliza e exibe dinamicamente meus projetos. O backend expõe uma API RESTful que serve metadados dos projetos; o frontend consome essa API e entrega uma experiência moderna com suporte a i18n (PT/EN) e um assistente de IA integrado.

🔗 **Live:** [pablocruz.vercel.app](https://portifolio-metadata-api-v4.vercel.app/)

---

## Estrutura do repositório

```
Portifolio-Metadata-API/
├── backend/          # API RESTful — Node.js + Express + Prisma + PostgreSQL
├── frontend/         # Versão legada (React + Vite) — deprecated
└── frontendv2/       # Versão atual — Next.js 16 + TypeScript + Tailwind CSS
```

---

## Frontend v2 — Next.js 16

Stack principal do portfólio atual.

**Tecnologias**

- Next.js 16.2 (App Router) com TypeScript strict
- Tailwind CSS 4
- React Context API para i18n (PT/EN) sem biblioteca externa
- Vercel AI SDK (`ai` + `@ai-sdk/react` + `@ai-sdk/groq`) para o assistente de IA
- AOS (Animate On Scroll) para animações de entrada
- Typewriter Effect no Hero

**Funcionalidades**

- Seletor de idioma PT/EN no header e no drawer mobile — todas as seções traduzem em tempo real
- Projetos em destaque com página de detalhes e vídeo demonstrativo
- Galeria dinâmica: conteúdo servido pela Metadata API, sem hardcode no frontend
- Seção de skills, contato, footer — todos traduzidos via `translations/index.ts`

### Alfred — Assistente de IA
<img width="1105" height="520" alt="alfred" src="https://github.com/user-attachments/assets/06220504-62e6-43a9-907b-8743104d3737" />

Alfred é um assistente virtual embutido diretamente no portfólio. Ele conhece minha trajetória, projetos e habilidades, e responde perguntas de visitantes em tempo real via streaming.

**Como foi construído**

- **Vercel AI SDK** (`ai` + `@ai-sdk/react`): gerencia o estado do chat, o streaming de tokens e o protocolo de mensagens entre frontend e backend
- **`useChat`** hook com `DefaultChatTransport`: conecta o componente React ao route handler sem boilerplate manual de fetch
- **Groq** como provedor de LLM via `@ai-sdk/groq`: latência muito baixa, ideal para streaming em tempo real
- **Modelo:** `llama-3.1-8b-instant` — rápido o suficiente para respostas fluidas em produção
- **Route Handler** em `app/api/AssistentePabloCruz/route.ts`: recebe as mensagens, converte para o formato do modelo com `convertToModelMessages`, chama `streamText` e retorna o stream com `toUIMessageStreamResponse()`
- **System prompt** injetado diretamente no route handler: descreve quem sou, meus projetos com métricas reais, e como posso ajudar empresas
- **i18n no chat**: quando o usuário troca de idioma, a mensagem inicial do Alfred e os textos da UI também trocam — o chat reseta com o novo idioma automaticamente

```
Fluxo:
Browser (useChat) → POST /api/AssistentePabloCruz → streamText (Groq / llama-3.1-8b-instant) → stream de volta ao browser
```

**Variável de ambiente necessária**

```bash
# .env.local
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Backend — Metadata API

API RESTful que serve os dados dos projetos para o frontend.

**Tecnologias**

- Node.js + Express + TypeScript
- Prisma ORM
- PostgreSQL (hospedado no Neon DB — serverless)
- Cloudinary para upload e entrega de imagens

**Endpoints principais**

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/listproject` | Sistemas em desenvolvimento |
| GET | `/landingpages` | Páginas de venda e captura |
| GET | `/listfreelancer` | Projetos freelance |

---

## Como executar localmente

```bash
# Clone
git clone https://github.com/pablo-cruzbr/Portifolio-Metadata-API.git
cd Portifolio-Metadata-API

# Backend
cd backend
npm install
cp .env.example .env   # configure DATABASE_URL e CLOUDINARY_URL
npx prisma generate
npm run dev

# Frontend v2
cd ../frontendv2
npm install
cp .env.local.example .env.local   # configure GROQ_API_KEY
npm run dev
```

---

## Autor

**Pablo Cruz** — Desenvolvedor Fullstack  
TypeScript · React · Next.js · Node.js · PostgreSQL · AI/LLM

- GitHub: [github.com/pablo-cruzbr](https://github.com/pablo-cruzbr)
- LinkedIn: [linkedin.com/in/pablo-cruz-5b937525b](https://www.linkedin.com/in/pablo-cruz-5b937525b/)
- Instagram: [@pablocruzdev](https://www.instagram.com/pablocruzdev/)
- Email: pablo.flami@gmail.com
