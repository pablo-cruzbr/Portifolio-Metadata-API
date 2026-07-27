# Portfolio Frontend v2

Frontend do portfólio pessoal de Pablo Cruz, construído com Next.js 16 App Router, TypeScript e Tailwind CSS.

🔗 **Live:** [pablocruz.vercel.app](https://portifolio-metadata-api-v4.vercel.app/)

---

## Stack

- **Next.js 16.2** — App Router, route handlers, static + dynamic rendering
- **TypeScript** (strict mode)
- **Tailwind CSS 4**
- **Vercel AI SDK** — `ai`, `@ai-sdk/react`, `@ai-sdk/groq`
- **Groq** — LLM provider (llama-3.1-8b-instant)
- **React Context API** — i18n PT/EN sem biblioteca externa

---

## Alfred — Assistente de IA

Assistente virtual embutido no portfólio que responde perguntas sobre minha trajetória e projetos.

**Arquitetura**

```
useChat (browser)
  └─ POST /api/AssistentePabloCruz
        └─ streamText → Groq (llama-3.1-8b-instant)
              └─ toUIMessageStreamResponse() → streaming de volta ao browser
```

**Implementação**

- `app/api/AssistentePabloCruz/route.ts` — route handler com `streamText` e system prompt
- `components/Home/Alfred/AlfredChat.tsx` — componente React com `useChat` + `DefaultChatTransport`
- `app/assistentePabloCruz/page.tsx` — página standalone do assistente
- Suporte a i18n: textos, perguntas sugeridas e mensagem inicial trocam com o idioma; o chat reseta automaticamente

---

## i18n (PT/EN)

Todas as seções traduzem via `translations/index.ts` + React Context. Nenhuma biblioteca de i18n externa.

Seções traduzidas: nav, hero, services, featured projects, skills, contact, footer, Alfred chat.

---

## Estrutura principal

```
app/
├── api/AssistentePabloCruz/route.ts   # AI route handler
├── assistentePabloCruz/page.tsx       # Página standalone do Alfred
├── projeto/featured/[slug]/page.tsx   # Detalhes de projetos em destaque
└── page.tsx                           # Home

components/Home/
├── Alfred/AlfredChat.tsx              # Chat widget (embarcado no Home e na página standalone)
├── Hero/
├── FeaturedProject/
├── Projects/
├── Skills/
├── Contact/
└── Nav.tsx/

context/LanguageContext.tsx            # Provider de i18n
translations/index.ts                  # Strings PT + EN (as const)
```

---

## Configuração

```bash
npm install
cp .env.local.example .env.local
# Edite .env.local com sua GROQ_API_KEY
npm run dev
```

**Variáveis de ambiente**

| Variável | Descrição |
|----------|-----------|
| `GROQ_API_KEY` | Chave da API Groq — obtenha em [console.groq.com/keys](https://console.groq.com/keys) |
