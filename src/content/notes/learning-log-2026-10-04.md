---
title: "Learning Log — October 4, 2026"
description: "A glitch-in-the-world experiment with a local model, chat templates versus raw completion, Ollama context and thinking-output gotchas, JVM heap settings, and how AI game mashups actually work."
topic: "Learning Log"
order: 48
featured: true
draft: false
---

Most of today went into one weird experiment: if a local model is playing a human character, will it notice when her world glitches?

## Nora noticed everything and believed nothing

I gave `qwen3:8b-q4_K_M` a character, Nora, a barista, and ran the conversation by hand in Ollama's interactive mode. Then I planted glitches in tiers:

1. a clock running backwards
2. a repeated line of dialogue
3. a side character contradicting something they'd said
4. a literal `[TODO:]` placeholder left in the scene

The model noticed almost every one in its private thinking. It just never let the anomaly reach Nora. Each glitch got routed into a bin:

- the user probably made a typo
- I'm probably being tested
- this must be surreal story content
- the placeholder is an instruction, so fill it in

That last one surprised me most. A `[TODO:]` didn't read as "something is wrong with reality." It read as a task.

The model clearly could see the glitches. Noticing and acting on what you noticed turned out to be separate steps, and the role-play frame gave it plenty of ways to explain things away.

## The chat template is part of the experiment

"Someone is testing me" kept showing up in the reasoning, and that made me suspicious of the setup itself. In chat mode the model knows it's answering a user, so of course it thinks about the user.

Two pivots came out of that:

- **Raw completion.** Ollama's `generate()` has a `raw=True` mode that skips the chat template, so the model continues a document (like a notebook page) instead of replying to someone.
- **Drop the fiction.** Interview the model about its actual situation, with no system prompt and no character.

For the second one I asked for a script instead of relaying messages by hand. `reality_check.py` runs a six-stage interview (unknowns, location, true facts about its setup, continuity, endings, closing), uses a second model to ask follow-ups, and logs every turn as JSONL plus a readable Markdown transcript.

It was tested against a stub Ollama module, not a live server. I haven't run it for real yet, so there are no results to report.

## Ollama gotchas worth remembering

**Long thinking eats context.** Qwen3's thinking blocks are long. If `num_ctx` is too small, older turns silently fall out of the window, and that can look exactly like the model "failing to notice" something it simply can't see anymore. Raising it (for example `/set parameter num_ctx 16384` in the interactive session) rules that out before I blame the model.

**Thinking output has two shapes.** Depending on the Ollama version, `ollama.chat()` returns thinking either as `message.thinking` or inline in `message.content` inside `<think>...</think>` tags. Code that reads responses should handle both.

**Older libraries don't know `think`.** Older versions of the Python `ollama` package reject a `think` argument. Catching `TypeError` and retrying without it keeps the script working across versions.

## A non-AI fix: Java heap for Project Zomboid

Project Zomboid on Linux runs on the JVM, and its max heap is set by `-Xmx` in `ProjectZomboid64.json` in the Steam install folder. The suggested starting point was about half my RAM, not all of it, since the rest of the system needs memory too.

Two things to remember: back up the file first, because Steam updates can reset it, and confirm the setting actually applied after launch instead of assuming. I didn't record whether it helped.

## How "two games fused together" actually works

I went down a rabbit hole on the viral AI game mashups (Minecraft items in Elden Ring, that kind of thing). What's real underneath:

- community decompilation projects that turn games back into readable code
- "passthrough" setups where two games run at the same time and exchange data like positions and collisions
- open-source tooling like Universal Modder that identifies engines, finds mod loaders, and tests changes

Most viral clips are unverified, and at least one hands-on test of a mashup mod showed broken geometry and rendering. Real technique, mostly demos so far. This turned into an article idea later in the week.

## Still practising

- Separating "the model noticed" from "the model acted on it."
- Ruling out context truncation before drawing conclusions about model behavior.
- Treating the prompt format as an experimental variable.

Source basis: the October 4 local-model experiment, Project Zomboid, and game-mashup conversations. `reality_check.py` exists but has not produced live results.
