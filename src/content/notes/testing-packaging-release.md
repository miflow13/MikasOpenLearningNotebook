---
title: "Testing, Packaging & Release Discipline"
description: "A layered approach to unit tests, packaging, live validation, soak testing, and release discipline."
topic: "Testing & Packaging"
order: 9
featured: false
draft: false
---

## Different tests catch different failures

No single test proves an application is correct.

I now think in layers.

## 1. Focused unit/regression tests

Run the smallest relevant tests while developing a fix.

Purpose:

- fast feedback
- prove the bug exists
- prove the specific fix works

## 2. Full unit suite

```bash
python3 -m unittest discover -s tests -v
```

Purpose:

- catch regressions outside the changed module

## 3. Compilation/import validation

```bash
python3 -m compileall -q src tests
```

Purpose:

- syntax errors
- import problems
- code paths not reached by a focused test

## 4. Diff hygiene

```bash
git diff --check
```

Purpose:

- whitespace errors
- malformed patch details

Small command, useful habit.

## 5. Package build

```bash
python3 -m pip wheel . --no-deps --no-build-isolation -w /tmp/wheels
```

A source checkout can succeed while the wheel omits required assets.

## 6. Package audit

When an application ships data files, inspect the built package.

Questions:

- are all required assets present?
- are obsolete assets absent?
- does the packaged manifest match the source tree?
- are frame counts correct?

For exact asset identity, hashes or byte comparisons are stronger evidence than filenames.

## 7. Live smoke test

A GUI program needs a real launch test.

Unit tests cannot prove:

- the compositor accepts the window
- transparency looks right
- clicks actually reach the UI
- a popover releases an input grab
- animations feel correct

## 8. Soak test

A longer live run can reveal:

- timer accumulation
- memory/resource growth
- state that only gets stuck after repeated cycles
- intermittent warnings

## Known-good checkpoints

A useful checkpoint records:

- commit SHA
- test count/results
- package build result
- live validation result
- important asset/runtime state

That makes later recovery much easier than saying "it worked earlier today."

## Release metadata must agree

Version strings in README, package metadata, tags, and releases should be reconciled before shipping.

Conflicting versions make debugging installations harder.

## Main lesson

"It works on my checkout" is not a release standard. A trustworthy change survives focused tests, the full suite, packaging, and live use.


## Regression testing grows with feature composition

As a project gains long-running features, the highest-risk failures move to boundaries between systems.

Instead of testing only:

```text
Feed works
Focus works
Drag works
```

I also need combinations:

```text
Focus → Drag → Focus resumes
Focus → Sleep → session pauses
Feed → level-up → recovery
Catalogue → bond update → refresh
Shutdown → pending reward → persistence
```

A regression watchlist is useful because these combinations are easy to forget even when individual unit suites are strong.

## Release documentation is part of the release

I learned that code can be ready while the repository still tells an old story.

Before a release, audit:

- README
- changelog
- package version
- runtime version
- roadmap/current-status docs
- regression checklist
- known issues
- install/update instructions
- historical docs that might look current

If documentation says "do not add XP" after XP has intentionally shipped, that is a release defect even if the code works.

## Environment-specific skips need accurate reporting

A test skipped because it requires a real session bus or compositor is not evidence that the behavior passed.

Release notes should distinguish:

- automated test passed
- test skipped because environment unavailable
- package/import validation passed
- live desktop QA still required

That keeps confidence grounded in what was actually verified.


## Test the second launch, not only the first launch

A desktop application can pass a clean first launch and still fail when activated a second time.

Mochi updater QA exposed a case where a second open could leave the app transparent/frozen.

That makes these separate smoke tests:

```text
cold launch
close/reopen
second activation
restart after update
restart after failure/recovery
```

GTK/Gio application identity, surviving process state, stale window references, compositor state, and restart sequencing can all make later activations behave differently from the first one.

"Launches successfully once" is therefore weaker evidence than it looks.

## An updater is a release-and-recovery protocol

A built-in updater should be designed as a stateful transition, not a download button.

Useful stages are:

```text
check version
→ reject unsafe downgrade
→ stage update
→ validate staged result
→ restart/switch
→ confirm healthy launch
→ rollback/recover if needed
```

Important properties include:

- do not destroy the known-good version before a replacement is ready
- keep enough information to recover
- guard against unintended downgrades
- make restart behavior testable
- test interruption/failure paths, not just the happy path

The updater belongs to release engineering because it controls how a known-good installation becomes a new one without trapping the user in a broken state.
