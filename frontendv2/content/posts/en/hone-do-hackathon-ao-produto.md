---
title: "Hone: from a hackathon to a live AI product"
description: "How a weekend project became one of the Borderless Labs products, what I built in it and what I learned about putting AI in the user's path."
category: "Hone"
---

In May 2026, I joined the HB01-2026 Hackathon with Guilherme Resende and Vinícius Nathan. The idea was simple to explain and hard to do well: **an AI that interviews you for the job you want**, based on your resume, so you can practice before the real interview.

We took 2nd place. And, unlike most hackathon projects, Hone didn't die the following Monday.

## Who's behind it

- **[Guilherme Resende](https://github.com/guilhermelr291)**, lead founder;
- **[Vinícius Nathan](https://github.com/ViniNathan)**, co-founder;
- and me, **Pablo Cruz**, co-founder.

![Group photo of the Borderless community at the Borderless Conference](/images/blog/borderless-conference-grupo.webp)

## The problem Hone solves

Anyone who has done a technical interview knows it: practicing with a generic question bank barely helps. A real interview digs into **your** resume and **your** choices, and the interviewer goes after the point where your answer gets shallow.

Hone does that. It reads the resume against the role, runs the interview with follow-up questions about trade-offs and depth and, at the end, shows topic coverage and where to study next.

## From the hackathon to Borderless Labs

After the hackathon, Hone was incubated at **Borderless Labs**, the incubation arm of Borderless Coding (USA). The Labs is where community engineers launch AI products born in hackathons, and today Hone is one of its 3 products.

That changed the kind of work. At a hackathon, the rule is to make it work by Sunday. In a live product, the rule is **don't break it for the people already using it**.

## What was mine

On a team of 3, it pays to be precise about who did what. The main interview orchestration with LangGraph and the resume processing are the team's work. At the hackathon, my part was the dashboard and the resume upload integration on the front end.

Later, in the product, I took a whole feature: the **weak answers review mode**. The idea is to show candidates, after the interview, which answers fell short and why.

I built it end to end:

- a **LangGraph node** that analyzes the interview on the last turn, with a schema for its output;
- a **BullMQ queue with a worker**, so the analysis doesn't block the reply to the candidate;
- a **dedicated PostgreSQL table** for the weak answers;
- the **GET and DELETE endpoints** and the tab on the front end.

I also fixed problems that only show up with real people using the product: a race condition on first login, a 500 error on the session quota, an ETag cache returning 304 when it shouldn't and a confusing error when the audio arrived without speech. And I built product pieces such as session pagination, configurable turns from 3 to 20, a first-access tour and PostHog analytics.

In total, 102 commits and 6 merged PRs.

![Attendee wearing a Borderless Coding T-shirt at the Borderless Conference](/images/blog/borderless-coding-camiseta.jpg)

## What I learned

**An AI feature has two parts.** One is the node that calls the model. The other, which nobody shows in the demo, is what takes that call out of the user's path. Without the queue, the last answer of the interview would wait for the LLM to finish the analysis. With it, the candidate gets the reply right away, and the review shows up when it's ready.

**A live product is a different sport.** Half of what I did on Hone wasn't new features, it was making what already existed hold up under real use. Race conditions, quotas, caching: none of that shows up at a hackathon, and all of it shows up in the first week with users.

**Being precise about your own part is an advantage.** On a team project, saying "I did everything" is easy and fragile. Being able to point to the commit and explain the decision is what holds up the conversation in an interview.

## The next step: selling

It's time for the next step. Borderless Labs is about to start **selling its apps**, and Hone is part of that wave:

- **checkout** inside the product;
- **sales to people outside** the Borderless community, not only to those already in it;
- Hone **entering the Borderless funnel**, alongside the rest of the ecosystem.

For me, this is the newest part of the story. Until now, the challenge was making the product work and hold up under real use. Now the challenge is different: getting someone who doesn't know us to pay for it. I'll share here on the blog what I learn in this phase.

If you want to try it, Hone is live: [labs.borderlesscoding.com/ai-mock-interview](https://labs.borderlesscoding.com/ai-mock-interview).
