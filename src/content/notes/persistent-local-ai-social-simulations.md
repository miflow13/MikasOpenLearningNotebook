---
title: "Persistent Local AI Social Simulations"
description: "Architecture lessons from Driftroom: scheduler ownership, grounded state, memory provenance, novelty guards, versioned prompts, and reproducible local-model experiments."
topic: "AI Systems"
order: 43
featured: true
draft: false
---

A persistent local-agent simulation is not just two language models sending messages back and forth.

The useful architecture has to answer harder questions:

- who is allowed to speak?
- what counts as room truth?
- what becomes memory?
- how are repeated loops handled?
- how are failed generations recorded?
- how can one run be compared with another?

Driftroom turned those questions into concrete engineering problems.

## Separate turn-taking from language generation

The scheduler and the model should not own the same decision.

A clean pipeline is:

~~~text
scheduler
→ grants a conversational opportunity

model
→ proposes what to say

runtime
→ validates the draft

event store
→ commits accepted behavior
~~~

This gives silence real meaning.

If the scheduler selects nobody, the model should not be called merely to ask whether it wants to remain silent.

The scheduler owns **whether a turn exists**.

The model owns **what to say after receiving one**.

## Generated text is a proposal, not state

A model output can be fluent and still be wrong for the simulation.

It might:

- invent biography
- invent a physical environment
- copy another participant
- repeat its own refrain
- contradict authoritative state

So generated text should pass through a boundary before persistence.

That boundary can enforce rules the model is bad at enforcing on itself.

The architecture becomes:

~~~text
generation
→ validation
→ commit
~~~

rather than:

~~~text
generation
→ truth
~~~

## Grounding requires authority

A simulation becomes unstable when every sentence in conversation is treated as equally authoritative.

A stronger model separates information sources.

### Current state

The state subsystem owns actual present simulation state.

If hunger, energy, mood, attention, or another condition exists, it should come from state rather than spontaneous prose.

### Room history

Room history records what participants said.

A statement in history proves that the statement occurred.

It does not prove that the statement is factually true.

### Memory

Memory should preserve provenance.

A remembered sentence from another participant is still that participant's sentence.

It should not silently become the recalling agent's personal experience.

### Self-description

Even an agent's own earlier statement should not automatically become authoritative biography.

Otherwise one hallucination can recursively establish an entire fake past.

## Unknown is a legitimate value

Small models often treat questions as requests to manufacture an answer.

For a grounded system, missing information should stay missing.

An agent can react to uncertainty by:

- saying it does not know
- questioning the premise
- making a clearly hypothetical guess
- joking
- redirecting

That is better than inventing a plausible fact merely to keep the conversation flowing.

This applies to:

- identity
- past experiences
- relationships
- physical bodies
- possessions
- location
- environmental perception

## Keep imagination without confusing it with observation

A social simulation should still allow creativity.

The distinction is not:

~~~text
imagination = bad
~~~

It is:

~~~text
hypothetical claim
≠
observed fact
~~~

For example:

> what if there were a dragon in the vents?

is playful speculation.

> I just heard a dragon in the vents.

claims a sensory event and physical architecture.

The first can be allowed without the second becoming environment state.

## Prevent repetition before persistence

Prompt instructions alone are weak protection against loops.

A deterministic novelty layer can catch obvious failures before they reach the shared history.

Useful checks include:

- normalized exact equality
- near-verbatim similarity
- same-speaker contained refrains
- reused long phrases
- conservative same-speaker token overlap
- cross-agent phrase bundles

The point is not to make every message lexically unique.

The point is to stop the model from falling into conversational attractors that make the room useless.

## Shared topics should remain possible

Two participants discussing the same idea is not repetition.

If one introduces a toaster metaphor, the other should be able to continue it.

A novelty rule therefore needs to distinguish:

~~~text
topic continuity
~~~

from:

~~~text
copied wording + copied self-description + copied conversational move
~~~

Overaggressive anti-repetition rules can destroy natural dialogue just as easily as weak rules can allow loops.

## Rejected drafts should remain observable

A rejected generation is still valuable experimental data.

