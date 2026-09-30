---
title: "Empirical Software Research: Provenance Before Conclusions"
description: "How to study AI-assisted code without confusing disclosure, code quality, runtime behavior, and causation."
topic: "Software Engineering"
order: 36
featured: false
draft: false
---

## Start with a question I can actually measure

The useful question in the Project Zomboid mod research is not:

**Is AI code bad?**

That question is too broad and too loaded.

A better research target is something observable:

**What happens when AI-assisted code is shipped with different levels of review, testing, understanding, and maintenance?**

That keeps the study focused on engineering practice instead of the culture war around AI.

## Provenance comes before classification

If I want to study explicitly AI-assisted or "vibe-coded" projects, I should preserve the actual disclosure rather than infer authorship from code style.

Useful provenance includes:

- the exact author statement
- where and when it was posted
- whether AI created, transformed, or merely advised on the implementation
- version and release context
- repository or Workshop artifact being studied

This matters because "AI-assisted" can describe very different workflows.

## Do not treat patterns as fingerprints

A suspicious comment style, duplicated logic, odd abstraction, or generic naming pattern is not proof that AI created the code.

Those observations can become hypotheses.

They should not become authorship claims.

The safer chain is:

**disclosure → implementation → runtime behavior → maintenance history**

not:

**code smell → guess the authoring method**

## Reconstruct the system before judging it

A useful case study should trace the implementation from entry point to user-visible result.

For a mod, that can look like:

**entry point → event hooks → state → game API → visible behavior**

Only after I understand that path can I make a meaningful claim about whether the code is coherent, fragile, redundant, or well designed.

## Runtime failures need mechanical explanations

If something breaks, the research should explain the failure mechanism.

For example:

- wrong lifecycle assumption
- stale state
- invalid API use
- race or ordering problem
- duplicated registration
- missing guard
- incompatible game-version change

"AI caused it" is not a mechanism.

Even in a confirmed AI-assisted project, causation still has to be demonstrated.

## Sampling beats brute force

Downloading tens of thousands of Workshop items would create huge storage and analysis costs without automatically improving the study.

A better staged design is:

1. start with the confirmed AI-disclosure cohort
2. draw a smaller year-stratified pilot from the broader population
3. inventory file trees and detect code-bearing artifacts
4. estimate prevalence and uncertainty
5. scale only if the pilot shows that more data is necessary

This is a general research lesson:

> Collect enough data to answer the question, not the maximum amount of data I can technically acquire.

## Preserve cheap evidence, discard expensive payloads

A reversible acquisition pipeline can keep useful metadata while avoiding permanent local storage of every downloaded project.

For each item:

**download → inventory → detect source → hash/measure → persist metadata → delete payload**

Retain complete source only for the cohorts that actually need deep analysis.

## Before-and-after cases are unusually valuable

When an original human-written version and an AI-assisted port or rewrite both exist, the comparison is stronger because many outside variables are naturally controlled.

I can inspect:

- what changed
- what stayed stable
- what broke
- what improved
- what maintenance followed

That is stronger evidence than comparing two unrelated projects and attributing every difference to AI.

## Moderation and research share the same rule

As a moderator, I should judge observable quality and policy-relevant behavior rather than speculate about whether a post was AI-generated.

The same principle applies to research.

**Evidence first. Attribution only when supported.**

## Main lesson

Good software research separates:

- provenance
- implementation quality
- runtime behavior
- maintenance
- authoring workflow
- causation

The more emotionally charged the topic is, the more disciplined the methodology has to be.
