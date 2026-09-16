---
title: "FocusShell: Providers, WebKitGTK & App Architecture"
description: "Architecture lessons from building a small GNOME wrapper around a web service."
topic: "Software Engineering"
order: 15
featured: false
draft: false
---

FocusShell taught me several useful architecture lessons because it looks simple from the outside but crosses several boundaries: GTK UI, application lifecycle, a web service, persistent browser state, and provider-specific behavior.

## Keep the application class small

A useful application class can be almost boring:

```text
create application
→ activate
→ create provider
→ create main window
→ present window
```

That is a good sign.

The application object should coordinate top-level objects, not become the place where every feature lives.

## Dependency wiring belongs near the top

In FocusShell, the application can create a provider and pass it into the window:

```python
provider = BrainFmWebProvider()
self._window = FocusShellWindow(self, provider)
```

This is simple dependency injection.

The window receives something that knows how to provide the Brain.fm behavior instead of constructing that behavior deep inside UI code.

That improves:

- testability
- replacement of implementations
- readability
- future support for other providers

## Providers create a boundary around external services

A provider abstraction is useful when one part of the application talks to something outside the app's core UI.

Examples include:

- websites
- APIs
- music services
- file systems
- databases
- desktop integrations

Instead of letting every view know Brain.fm-specific details, the provider can own those details.

A useful mental model is:

```text
UI asks for capability
→ provider handles service-specific details
→ provider returns behavior/data
```

## Embedded web apps still need native architecture

Using WebKitGTK does not mean the entire application becomes "just a website."

The native app still owns:

- process lifecycle
- window creation
- navigation shell
- local persistence
- permissions
- error handling
- integration with the desktop

The embedded web view is one component inside that architecture.

## Persistent WebKit profiles matter

A persistent WebKit profile lets login/session state survive across launches.

A path under the user's application data directory is appropriate for this kind of state, for example:

```text
~/.local/share/<app>/webkit
```

This taught me to separate browser/session state from source code and temporary runtime state.

## GTK4 APIs are not always the same as older examples

While building FocusShell I hit this error:

```text
AttributeError: 'ScrolledWindow' object has no attribute 'set_hscrollbar_policy'
```

The lesson was bigger than one method name: examples written for older GTK versions or different bindings cannot always be copied directly into GTK4.

With GTK4, `Gtk.ScrolledWindow` uses the policy API as a pair rather than relying on the older-looking per-axis setter pattern.

When an attribute is missing, I should check:

1. which GTK major version the example targets
2. whether the method moved or was renamed
3. whether the Python binding exposes the C API differently
4. the actual object type I created

## Tracebacks are architecture maps

A Python traceback does more than show the final exception.

A traceback through:

```text
app activation
→ window constructor
→ view constructor
→ failing widget call
```

shows the object-construction path of the program.

That makes tracebacks useful for learning how the application is assembled, not just for locating a broken line.

## Separate views from the shell

A main window can act as a shell while individual views own their own UI.

For example:

```text
FocusShellWindow
├── HomeView
└── Brain.fm web view
```

This prevents `window.py` from becoming a giant collection of unrelated widgets.

## Build thin vertical slices

For a small app, I learn faster by getting one thin path working end to end:

```text
launch
→ show home view
→ open service
→ persist session
→ return safely
```

Once that path works, I can polish layout and add features with a known-good baseline.

## Main lesson

Even a small wrapper app benefits from real architecture. A thin application layer, explicit provider boundary, separate views, and deliberate persistence make the code easier to understand and extend than placing everything inside one window class.
