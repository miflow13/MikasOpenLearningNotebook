---
title: "Evidence-Bound Decision Systems"
description: "Designing AI systems where recommendations stay attached to evidence, assumptions, permissions, tests, and invalidation conditions."
topic: "AI Systems"
order: 38
featured: false
draft: false
---

## A recommendation should not become timeless truth

One of the strongest ideas from the ASTER architecture was treating an AI recommendation as a **living decision**.

A decision should carry the context that made it reasonable:

- evidence
- assumptions
- uncertainty
- tests
- permissions
- affected state
- invalidation conditions

If those inputs change, the recommendation may need to be reconsidered.

## Separate proposal from authorization

A probabilistic model can propose an action.

It should not automatically own the authority to execute that action.

A safer architecture is:

**model proposes → system evaluates → authorization layer rechecks → action executes**

Immediately before an external effect, the system should verify current state and permissions again.

This matters because the world may have changed since the recommendation was generated.

## Store why a decision was made

A durable decision record should answer:

- What did we believe?
- What evidence supported it?
- What assumptions were required?
- What uncertainty remained?
- What action followed?
- What would make this decision stale or invalid?

That creates a system that can explain not only what it chose, but when the choice should stop being trusted.

## Invalidation is a first-class concept

Examples of invalidation conditions include:

- a dependency version changes
- a price or threshold crosses a boundary
- permissions are revoked
- a test starts failing
- new evidence contradicts an assumption
- the environment changes
- a deadline passes

Without invalidation, an AI system can keep repeating a once-reasonable answer long after it stops fitting reality.

## Experiments should reduce decision uncertainty

When several unknowns remain, the best next test is not always the easiest one.

A useful experiment is one that is likely to change the decision.

That suggests a practical question:

> Which test would most improve what I should do next?

This is more useful than collecting information with no connection to an action.

## Main lesson

The model can be probabilistic while the surrounding decision process remains explicit and accountable.

Good AI architecture keeps recommendations connected to evidence and makes authority, state, and invalidation deterministic wherever possible.
