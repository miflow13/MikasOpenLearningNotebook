---
title: "Desktop Pet SDK: Extracting a Framework from a Real App"
description: "Lessons from turning Mochi's reusable systems into a desktop-pet SDK instead of rewriting the app from scratch."
topic: "Software Engineering"
order: 16
featured: true
draft: false
---

Building the Desktop Pet SDK changed how I think about reuse.

The important decision was not to rewrite Mochi into a generic framework. Mochi already contains working behavior, animation, interaction, and Linux-windowing lessons. The better approach is to identify the pieces that are genuinely reusable and extract those behind cleaner boundaries.

## A framework should extract stable patterns

An application contains two kinds of code:

```text
project-specific behavior
+ reusable mechanisms
```

For Mochi, project-specific behavior includes things such as:

- Mochi's artwork
- Mochi-specific emotes
- Mochi's personality rules
- project-specific sounds and care mechanics

Reusable mechanisms include things such as:

- animation playback
- state transitions
- input/interaction handling
- timers
- window positioning
- platform detection
- asset loading
- application startup

The SDK should own the mechanisms while the pet definition owns the personality and content.

## Do not generalize everything at once

A common framework mistake is trying to predict every future use case before a second app even exists.

A better sequence is:

```text
working app
→ identify repeated mechanism
→ extract smallest useful abstraction
→ build a second tiny consumer
→ learn where the abstraction is wrong
→ refine
```

The `examples/slime` pet is valuable because it forces the SDK to prove that its APIs are not secretly tied to Mochi.

## A reference implementation is different from the framework

Mochi can remain a real application and also act as a reference implementation.

That means the relationship can look like:

```text
Desktop Pet SDK
      ↑
      │ reusable runtime/API
      │
Mochi ───────── example consumer
Slime ───────── minimal example consumer
```

The framework does not need to erase the identity of the original app.

## Extract behavior, not file structure

A reusable framework should not simply copy Mochi's folder layout and rename files.

The better question is:

> What responsibility does this code own?

Examples:

- animation controller → reusable
- Mochi's heart animation asset → not reusable
- state transition rules → reusable mechanism
- exact Mochi state names → maybe app-specific
- drag gesture plumbing → reusable
- special response to a double-click → configurable behavior

This is the difference between abstraction and duplication.

## APIs should describe capabilities

A good SDK API should let a pet definition say what it wants without knowing every backend detail.

For example, a pet might conceptually ask for:

```text
play animation
change state
move to position
react to click
start idle behavior
```

It should not need to know exactly how an X11/XWayland window is moved on GNOME.

That backend-specific knowledge belongs deeper in the SDK.

## Examples are executable documentation

A minimal example is more useful than prose alone because it proves the public API can actually be used.

The command:

```bash
deskling run examples/slime --debug
```

is doing several useful things at once:

- exercising the CLI
- loading a pet outside Mochi
- exercising the runtime
- exercising platform detection
- proving the example can launch through the public path

A good example project should be small enough that I can understand the whole thing in one sitting.

## Framework code needs stronger boundaries than app code

Inside one app, a shortcut may be acceptable because only one consumer exists.

Inside an SDK, hidden assumptions become public problems.

That means framework code needs extra discipline around:

- public vs private APIs
- configuration validation
- defaults
- error messages
- extension points
- lifecycle ownership
- backwards compatibility

## Avoid leaking implementation details

If every pet needs to import deep internal modules, the public API is probably too weak.

A healthy framework tries to keep common usage near a small stable surface.

Conceptually:

```python
from desktoppet import PetApplication, Animation, State
```

is healthier than making users understand the entire internal backend tree.

## Build the SDK around what already works

The biggest lesson is that successful abstraction usually comes after concrete experience.

Mochi exposed real problems involving:

- timers
- state ownership
- animation timing
- drag interactions
- popovers
- Wayland/XWayland behavior
- monitor coordinates
- packaging

Those hard-earned lessons are exactly what make the SDK more valuable than a framework designed only from theory.

## Main lesson

A good framework is not a rewritten app. It is a carefully extracted set of reusable mechanisms proven by multiple consumers. Mochi gives the SDK real-world knowledge, while a tiny pet like Slime helps reveal which parts are truly generic.
