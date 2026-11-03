---
title: "4.5 seconds per keystroke: why I measured before optimizing"
description: "A quote screen that froze with hundreds of items, what the rendering profile showed and how it went to 50 ms per keystroke with 2,000 items."
category: "Performance"
---

At Aços Vital, salespeople build quotes with hundreds of items. In a test with 300 items, **each keystroke took 4.5 seconds** to show up on screen. With 600 items, the page froze.

The module was mine, and the largest real case had 2,000 items. So the screen had to handle 2,000.

## The temptation

When a React screen gets slow, the list of suspects writes itself: "it's the global state", "it's the component library", "it needs virtualization". You can spend a whole day optimizing something that wasn't the problem.

So, before changing a single line, I measured.

## What the measurement showed

I opened the browser's rendering profiler and typed into a quote line. The result was clear:

1. **Every keystroke re-rendered every line**, not just the one I was editing.
2. **The totals calculation did list lookups** for every item. With 2,000 items, that's a lot of work on each keystroke.

It wasn't the library or the global state. It was two specific things, and both had a fix.

## What I changed

- **I moved the line into a component with `React.memo`**, so a line only re-renders when its own data changes.
- **I replaced the list lookups with a `Map`**, which finds the item directly instead of walking the list.
- **I paginated the items 50 at a time**, keeping the total calculated over the whole quote, so the salesperson never sees a wrong total.

## The result

With 2,000 items, the quote now opens in 2.5 seconds, and **each keystroke takes about 50 ms**. That's roughly 90 times faster than before.

## What I take from it

Measuring first is what kept me from optimizing the wrong part. The fixes that worked are simple. The hard part was knowing **which** ones to make, and only the measurement answered that.

Today, when someone tells me "this screen is slow", my first question isn't "what do we swap?". It's "where is the time going?".
