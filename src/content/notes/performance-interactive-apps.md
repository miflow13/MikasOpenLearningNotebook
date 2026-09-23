---
title: "Performance Is an Architecture Problem"
description: "Lessons from optimizing interactive 3D and stateful applications before reaching for cosmetic fixes."
topic: "Software Engineering"
order: 27
featured: false
draft: false
---

## Performance starts with asking what must exist

A performance pass is not just shaving milliseconds from code. Often the better question is whether a piece of work needs to happen at all.

In a 3D library, thousands of unique meshes, materials, image textures, labels, and updates can become expensive quickly. A convincing world can instead reuse geometry, reduce distant detail, defer expensive content, and keep only nearby interactions fully alive.

## Measure the workflow, not one function

Performance is experienced across the main loop: loading, movement, targeting, opening content, closing it, and continuing to explore. An optimization that makes startup faster but introduces stutter during navigation is not necessarily a win.

## Cleanup matters

Interactive features create resources: event listeners, timers, audio, geometry, materials, textures, windows, and state subscriptions. If ownership is unclear, resources survive longer than intended and bugs accumulate.

This connects directly to what I learned building Mochi: long-running systems need explicit ownership and cleanup paths.

## What I can do now

I can look for architectural causes of poor performance, distinguish visual density from actual workload, and evaluate optimization against the user's complete interaction loop.
