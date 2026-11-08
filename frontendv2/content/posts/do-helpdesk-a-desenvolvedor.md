---
title: "Do helpdesk a desenvolvedor: o sistema que ninguém me pediu"
description: "Eu era técnico de helpdesk, vi um problema que atrasava todo mundo e fiz um protótipo. Ele virou o Fire OS e me levou a desenvolvedor."
date: "2026-11-01"
category: "Carreira"
cover: "/images/blog/do-helpdesk-a-desenvolvedor.webp"
draft: true
---

![Antes, 5 a 6 telas no sistema antigo para abrir uma ordem de serviço; depois, o Fire OS no celular do técnico](/images/blog/do-helpdesk-a-desenvolvedor.webp)

Comecei na TI como técnico de helpdesk na Allti Service, em 2023. Cuidava de servidores, rede, telefonia e suporte. Nada de código no meu cargo.

Mas tinha uma coisa que me incomodava todo dia: **abrir uma ordem de serviço no sistema antigo era lento e cheio de passos**. O técnico perdia tempo na tela em vez de estar resolvendo o problema do cliente.

## Ninguém me pediu

Não havia projeto, equipe nem orçamento para trocar aquilo. Se eu quisesse mudar, precisava primeiro convencer a gestão. E apresentação de slide não convence ninguém a trocar um sistema que, bem ou mal, funciona.

Então fiz um **protótipo funcional** com os 3 pontos que mais doíam: ordem de serviço digital, assinatura online e priorização dos chamados. Coisa pequena, mas que dava para usar.

## O sinal verde

A gestão viu funcionando e deu o sinal verde. A partir daí, construí o sistema inteiro sozinho, trabalhando como freelancer:

- uma **API em Node.js** com autenticação JWT e permissões por perfil (admin, técnico e cliente);
- um **painel web em Next.js** para os gestores;
- um **app em React Native** para os técnicos de campo, pensado para o celular.

Esse sistema virou o **Fire OS**.

## Em produção

O Fire OS rodou 2 meses em produção numa empresa de TI com 10 funcionários. Migrei os dados do sistema legado, acompanhei os técnicos no uso real e fui ajustando com o que eles me diziam. E o projeto me levou a ser contratado como desenvolvedor.

## O que eu aprendi

**Um protótipo que funciona convence mais do que uma apresentação.** A gestão não aprovou uma ideia, aprovou uma coisa que ela pôde usar.

**O melhor problema para resolver é o que você vê de perto.** Eu sabia exatamente onde doía porque eu estava ali todo dia. Isso valeu mais do que qualquer especificação.

**Ninguém precisa te dar permissão para começar.** Precisa te dar permissão para continuar. E isso fica muito mais fácil quando você chega com algo pronto.
