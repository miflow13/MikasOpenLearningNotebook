# Testing, Packaging & Release Discipline

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
