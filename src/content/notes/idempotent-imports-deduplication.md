---
title: "Idempotent Imports & Duplicate-Safe Data Pipelines"
description: "Lessons from importing inventory-like data repeatedly without creating duplicates or corrupting partially repaired records."
topic: "Software Engineering"
order: 22
featured: false
draft: false
---

## Re-importing the same file should be boring

A useful import system should be safe to run more than once.

If importing the same manifest twice creates two copies of every item, the importer is not really complete.

The stronger goal is **idempotency**:

~~~text
import(data)
import(data)
import(data)

→ same final state
~~~

Repeated execution should not multiply records just because the user retried an upload.

## Stable identity matters more than display text

A record needs a reliable identity.

For inventory-like data, a useful key may come from something such as:

~~~text
normalized manufacturer + normalized model number
~~~

Display names are weak identifiers because formatting can change:

~~~text
Whirlpool WSZ57L18DM
Whirlpool - WSZ57L18DM
WHIRLPOOL WSZ57L18DM
~~~

Those may represent the same real item.

## Normalize before comparison

Before deciding whether a record already exists, normalize the values used for identity.

Possible normalization steps:

- trim whitespace
- normalize case
- collapse repeated spaces
- standardize punctuation
- remove formatting-only differences
- preserve the original human-readable value separately

Example:

~~~text
" WSZ57L18DM "
→ trim
→ "WSZ57L18DM"
→ canonical comparison key
~~~

Normalization should make comparison predictable without destroying the source data.

## Insert vs update vs ignore must be explicit

An importer should have a policy.

For each incoming record:

~~~text
not found
→ create

found and source contains newer/corrected fields
→ update

found and nothing meaningful changed
→ leave unchanged
~~~

This is much safer than blindly inserting every parsed row.

## "Duplicate" does not always mean identical

Two rows can share the same model while representing multiple physical units.

That means the system must distinguish:

~~~text
product identity
vs
inventory quantity
vs
individual serialized unit
~~~

If one row says:

~~~text
Model ABC · 1 unit
~~~

and a later manifest says:

~~~text
Model ABC · 3 units
~~~

the correct action might be updating quantity rather than creating three unrelated product records.

The data model decides what duplicate handling means.

## Partial records need repair rules

Imports are often messy.

A record may exist but be incomplete:

~~~text
model exists
price missing
image missing
repair status incomplete
~~~

The importer should not treat "record exists" as the same thing as "record is healthy."

A useful distinction is:

~~~text
identity match
→ inspect completeness
→ repair/update missing fields
→ preserve valid existing fields
~~~

## Validation belongs before persistence

Parsing and saving should be separate stages.

~~~text
raw file
→ parse
→ normalize
→ validate
→ reconcile with existing data
→ persist
~~~

This makes it possible to reject bad input before it reaches the database.

It also makes each stage easier to test.

## Import results should explain themselves

A useful import summary can report:

~~~text
24 parsed
18 unchanged
3 updated
2 created
1 rejected
~~~

That gives the user confidence and gives me evidence when something looks wrong.

## Main lesson

Importing data is not just "read rows and save them."

A reliable importer needs stable identity, normalization, validation, reconciliation, and a clear policy for repeated input.

## Next time

Before building an importer, define:

~~~text
canonical identity:
normalization rules:
duplicate policy:
quantity semantics:
update policy:
required fields:
repair behavior:
import summary:
~~~

If those rules are vague, duplicate bugs are almost guaranteed.
