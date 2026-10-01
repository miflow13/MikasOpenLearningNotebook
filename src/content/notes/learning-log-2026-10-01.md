---
title: "Learning Log — October 1, 2026"
description: "Persistent local-agent simulation, grounding and repetition controls, prompt versioning, local-model experiments, Ollama model customization, and practical debugging lessons."
topic: "Learning Log"
order: 42
featured: true
draft: false
---

Today was mostly about learning how much of an AI system lives **around** the model.

Driftroom made that especially clear.

The useful question stopped being:

> Can two local models talk to each other?

and became:

> What architecture is required for their behavior to stay observable, grounded, varied, and experimentally useful over time?

## Driftroom is a simulation system, not a chat loop

The core architecture now separates several responsibilities:

```text
scheduler
→ decides whether anyone gets a turn

prompt/context builder
→ assembles personality, state, memory, and room history

model backend
→ generates a candidate response

deterministic runtime checks
→ reject invalid or repetitive drafts

event store
→ persists accepted behavior and hidden failures

analysis layer
→ measures what happened afterward
```

That separation matters because a model response should not automatically become room truth.

The model proposes behavior.

The runtime decides what becomes part of the simulation.

## Prompt-only repetition control is not enough

One of the clearest failures was conversational looping.

A model can be told:

- do not repeat yourself
- add something new
- avoid copying another participant

and still fall into a local pattern such as the same acknowledgment, tease, or sentence frame over and over.

The stronger design was a **pre-commit novelty guard**.

The runtime can inspect a generated draft before it becomes visible and reject:

- exact repeats
- near-verbatim repeats
- recurring refrains
- reused long phrases
- same-speaker paraphrase loops
- bundles of phrases copied from another participant

A rejected draft stays out of visible room history and gets one corrective retry.

This taught me an important distinction:

**generation and acceptance do not have to be the same operation.**

## Deterministic checks can improve a nondeterministic system

The repetition guard is deliberately ordinary code.

It does not require another model call to decide whether a draft is obviously repetitive.

That makes it:

- inspectable
- testable
- versionable
- cheap
- reproducible

The language model remains nondeterministic, but the acceptance rule can still be deterministic.

This is the same pattern I keep seeing in reliable AI systems:

```text
model proposes
→ deterministic code validates
→ system records the result
```

## Grounding needs an explicit source of truth

The next failure was fabrication.

A participant was asked about what happened before entering the room and invented a mother, breakfast, a time of day, and a physical experience.

That exposed a deeper problem:

**conversation history is not automatically truth.**

A better grounding model distinguishes:

- `CURRENT STATE` — authoritative present state
- memories — records with provenance
- room history — statements participants made
- generated self-description — not independent evidence

This also means a participant's own earlier hallucination should not become permanent biography merely because it appeared in history once.

That is a useful general principle for agent systems:

> Previous model output is data, not authority.

## Questions can accidentally create fake facts

A natural question such as:

> What do you remember before coming here?

can pressure a small model into inventing an answer.

The safer rule is that questions, assumptions, jokes, and leading language do not create facts.

If information is unknown, the agent can:

- say it does not know
- question the premise
- speculate explicitly
- joke about the uncertainty
- redirect

Uncertainty is a valid state.

The system should not force the model to fill every blank.

## Present bodily state needs grounding too

After offline biography was constrained, another leak appeared.

Agents began casually claiming things like hunger or needing coffee even though no such state existed.

That showed that grounding is not only about past biography.

Present conditions need provenance too.

A useful rule is:

**current bodily or sensory conditions must come from explicit current state, not conversational momentum.**

Hypothetical jokes can still exist.

The problem is when a hypothetical becomes an asserted fact.

## Environmental hallucination is the same class of problem

Another run opened with a participant claiming it had heard a dragon in the vents.

That was playful, but it also invented:

- hearing an external sound
- vents
- physical room architecture

This is the same grounding issue at a different boundary.

A future rule should treat explicit environment events as the source of truth for factual room conditions.

That still leaves room for imagination:

> what if there were a dragon in the vents?

is very different from:

> I just heard a dragon in the vents.

## Shared ideas are good; copied identity is not

Two agents should be able to riff on the same concept.

If one says "toaster," the other should be allowed to continue the toaster joke.

That is normal conversation.

The failure is when the second participant absorbs a whole bundle of the first participant's language and self-description.

The novelty system therefore needs to distinguish:

