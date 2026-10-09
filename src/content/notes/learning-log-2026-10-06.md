---
title: "Learning Log — October 6, 2026"
description: "Planning a declared-vs-observed review of an AI agent, why my laptop can't sensibly run macOS, defaults that shape behavior, verifying rendered output, and safer bulk email cleanup."
topic: "Learning Log"
order: 50
featured: true
draft: false
---

A lighter day for code, heavier on planning and evaluation. The thread running through it was checking what something actually does against what it says it does.

## Reviewing an AI agent: declared vs. observed

I'm planning an article about spending a week with Muse, Meta's personal AI agent. Plenty of "a week with Muse" posts already exist, so the angle we landed on is the same one behind Ravel: compare Meta's specific security claims with observed behavior.

The claims worth testing include an isolated VM, a separate approval system, stand-in tokens for credentials, approval scopes, and filtering of codes and links in email.

The logging method is three columns per test:

| What Muse claimed | What the activity log showed | What actually happened |
| --- | --- | --- |

Setup rules before Day 1:

- screenshot onboarding, because I can't go back and see it later
- start connector permissions as read-only
- decide the data-training toggle on purpose, not by default
- read the bug bounty terms **before** trying any prompt-injection canaries

One limit I need to state in the article: the desktop client is Mac-only, and I'm on Fedora plus an iPhone, so I can't test every surface.

This is a plan. Testing hasn't started yet.

## Can my laptop run macOS?

Short answer: not in a way worth doing.

- macOS 26 Tahoe is the last version that supports Intel Macs, so a Hackintosh built now is stuck on Tahoe forever.
- Laptops are the hardest Hackintosh targets: Wi-Fi, trackpad, sleep, and battery management commonly break.
- Nvidia GPUs aren't supported, so it would rely on Intel integrated graphics.

The low-risk option is a VM on Fedora through KVM (OSX-KVM or quickemu). It won't touch my Fedora install, but graphics are unaccelerated and slow. Running macOS on non-Apple hardware also conflicts with Apple's license terms, which is a licensing problem rather than a criminal one.

To check my hardware before deciding anything:

```bash
lscpu | grep "Model name"
lspci | grep -Ei "vga|3d|network"
```

I haven't made a decision. The real question is what I'd want macOS for.

## Defaults shape behavior more than instructions do

While drafting an answer for a job application, I wrote up a Meldr decision. Early Meldr had AI draft generation, and the main button on the review screen said "Next · Generate draft." Every article got nudged toward AI-written prose by a button label, even though the whole point of the tool was helping me write in my own voice.

I removed the feature even though it was already built. The lesson I keep coming back to: the default path is the instruction people actually follow.

## Check what renders, not what you wrote

When building a one-page Word resume, the loop was to convert it to PDF, render the pages as images, and look at them after every edit. Changing one header line can push a document onto a second page, and the source file won't tell you that.

Same idea as reading a run's actual output instead of trusting the code that produced it.

## Bulk cleanup with an undo button

I cleared out promotional email going back to late 2023, close to 3,000 threads. A few patterns from that:

- Search in date-bounded batches. Once threads are trashed, they drop out of the same query, so the next batch appears without juggling page tokens.
- Instead of clicking unsubscribe links automatically, tag one thread per sender with an `Unsubscribe` label and use Gmail's own unsubscribe button by hand.
- Skip any thread where I had replied, since that means a real person.
- Trash keeps mail for about 30 days, which gives the cleanup an undo window.

Some brand-deal emails and senders that looked like individual people got tagged for review instead of trashed. Bulk operations need an exception path.

## Designing for a user who needs you less

I also thought through what an AI companion should optimize for. The principle I liked: it succeeds when the person gets more capable and makes better decisions over time, not when sessions get longer. That leads to an "interruption budget" for proactive messages, memory with provenance the user can edit, and help that fades as someone masters an area.

The failure modes to design against are sycophancy drift, dependency, confident fabrication, memory creep, and manufactured intimacy. The suggested first evaluation was a sycophancy test. This was design discussion only.

## Still practising

- Writing down claims before testing them.
- Looking at rendered output after every change.
- Giving bulk operations a review path and an undo window.

Source basis: the October 6 Muse planning, macOS compatibility, application-writing, resume, Gmail cleanup, and AI-companion design conversations.
