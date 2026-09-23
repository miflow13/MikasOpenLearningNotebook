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
