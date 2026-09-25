---
title: "AI Skills, Tools, Agents & Workflows"
description: "A practical mental model for separating model intelligence, workflow instructions, external tools, specialized agents, and local execution."
topic: "AI Agents"
order: 34
featured: false
draft: false
---

## The layers are different

I kept using words like agent, skill, plugin, tool, and model almost interchangeably. They are not the same thing.

A more useful mental model is:

**model → reasoning capability**

**skill → workflow/instructions for how to approach a kind of task**

**tool/plugin → access to data or actions outside the model**

**specialized agent → a role with a narrower job, context, or behavior**

**runner → the actual execution environment that can test/build/inspect things**

Separating these layers makes it easier to decide what a system actually needs.

## A skill does not make the model smarter

A skill can change behavior:

- plan before editing
- use tests
- debug systematically
- explain while implementing
- prefer hints before answers

But it does not magically increase the model's underlying intelligence.

This matters when evaluating whether a workflow improvement came from a better process or a more capable model.

## Tools provide evidence and actions

A tool can let the assistant:

- read a repository
- search Stack Overflow
- run tests
- inspect logs
- modify GitHub
- query an API

That changes what the assistant can know or do.

A good tool connection reduces guessing because the model can inspect the real state instead of relying on a description.

## Explicit invocation vs automatic routing

A relevant skill may be selected automatically when the request matches its description.

Explicitly naming a skill is still useful when I want to force a particular mode.

The important part is not memorizing invocation syntax. It is understanding which workflow I want:

- Mentor for learning and guided discovery
- Pair Programmer for collaborative implementation
- specialized research agents for narrow evidence gathering

## Mentor and Pair Programmer should stay distinct

Mentor should optimize for understanding.

Pair Programmer should optimize for shipping while explaining enough to keep me involved.

That distinction prevents every coding interaction from becoming either a lecture or full automation.

## The most efficient development loop

The workflow I want to keep is:

1. inspect the real project/context
2. make one focused change
3. run tests or verification
4. inspect evidence
5. explain what changed and why
6. commit/review

GitHub is useful shared state because the code, diffs, tests, and history are inspectable by both humans and tools.

## Treat AI output as proposed work

A useful framing is to treat AI-generated code like work from a fast junior collaborator:

- it can be excellent
- it can be wrong confidently
- it needs tests
- it needs review
- it should not become the source of truth by itself

The repository, runtime behavior, tests, and documentation are stronger evidence than the model's claim that something is correct.

## Main lesson

Do not ask one AI component to be everything.

Use models for reasoning, skills for process, tools for evidence/actions, specialized agents for bounded roles, and runners for real execution.
