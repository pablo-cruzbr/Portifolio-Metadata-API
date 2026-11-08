---
title: "Backend Architecture Lab: business rules that don't know a database exists"
description: "The lab where I'm studying Clean Architecture and SOLID in practice: entities, use cases, repository contracts and tests that run without a server or a database."
category: "Back-end"
---

![Diagram of the Backend Architecture Lab layers and the CreateAppointment use case](/images/blog/backend-architecture-lab.webp)

In my projects, the back-end is almost always born the same way: a route, a `controller`, a `service` and Prisma right inside it. It works. But when I want to test a business rule, I have to spin up the database too. And as the rule grows, it has no obvious place to live.

To really study this, I created the **[Backend Architecture Lab](https://github.com/pablo-cruzbr/Backend-Architecture-Lab)**: a deliberately small repository to practice Clean Architecture and SOLID in a simple domain, **appointment scheduling**.

## The idea

Build an API where **business rules live in isolation and don't know that HTTP, a database or a framework exist**.

That way, the rules are covered by unit tests, fast and with no server. And switching frameworks or databases doesn't touch them. The sentence that guides the lab is this: **the framework is a detail; the heart of the application is the business rules.**

## The layers

Think of circles: the inner one doesn't know the outer one, and dependencies always point inward.

| Layer | What it does | Question it answers |
|---|---|---|
| **Entities** | Data and rules that always hold | "What is a valid appointment?" |
| **Use cases** | Orchestrate one action of the system | "What happens when someone tries to book?" |
| **Repository contracts** | Say *how* the core asks for data, not *where* | "What does the use case need?" |
| **Infra** | Real database, HTTP routes | "How does this work in the real world?" |

## Entity rule vs. use case rule

This was the distinction that made me think the most at first.

An **entity rule** always holds, in any context: an appointment can't end before it starts. So it lives in the `Appointment` constructor:

```ts
constructor (props: AppointmentProps) {
    const { startsAt, endsAt } = props

    if (endsAt <= startsAt) {
        throw new Error('Invalid end date')
    }

    this.props = props
}
```

A **use case rule** depends on other data: there can't be two appointments at the same time. To know that, you have to look up the existing appointments, so the rule doesn't fit in the entity alone. It lives in `CreateAppointment`:

```ts
const overlappingAppointment = await this.appointmentsRepository
    .findOverlappingAppointment(startsAt, endsAt)

if (overlappingAppointment) {
    throw new Error('No overlapping appointments allowed')
}

await this.appointmentsRepository.create(appointment)
```

## The "D" in SOLID: the use case doesn't know the database

`CreateAppointment` receives the repository through its constructor and depends only on a **contract**:

```ts
export interface AppointmentsRepository {
    create(appointment: Appointment): Promise<void>
    findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}
```

That's dependency inversion. In production, something hands over an implementation backed by a real database. In tests, I hand over an **in-memory implementation**, which keeps appointments in a list and uses date-fns' `areIntervalsOverlapping` to find conflicts. The test runs in milliseconds, with no database to set up or clean, and every test starts from scratch.

## Where the lab stands today

So far, the lab has:

- the `Appointment` entity, with date validation;
- the `CreateAppointment` use case, with the scheduling conflict rule;
- the `AppointmentsRepository` contract and its in-memory version;
- 4 tests with Vitest, 2 for the entity and 2 for the use case, following Arrange, Act, Assert;
- two study guides: one on testable APIs with SOLID and another, **"From controller + service to a testable API"**, which applies the same ideas to the Mestre da Comanda back-end, with a before and after.

The next missing test is precisely the conflict rule: proving that the use case rejects an appointment that overlaps another one. Every business rule deserves at least one test that proves it is enforced.

## What comes next

HTTP and the database come in **last**, as adapters. The route only translates the request into a call to the use case, and the real repository is just one more implementation of the same contract the tests already use. If I notice a business rule written inside a route, it's a sign it should be in the core.

The code is open: [github.com/pablo-cruzbr/Backend-Architecture-Lab](https://github.com/pablo-cruzbr/Backend-Architecture-Lab).
