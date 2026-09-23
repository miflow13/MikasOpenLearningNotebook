---
title: "Content Systems: APIs, CMS Data & Worlds"
description: "What I learned about separating content from presentation while connecting DEV data, Sanity, and an interactive application."
topic: "Web Development"
order: 26
featured: false
draft: false
---

## Content is not the world

Working on a library containing DEV articles clarified an important boundary: the **content model** and the **visual world** are different systems.

An API can supply article metadata and bodies. A CMS such as Sanity can manage curated metadata, configuration, editorial content, or world descriptions. Three.js can decide how that information becomes shelves, books, districts, signs, and interactions.

Trying to make one layer responsible for all three creates unnecessary coupling.

## Normalize at the boundary

External data is not guaranteed to have the shape I expect. A field such as a tag list may arrive in an unexpected representation. The safest place to fix that is near the API boundary: normalize incoming data into the application's internal shape, then let components consume a predictable contract.

## Huge catalogues need representation strategies

Fetching a catalogue and rendering a catalogue are separate problems. Even if thousands of records are available, instantiating a complex 3D object for every record at once is usually the wrong goal.

Useful strategies include pagination, clustering, procedural shelf population, lazy detail, caching, and loading full article bodies only when they are actually needed.

## Sanity mental model

Sanity is a structured content backend. Schemas describe the shape of documents; Studio provides an editing interface; GROQ queries retrieve the pieces an application needs. It is useful when content should be editable independently from application code.

It should not become a substitute for the application's runtime state or Three.js scene graph.

## What I can do now

I can trace information from an external source through normalization and application state into a UI, and I can decide whether data belongs in an API, CMS, application state, or the visual scene.
