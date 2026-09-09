# Git & GitHub Workflow

## The four places I think about

A useful mental model:

```text
working tree
→ staging area
→ local commit history
→ remote repository
```

### Working tree
The files I am actively editing.

### Staging area
The exact changes selected for the next commit.

### Commit
A named checkpoint in local history.

### Remote
A repository such as GitHub used for collaboration and backup/sharing.

## Core commands

```bash
git status
git diff
git add
git commit
git log
git branch
git switch
git merge
git push
git pull
```

`git status` should be one of the first commands before risky work.

## Small commits are recovery points

One of my biggest lessons is that a commit is not just a record for other people. It is a **safety checkpoint**.

A good development rhythm is:

```text
one meaningful change
→ test
→ commit
→ next change
```

Long dirty working trees make it much harder to tell which change caused a regression.

## Branch before destructive work

Before a reset, restoration, migration, or broad cleanup:

1. inspect `git status`
2. inspect history
3. create a safety branch or commit
4. only then make destructive changes

This makes experimentation reversible.

## `git reflog`

`git log` shows normal history. `git reflog` records where local refs/HEAD have moved.

It can help recover commits or states that are no longer visible in ordinary branch history.

But an important lesson is: **do not guess that a checkpoint exists**. Verify with the actual history/reflog first.

## GitHub Issues

Issues are best for concrete work:

- bugs
- regressions
- enhancements
- reproducible interaction failures

A useful bug issue includes:

- summary
- steps to reproduce
- expected behavior
- actual behavior
- environment
- acceptance criteria
- regression checks

## Pull requests

A PR is not only a request to merge code. It is a reviewable explanation of:

- what changed
- why it changed
- how it was tested
- what risks remain

## Documentation in the repository

Permanent engineering knowledge belongs in version-controlled docs when possible.

Examples:

- `README.md` → project overview
- `CONTRIBUTING.md` → contribution workflow
- issue templates → consistent reports
- regression watchlist → known failure patterns
- docs/wiki → deeper project knowledge

## GitHub Wiki vs repo docs

A GitHub Wiki is convenient for readers, but it is stored separately from the main repository.

Keeping source copies of important wiki pages inside the repository means normal Git history, review, and tooling can still track them.

## Main lesson

Git is not just a way to upload code. It is a tool for thinking clearly about change, risk, history, and recovery.
