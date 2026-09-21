---
title: "Source Code as Data: Building a Code-to-Music Pipeline"
description: "What I learned from converting source code into sound and why larger files require analysis, aggregation, and deterministic structure instead of one event per token."
topic: "Software Engineering"
order: 23
featured: false
draft: false
---

## The first version can be almost embarrassingly literal

A tiny experiment can map source text directly to sound:

~~~text
character / token / line
→ number
→ pitch
→ duration
→ play
~~~

That is useful because it proves the core transformation works.

But it does not scale very far.

A large source file quickly exposes the weakness of a one-input-event-to-one-musical-event design.

## Source code has structure

Code is more useful when treated as structured data instead of raw text.

Different layers contain different information:

~~~text
characters
→ tokens
→ syntax
→ statements
→ functions/classes
→ modules
→ project structure
~~~

A music system can decide which layer controls which musical dimension.

Example:

~~~text
syntax category → instrument family
nesting depth → register
function size → phrase length
identifier hash → motif
control flow → rhythm
module → section
~~~

The important shift is from "every symbol makes a sound" to "the code describes a composition."

## Analyze first, synthesize second

A clean architecture separates:

~~~text
source
→ analysis
→ musical representation
→ arrangement
→ synthesis/playback
~~~

The analysis phase should not know how audio is rendered.

The synth should not need to understand Python, JavaScript, or another source language.

That separation makes both sides easier to change.

## Intermediate representations are powerful

Instead of sending source tokens directly into audio code, create a neutral musical representation.

Example:

~~~text
Track
  instrument: synth
  events:
    note C4 at beat 0
    note E4 at beat 1

Track
  instrument: kick
  events:
    hit at beat 0
    hit at beat 2
~~~

Then the code analyzer only needs to produce musical events.

Playback becomes a separate problem.

This is the same reason compilers use intermediate representations: one representation can sit between very different input and output systems.

## Large inputs need aggregation

If a 2,000-line file produces a separate audible action for every small token, the result becomes slow, noisy, or computationally expensive.

A better system aggregates.

Examples:

~~~text
many tokens
→ one measure

one function
→ one phrase

one file
→ one section

one module
→ one track or movement
~~~

This preserves information without demanding that every unit be heard individually.

## Deterministic randomness is better than pure randomness

Random BPM, notes, or variation can make the output feel alive.

But unrestricted randomness makes the same code sound unrelated every time.

A useful compromise is seeded randomness:

~~~text
seed = hash(source or project)
~~~

Then the generated song can contain variation while remaining reproducible.

Same source:

~~~text
→ same seed
→ same broad musical identity
~~~

That makes debugging and comparison much easier.

## Musical structure needs a second layer

Even good note generation does not automatically create a listenable song.

Song structure is a higher-level concern.

~~~text
intro
→ section A
→ section B
→ variation
→ breakdown
→ return
→ ending
~~~

The code can influence the contents of sections while an arrangement layer keeps the result coherent.

This taught me that "generate events" and "compose a song" are separate problems.

## Complexity should be bounded

A generator should place limits on work.

Useful limits include:

- maximum simultaneous voices
- maximum generated events per section
- capped phrase length
- normalized file size
- sampling/aggregation for huge inputs
- bounded audio buffers

A program should degrade gracefully when input becomes large instead of exploding in work.

## Main lesson

Turning code into sound is not mainly an audio problem.

It is a data-modeling problem:

~~~text
What information in the code matters?
How should it be represented?
How much detail should survive?
How does that representation become musical structure?
~~~

Once those layers are separate, the project becomes much easier to reason about.

## Next time

Design the pipeline before adding more sounds:

~~~text
source parser
→ code features
→ musical IR
→ arranger
→ synth engine
→ playback
~~~

Then test each boundary independently.
