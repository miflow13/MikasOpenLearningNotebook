---
title: "Learning Log — September 27, 2026"
description: "Agentic engineering ownership, Oniria spatial tooling, containers and Kubernetes, technical-writing verification, Linux storage, and career positioning."
topic: "Learning Log"
order: 35
featured: true
draft: false
---

September 27 connected several things I had been treating separately: **AI-assisted development, technical ownership, spatial debugging, documentation, professional evidence, and the difference between generating work and being responsible for it**.

The strongest theme was that tools can do more of the implementation, but they do not remove the need for judgment.

## Oniria: technically correct is not the same as experientially correct

While preparing Oniria for the Sanity Challenge, I kept running into a 3D-specific problem:

An implementation can be correct in code and still feel wrong when I actually walk through the world.

Bookshelves can exist, assets can load, collisions can be valid, and coordinates can match the spec—yet the environment can still look sparse, block a route, face the wrong way, or fail to create the intended infinite-library feeling.

That reinforces a spatial development loop:

```text
agent implements
→ run the world
→ walk it at player height
→ observe the experience
→ describe the mismatch
→ revise
```

The runtime experience is evidence.

## Build a better tool when prompts become lossy

One of the best Oniria decisions was moving from repeated coordinate descriptions toward an in-world layout-marker/editor workflow.

Instead of trying to communicate spatial placement through prose alone, I could create markers, persist them, export data, and give the implementation a more exact representation.

That is a lesson I want to keep:

> If I repeatedly struggle to explain the same class of change, the bottleneck may be the interface—not the model.

Sometimes the best "prompt improvement" is a better tool.

## Stable world, changing content

The living-shelf system also helped me separate two kinds of state:

- the persistent place in the world
- the changing content occupying that place

A shelf slot can remain stable while DEV content changes underneath it.

That gives the world continuity without making the data static.

It is the same architectural idea I keep encountering elsewhere:

**identity and presentation are often more stable than the data currently flowing through them.**

## Publishing agent sessions as evidence

I prepared sanitized Oniria agent-session records for public viewing.

The useful lesson was not "publish every transcript."

Public build evidence should preserve:

- prompts/instructions that shaped the work
- mistakes
- corrections
- verification
- commits/results

while excluding:

- credentials
- private/internal reasoning
- unrelated personal context
- machine paths that do not add value
- security-sensitive telemetry

The goal is reproducibility and transparency, not raw exhaust.

## AI coding: the profession is shifting toward direction and verification

I spent time looking closely at how AI is actually being used in software development.

The useful distinction is not:

```text
AI code vs real code
```

It is closer to:

```text
unexamined generation
vs
responsible engineering workflow
```

An increasingly common loop is:

```text
requirements
→ plan/spec
→ agent implements
→ tests/review
→ agent fixes
→ human accepts
→ merge
```

That does not make understanding less important.

It changes where the bottleneck sits.

## What "owning" code means

I finally put a clearer definition around a word that shows up constantly in engineering job descriptions.

To **own** a feature does not mean I typed every line.

It means I am responsible for the outcome.

Ownership includes:

- knowing what the system is supposed to do
- understanding the implementation enough to evaluate it
- verifying it
- deciding when it is acceptable to ship
- handling regressions and maintenance
- communicating risks and status

This matters a lot in agentic development.

If an agent writes a change and I merge it, I cannot outsource the consequences to the agent.

## Where I currently sit with AI-assisted development

The more useful way to describe my current workflow is not "vibe coder" versus "traditional coder."

I am increasingly working as an **agent-directed developer with growing engineering ownership**.

The evidence is in the loop:

- I define behavior
- inspect real repositories
- review changes
- reproduce failures
- run tests
- notice regressions
- correct assumptions
- make product/architecture decisions
- decide what gets shipped

The area I still need to keep strengthening is understanding changes deeply enough that I am not helpless when the agent is wrong.

My goal is not "use less AI."

It is:

> Increase the percentage of changes I can explain, verify, debug, and own.

## Linux storage: mounted does not mean equivalent

