---
title: "Construindo a Agnis: o agente de IA do Fire OS e o meu caminho para AI Engineer"
description: "Por que a primeira versão da Agnis não vai ser um chat, onde ela está hoje e o plano para transformar um protótipo num agente que age com aprovação humana."
date: "2026-11-03"
category: "IA"
cover: "/images/blog/agnis-prototipo.webp"
draft: true
---

![Protótipo da Agnis no Fire OS: perguntas sugeridas sobre chamados, técnicos, clientes e equipamentos](/images/blog/agnis-prototipo.webp)

A minha meta é virar **AI Engineer**. Não no sentido de saber chamar uma API de LLM, mas de colocar IA em produção do jeito certo: com dados reais, permissões, testes, fallback e métricas que provam que ela ajuda.

Para chegar lá, estou construindo a **Agnis**, um agente de IA dentro do [Fire OS](https://fire-os-saas.vercel.app/), o sistema de ordens de serviço que criei e que rodou 2 meses numa empresa de TI.

## Onde a Agnis está hoje

Prefiro começar pelo honesto. A base de engenharia do Fire OS está pronta: Redis, BullMQ, controle de acesso com CASL, validação com Zod e testes de integração com Testcontainers. A IA, por enquanto, é mais demonstração do que produto:

- a rota de chat funciona só em parte;
- o painel da Agnis, a triagem e o relatório ainda são protótipos com respostas fixas;
- ainda faltam SLA na OS, notificações, embeddings e testes na rota de IA.

O próximo passo não é adicionar funcionalidade. É **fazer uma funcionar de ponta a ponta com dados reais**.

## Por que não começar pelo chat

O plano original começava por um chat, o "Pergunte à Agnis". Mas chat é a parte menos usada de um assistente de operação. O gestor não acorda querendo fazer perguntas. Ele quer saber **o que precisa de decisão hoje**.

Por isso, a primeira versão da Agnis vai ser uma **Fila de decisões**. Todo dia, ela mostra de 3 a 7 cartões assim:

> **OS 48217 está 26 h fora do prazo.** O técnico Carlos tem 9 OS abertas; a Ana tem 2 e atende o mesmo bairro.
> **[Reatribuir para Ana]** **[Marcar como urgente]** **[Ignorar hoje]**

A divisão de trabalho é o que importa:

- **quem detecta o problema é o código**, com regras em SQL que dá para testar;
- **a IA explica, prioriza e sugere a ação**, escolhendo de uma lista fixa de ações permitidas;
- **o gestor aprova com um clique**, e a ação passa pelas mesmas rotas e permissões do sistema, com auditoria.

Se a IA cair, o cartão aparece com um texto padrão. A fila funciona sem IA; a IA só a deixa melhor.

## O plano

1. **Fundação:** uma interface de provedor de LLM com Gemini como padrão, Groq como fallback e um provider falso para os testes no CI, mais limite de uso e registro de custo por chamada.
2. **Fila de decisões:** os primeiros detectores (OS fora do prazo, técnico sobrecarregado, OS sem técnico), um job diário no BullMQ e o log de auditoria de cada aprovação.
3. **Pergunte à Agnis:** o chat, agora reaproveitando as mesmas ferramentas, com streaming e um conjunto de avaliação de 30 perguntas para medir se ela chama a ferramenta certa.

Depois disso vêm RAG com casos parecidos, laudo por voz e um agente de triagem em LangGraph com pausa para aprovação. Mas cada fase só começa quando a anterior bate a sua meta.

## Como eu vou saber se funciona

Sem métrica, a Agnis é uma demo. As primeiras que vou acompanhar:

- **taxa de aprovação das sugestões:** se ficar baixa, o problema é de regra, não de IA;
- **tempo entre o cartão aparecer e a decisão;**
- **OS fora do prazo por semana, antes e depois.**

## O que eu já aprendi antes de escrever a primeira linha

**O que é cálculo não é tarefa de LLM.** Saber que uma OS está atrasada é uma conta. Explicar por que isso importa e o que fazer é onde a IA ajuda.

**IA que age precisa de freio.** A Agnis sugere; quem decide é uma pessoa, e a decisão fica registrada.

**Ser AI Engineer é mais engenharia do que IA.** No [Hone](/blog/hone-do-hackathon-ao-produto), aprendi que uma feature de IA tem duas partes: a chamada ao modelo e tudo o que a mantém fora do caminho do usuário. Na Agnis, quero aplicar isso desde o começo.

Vou contar aqui no blog como cada fase for saindo, inclusive o que não der certo.
