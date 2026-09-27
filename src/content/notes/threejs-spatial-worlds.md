---
title: "Three.js: Building Spatial Worlds That Feel Bigger Than They Are"
description: "Scene graphs, GLB assets, navigation, collision, z-fighting, atmosphere, and the architecture behind convincing large 3D spaces."
topic: "3D & Three.js"
order: 25
featured: true
draft: false
---

## The shift

Building Oniria's DEV Library pushed me from arranging UI into thinking about **space as an interface**. A 3D world has all the normal application problems—data, state, performance, navigation—but also camera comfort, scale, collision, orientation, lighting, and physical readability.

## Scene graphs are architecture

A Three.js scene is a tree of objects. That makes hierarchy matter. Related meshes should move and clean up together; decorative systems should not become tangled with interactive systems; geometry and materials need clear ownership.

GLB assets also taught me that importing a model is not the same as integrating it. Scale, origin, orientation, material behavior, collisions, and repetition all have to agree with the world around it.

## Visual scale is not computational scale

The biggest lesson: **a world can feel infinite without rendering infinite things.**

Large environments need illusion and selective detail: repeated structures, fog, distant silhouettes, procedural placement, streaming or pagination, and reduced detail outside the player's immediate area. The goal is perceived abundance, not maximum object count.

## Bugs unique to spatial UI

I ran into problems that barely exist in ordinary page layouts:

- overlapping surfaces cause z-fighting and flicker
- invisible collision geometry can make open space unreachable
- a shelf can technically contain content while looking empty from human walking distance
- an object facing the wrong direction can make an interaction feel broken
- excessive spacing destroys the feeling of density even when many objects exist

These are reminders to debug what the user **experiences**, not only what the data says exists.

## Navigation is part of the design

WASD controls are not enough. People need landmarks, visible routes, current-location feedback, readable labels, predictable interaction keys, and a way to recover orientation. Camera speed and collision are UX decisions.

## What I can do now

I can reason about a Three.js scene as a system rather than a pile of meshes: trace scene ownership, integrate GLB assets, diagnose collision and z-fighting problems, and make deliberate tradeoffs between visual density and rendering cost.

## Technically correct can still be spatially wrong

Oniria made this lesson painfully clear: an agent can produce code that is internally correct while the world is still visually wrong.

A shelf can exist at the intended coordinates and still:

- block a walking route
- read as empty from player distance
- face the wrong direction
- destroy the intended density
- make navigation confusing

So spatial verification needs a human loop:

```text
implement
→ enter the world
→ walk the route
→ observe from player height
→ correct
→ repeat
```

Screenshots and code inspection help, but they are not substitutes for moving through the environment.

## Better tools can beat better prompts

Repeatedly asking an agent to move world geometry by describing coordinates became inefficient.

Building an in-world layout-marker/editor workflow was a better solution because it converted a fuzzy spatial instruction into inspectable data.

This is a general engineering lesson:

> When prompting becomes a lossy interface to the problem, improve the tool or representation instead of endlessly improving the prompt.

## Persistent place, changing occupants

The living-shelf system also clarified a useful data model.

A shelf/slot can be a persistent **place**, while the article/book currently occupying that place changes from external signals.

That separation makes the world feel stable without freezing its content.

It is the spatial equivalent of separating component identity from changing data.
