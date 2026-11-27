---
status: accepted
date: 2026-11-26
decision-makers: Project owner (Solution Architect)
---

# Document the schema format in a spec file, and defer a published JSON Schema

## Context and Problem Statement

Schema authors and later stories need a reference for the format. How should
the format be documented?

## Decision Drivers

* One readable reference for every property, type and rule.
* Kept next to the code that implements it.

## Considered Options

* A spec file (`docs/schema-format.md`) plus code comments
* Code comments only
* A spec file plus a generated JSON Schema for editor autocompletion

## Decision Outcome

Chosen option: "A spec file plus code comments", because it gives authors one
readable reference, and the code points to it.

* `docs/schema-format.md` specifies every property, field type, naming rule,
  label rule and validation behaviour, with an example.
* The example schema is `schemas/vendor.json`.
* Publishing a generated JSON Schema for editor autocompletion is deferred. Zod
  can generate one when it is needed.

### Consequences

* Good, because the format is documented in one place.
* Bad, because the spec must be updated by hand when the format changes (noted
  in `CLAUDE.md`).

## Pros and Cons of the Options

### Spec file plus code comments

* Good, because readable by non-developers.
* Bad, because it can drift from the code.

### Code comments only

* Good, because always next to the code.
* Bad, because harder for schema authors to read.

### Spec file plus generated JSON Schema

* Good, because editors can autocomplete and check schema files.
* Bad, because more to build and keep in sync now, with no story needing it.

## More Information

Decided in the V1-03 design proposal, decision D8. The "code comments only"
option was added when writing this ADR, for context.
