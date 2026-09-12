# Open Source Contribution Workflow

Contributing to someone else's project is a different skill from building my own. The goal is not just to make code work; it is to understand the project's conventions well enough to make a change that fits cleanly into an existing system.

## What changes when the repository is not mine

On my own project I can decide the architecture, naming, scope, and workflow. In an established open-source project, those decisions already exist.

That means the first job is usually **understanding**, not editing.

A useful loop is:

```text
find a scoped issue
→ read contributing docs
→ check whether someone is already working on it
→ reproduce the problem
→ trace the relevant code
→ read nearby tests
→ form a hypothesis
→ make the smallest useful change
→ run focused + broader tests
→ open a clear PR
→ learn from review
```

## 1. Check the issue before claiming it

Before starting:

- read the full issue and recent comments
- check assignees and linked pull requests
- see whether another contributor already said they are investigating it
- ask before duplicating active work when ownership is unclear

A good contribution should help the project, not create avoidable parallel work.

## 2. Reproduce before fixing

I want to be able to answer these questions before changing code:

- Can I reproduce the bug?
- What exact action triggers it?
- What behavior did I expect instead?
- Is the issue platform-specific?
- Which layer seems to own the behavior?

This keeps me from solving the wrong problem.

## 3. Read the project's patterns

Before writing a new helper, abstraction, or test, search for how the repository already solves similar problems.

Useful things to inspect:

- `CONTRIBUTING.md`
- test layout
- naming conventions
- nearby implementations
- recent pull requests touching the same subsystem
- formatting/linting configuration
- platform-specific abstractions

The best patch is often the one that looks like it could have been written by an existing maintainer.

## 4. Keep the patch narrow

Avoid turning a small bug fix into an architectural rewrite.

Prefer:

```text
one problem
→ one root cause
→ one focused fix
→ one regression test
```

If I discover larger technical debt, I can document it separately instead of mixing it into the contribution.

## 5. Tests are part of the fix

For a bug, the strongest contribution usually includes a test that would have failed before the change and passes afterward.

Testing should answer both:

1. Did I fix the reported behavior?
2. Did I accidentally break neighboring behavior?

For UI or platform-specific bugs, automated tests may need to be paired with real runtime verification.

## 6. A pull request is an explanation

A useful PR should make review easy. It should explain:

- the root cause
- what changed
- why this approach fits the existing code
- how it was tested
- any platform or environment limitations

The diff is only part of the contribution. Clear reasoning reduces reviewer work.

## 7. Review is part of learning

A requested change is not a failure. It is direct evidence about how experienced maintainers think about their codebase.

Things worth paying attention to during review:

- naming choices
- test expectations
- scope boundaries
- backwards compatibility
- API design
- assumptions I made that the repository does not share

That feedback is one of the main reasons I want to contribute outside my own projects.

## Using AI without giving up ownership

AI can help me search a codebase, explain unfamiliar APIs, draft tests, or compare possible fixes. But I still need to understand and verify what I submit.

My standard should be:

> I should be able to explain every important line in the patch, why it belongs there, and what evidence says it works.

The tool can accelerate the work. It should not replace understanding.

## Current practice target

I am using [BeeWare Toga](https://github.com/beeware/toga), a Python native GUI toolkit, as a first larger external codebase to study.

A useful starter issue is [Toga #2554 — readonly TextInput beeps on focus loss with keyboard on GTK](https://github.com/beeware/toga/issues/2554). It is narrow, GTK-specific, reproducible, and has an existing testing culture around it.

The goal is not simply to get a PR merged. The goal is to practice reading an unfamiliar project, reproducing a bug, understanding the existing abstraction, and making a change that fits the project.

## Main lesson

Building my own software teaches me how to make design decisions. Contributing to established software teaches me how to understand decisions that already exist.

I need both.
