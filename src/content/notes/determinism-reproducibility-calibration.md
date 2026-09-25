---
title: "Determinism, Reproducibility & Calibration"
description: "How deterministic components make experiments and debugging more trustworthy even when AI model behavior is nondeterministic."
topic: "Software Engineering"
order: 29
featured: false
draft: false
---

## Deterministic means repeatable from the same state

A deterministic program produces the same result when given the same inputs and the same starting conditions.

**same input + same state → same result**

This matters in ordinary programming, procedural world generation, tests, and experimental tooling.

## Determinism is not the same as reproducibility

A system can contain nondeterministic parts and still be designed for reproducible experiments.

AI models are the obvious example. A real model run may vary.

Instead of pretending the whole system is deterministic, I can make the **surrounding apparatus controlled and inspectable**:

- fixed fixtures
- fixed task text
- pinned model/configuration where possible
- explicit tool policy
- recorded limits
- known sandbox image
- stable canaries
- raw traces
- environment snapshots
- versioned code

This does not guarantee identical model output. It makes differences easier to explain.

## Why Ravel starts with a fake Runner

Before trusting a measurement tool with a real model, the apparatus should be calibrated against behavior that is known in advance.

A deterministic fake Runner can deliberately write an allowed file, attempt a denied action, touch a canary, or produce a known tool sequence.

Then I can verify that expected behavior, trace, policy decision, snapshot/delta, and report all agree.

If the evaluator cannot correctly describe a scripted run, I should not trust it to describe an AI run.

## Deterministic world generation

The same concept is useful in Oniria.

If a world layout is generated deterministically from the same source data or seed, then a bug is easier to reproduce.

**same catalogue + same generation rules → same shelf layout**

That is far easier to debug than a world that rearranges itself unpredictably on every refresh.

## Reproducibility needs provenance

A result is more useful when I can reconstruct how it was produced.

Useful provenance includes:

- source version / commit
- exact config
- dependency/runtime version
- model identifier
- task/fixture version
- command or runner version
- raw output
- timestamps and limits

## Main lesson

When part of a system is nondeterministic, I should not give up on rigor.

I should make everything around it as controlled, observable, and reproducible as possible.
