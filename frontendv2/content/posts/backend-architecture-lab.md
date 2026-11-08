---
title: "Backend Architecture Lab: regras de negócio que não sabem que existe banco"
description: "O laboratório em que estou estudando Clean Architecture e SOLID na prática: entidades, casos de uso, contratos de repositório e testes que rodam sem servidor e sem banco."
date: "2026-11-08"
category: "Back-end"
cover: "/images/blog/backend-architecture-lab.webp"
---

![Diagrama das camadas do Backend Architecture Lab e o caso de uso CreateAppointment](/images/blog/backend-architecture-lab.webp)

Nos meus projetos, o back-end quase sempre nasce do mesmo jeito: uma rota, um `controller`, um `service` e o Prisma ali dentro. Funciona. Mas, quando eu quero testar uma regra de negócio, preciso subir o banco junto. E, quando a regra cresce, ela não tem um lugar óbvio para morar.

Para estudar isso de verdade, criei o **[Backend Architecture Lab](https://github.com/pablo-cruzbr/Backend-Architecture-Lab)**: um repositório pequeno, de propósito, para praticar Clean Architecture e SOLID num domínio simples, o de **agendamento de horários**.

## A ideia

Construir uma API em que **as regras de negócio vivem isoladas e não sabem que existe HTTP, banco de dados ou framework**.

Com isso, as regras são testadas com testes unitários, rápidos e sem servidor. E trocar de framework ou de banco não mexe nelas. A frase que guia o lab é esta: **o framework é um detalhe; o coração da aplicação são as regras de negócio.**

## As camadas

Pense em círculos: o de dentro não conhece o de fora, e as dependências apontam sempre para dentro.

| Camada | O que faz | Pergunta que responde |
|---|---|---|
| **Entidades** | Dados e regras que valem sempre | "O que é um agendamento válido?" |
| **Casos de uso** | Orquestram uma ação do sistema | "O que acontece quando alguém tenta agendar?" |
| **Contratos de repositório** | Dizem *como* o núcleo pede dados, sem dizer *onde* | "Do que o caso de uso precisa?" |
| **Infra** | Banco real, rotas HTTP | "Como isso funciona no mundo real?" |

## Regra de entidade x regra de caso de uso

Foi a distinção que mais me fez pensar no começo.

**Regra da entidade** vale sempre, em qualquer contexto: um agendamento não pode terminar antes de começar. Então ela mora no construtor do `Appointment`:

```ts
constructor (props: AppointmentProps) {
    const { startsAt, endsAt } = props

    if (endsAt <= startsAt) {
        throw new Error('Invalid end date')
    }

    this.props = props
}
```

**Regra do caso de uso** depende de outros dados: não pode haver dois agendamentos no mesmo horário. Para saber isso, é preciso consultar os agendamentos que já existem, então ela não cabe na entidade sozinha. Ela mora no `CreateAppointment`:

```ts
const overlappingAppointment = await this.appointmentsRepository
    .findOverlappingAppointment(startsAt, endsAt)

if (overlappingAppointment) {
    throw new Error('No overlapping appointments allowed')
}

await this.appointmentsRepository.create(appointment)
```

## O "D" do SOLID: o caso de uso não conhece o banco

O `CreateAppointment` recebe o repositório pelo construtor e depende só de um **contrato**:

```ts
export interface AppointmentsRepository {
    create(appointment: Appointment): Promise<void>
    findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}
```

Isso é a inversão de dependência. Em produção, alguém entrega uma implementação com banco de verdade. Nos testes, eu entrego uma **implementação em memória**, que guarda os agendamentos numa lista e usa o `areIntervalsOverlapping` do date-fns para achar conflitos. O teste roda em milissegundos, sem configurar nem limpar banco, e cada teste começa do zero.

## Onde o lab está hoje

Até aqui, o lab tem:

- a entidade `Appointment`, com a validação de datas;
- o caso de uso `CreateAppointment`, com a regra de conflito de horário;
- o contrato `AppointmentsRepository` e a versão em memória;
- 4 testes com Vitest, 2 da entidade e 2 do caso de uso, seguindo o padrão Arrange, Act, Assert;
- dois guias de estudo: um sobre API testável com SOLID e outro, **"Do controller + service para uma API testável"**, que aplica as mesmas ideias ao back-end do Mestre da Comanda, com o antes e o depois.

O próximo teste que falta é justamente o da regra de conflito: provar que o caso de uso recusa um agendamento que se sobrepõe a outro. Cada regra de negócio merece pelo menos um teste que prove que ela é respeitada.

## O que vem depois

O HTTP e o banco entram **por último**, como adaptadores. A rota só traduz a requisição numa chamada ao caso de uso, e o repositório real é só mais uma implementação do mesmo contrato que os testes já usam. Se eu perceber uma regra de negócio escrita dentro de uma rota, é sinal de que ela deveria estar no núcleo.

O código está aberto: [github.com/pablo-cruzbr/Backend-Architecture-Lab](https://github.com/pablo-cruzbr/Backend-Architecture-Lab).
