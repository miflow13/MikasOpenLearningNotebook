---
title: "Learning Log — October 9, 2026"
description: "What happens between pressing Enter and seeing output, man pages, and a surprising finding about who likes AI."
topic: "Learning Log"
order: 53
featured: true
draft: false
---

Today was shorter on building and longer on understanding things I use every day without thinking about them.

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

- Verifying systems explanations with real tools before publishing them.
- Using `man` before searching the web.

Source basis: the October 9 DEV article planning and AI-attitudes conversations. The Enter article is an outline, and the `strace` verification hasn't happened yet.