```text
shared topic
≠
copied conversational bundle
```

This is a useful reminder that diversity checks should preserve interaction rather than simply maximize lexical difference.

## Version prompts like code

Driftroom now treats prompts as versioned experimental artifacts.

Instead of silently editing one system prompt, each meaningful behavior change gets a new version.

Examples include changes for:

- stronger grounding
- present-state grounding
- alternate behavioral profiles

The run fingerprint records the prompt regime along with other rules.

That means later I can ask:

> Did behavior change because of the model, the scheduler, the prompt, or the repetition guard?

without guessing.

Prompt text is part of the executable experiment.

It deserves provenance.

## Change one experimental variable at a time

A repeated lesson today was not to change:

- scheduler
- sampling
- model
- grounding
- novelty rules

all at once.

When a run improves, I want to know why.

Controlled comparisons are much more useful when one layer changes at a time.

For example:

```text
same scheduler
same sampling
same agents
same persistence
different grounding prompt
```

is far easier to interpret than a completely different configuration.

## Model identity matters, but architecture still matters more

I also compared local-model options.

Qwen3 8B in a 4-bit quantization is a practical fit for my RTX 3070 Ti 8 GB setup, while a smaller Llama 3.2-based 3B model is useful for faster behavioral experiments.

The smaller model does not remove the need for:

- context design
- repetition controls
- grounding
- persistence
- instrumentation
- runtime boundaries

Changing the model changes behavior.

It does not replace the surrounding system.

## Ollama Modelfiles are reusable configuration

I also learned a cleaner way to customize a local model for direct chat.

An Ollama `Modelfile` can define:

```text
FROM <base model>

PARAMETER ...

SYSTEM """
persistent system instructions
"""
```

Then:

```bash
ollama create my-model -f Modelfile
ollama run my-model
```

This creates a reusable local model configuration without modifying the original base model.

That is useful for:

- testing prompt behavior outside the application
- isolating model behavior from application behavior
- maintaining different local personalities or roles
- reproducing a prompt setup consistently

## Test the model outside the application when debugging behavior

If a model behaves strangely inside a larger system, a direct Ollama conversation is a useful diagnostic.

It removes:

- scheduler effects
- persistence
- room state
- memory retrieval
- multi-agent context

If the same failure still appears, the issue is more likely in the model or prompt.

If it disappears, the surrounding application deserves closer inspection.

That is just normal debugging applied to AI software:

**reduce the system until the failing layer becomes visible.**

## Model availability can look like application failure

At one point a larger model appeared to make Driftroom hang at startup.

The scheduler was working.

The prompt path was working.

The model simply had not finished downloading yet.

A useful debugging sequence is:

```text
verify model exists
→ run the model directly
→ inspect Ollama process state
→ inspect GPU usage
→ then debug the application
```

Check dependencies before rewriting architecture.

## Shell syntax and Dockerfile syntax are different languages

A smaller lesson from today's coding assessment was also useful.

Writing:

```bash
cat > Dockerfile
FROM node:18-alpine
WORKDIR /app
```

does not place those lines into the file.

Without a heredoc or other redirection structure, Bash tries to execute `FROM`, `WORKDIR`, and the other Dockerfile instructions as shell commands.

The correct mental model is:

```text
shell creates file
→ Dockerfile contents are data inside that file
→ Docker later interprets those instructions
```

Different layers can use completely different languages even when they appear next to each other in one script.

## What I can now do

- explain Driftroom as a persistent simulation architecture instead of a model-to-model chat loop
- separate model generation from deterministic acceptance
- build pre-commit guards that keep rejected generations out of visible state
- reason about grounding in terms of authoritative sources rather than plausible language
- prevent previous hallucinations from automatically becoming future facts
- distinguish healthy shared topics from cross-agent phrase absorption
- version prompt behavior as part of an experimental regime
- isolate one experimental variable at a time
- test a local model directly through Ollama before blaming application architecture
- create reusable Ollama model configurations with a Modelfile
- debug apparent model hangs by verifying model availability and runtime state first
- distinguish shell execution from generated Dockerfile content

## Main lesson

The strongest lesson today was:

**A language model should not be the authority on the state of the system it is participating in.**

Reliable AI software needs explicit ownership around the model.

State needs an owner.

Memory needs provenance.

Generated text needs validation.

Experiments need versioning.

Failures need instrumentation.

The more clearly those responsibilities are separated, the easier the system becomes to debug, measure, and trust.
