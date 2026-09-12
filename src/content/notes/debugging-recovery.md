---
title: "Debugging & Recovery"
description: "An evidence-first workflow for reproducing bugs, ranking hypotheses, making minimal fixes, and recovering safely."
topic: "Software Engineering"
order: 2
featured: false
draft: false
---

This is one of the most important workflows I have learned.

## Evidence-first debugging

A strong debugging loop is:

```text
problem
→ reproduce
→ collect evidence
→ rank hypotheses
→ smallest fix
→ focused test
→ full validation
```

The key is to avoid changing code before I understand what is actually failing.

## Reproduce before refactoring

When something breaks, a large cleanup/refactor is tempting because the code may look messy.

But a broad rewrite destroys evidence.

A better sequence:

1. reproduce the exact failure
2. reduce it to the smallest sequence possible
3. create a regression test if possible
4. change the smallest responsible area
5. verify the original sequence

## Distinguish visual symptoms from underlying state

A program can **look** idle while its internal state is stuck somewhere else.

Example lesson: an animation can return to an idle sprite while the state machine still says `BLINKING`. The next action then fails even though the UI appears normal.

So debugging should inspect both:

- what is rendered
- what the program believes its state is

## Async UI behavior matters

UI APIs that sound synchronous may only start an asynchronous transition.

For example, dismissing a popover may begin closing it while the input grab is still active. Moving the parent window immediately afterward can leave interaction in a broken state.

The fix pattern is often:

```text
request close
→ wait for close/finished signal
→ defer one event-loop turn if needed
→ perform action
```

## Separate cause from coincidence

If a bug appears after a change, that change is evidence, not proof.

Rank hypotheses and try to falsify them.

This prevents "fixes" that merely hide symptoms.

## Recovery workflow for a damaged working tree

When trying to restore a previous known-good state:

1. inspect `git status`
2. inspect `git log`
3. inspect `git reflog`
4. search for build artifacts/wheels/backups only as evidence
5. create a safety branch before destructive reset
6. compare files/hashes when exact identity matters
7. rebuild and test after restoration

## Do not trust temporary artifacts as backups

Files under `/tmp` can be extremely useful for forensic recovery, but they are not durable storage.

If a temporary build artifact proves important, copy it somewhere durable before relying on it.

## Regression tests should describe the failure

A good regression test captures the bug's behavior, not just the current implementation.

Examples:

- action must not dispatch until context menu is fully closed
- one-shot animation must return to idle state
- sprites must contain transparency rather than baked checkerboard pixels
- no manifest entry may reference a missing frame

## Main lesson

Debugging is not "try things until it works." It is structured evidence gathering followed by a minimal, testable change.
