---
title: "Learning Log — October 7, 2026"
description: "Why Mochi might not float on Hyprland (library load order), outlining an API tutorial against current docs, catching scope creep in a game design doc, and cleaning photos before publishing."
topic: "Learning Log"
order: 51
featured: true
draft: false
---

Today had a pattern: a lot of things that looked done had one hidden condition underneath. A library that has to load first, a doc that contradicts itself, a design doc that grew while nobody was counting.

## Mochi on Hyprland: probably yes, with one catch

I wanted to know if Mochi would work on Hyprland. Reading the code, the path already exists:

- `main.py` only forces XWayland when it detects GNOME, so on Hyprland GTK runs as native Wayland.
- `windowing.py` turns the window into a gtk4-layer-shell overlay, which Hyprland supports.
- Mochi sits on the top layer, never takes keyboard focus, and drags by changing its margins. Niri uses the same path.

The catch is load order. gtk4-layer-shell's own docs say its library must load **before** `libwayland-client`. Mochi imports Gtk, which loads libwayland, and only then imports `Gtk4LayerShell`. If that breaks layer-shell setup, Mochi would show up as a normal window and Hyprland would tile it. That might also explain why Niri support is still marked experimental.

This is a strong hypothesis, not a confirmed bug. The test:

```bash
mochi --debug 2>&1 | grep -iE 'layer|xwayland|fallback'
hyprctl layers | grep mochi
```

If there's no `mochi` layer and it gets tiled, try:

```bash
LD_PRELOAD=libgtk4-layer-shell.so.0 mochi --debug
```

If preloading fixes it, the load order is confirmed. The fix would be a `ctypes.CDLL("libgtk4-layer-shell.so.0")` call early in `main.py`, inside `try/except OSError`, before anything imports Gtk. Because that's right next to backend selection, my own `AGENTS.md` says to write a spec first.

Two other gaps: the installer only auto-installs gtk4-layer-shell on Fedora, and GNOME-only features (AmbiSense, global shortcuts) won't work on Hyprland.

What I learned in general: in Python, "import order" can mean "native library load order," and that can matter even when every import succeeds.

## Outline an API tutorial against today's docs

For my next Sinch tutorial (an RCS product carousel with the Conversation API), the outline was built from current docs instead of memory. The pieces that matter:

- `card_message` for a single rich card
- `carousel_message` for several cards in a row
- `choices` for buttons on each card
- `postback_data` to tell my webhook which button got tapped

The docs were inconsistent about how many buttons a card can have. That goes in my notes as something to verify on a real device before it goes in a tutorial. If the docs disagree with each other, the device decides.

The plan is to send the outline for review before drafting, so the shape gets agreed on before the expensive part.

## Scope creep is quiet when it arrives as comments

I started a design doc for a survival game: single-player, solo in Godot 4, one hand-built forest, where you start as prey being hunted and slowly learn to hunt back. Performance is a design constraint from day one, not a late optimization pass.

Then I left comment after comment on the doc: discovered recipes instead of grinding, a paper map instead of a minimap, character creation, professions, a ceasefire clock as the late game, notoriety that scales the hunters' response. Each one made sense. Together they made the doc much bigger.

The fix is boring and necessary: tag every feature as **slice** or **later** before writing code.

The bigger lesson: the biggest unknown is whether being hunted is actually fun, and mockups can't answer that. The first build should be a first-person controller and one hunter who tracks footprints, before any art or extra systems.

## Clean photos before they go public

My DEV article about writing on a 2006 iMac and coding on a $200 laptop went out today. Getting the photos ready taught me a checklist:

- blur anything private on a screen (personal text was visible on the iMac)
- strip metadata before uploading, and check specifically for GPS location
- DEV covers are 1000×420 (about 2.4:1), so crop to the subject, not the whole scene

For the Bluesky post, I counted characters with a small script instead of eyeballing them against the 300-character limit.

## A resume parsing check

For one application, the themed resume had to be ATS-safe. That meant a single-column layout and checking that the text extracts cleanly in reading order. Decoration is fine as long as a parser can still read the words.

## Still practising

- Confirming a hypothesis with a cheap test before touching code.
- Treating contradictory docs as a test case.
- Tagging scope before it gets built.
- Checking images for private details before publishing.

Source basis: the October 7 Mochi-on-Hyprland, Sinch outline, survival-game design, article photo, Bluesky, and resume conversations. The Hyprland test hasn't been run yet, and no game code exists yet.