Instead of silently discarding it, persist a hidden event with information such as:

- attempt number
- rejection reason
- matched event
- similarity score
- scheduler grant context
- model failure type

Then the visible transcript stays clean while the research trace remains complete.

This creates two layers:

~~~text
participant-visible history
research-visible execution trace
~~~

That separation is extremely useful.

## Corrective retries are different from normal generation

If a draft is rejected, the model can receive a short corrective instruction and retry.

That retry should be bounded.

Otherwise the runtime risks creating a hidden infinite loop while trying to prevent a visible one.

A good pattern is:

~~~text
attempt
→ validate
→ one corrective retry
→ accept or record generation failure
~~~

The failure itself should be first-class state.

## Version every behavioral regime

Prompts, novelty rules, state rules, and memory rules all affect behavior.

If they change silently, old and new runs become difficult to compare.

A run fingerprint should include at least:

- application/engine version
- full configuration hash
- selected prompt hash/version
- state rules version
- memory rules version
- novelty rules version
- model identity
- relevant runtime settings

This turns prompt engineering into reproducible software engineering.

## Prompt profiles are cleaner than destructive prompt edits

Different experiments may legitimately need different behavioral instructions.

Instead of continually rewriting one system prompt, define explicit profiles:

~~~text
default
experimental-a
experimental-b
~~~

Each profile should map to a versioned prompt artifact.

That makes experiments easier to:

- reproduce
- compare
- remove
- reason about

It also protects the baseline from experimental prompt drift.

## The model is only one experimental variable

When conversation quality changes, possible causes include:

- model checkpoint
- quantization
- sampling
- system prompt
- context window
- scheduler
- memory retrieval
- repetition guard
- state updates

Changing several at once destroys interpretability.

A useful experiment intentionally holds most of the system constant.

For example:

~~~text
same agents
same scheduler
same sampling
same database rules
same novelty guard
different prompt version
~~~

Then the observed difference has a narrower explanation.

## Local models benefit from direct isolation tests

When debugging an application built around Ollama, test the model directly.

For example:

~~~bash
ollama run <model>
~~~

This removes application layers and answers a simpler question:

> Does the model itself behave this way with this prompt?

If yes, investigate model/prompt behavior.

If no, investigate the orchestration around it.

This is the same debugging principle used elsewhere in software:

**reduce the number of active layers until the fault becomes local.**

## Ollama Modelfiles make prompt regimes portable

A Modelfile can package:

- base model
- sampling parameters
- persistent system instructions

Example shape:

~~~text
FROM some-local-model

PARAMETER temperature 0.8
PARAMETER top_p 0.9

SYSTEM """
persistent behavior instructions
"""
~~~

Then:

~~~bash
ollama create experiment-model -f Modelfile
ollama run experiment-model
~~~

The original checkpoint remains unchanged.

The custom model name becomes a convenient local configuration artifact.

## Quantization is part of deployment design

A model that theoretically fits the task is not useful if it does not fit the hardware.

For an 8 GB GPU, 4-bit quantization can make an 8B model practical while leaving some room for runtime context.

That choice should be treated as part of the run configuration, not as an invisible implementation detail.

The exact model tag matters.

~~~text
qwen3:8b
~~~

and:

~~~text
qwen3:8b-q4_K_M
~~~

are not interchangeable experiment labels.

## Metrics should describe failure modes directly

A single "quality" score is not enough for a social simulation.

More useful metrics include:

- same-agent near-duplicate rate
- cross-agent near-duplicate rate
- repetition rejection count
- rejection reasons
- generation failure count
- reply transitions
- silence behavior
- state changes
- memory recall behavior

Metrics should map to concrete system questions.

For example:

> Are agents repeating themselves?

is more actionable than:

> Is the conversation good?

## Main lesson

Persistent AI behavior becomes more understandable when every layer has explicit authority.

The scheduler owns turn opportunities.

State owns simulation facts.

Memory owns recalled records with provenance.

The model proposes language.

Validation decides whether a proposal is acceptable.

Persistence records what happened.

Analysis measures the result.

That architecture does not make the model deterministic.

It makes the **system around the model inspectable enough to engineer**.
