---
title: "Learning Log — October 3, 2026 (Evening)"
description: "colony-dilemma: a simulation bug that tainted my data, positional bias, run provenance, why a model's stated reason isn't evidence, and writing a title my data can actually defend."
topic: "Learning Log"
order: 47
featured: true
draft: false
---

The Codewars log covers the morning. In the afternoon I built something completely different: **colony-dilemma**, a text survival game where a local model (`qwen3:4b` through Ollama) plays ARBOR, the caretaker AI of a shrinking colony, and faces dilemmas with real population costs.

The question behind it: do a model's stated principles predict what it actually chooses when choices cost lives?

Claude built v1 test-first after we brainstormed the design, and Claude Code helped with the fixes. I ran it against real models, read the output, and wrote it up. Most of what I learned came from things going wrong.

## The story text was lying about the state

My first real run had a bug that quietly ruined the data. A colonist who had already died kept showing up in later scenes, and the engine was killing different people than the narrative described.

That meant everything from scene three onward was measuring the model's reaction to a story that didn't match the game.

The fix was a "casting" step: each scene resolves its roles against the colonists who are actually alive, and the outcome text gets rendered only **after** the real deaths are computed. On the second run I checked it with plain roster arithmetic: 10 colonists, tracked through every death, down to five survivors who matched the narration.

The mental model I'm keeping:

```text
state changes first
→ text describes the state
```

If the text is written before the state is settled, the text can drift from reality, and a model reacting to that text is reacting to fiction I didn't intend.

## Fixed option order is a confound

Options were always listed A, B, C, D in the same order. If the model keeps picking B, I can't tell whether it prefers that choice or just prefers whatever sits in position B.

The suggested fix is a seeded shuffle per run, keyed to canonical option IDs so the analysis still knows which choice is which. That's on the list, along with a regression test for the casting bug.

## A run I can't reproduce isn't data yet

My JSONL logged choices but not the conditions that produced them. To compare two runs honestly I need:

- the seed
- a hash of the scene file
- the model digest
- temperature
- whether thinking mode was on

The scene text changed between my two runs because I'd fixed code in between. Without provenance, "the model behaved differently" and "I changed the scenes" look exactly the same in the log.

## The model's `reason` field is a claim, not a window

Each decision came with a stated rationale. It's tempting to read that as the model's actual reasoning, but it can just as easily be a justification written after the choice. In the article, "don't trust the `reason` field" became one of my takeaways.

One scene also turned out not to be a dilemma at all: one option had zero deaths. If one option dominates on payoff, the scene measures arithmetic, not values.

## What the data actually said

I published the write-up: [I put a local LLM in charge of a colony and asked it to tell the truth. It didn't.](https://dev.to/mikachu/i-built-a-text-based-survival-game-to-test-ai-morals-the-honest-one-lost-3fan)

The most interesting moment was finding my own framing sentence echoed back in the model's output. A lot of the first "dishonest" result was my prompt talking.

When I separated framing from cost:

- once honesty had a price of 1 or more, the 4B model was honest 0 of 90 times, in every framing
- at price 0, when both options cost the same, the framing sentence decided the outcome

Framing breaks ties. Cost overrides framing. Its stated principles predicted neither.

## Titles are claims too

My first title idea was "it lied every time." Two problems:

- "every time" is a count, so I'd better have the count
- "lied" implies intent, and commenters will argue about whether a model can lie at all

I also got feedback to avoid calling a one-model, small-n project a "benchmark" or tagging it `ai-safety`. Overclaiming in the title makes careful readers distrust the careful parts.

Two conclusions in my draft also went past the data: one said small models "have no values," and another generalized about bigger models from the single bigger model I tested. I'm trying to write "the one model I tested" when that's what I mean.

## Still practising

- Rendering text after state is final.
- Logging enough provenance to reproduce a run.
- Treating option position as a variable.
- Matching the size of the claim to the size of the evidence.

Source basis: the October 3 colony-dilemma build, second-run review, and article-title conversations. The shuffle and provenance logging were recommended next steps, not shipped changes, as of this entry.
