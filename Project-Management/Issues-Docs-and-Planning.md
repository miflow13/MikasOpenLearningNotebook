# Issues, Documentation & Planning

## Different tools should have different jobs

One lesson from organizing a real project is that duplicating the same information everywhere creates maintenance work.

A useful division:

```text
GitHub Issues → concrete bugs/tasks
Trello/board → current planning and priority
Git commits/PRs → what changed
Docs/wiki → durable knowledge
Regression watchlist → known failure patterns
```

## A good issue is reproducible

A bug issue should answer:

- what happened?
- how do I reproduce it?
- what should have happened?
- what environment was used?
- what sequence of states/actions caused it?
- what counts as fixed?

For interaction-heavy software, a sequence is especially useful:

```text
IDLE → RIGHT CLICK → WALK → DRAG → FREEZE
```

## Acceptance criteria

Acceptance criteria turn vague tasks into testable outcomes.

Bad:

> Make dragging better.

Better:

- release position remains accurate
- visual lag stays below a defined amount
- settles without oscillation
- existing click behavior remains unchanged

## Regression watchlists

Some bugs are likely to return because they live at architectural boundaries.

A regression watchlist is useful for failures such as:

- stuck input grabs
- state not returning to idle
- duplicate timers
- stale/legacy assets
- packaging missing files

## Documentation types

### README
Fast project overview and getting started.

### Wiki/docs
Deeper architecture, workflow, troubleshooting, philosophy.

### Issue template
Standardizes bug reports.

### PR template
Standardizes validation before merge.

### Development notes
Capture temporary decisions/checkpoints during active work.

## Planning priorities

Not all tasks deserve equal attention.

Useful categories:

- blocker
- high
- medium
- low/polish

For an alpha, freezes and stuck input are more important than adding another emote.

## Definition of Done

A task should not move to "done" just because code was written.

Depending on the task, done may mean:

- implementation complete
- focused tests pass
- regression tests added
- full suite passes
- live test passes
- docs updated
- clean commit created

## Main lesson

Project management is not bureaucracy when it reduces ambiguity. Good issue tracking and documentation make engineering faster because I spend less time reconstructing what happened.
