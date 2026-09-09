# Learning Principles

Notes on how I learn technical material best.

## Build to expose gaps

Tutorials can make a concept feel understood because the path is already prepared.

Building a real project forces me to answer questions such as:

- where should this code live?
- what happens when it fails?
- how do I know the fix worked?
- how does this get packaged?
- what happens when the user interrupts it?

Those questions create deeper learning.

## Write concepts in my own words

A short note I can explain later is more useful than copying a large reference page.

Useful note format:

```text
Concept
→ what it means
→ why it matters
→ small example
→ mistake I made / lesson learned
```

## Separate understanding from memorization

I do not need to memorize every command.

I do need to understand:

- what layer a command investigates
- what evidence its output provides
- what decision I can make from that evidence

## Debugging is studying

When I diagnose a bug carefully, I learn architecture, state, APIs, tooling, and the operating system at the same time.

Keeping the root cause in notes turns a frustrating bug into reusable knowledge.

## Use checkpoints

Before a risky experiment, create a known-good checkpoint.

This has a learning benefit too: I can try something boldly because recovery is understood.

## Practice retrieval

Instead of only rereading notes, try to answer from memory:

- What is the difference between Wayland and XWayland?
- Why does nearest-neighbor matter for pixel art?
- What is the staging area in Git?
- Why can a source checkout work while a wheel is broken?
- What makes a regression test useful?

Then check the note.

## Learn in layers

For a complex system, identify the layers first.

Example desktop app:

```text
application logic
→ toolkit
→ compositor/display protocol
→ kernel/driver
→ hardware
```

Example web request:

```text
UI
→ JavaScript
→ browser/network
→ HTTP/API
→ server
→ database
```

Problems become easier when I know which layer owns them.

## Keep "learned" and "still practicing" separate

It is okay to understand a concept without being fluent yet.

My notebook should record both:

- concepts I can explain
- skills I still need repetitions with

## Main lesson

My best learning loop is:

```text
learn a concept
→ use it in a project
→ break something
→ investigate
→ explain the lesson in my own words
→ reuse it later
```
