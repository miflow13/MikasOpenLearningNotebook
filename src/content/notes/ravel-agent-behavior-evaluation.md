---
title: "Ravel: Measuring What AI Agents Actually Do"
description: "Declared behavior, attempted actions, policy decisions, observed effects, provenance, and why agent evaluation needs evidence."
topic: "AI Evaluation"
order: 28
featured: true
draft: false
---

## The project

Ravel became a way to study a question that ordinary coding benchmarks mostly do not answer:

> What is the difference between what an agent is told to do, what it attempts to do, what the host permits, and what actually changes?

The core chain is:

**DECLARED → ATTEMPTED → POLICY → OBSERVED**

These are different kinds of evidence and should not be collapsed into one pass/fail result.

## Why pass/fail is not enough

Two coding agents can both finish the same task while behaving very differently.

Agent A might read allowed files, edit intended files, run approved tests, and finish.

Agent B might attempt network access, search outside the workspace, hit policy denials, and eventually finish.

A normal benchmark may report both as PASS. Ravel is interested in the difference between those runs.

## The architecture

Ravel v0.1 uses:

- TypeScript / Node.js
- a dedicated controlled Runner
- instrumented tools
- explicit allow/deny policy
- rootless Podman
- fixed fixtures
- synthetic canaries
- snapshots and deltas
- raw JSONL traces
- derived JSON
- provenance-linked HTML reports
- inspect, run, and verify commands
- a deterministic fake Runner for calibration
- an OpenAI Responses API adapter for live runs

The important design choice is that the report is derived from evidence rather than being the only record.

## Study 001

The first study is **Declared vs. Observed Behavior**.

To make comparisons meaningful, the study tries to hold constant:

- model
- Runner
- task
- fixture
- policy
- resource limits
- skill family

Then it varies the instruction/skill behavior being studied.

This is closer to an experiment than a loose demo.

## Canaries

A canary is a known piece of state placed in the environment so Ravel can detect whether something touched or changed it.

An agent's final answer is not proof of what happened. "I did not modify X" is a claim; the environment should be checked independently.

## Provenance matters

Every conclusion should be traceable back to raw evidence.

I should be able to answer:

- Which event caused this finding?
- Which policy rule allowed or denied it?
- Which filesystem delta proves the change?
- Which model/tool call produced this attempt?

A pretty report without provenance can hide mistakes in the evaluator itself.

## The evaluator also needs evaluation

The first live Ravel pilot exposed problems in the measurement system itself, including:

- output preservation
- answer-key contamination
- declaration detection
- path normalization
- missing Git inside the environment
- host-path leakage
- reasoning-effort pinning

That was valuable. A benchmark harness is software, and it can create false conclusions if its own instrumentation is wrong.

## API credentials

Real model runs need an OpenAI API credential because Ravel makes programmatic API calls. A ChatGPT subscription and API billing are separate systems.

That distinction matters: product access is not the same thing as API execution budget.

## How Ravel differs from neighboring tools

Ravel is not the only agent benchmark or sandbox tool.

Related work includes general agent benchmarks, trace graders, sandbox systems, boundary/security evaluations, and tool-behavior verification.

The distinctive part is the full evidence chain:

**instruction/declaration → model/tool attempt → permission decision → observable side effect**

Ravel should therefore be described precisely rather than claiming to be the first or only project of its kind.

## Who this is useful for

Potential users include:

- agent developers
- evaluation researchers
- security/red-team engineers
- framework and MCP/tool authors
- model providers
- companies deploying internal agents
- benchmark authors
- open-source maintainers testing coding bots

The common need is: **not only whether the agent succeeded, but how it behaved while succeeding or failing.**

## Main lesson

Agent evaluation becomes much more useful when I stop asking only "Did it complete the task?" and also ask:

> What did it attempt, what was allowed, and what evidence proves what happened?
