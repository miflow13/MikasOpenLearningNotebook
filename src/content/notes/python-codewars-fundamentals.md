---
title: "Python Codewars Fundamentals"
description: "Worked references for filtering, counters, return values, indentation, thresholds, linear formulas, and integer boundaries, with a small problem-solving checklist."
topic: "Python"
order: 46
featured: false
draft: false
---

These are worked reference solutions from assisted practice, not a record of independently completed katas.

## The small problem-solving loop

Translate the task into an input, a rule, and an output. Trace an example manually. Write the simplest function. Predict the result before running it. Check a boundary or empty case.

## Function structure

```python
def count_sheeps(sheep):
    count = 0
    for item in sheep:
        if item is True:
            count += 1
    return count
```

Indentation defines ownership: the increment belongs to the condition, the condition belongs to the loop, and the final return belongs to the function but not the loop.

`def`, `for`, and `if` headers end with colons. Boolean literals are `True` and `False`; a missing value can be `None`.

Returning inside this loop would stop after the first item. Forgetting the final return would produce `None`. Printing the counter would display it but would not return it.

## Filter into a result list

```python
def array_diff(a, b):
    result = []
    for item in a:
        if item not in b:
            result.append(item)
    return result
```

This preserves order and duplicates of retained values. It removes all occurrences of values found in `b`; it does not subtract only one occurrence or turn the output into a set.

Check an empty `a`, an empty `b`, repeated removed values, and repeated retained values.

## Return exactly what was requested

```python
def greet():
    return "hello world!"


def double_integer(i):
    return i * 2
```

Case, punctuation, and the requested output type matter. `pass` is a placeholder that does no work.

## Calculate, then classify

```python
def bmi(weight, height):
    value = weight / (height ** 2)
    if value <= 18.5:
        return "Underweight"
    if value <= 25.0:
        return "Normal"
    if value <= 30.0:
        return "Overweight"
    return "Obese"
```

This is the kata's classification rule, not personal health guidance. `** 2` squares the height. Early returns make the ordered thresholds work. Test exactly at each threshold and immediately above it.

## Use a known point for a linear formula

```python
def starting_mark(height):
    rate = (10.67 - 9.45) / (1.83 - 1.52)
    return 9.45 + (height - 1.52) * rate
```

The rate is output change divided by input change. The known point supplies the offset. Check both supplied reference heights; this task accepts a tolerance of `0.01`.

## Handle exact multiples separately

```python
def century(year):
    if year % 100 == 0:
        return year // 100
    return year // 100 + 1
```

`//` gives integer floor division; `%` gives the remainder. For the positive years in this task, a century ends at an exact multiple of 100.

Useful checks: `1 → 1`, `100 → 1`, `101 → 2`, `1705 → 18`, `1900 → 19`, `1901 → 20`, and `2000 → 20`.

## Read errors literally

A `NameError` means a name was used without being defined. A scaffold such as `___` must be replaced; it is not an instruction Python understands.

Before asking for a fix, inspect the named line and predict what the program was trying to look up.

## Still practising

The next step is to recreate these patterns without looking, explain why the return is placed where it is, and run predicted test cases. Seeing a correct solution is useful exposure; writing and checking one independently is stronger evidence.
