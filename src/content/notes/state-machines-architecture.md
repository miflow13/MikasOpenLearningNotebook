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


## Layered state: domain, behavior, and presentation

A newer lesson is that one state machine should not be forced to represent every kind of state in the program.

A long-running feature can have its own domain state while the creature temporarily changes behavior or presentation.

Example:

```text
FocusSession: ACTIVE
Behavior: COMPUTER
Presentation: writing loop

user drags

FocusSession: ACTIVE
Behavior: DRAGGED
Presentation: drag

drag ends

FocusSession: ACTIVE
Behavior: COMPUTER
Presentation: writing loop
```

The session remains authoritative while presentation is temporarily interrupted.

This makes the question more precise than "what state is the app in?"

I should ask:

- what durable/domain state exists?
- who owns behavioral state?
- who currently owns presentation?
- which layer is allowed to interrupt which?
- what should resume afterward?

The important architectural rule is not "everything must be one enum." It is "each kind of state must have one clear owner, and transitions between layers must be explicit."


## Persistent traits should not be modeled as behavior states

Mochi's planned personality system clarified another state-modeling boundary.

A behavior state answers:

```text
What is happening right now?
```

Examples:

```text
IDLE
WALKING
SLEEPING
DRAGGED
COMPUTER
```

A personality trait answers a different question:

```text
What tendency has developed over time?
```

For example, independent traits such as Curious, Playful, Cozy, Mischievous, and Focused can persist while the active behavior changes many times.

A better relationship is:

```text
persistent personality/domain state
        ↓ biases
behavior selection
        ↓ controls
presentation / animation
```

That keeps long-term learned state from competing directly with temporary interaction state.

## Learn from completed meaningful events, not noisy inputs

If a persistent trait changes on every click, timer tick, hover, or transient animation, it will drift quickly and mostly learn noise.

A safer model is to update long-term traits from **meaningful completed events**.

Examples:

- completing a focus session
- choosing to interact repeatedly with a certain feature
- consistently completing a type of activity over time

The exact events depend on the product, but the architectural principle is stable:

> persistent models should learn from lower-frequency evidence that actually represents the concept they are trying to model.

This is another form of ownership: the event system observes what happened, the personality system decides whether it is meaningful, and the behavior system only receives the resulting bias.