A storage-cleanup session reinforced that an NTFS volume mounted on Linux is not automatically a good replacement for a native Linux home filesystem.

Portable data and Linux application state have different requirements.

A safer boundary is:

- keep active config/state/dev environments on native Linux storage when possible
- move genuinely portable media/data to shared storage
- preserve backups
- use dry-run/apply gates for bulk moves

I also hit a tiny shell lesson that is worth remembering:

`zsh` does not search the current directory for executables by default.

A local script needs:

```bash
./cleaning.sh
```

not just:

```bash
cleaning.sh
```

Path assumptions create bugs at every scale.

## Technical writing: verified task completion is the product

Preparing for the Seekr technical-writer interview helped me define technical writing more precisely.

A strong workflow is:

```text
messy engineering reality
→ validated mental model
→ information architecture
→ tested instructions
```

For deployment/install documentation, I should be able to reason about:

- prerequisites
- environment assumptions
- configuration
- verification
- troubleshooting
- rollback/recovery

The final document should not merely sound clear.

A user should be able to complete the task with it.

That means docs quality can be tested through task completion, accuracy, discoverability, and reduced ambiguity.


## Docker and Kubernetes finally clicked as layers

Interview preparation gave me a clearer mental model for container infrastructure.

Docker packages an application into a repeatable container environment.

Kubernetes becomes useful when many containerized workloads need scheduling, recovery, scaling, networking, and coordinated deployment.

The vocabulary also started to connect:

~~~text
image
→ container
→ pod
→ deployment
→ service
→ ingress
~~~

Each term describes a different part of how an application gets packaged, run, managed, and reached.

That gives me a better way to reason about deployment documentation because I can ask which layer a configuration value or failure belongs to.

I still need hands-on Kubernetes practice. I can now explain the core model and follow the path from an application image to traffic reaching a running workload.

## Interview prep exposed useful knowledge gaps

The Seekr role also gave me a concrete study target.

I need enough practical fluency to explain:

- container
- pod
- deployment
- service
- ingress
- common AWS/Azure/GCP concepts
- inference
- fine-tuning
- RAG
- prompting
- agents
- evaluation

The goal is not pretending to be a Kubernetes platform engineer.

It is being able to build the correct mental model, ask engineers precise questions, and turn the result into reliable documentation.

## Career evidence is getting more coherent

I also worked on describing my projects and recent hackathon work more clearly.

The useful career rule remains:

**lead with the engineering work, then use external recognition as evidence.**

For current applications, the strongest stories come from concrete systems:

- Premier Ops for production full-stack/API/data/concurrency work
- Oniria for React/Next.js/Three.js/Sanity and iterative product debugging
- Mochi for Python/GTK/Linux architecture, testing, packaging, and open source
- technical writing for turning implementation details into reproducible user workflows

The projects are strongest when I can explain the problem, constraints, decisions, verification, and result—not just list the stack.

## What connected the day

Several conversations that looked unrelated all came back to the same idea:

**abstraction changes how work gets done, but responsibility still has to land somewhere.**

- an agent can write code, but someone owns the result
- a shelf can hold changing content, but the world owns its placement
- CI can test a port, but real hardware owns the final experiential truth
- AI can draft docs, but evidence owns technical truth
- a mounted filesystem can hold files, but its semantics determine what state belongs there
- a public agent log can show process, but I own what is safe and useful to publish

## What I want to keep practicing

- explain agent-generated changes before accepting them
- review diffs and runtime behavior, not only agent summaries
- write acceptance criteria before implementation
- use production-shaped integration tests
- build tools when repeated prompting becomes inefficient
- test 3D changes from the player's perspective
- keep durable domain state separate from temporary presentation
- treat documentation steps as something to execute and verify
- strengthen Kubernetes/cloud/AI vocabulary for the Seekr interview
- describe projects through problem → decision → verification → result

## Main lesson

AI is changing how much implementation I personally need to type.

It is not removing the core responsibility of engineering.

The direction I want to keep moving is:

**less focus on proving I can manually produce every line, more focus on proving I can understand, direct, verify, debug, document, and responsibly ship the system.**
