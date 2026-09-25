---
title: "Linux App Portability: Dependencies, Desktop Environments & Runtime Reality"
description: "Lessons from making Mochi install and run outside my own Fedora/GNOME setup."
topic: "Linux"
order: 32
featured: false
draft: false
---

## "Works on my machine" hides assumptions

Mochi worked on my Fedora GNOME system, but portability testing exposed assumptions about:

- Python packaging tools
- desktop environment
- GNOME-specific helpers
- compositor/session behavior
- optional integrations
- runtime warnings

The lesson is that portability is not just "supports Linux."

Linux is a collection of environments with different desktops, packaging states, and capabilities.

## Bootstrap packaging prerequisites explicitly

A clean/private virtual environment may not contain every packaging tool my development environment already has.

The installer was improved to bootstrap tools such as modern setuptools and wheel when needed.

This is a general packaging lesson:

**my machine already has dependency X does not mean a clean install environment has dependency X**

## Optional integrations should degrade cleanly

Mochi has GNOME-specific helper behavior.

On a non-GNOME environment or where the required tooling is missing, a better installer/runtime should:

- detect the condition
- skip the unsupported helper
- explain what was skipped
- continue when the helper is optional

Optional platform integration should not turn into a false global install failure.

## Wayland applications may still use XWayland intentionally

On GNOME Wayland, Mochi intentionally uses XWayland/X11 behavior for the buddy window because it needs desktop-window capabilities that are awkward or unavailable to an ordinary Wayland client.

A Wayland session does not mean every application window is native Wayland.

The session protocol and a specific window's backend can differ.

## Runtime warnings are not always failures

GTK can emit warnings while the program still launches and functions.

The correct response is not to ignore every warning or treat every warning as fatal.

I need to ask:

- Did the feature actually fail?
- Is the warning evidence of a future compatibility issue?
- Is it cosmetic, accessibility-related, or state-related?
- Can I reproduce a user-visible problem?

## Ambient awareness has capability boundaries

Features such as typing/activity awareness depend on what the desktop environment exposes.

A feature can be correctly implemented while its coverage is reduced because a desktop accessibility or integration layer is disabled.

Accurate documentation should describe those boundaries instead of claiming universal coverage.

## Cross-distribution confirmation matters

A successful report from a different distribution/environment is stronger portability evidence than another successful run on my own Fedora machine.

It does not prove universal Linux compatibility, but it tests assumptions I cannot expose locally.

## Main lesson

Portability means identifying environment assumptions and turning them into explicit capability checks, optional paths, and accurate messages.
