---
title: "Small Local AI Systems: Capability Through Composition"
description: "A realistic architecture for useful offline AI on constrained hardware without pretending a tiny model is a frontier model."
topic: "AI Systems"
order: 37
featured: false
draft: false
---

## A small model does not need to do everything alone

The unrealistic version of a local-AI project is:

**tiny model + weak hardware = frontier-model capability**

That is not a good engineering promise.

A more realistic system combines several components:

- a compact language model for generation and reasoning
- local retrieval for grounded context
- deterministic tools for exact operations
- templates and extractive methods for low-cost tasks
- capability tiers based on available hardware

The system can be useful because the pieces complement each other.

## Design for graceful degradation

A low-end device should not silently fail or secretly route to the cloud.

It should fall back to cheaper capabilities.

For example:

**larger local model → smaller local model → retrieval/extractive tools → deterministic utilities**

That makes the product honest about what the hardware can support.

## Ship the base model before fine-tuning it

Fine-tuning should solve observed problems, not imagined ones.

A better sequence is:

1. choose a strong open checkpoint
2. quantize and run the real application
3. measure recurring failures
4. collect reviewed examples for those failures
5. fine-tune only if the evidence justifies it
6. evaluate the final merged and quantized artifact

Otherwise I can spend a lot of effort training away problems that were really caused by prompts, retrieval, tool design, or runtime limits.

## Training quantization and deployment quantization are different

Low-bit training formats and GGUF deployment formats solve different problems.

A model might be trained or adapted using one quantization approach and then exported into another format for inference.

I should evaluate the artifact users will actually run, not only the pre-export model.

## Retrieval has its own failure modes

A simple BM25 or FTS5 baseline is attractive because it is cheap and understandable.

But retrieval quality still has to be measured.

A citation proves where text came from.

It does **not** prove that the generated claim is entailed by that text.

Those are separate checks.

## Full-document summarization is not top-k retrieval

If the task is "summarize this entire document," retrieving only the most relevant chunks can silently omit large portions.

A real full-document summary should account for every chunk, usually through a staged or hierarchical process.

The retrieval strategy must match the task.

## Small models need runtime safeguards

Compact reasoning models can loop, repeat, or consume context badly.

A robust runtime should have:

- token/output limits
- cancellation
- watchdog timeouts
- bounded context
- clear tool limits
- fallbacks when generation becomes unstable

A model is only one component of the product.

## Main lesson

Useful local AI is a systems problem.

I should optimize the whole stack around the model rather than expecting parameter count alone to determine the user experience.
