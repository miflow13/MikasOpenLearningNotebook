---
title: "Long-Running Stateful Features: Clocks, Presentation & Recovery"
description: "Lessons from building Focus, bond progression, feeding, and unlock feedback without letting timers and UI fight the main state machine."
topic: "Software Engineering"
order: 20
featured: false
draft: false
---

## The problem changed when features started lasting longer

A short animation is relatively simple:

```text
trigger
→ play animation
→ finish
→ return to idle
```

A focus session, persistent bond system, or background soundscape is different.

Those systems can outlive several visible reactions. A user might start a focus session, drag the character, open a menu, feed it, trigger a level-up, and then return to the same focus session.

That taught me that not every kind of state belongs in the same state machine.

## Separate domain state from presentation state

A useful model is:

```text
domain/session state
    ↓
behavior state
    ↓
presentation / animation
```

For example, a focus timer can still be active while the visible character temporarily switches to a drag or feeding animation.

The timer should not disappear just because presentation ownership changed.

This is different from simply adding another enum value like `FOCUSING` and trying to make that one state own everything.

## Temporary visual interruption is not the same as cancelling a feature

This distinction matters:

```text
Focus session is active
→ user drags character
→ drag owns presentation temporarily
→ drag finishes
→ focus presentation resumes
```

The domain feature survives.

If I had tied the session clock directly to one animation state, every interaction would risk destroying or restarting the session.

## Settle before transition

Time-based systems need a reliable rule before changing state:

> Account for elapsed work before pausing, stopping, sleeping, or shutting down.

Otherwise reward boundaries can be lost.

Example:

```text
59.9 seconds recorded
→ next timer callback would cross 60 seconds
→ user presses Stop first
```

If Stop changes state before settling elapsed time, the completed minute can disappear.

A safer sequence is:

```text
measure current elapsed time
→ convert newly completed units into rewards
→ persist/update state
→ change phase or stop
```

This idea applies beyond timers. Before a lifecycle transition, settle the state that the old phase still owns.

## Reward boundaries should be idempotent

A reward system should be safe if update functions are called more than once.

If a session has already awarded minute 5, another refresh should not award minute 5 again.

This usually means tracking an authoritative value such as:

- total completed units
- previously awarded units
- current level
- already-presented unlocks

Then reward logic can calculate the difference instead of blindly reacting to every callback.

## Persistence should store durable facts, not animation details

Persistent state should contain facts that matter after restart.

Good examples:

- bond level
- bond XP
- user settings

Bad candidates:

- current frame number
- halfway through a level-up animation
- temporary hover state
- a menu being open

After restart, the program should reconstruct presentation from durable state rather than trying to resume every transient visual detail.

## One lifecycle owner per long-running resource

Timers, windows, audio loops, and background sources need explicit ownership.

For every long-running resource I should know:

- who creates it?
- who can pause it?
- who stops it?
- who removes its callback/source?
- what happens during application shutdown?
- can a second instance accidentally be created?

This is especially important for GLib timers and looping audio because duplicate sources can look like random behavior bugs.

## Shutdown is part of the feature

I used to think of shutdown as generic application cleanup.

For stateful features, shutdown is part of correctness.

A clean shutdown may need to:

```text
settle elapsed time
→ persist pending progress
→ remove timer source
→ stop long-running audio
→ destroy temporary windows
→ clear presentation ownership
```

A feature that works while the app is open but loses progress or leaks a source during shutdown is not actually finished.

## Product rules can simplify architecture

A non-punitive relationship system also simplifies state.

If progress does not decay while the app is closed, I do not need:

- offline decay calculations
- missed-day reconciliation
- background scheduling
- punishment notifications
- complex catch-up state

A product decision can eliminate entire categories of technical complexity.

That was a useful reminder: architecture is partly shaped by what the product deliberately chooses **not** to do.

## Regression testing becomes a matrix

Once features interact, testing only each feature in isolation is not enough.

The important cases become combinations:

```text
focus + drag
focus + menu
focus + feed
focus + sleep
focus + level-up
feed + level-up
catalogue + bond update
shutdown + pending reward
```

This is why regression watchlists become valuable. They capture dangerous boundaries that are easy to forget after the original bug is fixed.

## What I learned

- Domain state, behavior state, and presentation state are related but not identical.
- Long-running features should survive temporary visual interruptions.
- Settle owned state before lifecycle transitions.
- Reward boundaries should be idempotent.
- Persist durable facts, not temporary UI state.
- Timers/audio/windows need one obvious lifecycle owner.
- Shutdown behavior deserves tests.
- Product constraints can reduce technical complexity.
- Integration testing matters more as features begin composing with each other.

## Still fuzzy

I want more practice deciding when a long-lived subsystem should become its own controller instead of staying inside a mixin or coordinator.

The warning sign seems to be when a feature owns several of these at once:

- timers
- GTK windows
- audio
- persistent state
- multiple lifecycle callbacks

At that point, composition usually starts to make more sense.

## Next time

When adding a long-running feature, sketch this before implementation:

```text
durable state:
session/domain state:
presentation state:
owned timers:
owned windows:
owned audio:
interruptions:
shutdown behavior:
persistence boundary:
```

If I cannot answer each one clearly, the feature probably does not have a clean lifecycle yet.
