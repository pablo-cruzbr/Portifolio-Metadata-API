---
title: "Building Agnis: the Fire OS AI agent and my path to AI Engineer"
description: "Why the first version of Agnis won't be a chat, where it stands today and the plan to turn a prototype into an agent that acts with human approval."
category: "AI"
---

![Agnis prototype in Fire OS: suggested questions about tickets, technicians, clients and equipment](/images/blog/agnis-prototipo.webp)

My goal is to become an **AI Engineer**. Not in the sense of knowing how to call an LLM API, but of putting AI into production the right way: with real data, permissions, tests, fallbacks and metrics that prove it helps.

To get there, I'm building **Agnis**, an AI agent inside [Fire OS](https://fire-os-saas.vercel.app/), the service order system I created and that ran for 2 months at an IT company.

## Where Agnis stands today

I'd rather start with the honest part. The Fire OS engineering foundation is ready: Redis, BullMQ, access control with CASL, validation with Zod and integration tests with Testcontainers. The AI, for now, is more demo than product:

- the chat route only partly works;
- the Agnis panel, triage and report are still prototypes with fixed answers;
- the service orders still lack an SLA, notifications, embeddings and tests on the AI route.

The next step isn't adding features. It's **making one work end to end with real data**.

## Why not start with the chat

The original plan started with a chat, "Ask Agnis". But chat is the least used part of an operations assistant. A manager doesn't wake up wanting to ask questions. They want to know **what needs a decision today**.

That's why the first version of Agnis will be a **Decision queue**. Every day, it shows 3 to 7 cards like this:

> **Order 48217 is 26 h past its deadline.** Technician Carlos has 9 open orders; Ana has 2 and covers the same neighborhood.
> **[Reassign to Ana]** **[Mark as urgent]** **[Ignore today]**

The split of work is what matters:

- **the code detects the problem**, with SQL rules that can be tested;
- **the AI explains, prioritizes and suggests the action**, choosing from a fixed list of allowed actions;
- **the manager approves with one click**, and the action goes through the system's own routes and permissions, with an audit log.

If the AI goes down, the card shows a default text. The queue works without AI; the AI just makes it better.

## The plan

1. **Foundation:** an LLM provider interface with Gemini as the default, Groq as the fallback and a fake provider for CI tests, plus usage limits and cost tracking per call.
2. **Decision queue:** the first detectors (overdue orders, overloaded technicians, unassigned orders), a daily BullMQ job and the audit log for every approval.
3. **Ask Agnis:** the chat, now reusing the same tools, with streaming and an evaluation set of 30 questions to measure whether it calls the right tool.

After that come RAG with similar cases, voice reports and a LangGraph triage agent that pauses for approval. But each phase only starts when the previous one hits its target.

## How I'll know it works

Without metrics, Agnis is a demo. The first ones I'll track:

- **suggestion approval rate:** if it's low, the problem is the rules, not the AI;
- **time between a card showing up and the decision;**
- **overdue orders per week, before and after.**

## What I learned before writing the first line

**Calculation isn't an LLM's job.** Knowing an order is late is arithmetic. Explaining why it matters and what to do is where AI helps.

**AI that acts needs brakes.** Agnis suggests; a person decides, and the decision is logged.

**Being an AI Engineer is more engineering than AI.** On [Hone](/blog/hone-do-hackathon-ao-produto), I learned that an AI feature has two parts: the model call and everything that keeps it out of the user's path. With Agnis, I want to apply that from day one.

I'll share here on the blog how each phase goes, including what doesn't work.
