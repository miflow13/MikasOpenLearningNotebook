---
title: "Learning Log — September 26, 2026"
description: "Open-source community infrastructure, GitHub organization permissions, first-PR curation, Mochi updater QA, persistent personality state, and career positioning."
topic: "Learning Log"
order: 34
featured: true
draft: false
---

September 26 was a shift from only building projects toward thinking more seriously about **how projects become communities, how software survives updates, and how long-lived state should be modeled**.

The day connected She[Ships], Mochi, GitHub, release engineering, and career positioning.

## She[Ships]: a community needs infrastructure, not just a name

I created the **She[Ships]** GitHub organization and started treating it as a real open-source home rather than only a social/community identity.

That clarified what a GitHub organization is useful for:

- owning repositories separately from one person's account
- giving projects a shared identity
- managing contributor access and permissions
- creating reusable community files and contribution standards
- making it easier for multiple projects to live under one umbrella

The important shift is that a community becomes easier to participate in when the path from **interested → contributor → shipped** is visible.

## First Ship: "good first issue" is not enough

The first She[Ships] repository, `first-ship`, is a curated list of beginner-friendly open-source issues aimed at helping someone land a **first merged pull request**.

The main lesson is that a GitHub label alone is weak evidence that an issue is actually beginner-friendly.

A useful first-PR issue should be checked for things like:

- still open
- not already claimed
- enough context to begin
- realistically scoped
- stack clearly identified
- maintainers/contribution process understandable

Curation is part of the product.

The value is not merely collecting links. It is reducing uncertainty for a newcomer.

## GitHub permissions: ownership and integration access are different

While wiring ChatGPT/GitHub tooling into the new organization, I hit a useful permissions lesson.

An integration can have access to my personal repositories and still fail against an organization repository with a `403 Resource not accessible by integration`.

That does **not** necessarily mean I lack permission to the repository.

It can mean the integration itself has not been installed or authorized for that organization.

Useful mental model:

```text
my GitHub account permission
!=
GitHub App / integration permission
```

When automation fails, I need to identify which identity is actually making the request.

## Open-source growth: different signals mean different things

Mochi kept growing publicly. At one point today the repository was at 117 stars and 8 forks.

That helped clarify that GitHub metrics describe different stages of interest:

```text
star
→ "this is interesting / I want to remember it"

fork
→ "I may want my own copy or to experiment"

issue
→ "I interacted deeply enough to report, request, or track something"

pull request
→ "I am proposing a concrete change"
```

None of these should be treated as a universal quality score.

A project can attract stars before it attracts contributors, and that is normal.

## Mochi updater: an updater is a recovery system

The built-in updater work made one thing much clearer:

An updater is not just "download the new version."

A trustworthy updater needs to reason about:

- version comparison
- downgrade protection
- staged replacement
- process restart
- rollback/recovery
- what happens if launch fails after updating

A failed update is worse than no update if the user cannot recover.

The safer mental model is:

```text
check
→ stage
→ validate
→ switch/restart
→ confirm
→ recover if necessary
```

## Second-open bugs are lifecycle bugs until proven otherwise

Updater QA exposed a bug where Mochi could become transparent/frozen on a second open.

That reinforced a GTK lesson: first launch success is not enough.

A desktop app may behave differently on:

- first process launch
- second activation while an application identity already exists
- window close/reopen
- app restart triggered by an updater
- activation when old references or state survive

For GUI software, **launch twice** is a real test case.

## Personality is not the same as behavior state

For Mochi v0.4, I settled on five independent personality traits:

- Curious
- Playful
- Cozy
- Mischievous
- Focused

The important architecture lesson is that these traits should not be treated like another animation/behavior enum.

Behavior state answers:

> What is Mochi doing right now?

Personality state answers:

> What tendencies has Mochi slowly developed over time?

Those need different lifecycles.

A useful model is:

```text
persistent personality
    ↓ biases
behavior selection
    ↓ owns
current presentation / animation
```

The personality layer should evolve slowly and only from meaningful completed events, not every noisy transient input.

## Career positioning: evidence should support the headline

I also worked on how to present recent DEV recognition and project traction on LinkedIn.

The lesson I want to keep is simple:

**Lead with what I do. Use recognition as evidence.**

"Software Developer" or a concrete engineering identity should remain the main signal.

Awards, curator selections, stars, and community recognition are supporting proof that people are engaging with the work—not a replacement for the work itself.

## What connected the day

