---
status: accepted
date: 2026-11-26
decision-makers: Project owner (Solution Architect)
---

# Use Zod to validate the schema format

## Context and Problem Statement

Schema files must be validated with clear errors, and the code needs
TypeScript types for schemas. The schema editor (V1-09) will need the same
validation in the browser. How should the schema format be validated?

## Decision Drivers

* One definition for both the TypeScript types and the validation.
* Error messages that locate each problem (`fields[2].type`).
* Runs in Node and in the browser.
* Rules beyond JSON types, such as unique field names.

## Considered Options

* Zod 4
* JSON Schema with Ajv
* A hand-written validator

## Decision Outcome

Chosen option: "Zod 4", because one definition gives both the types and the
validation, it reports paths for every problem, runs in the browser, and has
no dependencies of its own.

* The Zod definition lives in `packages/shared/src/schema/validate.ts`, with
  custom messages for each rule.
* Duplicate and reserved field names are checked by code next to the Zod
  definition, so they are reported even when other parts of the schema are
  invalid.
* `validateObjectSchema()` returns every issue, sorted in document order.

### Consequences

* Good, because types and validation cannot drift apart.
* Good, because the web app can reuse the same validation.
* Bad, because one more dependency.

## Pros and Cons of the Options

### Zod 4

* Good, because types are inferred from the definition.
* Good, because it can export a JSON Schema later for editor autocompletion.
* Bad, because one more dependency.

### JSON Schema with Ajv

* Good, because it is a standard format, and Fastify already uses Ajv.
* Bad, because TypeScript types must be written separately or generated, error
  messages are less readable, and rules such as unique names need custom code.

### Hand-written validator

* Good, because no dependency.
* Bad, because more code to maintain, and types must be written separately.

## More Information

Decided in the V1-03 design proposal, decision D4. Checking field names
outside Zod, so they are reported together with other problems, was an
implementer's choice made during V1-03.
