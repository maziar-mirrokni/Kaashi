---
status: accepted
date: 2026-11-26
decision-makers: Project owner (Solution Architect)
---

# Report every schema problem at once, with its location

## Context and Problem Statement

Schema authors (by hand now, through the schema editor later) need to fix
invalid schemas quickly. How should the loader report problems?

## Decision Drivers

* Fix all problems in one pass rather than one per run.
* Each message must say where the problem is and what is expected.
* File-level problems (missing file, invalid JSON) must be as clear.

## Considered Options

* Report every problem, each with its path
* Stop at the first problem

## Decision Outcome

Chosen option: "Report every problem, each with its path", because it lets
an author fix a schema in one pass.

* The loader throws a `SchemaError` with the file, a list of issues (path and
  message) and a readable message, for example:

  ```
  Invalid schema in schemas/vendor.json:
    - fields[2].type: unknown field type "txt"; expected one of text, number, boolean, date
    - fields[3].name: duplicate field name "name" (already used by fields[0])
  ```

* Issues are sorted in document order.
* A missing file and invalid JSON produce a `SchemaError` with a one-line
  message, including the JSON parser's position.

### Consequences

* Good, because authors see every problem at once.
* Good, because the issue list can later be shown next to fields in the schema
  editor.

## Pros and Cons of the Options

### Report every problem

* Good, because one pass fixes all problems.

### Stop at the first problem

* Good, because simpler to implement.
* Bad, because fixing a schema takes one run per problem.

## More Information

Decided in the V1-03 design proposal, decision D7. The proposal presented
only the chosen option; the other option above was added when writing this
ADR, for context.
