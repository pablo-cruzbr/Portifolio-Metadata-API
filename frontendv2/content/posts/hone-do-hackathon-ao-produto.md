---
title: "Hone: do hackathon a um produto de IA no ar"
description: "Como um projeto de fim de semana virou um dos produtos do Borderless Labs, o que eu construí nele e o que aprendi sobre colocar IA no caminho do usuário."
date: "2026-11-03"
category: "Hone"
featured: true
cover: "/images/blog/borderless-conference-grupo.webp"
draft: true
---

Em maio de 2026, entrei no Hackathon HB01-2026 com o Guilherme Resende e o Vinícius Nathan. A ideia era simples de explicar e difícil de fazer bem: **uma IA que entrevista você para a vaga que você quer**, a partir do seu currículo, para você treinar antes da entrevista de verdade.

Ficamos em 2º lugar. E, diferente da maioria dos projetos de hackathon, o Hone não morreu na segunda-feira seguinte.

## Quem está por trás

- **[Guilherme Resende](https://github.com/guilhermelr291)**, founder principal;
- **[Vinícius Nathan](https://github.com/ViniNathan)**, co-founder;
- e eu, **Pablo Cruz**, co-founder.

![Foto de grupo da comunidade Borderless na Borderless Conference](/images/blog/borderless-conference-grupo.webp)

## O problema que o Hone resolve

Quem já fez entrevista técnica sabe: treinar com banco de perguntas genérico ajuda pouco. A entrevista real puxa pelo **seu** currículo, pelas **suas** escolhas, e o entrevistador vai atrás do ponto em que a sua resposta fica rasa.

O Hone faz isso. Ele lê o currículo contra a vaga, conduz a entrevista com perguntas de acompanhamento sobre trade-offs e profundidade e, no fim, mostra a cobertura por tema e onde estudar a seguir.

## Do hackathon ao Borderless Labs

Depois do hackathon, o Hone foi incubado no **Borderless Labs**, o braço de incubação da Borderless Coding (EUA). O Labs é onde engenheiros da comunidade lançam produtos de IA que nasceram em hackathons, e hoje o Hone é um dos 3 produtos de lá.

Isso mudou o tipo de trabalho. No hackathon, a regra é fazer funcionar até domingo. Num produto no ar, a regra é **não quebrar para quem já está usando**.

## O que foi meu

Num time de 3, vale ser preciso sobre quem fez o quê. A orquestração principal da entrevista com LangGraph e o processamento dos currículos são trabalho do time. No hackathon, a minha parte foi o dashboard e a integração do upload de currículo no front.

Depois, no produto, fiquei com uma funcionalidade inteira: o **modo de revisão de respostas fracas**. A ideia é mostrar ao candidato, depois da entrevista, quais respostas ficaram abaixo do esperado e por quê.

Construí de ponta a ponta:

- um **nó LangGraph** que analisa a entrevista no último turno, com um schema para a saída;
- uma **fila BullMQ com worker**, para essa análise não travar a resposta ao candidato;
- uma **tabela própria no PostgreSQL** para as respostas fracas;
- os **endpoints GET e DELETE** e a aba no front.

Também corrigi problemas que só aparecem com gente de verdade usando: uma condição de corrida no primeiro login, um erro 500 na cota de sessões, um cache ETag que devolvia 304 quando não devia e um erro confuso quando o áudio chegava sem fala. E fiz partes de produto, como a paginação das sessões, turnos configuráveis de 3 a 20, um tour de primeiro acesso e o analytics com PostHog.

No total, foram 102 commits e 6 PRs mergeados.

![Participante com a camiseta da Borderless Coding na Borderless Conference](/images/blog/borderless-coding-camiseta.jpg)

## O que eu aprendi

**Uma feature de IA tem duas partes.** Uma é o nó que chama o modelo. A outra, que ninguém mostra na demo, é o que tira essa chamada do caminho do usuário. Sem a fila, a última resposta da entrevista ficaria esperando o LLM terminar a análise. Com ela, o candidato recebe a resposta na hora, e a revisão aparece quando fica pronta.

**Produto no ar é outro esporte.** Metade do que eu fiz no Hone não foi feature nova, foi fazer o que já existia aguentar uso real. Condição de corrida, cota, cache: nada disso aparece num hackathon, e tudo isso aparece na primeira semana com usuários.

**Ser preciso sobre a própria parte é uma vantagem.** Num projeto em equipe, dizer "eu fiz tudo" é fácil e frágil. Saber apontar o commit e explicar a decisão é o que sustenta a conversa numa entrevista.

Se quiser testar, o Hone está no ar: [labs.borderlesscoding.com/ai-mock-interview](https://labs.borderlesscoding.com/ai-mock-interview).
