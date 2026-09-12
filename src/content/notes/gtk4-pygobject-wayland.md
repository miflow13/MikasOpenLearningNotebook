---
title: "GTK4, PyGObject, Wayland & XWayland"
description: "Notes from building a Linux desktop application with GTK."
topic: "Desktop Linux"
order: 5
featured: false
draft: false
---

GTK is a Linux desktop UI toolkit used heavily by GNOME applications.

## GTK4

GTK provides widgets and event handling such as:

- windows
- boxes/layouts
- buttons
- popovers
- gestures
- drawing surfaces

## PyGObject

PyGObject exposes GObject-based libraries such as GTK to Python.

This makes it possible to write a GTK application in Python while still using native GNOME/GTK APIs.

## Cairo

Cairo is a 2D graphics library commonly used with GTK for custom drawing.

For pixel art, the important lesson is to control filtering so rendering does not blur authored pixels.

## Wayland vs X11

Wayland is the modern display protocol used by GNOME.

A core security difference is that Wayland intentionally restricts applications from freely inspecting or synthesizing input for other applications.

This is good for user security, but it affects desktop automation and unusual always-on-top desktop buddy behavior.

## XWayland

XWayland is an X11 compatibility layer running inside a Wayland session.

It can provide behavior that native Wayland applications cannot always get directly.

Important distinction:

- supporting XWayland for compatibility is not the same thing as making the entire desktop session X11

## Remote Desktop / synthetic input permissions

Automation tools may trigger GNOME Remote Desktop or portal permissions because Wayland blocks arbitrary synthetic input.

A normal desktop companion should not need remote desktop, screen capture, or synthetic-input permissions just to receive its own clicks and drags.

Development automation permissions should stay separate from runtime requirements.

## GTK popovers and input grabs

A major practical lesson: `popdown()` can begin closing a popover without guaranteeing the close is fully complete at the next line of Python.

If an action moves a parent window while the popover is still releasing its grab, input can become stuck behind an invisible surface.

Safe lifecycle pattern:

```text
select action
→ clear logical context state
→ request popdown
→ wait for `closed`
→ defer one main-loop turn if necessary
→ perform action
```

## UI lifecycle bugs are state bugs too

When debugging a GUI freeze, inspect:

- widget visibility
- focusability
- hover flags
- pending timers
- popover state
- behavior state
- compositor warnings

## Main lesson

Desktop Linux GUI programming is not just drawing widgets. The event loop, compositor, security model, and lifecycle of temporary surfaces all matter.
