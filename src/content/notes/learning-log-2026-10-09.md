---
title: "Learning Log — October 9, 2026"
description: "Taking apart a 'collaboration' email aimed at developers, what happens between pressing Enter and seeing output, man pages, and a surprising finding about who likes AI."
topic: "Learning Log"
order: 53
featured: true
draft: false
---

Today was shorter on building and longer on understanding things I use every day without thinking about them.

## Anatomy of a "collaboration" email

I got an email from someone claiming to run a small dev team in Japan, saying they'd found me on GitHub and wanted a "long-term collaboration" with engineers in my US state. It matched a well-documented scam pattern almost line for line.

The tells, in order of how fast they should have tipped me off:

- **It named my US state.** A team abroad has no reason to care which state I live in unless they need a US identity.
- **No project named.** Someone who actually read my GitHub would mention Mochi or KeyFlip. "AI and machine learning" fits half of GitHub.
- **No role, rate, or scope.** Just a "collab" and a call.
- **The "booking" link was only a `#contact` anchor.** Replying mostly confirms that my address is live.

What these usually turn into, based on documented cases:

1. **Identity rental.** A follow-up reveals they want to work US remote jobs through your profile. Security researchers have tracked North Korea-linked IT workers using this approach, and Americans who lent their identities to schemes like this have been prosecuted.
2. **Malware.** A "check out our project" repo that runs code when you open it. Researchers have reported campaigns that send developers job or code-review lures pointing at attacker-controlled repos and editor tooling.

My rule from now on: never clone or open a repo that an unsolicited recruiter sends me. Mark it as spam and move on.

## What happens when I press Enter

I'm planning a fundamentals post on what happens between typing a command and seeing output. The outline has six stages:

```text
the shell parses the line (words, quotes, variables, globs)
→ it finds the program by searching PATH
→ it forks a child process, and the child execs the program
→ the program makes system calls to the kernel to do its work
→ output goes to stdout, which is my terminal
→ the shell waits for the child to exit, then prints the prompt again
```

I don't want to write this from memory. The plan is to draft one sentence per stage, then check each one with `strace` so the article shows real system calls instead of my guesses.

## Man pages, finally

A man page is the documentation that ships with the system, available offline with `man <command>`.

- Arrow keys or space to scroll, `/word` to search, `n` for the next match, `q` to quit.
- Most pages follow the same shape: NAME, SYNOPSIS, DESCRIPTION, OPTIONS, SEE ALSO.
- Pages come in numbered sections. Section 1 is commands, 2 is system calls, 3 is C library functions, and 5 is file formats. `man 1 printf` (the command) and `man 3 printf` (the C function) are different pages.
- `man -k <keyword>` searches page descriptions when I don't know the command name.

The section numbers connect straight to the Enter article: the commands live in section 1, and the system calls they make live in section 2.

## Who likes AI more?

I wondered whether more educated people are more pro-AI. The answer is messier than I expected.

In Pew's US surveys, college graduates lean a bit more positive about some uses and use AI much more often, but concern outweighs excitement in every major group. On some topics, like privacy, graduates are more skeptical.

The surprising part came from a 2025 study by Tully, Longoni, and Appel: people with **lower** AI literacy tend to be **more** receptive to AI, apparently because AI feels more magical when you don't know how it works.

My own read, which is a hypothesis: the education gap probably has more to do with exposure and stakes (who uses it at work, whose job feels threatened) than with who's "smart."

## Still practising

- Spotting the specific tells instead of a vague bad feeling.
- Verifying systems explanations with real tools before publishing them.
- Using `man` before searching the web.

Source basis: the October 9 recruiter-email, DEV article planning, and AI-attitudes conversations. The Enter article is an outline, and the `strace` verification hasn't happened yet.
