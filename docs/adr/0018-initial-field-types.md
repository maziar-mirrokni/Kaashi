---
status: accepted
date: 2026-11-26
decision-makers: Project owner (Solution Architect)
---

# Start with four field types and add more when stories need them

## Context and Problem Statement

The schema format needs field types. V1-10 needs at least three for the form
renderer; later stories add status fields (V1-12), references (V1-13) and
calculated fields (V1-17). Which field types and options should the first
version of the format support?

## Decision Drivers

* Cover what the next stories need and test.
* Avoid designing types and options no story uses yet.
* Money amounts need a deliberate decision (exact decimals or floating point).

## Considered Options

* `text`, `number`, `boolean` and `date`, with only `required`
* A wider set now: decimal, email, long text, choice, plus min, max and
  maximum length

## Decision Outcome

Chosen option: "`text`, `number`, `boolean` and `date`, with only `required`",
because it covers V1-04 to V1-11 and leaves each further type or option to the
story that needs and tests it.

* New types (`status`, `reference`, `calculated`) arrive with V1-12, V1-13 and
  V1-17.
* Constraints such as min, max or maximum length arrive when a story needs
  them (for example V1-19's "quantity above 0").
* How to represent money is decided with V1-17 or V1-18, when unit prices
  appear.

### Consequences

* Good, because every type in the format is used and tested.
* Neutral, because adding types later keeps `formatVersion` 1, as additions do
  not break existing files.
* Bad, because the format cannot yet express money or constraints.

## Pros and Cons of the Options

### Four types now

* Good, because it is small and fully tested.
* Bad, because later stories must extend it.

### A wider set now

* Good, because fewer format changes later.
* Bad, because it front-loads design work that no current story needs or tests.

## More Information

Decided in the V1-03 design proposal, decision D3.
