---
title: "State Machines & Architecture"
description: "Notes on explicit state, ownership, priorities, transitions, and keeping interactive software predictable."
topic: "Software Engineering"
order: 3
featured: false
draft: false
---

## What a state machine gives me

A state machine makes allowed behavior explicit.

Instead of scattered booleans such as:

```text
is_sleeping
is_dragging
is_emoting
is_walking
```

I can reason about named states and transitions.

Example:

```text
IDLE
→ PICKUP
→ DRAGGED
→ PUT_DOWN
→ IDLE
```

## Every temporary state needs an exit

A temporary state is dangerous if there is no deterministic path out of it.

For every new state, I should ask:

- how does it start?
- what can interrupt it?
- how does it finish?
- what happens on rapid user input?
- what safe state does it return to?

This is especially important for animation-heavy programs.

## Priorities prevent systems from fighting

When several behaviors want control, define priority explicitly.

A useful general rule:

```text
direct user interaction
> required transitions
> active movement
> ambient behavior
> idle
```

Without priority, timers and animations compete unpredictably.

## One owner per responsibility

Architecture is easier to reason about when one system owns each concern.

Examples:

- state machine owns behavior state
- animation controller owns playback
- sprite loader owns asset loading
- renderer owns drawing
- configuration owns persisted values
- input layer translates events into behavior requests

## Source of truth

When the same fact is represented in multiple places, they can drift.

Examples:

- frame filenames hardcoded in code and also in a manifest
- version numbers repeated in several files
- state stored in both animation and behavior systems

Prefer one canonical source and derive the rest.

## Manifest-driven design

For assets, a manifest can act as the source of truth for:

- animation name
- frame order
- timing
- looping
- paths

Code then asks for an animation by name rather than composing file paths everywhere.

## Interruptions are part of the design

Real users do not wait politely for animations.

They may:

- click twice
- grab during an emote
- release during pickup
- right-click immediately after dropping

A robust state machine treats those as normal inputs, not edge cases to ignore.

## Architecture should preserve product identity

A technically clever change is not automatically a good change.

If a rewrite makes the program less predictable, introduces duplicate systems, or breaks the core interaction model, it is worse even if the code looks more sophisticated.

## Main lesson

Good architecture is not about having more layers. It is about making ownership, state, transitions, and recovery obvious enough that future changes stay safe.
