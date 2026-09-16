---
title: "Desktop Pet SDK: Runtime & Platform Backends"
description: "How the SDK separates pet behavior from Linux window-system details and chooses a compatible runtime backend."
topic: "Desktop Linux"
order: 17
featured: false
draft: false
---

The Desktop Pet SDK taught me why platform-specific behavior should sit behind a backend instead of leaking into pet code.

A desktop pet wants simple capabilities such as:

- create a transparent window
- move the pet around the desktop
- receive clicks and drags
- play animations
- stay visually attached to desktop coordinates

The implementation of those capabilities depends on the desktop environment and display protocol.

## Detect the environment before choosing behavior

On GNOME Wayland, the SDK can detect the session and decide that movable pet windows need the X11/XWayland path.

A successful debug launch showed this clearly:

```text
GNOME Wayland detected; using XWayland for movable pet windows
Using GTK X11/XWayland window positioning
```

This is a much better design than scattering checks such as `if wayland:` throughout animation or pet-definition code.

## Capability routing belongs in the platform layer

The public pet/runtime code should care about the capability:

```text
move this pet window to x, y
```

The platform backend should care about the mechanism:

```text
which display backend is active?
can this window be positioned directly?
which coordinate system is being used?
which native API performs the move?
```

This creates a clean boundary:

```text
pet behavior
→ runtime capability
→ platform abstraction
→ Linux GTK backend
→ X11/XWayland implementation
```

## Wayland changes what applications are allowed to control

Wayland intentionally prevents ordinary clients from freely positioning arbitrary top-level windows in the old X11 style.

For normal apps this is a useful security and compositor design choice. A desktop pet is unusual because moving a tiny borderless window around the screen is part of the product itself.

That is why XWayland can be a compatibility mechanism rather than a failure to support Wayland.

The desktop session can still be GNOME Wayland while a particular pet window uses XWayland behavior where necessary.

## Keep platform knowledge out of examples

A sample pet such as `examples/slime` should not need to know whether GNOME, Wayland, or XWayland is present.

If the example contains platform-specific window code, the framework boundary is leaking.

The ideal example describes the pet while the SDK decides how to realize it on the current machine.

## Backends make future support possible

Once platform behavior is behind an interface, the project has somewhere sensible to add or experiment with other implementations later.

For example:

```text
platforms/
  linux_gtk/
    backend.py
```

can remain the Linux implementation without forcing the rest of the runtime to be designed around one exact window system forever.

The goal is not to promise every platform immediately. The goal is to avoid making future platform work unnecessarily invasive.

## Logging should explain runtime decisions

Debug logging is especially valuable in platform code because a user may not know which backend was selected.

Useful logs answer questions such as:

- what desktop/session was detected?
- which backend was selected?
- why was it selected?
- which window-positioning strategy is active?

That turns invisible environment detection into something I can reason about.

## Abstractions should preserve escape hatches

A platform abstraction should hide routine details, but it should not make debugging impossible.

When something goes wrong, I still want to be able to trace:

```text
public runtime call
→ platform adapter
→ backend method
→ native GTK/X11 behavior
```

Good abstraction reduces normal complexity without destroying observability.

## Main lesson

The SDK should expose desktop-pet capabilities, not display-server trivia. Environment detection and backend selection belong at the platform boundary, while pets and examples stay focused on behavior, animation, and personality.
