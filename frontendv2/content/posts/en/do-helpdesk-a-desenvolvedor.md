---
title: "From help desk to developer: the system nobody asked me for"
description: "I was a help desk technician, saw a problem that slowed everyone down and built a prototype. It became Fire OS and got me into a developer role."
category: "Career"
---

![Before, 5 to 6 screens in the old system to open a service order; after, Fire OS on the technician's phone](/images/blog/do-helpdesk-a-desenvolvedor.webp)

I started in IT as a help desk technician at Allti Service, in 2023. I took care of servers, networking, phones and support. No code in my job description.

But one thing bothered me every day: **opening a service order in the old system was slow and full of steps**. Technicians lost time on the screen instead of solving the customer's problem.

## Nobody asked me

There was no project, team or budget to replace it. If I wanted to change it, I first had to convince management. And a slide deck doesn't convince anyone to replace a system that, for better or worse, works.

So I built a **working prototype** with the 3 things that hurt the most: digital service orders, online signatures and ticket prioritization. Small, but usable.

## The green light

Management saw it working and gave me the green light. From there, I built the whole system on my own, working as a freelancer:

- a **Node.js API** with JWT authentication and role-based permissions (admin, technician and customer);
- a **Next.js web dashboard** for managers;
- a **React Native app** for field technicians, designed for the phone.

That system became **Fire OS**.

## In production

Fire OS ran in production for 2 months at an IT company with 10 employees. I migrated the data from the legacy system, followed the technicians in real use and kept adjusting based on what they told me. And the project got me hired as a developer.

## What I learned

**A prototype that works convinces more than a presentation.** Management didn't approve an idea, they approved something they could use.

**The best problem to solve is the one you see up close.** I knew exactly where it hurt because I was there every day. That was worth more than any spec.

**Nobody needs to give you permission to start.** They need to give you permission to keep going. And that's much easier when you show up with something ready.
