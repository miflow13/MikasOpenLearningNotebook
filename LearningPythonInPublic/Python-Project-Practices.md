# Python Project Practices

These are Python lessons I have learned beyond basic syntax while working on real applications.

## Modules and separation of concerns

A larger Python project is easier to understand when each module has a clear job.

Examples of responsibilities that should stay separate:

- application startup
- configuration
- state definitions
- behavior decisions
- animation timing
- asset loading
- rendering
- input handling
- tests

The important idea is **cohesion**: code that changes for the same reason should live together.

## Avoid duplicated systems

If a project already has an animation controller or state machine, adding a second one usually creates bugs rather than flexibility.

Before creating a new subsystem, ask:

1. What system already owns this responsibility?
2. Can I extend that system cleanly?
3. Will a second timer/controller create competing state?

## Timers need ownership

Timers are easy to create and easy to forget.

A good pattern is to keep one owned timer/source for a repeated behavior, cancel it before replacing it, and clear the reference when it finishes.

This prevents:

- duplicate callbacks
- ambient behaviors firing repeatedly
- timers fighting direct input
- hard-to-reproduce state bugs

## State should be explicit

When behavior depends on state, represent that state directly instead of inferring it from what happens to be visible.

For example, if an animation visually returns to idle but the behavior state still says `BLINKING`, later actions may be rejected even though the app looks normal.

That taught me that **visual state and behavioral state must agree**.

## Use completion callbacks for one-shot behavior

For one-shot animations, the clean sequence is:

```text
start animation
→ animation completes
→ completion handler updates state
→ return to safe state
```

This is more reliable than guessing the duration elsewhere with a second unrelated timer.

## Configuration and persistence

Persistent values should be kept separate from temporary behavior state.

Examples:

- window position or size → configuration/persistence
- currently sleeping → behavior state
- current animation frame → animation controller

Mixing these responsibilities makes bugs harder to isolate.

## Testing Python projects

Useful checks I now treat as normal:

```bash
python3 -m unittest discover -s tests -v
python3 -m compileall -q src tests
```

A passing syntax/import check is not enough on its own, but it catches a different class of mistakes from behavior tests.

## Packaging matters

A program can work from the source checkout while the installed package is broken or stale.

That means I should test both:

- the working tree
- a freshly built package

For a wheel-based project:

```bash
python3 -m pip wheel . --no-deps --no-build-isolation -w /tmp/wheels
```

Then inspect the wheel contents when assets are important.

## Main lesson

Python syntax is only the beginning. Reliable Python applications depend just as much on ownership, state, packaging, testing, and clear module boundaries as they do on writing functions and classes.