A lot of today's learning came back to **boundaries and ownership**:

- who owns a repository?
- who is authorized to write to it?
- who owns behavior state?
- who owns persistent personality?
- who owns recovery during an update?
- what does a metric actually measure?

The repeated debugging question is:

> Which layer actually owns this outcome?

That is becoming one of the most useful questions I can ask when a system behaves strangely.

## What I want to keep practicing

- designing contributor paths, not only repositories
- checking integration permissions separately from user permissions
- curating beginner issues instead of trusting labels blindly
- testing application lifecycle beyond first launch
- treating update/restart/rollback as one system
- separating persistent domain state from temporary presentation state
- interpreting GitHub metrics as signals, not verdicts
- leading career positioning with concrete work and using recognition as supporting evidence

## Main lesson

Today felt like a move from **building software** toward understanding the systems around software:

**community, permissions, lifecycle, recovery, long-term state, and evidence.**

Shipping does not end when code runs. The surrounding system determines whether other people can trust it, contribute to it, recover from it, and understand what it is.

## Late-day additions: architecture, portability, and Mochi Lab

The rest of the day added several lessons that were worth preserving separately from the earlier community/updater work.

### Composition bugs need production-shaped tests

An Edge Roam failure looked correct in isolation but broke when Mochi's real mixins were composed together.

The problem was method-resolution order: one mixin consumed an ambient hook before the mixin that needed it could see it.

That clarified a useful rule:

> A unit test can prove a class works by itself while the shipped object still fails because composition changes control flow.

For mixin-heavy or plugin-style architectures, regression tests should instantiate the **same production composition** when the bug lives at a boundary.

### Persistence failure should not become lifecycle failure

Bond progression exposed another important boundary.

XP could update correctly in memory, then a save could fail. If that storage exception escaped, it could interrupt level-up presentation or shutdown cleanup even though the actual domain transition had already happened.

The safer model is:

```text
update durable state in memory
→ mark it dirty
→ attempt persistence
→ if save fails, keep dirty state for retry
→ continue presentation/cleanup
→ clear dirty state only after a successful save
```

A persistence error is a storage problem. It should not replay rewards, roll back valid in-memory progression, or strand the application lifecycle.

### Porting without owning the target hardware

I explored how Mochi could eventually reach macOS without turning the project into two unrelated applications.

The architecture that makes sense is:

```text
shared Python core
(animation, state, behavior, persistence)
        ↓
platform backend boundary
        ↓
Linux: GTK/GDK
macOS: AppKit/PyObjC
```

A lot can be tested without owning a Mac:

- shared-core behavior on Linux
- mocked window/input/media backend contracts
- GitHub Actions on macOS runners
- import/build tests
- app-bundle creation
- process-launch smoke tests

But CI is not a substitute for physical UX verification. Transparency, Retina rendering, drag feel, Spaces, multi-monitor behavior, focus, right-click behavior, and always-on-top semantics still need a real Mac.

### Mochi Lab: encode appearance rules as data

The first appearance-system milestone reinforced a design principle I want to keep:

**If an accessory should remain attached across animations, encode that relationship in frame/attachment metadata rather than scattering state-specific drawing exceptions through runtime code.**

The milestone covered 76 animation frames and kept glasses, beanie, and scarf rendering through pickup/drop, drag, sleep/wake, bounce, squish, level-up, and side-eye paths.

The validation results were strong—109 appearance/package tests and 869 non-display tests passing with one skip—but six unchanged headless GTK failures remained.

That is a useful confidence boundary:

> Headless test success is not Fedora/Wayland visual QA.

### Git bundles are portable history, not magic synchronization

I also imported a feature branch through a Git bundle.

A bundle can carry commits and refs, but importing it does not automatically replace an existing local branch or remote-tracking relationship.

The safe sequence is:

```text
verify bundle
→ fetch bundle ref into a clearly named remote/ref
→ inspect commit IDs
→ switch/create the intended branch explicitly
→ verify tracking and working-tree state
```

The recurring lesson is the same as everywhere else in Git: inspect the exact refs and SHAs instead of assuming what moved.

## Added takeaway

By the end of the day, "ownership" had become an even more useful systems question:

- which mixin owns a hook?
- which subsystem owns state?
- which layer owns persistence failure?
- which backend owns platform behavior?
- which metadata owns attachment placement?
- which ref actually points at the work I want?

When ownership is vague, lifecycle bugs and integration bugs multiply.
