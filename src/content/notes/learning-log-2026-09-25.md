---
title: "Learning Log — September 25, 2026"
description: "A dense day of local-agent experiments, Ravel, deployment debugging, technical writing research, open-source workflow, and project positioning."
topic: "Learning Log"
order: 33
featured: true
draft: false
---

September 25 was less about learning one language feature and more about **learning how to design systems around uncertainty**.

A lot of the day's projects looked unrelated at first—local AI agents, Ravel, Oniria, Vercel, Mochi, Sinch documentation—but they kept producing the same lesson:

> Do not trust the story a system tells about itself. Collect evidence from the layer that actually owns the behavior.

## RelayLab: agents need systems around them

I experimented with two small local Ollama/Qwen agents acting as builder and reviewer.

The important lesson was that multi-agent conversation alone does not create coordination.

Useful agent systems need shared rubrics, objective tests, structured outputs, bounded retries, environment access, and explicit success/failure conditions.

This also clarified a hybrid workflow: frontier models for high-level reasoning, and local runners/workers for repeatable machine tasks.

## Mentor: the assistant should help me need it less

The Mentor idea became more concrete.

A learning-focused coding assistant should be able to change how much help it gives through Build, Pair, Learn, Review, and Rescue modes.

The OpenLearning notebook can help it understand what I have encountered before, but notebook presence should not be treated as mastery.

## Ravel: measure behavior, not claims

Ravel went from an idea into a formal v0.1 architecture and implementation.

Its central distinction is:

**declared → attempted → permitted/denied → observed**

That means a blocked policy violation is still meaningful evidence: the forbidden side effect may not have occurred, but the agent still attempted it.

The first real runs also reinforced that the evaluator itself needs calibration and debugging.

## Authorship with AI-assisted implementation

A question I had to answer for myself was whether I am still creating a project when AI writes much of the implementation.

The useful answer is to separate authorship responsibilities.

I am still making decisions about:

- the problem
- research direction
- scope
- architecture
- constraints
- experiment design
- evaluation criteria
- what gets accepted/rejected
- what the project means

The transparent framing I chose is:

> Created and designed by Mika Flowers. Built with AI-assisted development.

That feels more accurate than either pretending I manually typed everything or pretending the project is not mine.

## Deterministic programming

I learned a cleaner definition of deterministic:

**same input + same starting conditions → same result**

That concept matters in both Oniria and Ravel.

For Oniria, deterministic world generation makes spatial bugs repeatable.

For Ravel, deterministic fake runs calibrate the measurement pipeline before introducing nondeterministic model behavior.

## Oniria: engineering a world is systems work

The DEV library kept reinforcing that a 3D environment is not just visual decoration.

I have been dealing with animation loops, stale references, deterministic layout generation, camera behavior, rendering cost, collisions, world refresh behavior, search-room population, and spatial readability.

The shift is from "prompt a scene into existence" toward understanding and maintaining the systems that keep the world coherent.

## Forem README card: debug the layer that failed

The Forem card added another full small-system exercise:

**Forem API → normalization/aggregation → SVG rendering → serverless function → Vercel routing → deployment/domain**

A deployment-not-found error taught me not to change application code before identifying whether the failure came from code, routing, deployment state, domain state, or access permissions.

## Sinch RCS tutorial: research can invalidate the outline

Hands-on UI research showed that an existing assumed navigation path was stale.

Instead of continuing from unverified instructions, I changed the working draft to match the real interface and kept a hard stop where research had not yet reached.

That is a technical-writing habit I want to keep: **verified steps only**.

## Mochi: portability means removing assumptions

Mochi portability work exposed assumptions about packaging tools in clean virtual environments, GNOME-specific helpers, non-GNOME systems, Wayland/XWayland runtime behavior, and optional integrations.

A different Linux environment successfully running Mochi is meaningful because it tests assumptions my own machine cannot.

## GitHub workflow decisions

I also tightened repository hygiene:

- automatically delete merged remote head branches
- use squash/rebase merging where appropriate
- keep auto-merge off unless intentionally enabled
- occasionally use git fetch --prune to clean stale remote refs

The bigger idea is that repository settings are part of the engineering workflow, not just website preferences.

## SheShips

I created the DEV community organization SheShips around people who actually build, learn, teach, and ship software.

One wording lesson mattered: inclusion should be intentional. I chose language that can include **women and gender-diverse developers** rather than accidentally narrowing the community more than intended.

## What connected the whole day

The repeated pattern was:

**claim → inspect → collect evidence → compare against expectation → revise the system or mental model**

That showed up everywhere:

- model says it followed instructions → inspect the trace/environment
- deployment says 404 → identify the failing platform layer
- tutorial says click "Agents" → inspect the actual UI
- installer assumes GNOME → detect the real environment
- 3D world says thousands of objects exist → inspect what the player actually sees
- notebook says I learned something → test whether I can explain/use it

## What I want to keep practicing

- writing experiments with explicit variables and controls
- separating observed facts from interpretations
- reading traces/logs before guessing
- designing objective checks for AI-generated work
- tracing failures across layers
- explaining architecture in my own words
- using AI aggressively without giving up understanding
- keeping evaluation infrastructure as testable as the thing it evaluates

## Main lesson

Today made one idea much clearer:

**Software engineering is not only writing implementation code. It is designing constraints, observing systems, testing assumptions, and building enough evidence to know why something worked.**
