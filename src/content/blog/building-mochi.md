---
title: "Making Mochi feel alive"
description: "The interesting part of a desktop companion isn't playing animations. It's deciding when they should begin, when they should stop, and what should happen next."
date: 2026-09-11
tags: ["mochi", "linux", "python"]
featured: false
draft: true
---

Mochi started as a pretty simple idea: put a tiny creature on my Linux desktop and make him react to what I'm doing.

That sounds like an animation problem. It turned into a state-management problem almost immediately.

## An animation is not a behavior

Playing a GIF when something happens is easy. The harder questions are everything around it.

What if Mochi is walking when the terminal becomes active? What if the terminal loses focus before the transition finishes? What if the same desktop signal fires five times? What happens after an emote ends? Can the user pick him up in the middle of it?

The useful mental model became:

```text
current state → trigger → transition → active state → exit → appropriate idle state
```

That changed how I looked at the whole project. A desktop companion shouldn't feel like a collection of unrelated animations. The character needs continuity.

## Desktop context without reading your work

Mochi can react to broad activity such as typing, terminal use, coding, music, video, or idle time. The point is context, not surveillance.

That distinction matters. I want the companion to know enough to feel present without needing the contents of whatever I'm typing.

It also creates an engineering constraint: detection should produce meaningful state changes instead of constantly shouting the same event at the presentation layer.

If the terminal becomes active, that's useful. If the detector announces "terminal active" over and over while nothing changed, the animation system has to defend itself from noise that should not exist in the first place.

## Bugs taught me the architecture

Some of the most useful design decisions came from regressions.

A repeated event can restart an animation. A context menu can expose assumptions about input state. A drag interaction can interrupt something that was never designed to be interrupted. An idle timer can become responsible for behavior it should only be scheduling.

Fixing those bugs one at a time is tempting, but the better question is usually: **who should own this state?**

That question has made Mochi much easier for me to reason about.

## What I'm trying to build

I don't want Mochi to become a productivity dashboard wearing a cute skin. I want him to remain lightweight, contextual, and mostly happy to just exist beside whatever you're already doing.

The polish is in the small things: not repeating himself too often, not stealing focus, recovering cleanly from interruptions, and returning to the right idle state after something interesting happens.

That's the part of the project I've become most interested in. The pixels make the character visible. The transitions make him feel consistent.
