---
title: "Python CLIs, Entry Points & Debugging the Runtime Path"
description: "What I learned from running the Desktop Pet SDK through its installed CLI and tracing execution into the GTK application."
topic: "Python"
order: 18
featured: false
draft: false
---

Running the Desktop Pet SDK through its real command-line entry point taught me more than running a Python file directly.

The command:

```bash
deskling run examples/slime --debug
```

exercises the program through the same public path a user would use.

## A CLI is part of the product API

A command such as `deskling` is not just a convenience alias.

It becomes part of how users understand and operate the project.

A useful CLI should make common actions discoverable and predictable, for example:

```text
deskling run <pet>
deskling run <pet> --debug
```

That means command names, arguments, validation, help text, and error messages deserve the same care as Python APIs.

## Installed entry points prove packaging works

When a virtual environment exposes an executable such as:

```text
.venv/bin/deskling
```

that executable was created from package metadata rather than from manually running a source file.

This makes CLI testing a packaging test too.

If `python some_file.py` works but the installed console command does not, the problem may be in:

- package metadata
- entry-point configuration
- imports
- installation state
- stale editable installs

## `main()` gives the CLI a clean boundary

A common Python console-script shape is:

```python
def main() -> int:
    ...
    return exit_code
```

and the generated launcher effectively exits using that result.

This is useful because the CLI has one clear top-level boundary for:

- parsing arguments
- selecting a command
- configuring logging
- creating the runtime
- returning an exit status

## Read a traceback from the bottom and the top

When I interrupted the running SDK, the traceback exposed a path similar to:

```text
console entry point
→ cli.main()
→ run command
→ application.run(...)
→ GTK main loop
```

The final frame tells me where execution was stopped, while the earlier frames show how control reached that point.

This makes tracebacks a map of runtime ownership.

## Ctrl+C is also lifecycle behavior

Pressing Ctrl+C sends an interrupt to a foreground terminal process.

If that produces a full traceback, it does not necessarily mean the application was broken before the interrupt. It can simply mean the process did not catch `KeyboardInterrupt` and convert it into a quieter shutdown path.

That creates a useful distinction:

```text
application failure
vs
intentional user interruption with noisy shutdown
```

For developer tools, a graceful interrupt handler can improve polish later, but the traceback itself is useful while learning the call path.

## Debug mode should expose decisions, not noise

`--debug` is most useful when it reveals meaningful runtime choices, such as:

- detected desktop environment
- selected display/backend strategy
- asset or config paths
- loaded pet definition
- state transitions
- recoverable fallback behavior

Dumping every tiny internal operation can make debugging harder rather than easier.

## The working directory matters

A command like:

```bash
deskling run examples/slime
```

contains a relative path.

Relative paths are resolved from the current working directory unless the application deliberately normalizes them another way.

That means command-line tools should be clear about whether an argument is:

- a filesystem path
- a package resource
- a project identifier
- a config name

Ambiguity here creates confusing bugs.

## Editable installs are powerful but can hide packaging mistakes

An editable install is excellent during development because source changes are reflected without rebuilding the package every time.

But I still need to remember that:

```text
works from editable source
```

is not identical to:

```text
works from a clean built wheel
```

Before a release, both paths should be tested.

## Test the public path, not only internal functions

Unit tests can prove individual behavior while the actual command still fails because of wiring or packaging.

A useful validation ladder is:

```text
unit tests
→ import/compile checks
→ package build
→ installed CLI
→ real example launch
```

Each layer catches a different class of mistake.

## Main lesson

A Python CLI sits at the boundary between packaging, argument parsing, runtime construction, logging, and application lifecycle. Running the real installed command is an integration test of the project, not merely another way to start it.
