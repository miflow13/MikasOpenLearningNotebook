---
title: "Learning Log — October 5, 2026"
description: "A big Mochi day: preparing sprites for AI animation, filtering features by what a desktop pet is actually good at, v0.5 planning, shell-hook bugs found by testing in a real pty, and a few writing lessons."
topic: "Learning Log"
order: 49
featured: true
draft: false
---

Today was almost all Mochi, spread across planning, art prep, and one feature spec. A lot of it was AI-assisted investigation of my own repo, so I'm being careful below about what was found, what was tested, and what's still just a plan.

## Prepare the art before asking a tool to animate it

I wanted new animations from Pixel Engine, which takes a still image plus a motion-only prompt. Before writing any prompts, we analyzed the master reference image (`assets/mochi/master/mochi_default.png`):

- It had roughly 2,300 near-duplicate colors from anti-aliasing. Clustering them gave a 13-color effective palette that reproduced the original with about 2 RGB units of average error.
- The background needs to be a solid color for removal later. Magenta (`#ff00ff`) works because it never appears in Mochi's palette, so it can't be confused with her pixels.

Prompt rules that came out of it:

- turn off the tool's prompt "enhancement," because rewriting can re-describe the character and drift off-model
- export a spritesheet, since the preview only shows the first frame
- end every motion on the exact starting pose, so animations can hand off to each other
- Mochi's cheeks are mint green, never pink

For the idle prompt, a water droplet that forms and falls inside the loop works better than a held prop, because it enters and exits cleanly. Whether Pixel Engine can actually add a prop mid-animation is untested.

For a quiet-mode face, editing the mouths on existing frames by hand is more reliable than regenerating frames. Regeneration is how characters slowly stop looking like themselves.

## What makes a desktop pet useful?

I asked for a list of features to make Mochi "genuinely useful" and got a filter along with it, which turned out to be the more useful part. A feature belongs in Mochi if it:

1. is something I already do
2. benefits from Mochi being there in the corner of my eye
3. stays local and ignorable
4. routes through the existing state machine instead of bolting on a side system

That filter cut local LLM chat, a to-do list, automatic clipboard history, and productivity analytics. It kept things like `mochi run -- <cmd>`, which lets Mochi react when a long command finishes.

When I asked for Codex prompts, the advice was to write a standing `AGENTS.md` plus one prompt per feature. Bundling three features into one prompt makes the result impossible to review or regression-test properly. Each prompt also listed manual QA steps for me, because an agent can't test a live GNOME session.

## Planning v0.5 from the repo, not from memory

The v0.5 plan started by reading the repo's actual state: changelog, tags, branches, recent commits. Agent Companion had already merged after the v0.4.1 tag, which made it the obvious headline.

Two investigation tricks I want to reuse:

- **Find defined-but-unused events.** Grepping for event names like `build_succeeded` across `src/` (excluding the phrases file) showed events that exist but nothing emits. That's free infrastructure for `mochi run`.
- **Bad JSON from an API can be a rate limit.** The GitHub API returned something that wouldn't parse. Looking at the first few hundred bytes of the raw response showed rate limiting, not a code bug.

A bug I didn't know about: a `Gio.Settings` call wrapped in `try/except` won't protect you from a missing schema. GLib treats a missing schema as fatal and aborts the process instead of raising a Python exception you can catch. The fix is to check for the schema first, before constructing settings. That matters before I read GNOME's Do Not Disturb setting.

The repo's own roadmap page still talked about v0.3. Stale docs are a real cost when you plan from them.

## Shell hooks lie in small ways

For the Long-Command Companion spec, the shell hooks for zsh, bash, and fish were tested in a sandboxed pty instead of trusting how they "should" work. That caught three real bugs:

| Shell | What went wrong | Fix |
| --- | --- | --- |
| fish | a Ctrl-Z suspend reports exit status `0` | check job state, not just status |
| bash | `fc -ln -1` returned the wrong command inside `PROMPT_COMMAND` | use `history 1` |
| bash | a DEBUG-trap timer counted time sitting at the prompt as command runtime | start timing in `PS0` |

I didn't find these myself; they came out of assisted testing. What I'm taking from it is the habit: when the behavior depends on a real terminal, test in a real terminal.

Following the repo's process, this stopped at spec and plan. Four decisions are mine to make before any code: which animation plays on failure, the time threshold (30 seconds was suggested), whether the hooks ship as sourced files or pasted snippets, and the tone of failure dialogue.

One more product note: Mochi's MIT license covers the artwork too. If I ever sell cosmetic packs, that matters.

## The trailer was built from the real sprites

The Mochi v0.4 trailer was rendered with Python (Pillow, numpy, ffmpeg) using the actual sprites and sound effects. Timing came from each animation's `frame_count` and `fps` in `assets/mochi/manifest.json`, and some animations weren't in the manifest at all and had to be found by filename pattern.

The music was synthesized too, and Claude was clear that it can't hear audio: it checked loudness and spectrum numbers instead. That means listening is my job.

## Small writing lessons

- In a follow-up email, write the actual date ("September 28") instead of "last Monday," especially when sending on a Monday.
- A two-day **release** window is not a two-day **development** timeline. I almost repeated that mistake in a comment about a mod.
- My DEV discussion post asked what "best practice" people quietly stopped following. My own answer was avoiding premature abstraction: Deskling only exists because Mochi's systems were proven first, then extracted.

## Still practising

- Analyzing an asset before generating from it.
- Writing one prompt per reviewable change.
- Reading the repo before planning a release.
- Testing shell behavior where it actually runs.

Source basis: the October 5 Mochi conversations (Pixel Engine prep, usefulness, v0.5 planning, product strategy, trailer) plus writing and email help. The shell hooks were tested with assistance in a sandbox, not yet in my own shell, and no Long-Command Companion code has been written.
