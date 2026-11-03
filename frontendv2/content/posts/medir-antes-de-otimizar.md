---
title: "4,5 segundos por tecla: por que eu medi antes de otimizar"
description: "Uma tela de proposta que travava com centenas de itens, o que o perfil de renderização mostrou e como ela passou a responder em 50 ms com 2.000 itens."
date: "2026-11-02"
category: "Performance"
draft: true
---

Na Aços Vital, os vendedores montam propostas com centenas de itens. Num teste com 300 itens, **cada tecla levava 4,5 segundos** para aparecer na tela. Com 600 itens, a página travava.

O módulo era meu, e o maior caso real tinha 2.000 itens. Então a tela precisava aguentar 2.000.

## A tentação

Quando uma tela React fica lenta, a lista de suspeitos aparece sozinha: "é o estado global", "é a biblioteca de componentes", "precisa virtualizar". Dá para passar um dia inteiro otimizando uma coisa que não era o problema.

Por isso, antes de mudar qualquer linha, eu medi.

## O que a medição mostrou

Abri o perfil de renderização do navegador e digitei numa linha da proposta. O resultado foi claro:

1. **Cada tecla redesenhava todas as linhas**, não só a que eu estava editando.
2. **O cálculo dos totais fazia buscas em lista** para cada item. Com 2.000 itens, isso vira muito trabalho a cada tecla.

Não era a biblioteca nem o estado global. Eram duas coisas específicas, e as duas tinham solução.

## O que eu mudei

- **Separei a linha num componente com `React.memo`**, para uma linha só redesenhar quando os dados dela mudam.
- **Troquei as buscas em lista por um `Map`**, que encontra o item direto em vez de percorrer a lista.
- **Paginei os itens de 50 em 50**, mantendo o total calculado sobre a proposta inteira, para o vendedor nunca ver um total errado.

## O resultado

Com 2.000 itens, a proposta passou a abrir em 2,5 segundos, e **cada tecla leva cerca de 50 ms**. É umas 90 vezes mais rápido que antes.

## O que eu levo disso

Medir primeiro foi o que evitou que eu otimizasse a parte errada. Os ajustes que funcionaram são simples. O difícil era saber **quais** fazer, e isso só a medição respondeu.

Hoje, quando alguém me diz "essa tela está lenta", a minha primeira pergunta não é "o que a gente troca?". É "onde está o tempo?".
