---
title: "Technical Documentation: Verify the Product, Not the Old Tutorial"
description: "How a hands-on Sinch RCS walkthrough changed the way I think about researching and writing product documentation."
topic: "Technical Writing"
order: 31
featured: false
draft: false
---

## Documentation starts with the real product

While researching a Sinch RCS tutorial, I found that existing descriptions of the UI no longer matched the current product.

The actual path I observed was:

**RCS → Set up RCS Agent**

rather than an older flow that assumed an intermediate Agents page.

This is a simple example of documentation drift.

## UI documentation is evidence-sensitive

For a procedural tutorial, I should distinguish between:

- what another document says
- what I expect the product to do
- what I personally verified in the current UI

The third category is the strongest evidence for a current step-by-step guide.

## Research one screen at a time

The workflow that worked best was:

1. open the current product
2. capture the current screen
3. record only what is visible/confirmed
4. continue to the next step
5. stop the draft where verification stops

At one point the working tutorial deliberately contained a marker saying that research stopped before the next screen. That is better than filling the gap with plausible but unverified steps.

## The live flow changed the outline

The observed wizard used:

**Agent appearance → Agent configuration → Summary**

and post-creation work included country selection, verification details, and contact information.

That changed the tutorial itself. Research did not merely fill in an existing outline; it corrected the mental model of the product.

## Screenshots are source material

When documenting a UI that changes frequently, screenshots are useful because they preserve labels, field names, button text, ordering, surrounding context, and the state of the product at a specific time.

They should support the written explanation rather than replace it.

## Time-sensitive facts need dates/context

Pricing, review times, eligibility, and approval processes can change.

If I include those facts, I should make clear that they are observations from a particular time and should be rechecked before publishing.

## Main lesson

Good technical writing is not making an old guide sound cleaner.

It is **re-validating the user's path through the real product** and refusing to invent the parts I have not confirmed.
