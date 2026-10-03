---
title: "Learning Log — October 3, 2026"
description: "Python Codewars practice: reading requirements, list filtering, return values, loops, Boolean counting, conditionals, linear relationships, and century boundaries."
topic: "Learning Log"
order: 45
featured: true
draft: false
---

I've been doing Codewars challenges in Python. This log collects the practice from the current conversation; it does not claim that every challenge was completed today or that every solution passed the platform tests.

The biggest friction was often translating the wording into a small rule, then getting Python's structure right.

## Read the task as input → rule → output

A wordy challenge becomes easier when I identify:

1. What values does the function receive?
2. What should change or be calculated?
3. What must remain unchanged?
4. What must the function return?

Work one small example by hand before writing code. Start with a straightforward solution, not a clever one.

## Array difference means filtering, not deduplicating

For `array_diff(a, b)`, remove every item in `a` whose value occurs in `b`. Preserve order and keep duplicates of values that are not removed.

For `[1, 2, 1, 3, 2, 4]` minus `[1, 4]`, I initially missed the second surviving `2`. The result is `[2, 3, 2]`.

For `[5, 5, 6]` minus `[6]`, I correctly identified that both `5`s remain: `[5, 5]`.

I wrote a loop and observed `1 2 2 3` being printed. That demonstrated iteration, not a finished list-returning implementation. The next concept was checking `item not in b`, collecting retained items, and returning the collection.

## Printing is not returning

`print()` displays something. `return` gives a value back to the caller and exits the function.

The `greet` task asks for the exact string `"hello world!"` as a return value. `double_integer` asks for twice the input, not a printed number.

Those solutions were discussed, but I did not provide a verified independent implementation for them in this conversation.

## A linear relationship needs both a rate and an anchor

For the pole-vaulter starting mark, I independently wrote:

```python
distance_change = 10.67 - 9.45
height_change = 1.83 - 1.52
```

I calculated the rate as approximately `3.9354838709677433` meters of starting-distance change per meter of height change.

The anchor form we worked through was:

```python
9.45 + (height - 1.52) * rate
```

The subtraction measures height relative to the known reference point. Multiplying height directly by the rate would omit the offset.

I ran a scaffold that still contained `___` and got a `NameError`. A placeholder is not special Python syntax: Python treats it as a name, and it must be replaced with an expression. The completed formula was supplied with assistance; a final passing result was not reported.

## Counting sheep combines a counter, a condition, and a loop

I attempted a counter starting at zero and a loop over the sheep list.

The repairs were:

- Python uses `True`, not `true`.
- An `if` line needs a colon.
- The increment belongs inside the condition.
- The final return belongs after the loop, still inside the function.

`item is True` counts actual Boolean `True` values and ignores `False` and `None`. JavaScript's `null` and `undefined` wording does not introduce those names into Python.

The corrected implementation was provided with assistance. No platform pass was reported.

## BMI practises ordered thresholds and early returns

I wrote the calculation `weight / (height ** 2)` but needed help with conditional syntax and indentation.

The categories use inclusive upper limits: `18.5`, `25.0`, and `30.0`, followed by the remaining obese case.

An early `return` stops the function, so later checks only handle values that did not match earlier categories. Boundary values are important tests, not incidental examples.

## Centuries have a boundary case every hundred years

I correctly worked out that `1705 // 100` is `17` and `1705 % 100` is `5`.

The rule is:

- remainder zero: return `year // 100`;
- otherwise: return `year // 100 + 1`.

My attempted function added one in the zero-remainder case and had no return for other years. That would make `1900` return `20` and `1705` return `None`.

The correction reinforced both boundary reasoning and the fact that a function reaching its end without a return produces `None`.

## What the evidence supports

I demonstrated some arithmetic, quotient/remainder reasoning, tracing duplicates, and loop execution. I also made real attempts at counters and conditional functions.

Syntax repairs and several complete solutions came from assistance. Those are learning references, not proof of independent mastery. I have not recorded Codewars ranks, completed-kata counts, or test passes without evidence.

## Next practice

Rebuild one function from a blank file, predict two normal cases and one boundary case, then run it. Focus on getting the structure right before shortening it.

The reusable patterns and worked references are collected in [Python Codewars Fundamentals](/MikasOpenLearningNotebook/notes/python-codewars-fundamentals/).
