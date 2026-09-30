---
title: "Learning Log — September 29, 2026"
description: "Empirical AI-code research, controlled model benchmarking, realistic local AI architecture, evidence-bound decisions, technical-writing positioning, and community judgment."
topic: "Learning Log"
order: 39
featured: true
draft: false
---

Today was less about shipping one feature and more about learning how to **make stronger claims**.

A lot of the day connected around the same question:

**What evidence would actually justify this conclusion?**

That showed up in AI-code research, model comparisons, local-AI design, moderation, technical writing, and even the job search.

## The Project Zomboid research needs methodology, not a detector

The biggest research shift was moving away from trying to identify "AI-looking" code and toward studying projects whose authors actually disclosed AI assistance.

That changes the question completely.

Instead of:

**Can I detect AI code?**

the more useful question is:

**What does explicitly AI-assisted code look like in practice, and how do review, testing, understanding, and maintenance affect the outcome?**

That is much more defensible.

## Provenance before conclusions

For every case study, I want to preserve the exact disclosure and then reconstruct what the software actually does.

The protocol is becoming:

1. preserve provenance
2. reconstruct the architecture
3. inspect concrete code qualities
4. run targeted runtime tests
5. trace failures mechanically
6. reconstruct maintenance history
7. compare before/after versions when possible

A confirmed AI-assisted project does not mean every bug was caused by AI.

The failure still needs a technical explanation.

## Sampling can be smarter than downloading everything

I rejected the idea of downloading all 64,908 Workshop items.

A staged study is stronger and much cheaper:

- analyze the roughly 87 confirmed AI-code cases
- draw a year-stratified pilot from the broader Workshop population
- detect which items actually contain source code
- estimate prevalence and uncertainty
- scale only if the result needs more data

This is one of those lessons that feels obvious after seeing it:

**more data is not automatically better research.**

## The same evidence rule applies to moderation

Becoming a trusted DEV member/moderator also made the research ethics feel less abstract.

If a post looks low quality, I should judge the observable quality, duplication, marketing behavior, or policy issue.

I should not jump from "this feels generated" to an authorship claim.

Moderation and research both get better when I separate observation from attribution.

## A small benchmark still needs controls

I also designed a quick comparison of three models at low and high reasoning.

The important part was not making it huge.

It was making it controlled.

The plan became:

**5 prompts × 3 models × 2 reasoning levels = 30 responses**

with:

- fresh chats
- exact unchanged prompts
- first response only
- no tools or follow-ups
- predefined scoring
- blind evaluation
- exact model/settings recorded

The main question is within-model:

**Does higher reasoning improve this model on this task?**

That is better than treating every provider's "reasoning" setting as equivalent.

## Benchmarks are narrower than products

Another useful correction: a model matching another model on selected benchmark questions does not make the products equivalent.

Results depend on:

- model version
- quantization
- prompt format
- reasoning regime
- tool access
- context limits
- the application around the model

That matters a lot when talking about small local models.

## Local AI works better as a system than as a miracle model

The local-AI proposal became much more realistic once I stopped requiring one tiny model to perform every task at frontier level.

A useful offline assistant can combine:

- a small quantized model
- local retrieval
- deterministic tools
- extractive summarization
- templates
- hardware-aware fallback tiers

The product should degrade honestly on weak hardware instead of silently becoming useless or depending on a cloud fallback.

## Do not fine-tune before I know the failure

Another local-model lesson:

**ship and measure the base checkpoint first.**

Only fine-tune after I can identify repeated failures that are actually training problems.

A weak retrieval strategy, bad prompt, missing tool, or runtime limit should not automatically become a fine-tuning project.

## Retrieval is not truth

Citations are valuable because they establish provenance.

They do not automatically prove that the generated sentence follows from the cited text.

I need to keep separate ideas separate:

**retrieval recall**
**source provenance**
**claim entailment**

They are related, but they are not the same metric.

## Full-document tasks need full-document coverage

Top-k retrieval is useful for question answering.

It is not enough for a true full-document summary.

If the job is to summarize the entire document, every chunk has to participate somehow.

The retrieval strategy has to match the actual user task.

## AI decisions should expire when their evidence does

The ASTER architecture gave me another model I want to keep.

A recommendation should be attached to:

- evidence
- assumptions
- uncertainty
- permissions
- tests
- invalidation conditions

That means an AI answer can be treated as a living decision rather than a timeless fact.

The model can propose.

A deterministic system should recheck state and permissions before the real-world action happens.

## Technical writing and software engineering keep converging

Today's resume work made my career story clearer.

My strongest technical-writing evidence is not that I can make technical prose sound polished.

It is that I can:

- inspect the implementation
- reproduce a workflow
- validate prerequisites
- test requests and commands
- document expected results
- troubleshoot failures
- turn all of that into a task-focused explanation

That is also software-engineering behavior.

The overlap between the two paths is becoming a strength rather than something I need to hide.

## The job-search funnel is not a clean signal

A separate systems lesson came from job applications.

Candidate sourcing, invitation automation, screening, and rejection can be separate systems with weak coordination.

Someone can be proactively invited and then rejected almost immediately by another layer of the pipeline.

That does not tell me nothing, but it means I should be careful about interpreting every automated outcome as a precise assessment of my ability.

## Community trust is career evidence too

Being made a trusted member/moderator on DEV is different from a follower number.

It means the community gave me some responsibility for judgment.

That is useful evidence for the kind of role I am growing into:

- technical communication
- community participation
- judgment
- moderation
- software discussion
- explaining difficult topics without flattening them

## What I can now do

- design a staged empirical study instead of defaulting to exhaustive collection
- separate provenance, correlation, implementation quality, runtime behavior, and causation
- create a controlled small-model benchmark with predefined scoring
- explain why reasoning controls are not directly equivalent across providers
- design a local AI stack around capability tiers instead of one impossible model target
- distinguish retrieval provenance from claim correctness
- recognize when a task needs complete-document coverage rather than top-k retrieval
- model recommendations as decisions with evidence and invalidation conditions
- describe my technical-writing experience through reproducible implementation work
- evaluate questionable content without making unsupported authorship claims

## Main lesson

A surprising amount of engineering maturity is learning to say:

**I have enough evidence to claim this.**

or:

**I do not have enough evidence yet.**

That boundary matters in research, benchmarking, documentation, moderation, architecture, and career decisions.

The better I get at protecting it, the more trustworthy my work becomes.
