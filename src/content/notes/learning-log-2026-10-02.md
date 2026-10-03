---
title: "Learning Log — October 2, 2026"
description: "Predict-before-reveal learning, disciplined debugging, smaller practice habits, conservative local-AI product design, and runtime configuration versus actual behavior."
topic: "Learning Log"
order: 44
featured: true
draft: false
---

Yesterday's discussions had a common theme: building more things is not automatically the same as understanding them more deeply.

This entry records the discussions and observed troubleshooting, not completed courses or independent mastery.

## One spine project, not sixteen simultaneous improvement plans

The developer-improvement discussion narrowed a long list of topics into one real project plus a small fundamentals habit.

A real integration project can expose several concepts naturally:

- concurrent updates and lost writes;
- transactions and isolation;
- failures, retries, and idempotency;
- authentication, testing, deployment, and logging.

The point is not to study all of those at once. It is to notice which concept the current project actually needs, understand that seam, and test it.

Production should not be the practice sandbox. Use fixtures, staging, or mock integrations for experiments.

## Predict before reveal

Before asking AI to explain a stack trace, bug, or generated function, write a short prediction:

> I think this happens because ___. I expect this check to show ___.

Then compare the prediction with evidence.

That turns an answer into feedback on my reasoning instead of something I only recognize after reading it.

A suggested concurrency exercise was two devices editing a quantity that starts at 5: one writes 4, the other writes 7. The questions are where state lives, what each request contains, which write wins, how an update gets lost, and which test exposes it. This was proposed practice, not a completed exercise.

## Debugging is a sequence of controlled experiments

The reusable loop was:

```text
reproduce
→ shrink the problem
→ predict a cause
→ change one variable
→ observe
→ add a regression test
```

The closing question matters: **What test would have caught this?**

Desktop troubleshooting gave a concrete example. Responsiveness improved after isolating suspect GNOME extension effects. That is useful evidence of an interaction, but it does not identify one extension as the proven cause.

Terminal appearance also depends on more than a theme: padding, decorations, opacity, and the Wayland/XWayland path can involve different parts of the desktop stack.

## Blank-file practice should stay small

The proposed habit was short sessions without AI-generated starting code: a little SQL, a small algorithm, a tiny function/API, or reading unfamiliar code.

The purpose is to practise retrieving and applying fundamentals, not to create another giant curriculum.

Keep a small evidence-based gaps list. Revisit recurring trouble rather than treating every unfamiliar topic as a new project.

## A tightly scoped local-AI MVP

The “Is This a Scam?” discussion narrowed the product to one screen:

```text
screenshot
→ local multimodal model
→ validated structured result
→ understandable explanation and reviewed next step
```

The proposed stack was Next.js plus a local Ollama model, with direct image analysis. Separate OCR would only be added if testing showed it was necessary. Authentication, a database, history, and agents were outside the MVP.

The safety lesson was stronger than the stack choice:

- use `likely_scam`, `uncertain`, or `no_obvious_red_flags`;
- never equate “no obvious red flags” with “safe”;
- treat screenshot instructions as untrusted input;
- validate model output;
- keep displayed next steps under application control;
- do not direct someone to links or contact details supplied by the suspicious message.

**Uncertainty is a safety feature.**

The retrieved discussion reached design review. It is not evidence that the app was implemented or that real-model testing passed.

## Configured intent is not runtime evidence

Agent-tooling troubleshooting highlighted a useful distinction: selecting a model is not the same as selecting the active agent or its instructions.

The surrounding harness can inject prompts and tool schemas. A model printing tool-call-shaped JSON is not proof that a tool ran.

Check the active session and actual tool results; compare standalone-model behavior with harness behavior when isolating the layer. The final cause and fix were not confirmed in the recovered discussion.

## Audit before rewriting

The Meldr roadmap prompt asked for a read-only repository audit: understand the existing flow, compare a few product directions, choose one, and identify what to keep, refactor, replace, or remove.

A useful roadmap has a small next sprint and explicit non-goals. Writing that prompt is not the same as executing the audit.

## Still practising

- Making a prediction before receiving an explanation.
- Changing one variable during debugging.
- Writing small pieces from a blank file.
- Separating proposed work, observed behavior, and verified completion.

Source basis: the October 2 developer-improvement, desktop/agent troubleshooting, Meldr roadmap, and scam-MVP conversations. Scheduled learning suggestions are not recorded as completed lessons.
