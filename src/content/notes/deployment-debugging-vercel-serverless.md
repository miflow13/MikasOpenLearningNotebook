---
title: "Deployment Debugging: Code, Routes, Platforms & Domains"
description: "What a Forem-powered README card taught me about debugging serverless deployments one layer at a time."
topic: "Web Development"
order: 30
featured: false
draft: false
---

## The project

I built a small Forem-powered card intended for GitHub READMEs.

The serverless endpoint:

- fetches live DEV/Forem data
- aggregates profile/article statistics
- renders an SVG
- supports themes
- embeds avatar data
- validates inputs
- escapes XML
- caches responses
- renders useful error states

The harder lesson came from deployment.

## A 404 is not automatically an application bug

I hit a DEPLOYMENT_NOT_FOUND response.

The important debugging move was to identify which layer produced the error before changing application code.

A deployment can fail at several different layers:

**application logic → serverless route structure → platform configuration → deployment → alias/domain → connector/account permissions**

If the platform itself cannot find a deployment, changing SVG rendering code will not solve it.

## Repository structure can be runtime configuration

For the Vercel deployment, the function needed to live at the expected root path, /api/card, and the root project needed the matching vercel.json.

The code could be correct while the platform could not discover or route it correctly.

That taught me that file placement can be part of an application's runtime contract.

## Separate deployment success from domain success

Another useful distinction:

- build succeeded
- deployment alias is correct
- custom domain is reachable
- my connector has permission to inspect the team/project

These are separate facts.

A 403 from a connected tool may describe account/team access, not the health of the application.

## External data needs defensive boundaries

Because the card consumes a live API and emits SVG/XML, boundary handling matters:

- normalize unexpected API data
- validate the username
- escape user-controlled text before XML output
- provide stable error cards
- cache remote requests when appropriate
- keep defaults/examples synchronized with the real username

## Main lesson

Debug web deployments from the outside in:

1. identify which layer emitted the failure
2. verify routing and project structure
3. verify deployment state
4. verify alias/domain state
5. only then change application logic if the evidence points there

"404" is a symptom, not a root cause.
