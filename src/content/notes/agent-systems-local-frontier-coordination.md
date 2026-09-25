---
title: "AI Agent Systems: Local Models, Frontier Models & Coordination"
description: "What RelayLab taught me about tool-using agents, coordination, local-model limits, and hybrid development workflows."
topic: "AI Agents"
order: 27
featured: true
draft: false
---

## The experiment

I tested a local two-agent setup in RelayLab using a Qwen2.5-Coder 3B builder and a Qwen3 4B reviewer through Ollama.

The interesting failure was not just that the models were small. The bigger lesson was that **two models talking to each other does not automatically create a useful team**.

In a six-round build/review loop, the agents did not converge cleanly. The reviewer could produce malformed or weak verdicts, and the builder could satisfy the conversation without satisfying the actual product goal.

## Conversation is not coordination

A multi-agent system needs more than roles such as Builder and Reviewer. It needs a protocol:

- shared success criteria
- machine-checkable outputs where possible
- explicit stop conditions
- structured handoffs
- bounded retries
- access to the actual environment
- tests or observations that can contradict the models

This changed how I think about "agent teams." The unit under test is often not just the model. It is the **organization around the model**.

## Protocol obedience is different from reasoning ability

An agent can follow a required output shape and still make a bad engineering judgment.

It can also reason well and fail because the protocol is underspecified.

So I need to evaluate at least two things separately:

- Did the agent follow the protocol?
- Did the work actually satisfy the task?

## Local models vs frontier models

The local Qwen pair is useful, but it is not a Codex replacement.

Local models have real advantages:

- privacy
- low marginal cost
- offline availability
- complete control over the runtime
- easy experimentation

But small local models are much weaker at:

- long-horizon reasoning
- large repository context
- reliable tool use
- recognizing when they are stuck
- complex debugging

That led to a better architecture: **use each kind of model where it is strongest**.

## Hybrid workflow

A practical split is:

Frontier model:
architecture, reasoning, teaching, hard debugging

Local runner / local worker:
tests, builds, logs, environment inspection, repeatable chores

GitHub:
shared state and reviewable history

An important refinement was realizing that the local component does not need to be an LLM at all. For many tasks, a permissioned local runner that can execute allowlisted commands is more dependable than asking a small model to be the primary intelligence.

## The learning-agent idea

This also led to Mentor: a coding assistant designed around learning rather than maximum automation.

Useful modes include Build, Pair, Learn, Review, and Rescue.

The goal is not for the assistant to become more necessary. The goal is for it to **gradually become less necessary** as my understanding grows.

My OpenLearning notebook can act as evidence of concepts I have encountered, but it should never be treated as proof that I have mastered them.

## Main lesson

A good agent system is not "multiple smart models."

It is model capability + clear protocol + tools + environment evidence + constraints + evaluation + recovery.

The surrounding system can matter as much as the model itself.
