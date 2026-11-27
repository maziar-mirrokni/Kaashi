---
status: accepted
date: 2026-11-26
decision-makers: Project owner (Solution Architect)
---

# Put schema validation in the shared package and file loading in the server

## Context and Problem Statement

Schema code is needed by the server (loading files, generating the API) and
later by the web app (the schema editor, V1-09). Where should the schema
format, its validation and the file loader live?

## Decision Drivers

* The web app must be able to validate schemas without file-system access.
* File access belongs to the server.

## Considered Options

* Validation in `packages/shared`, file loading in `apps/server`
* Everything in `apps/server`

## Decision Outcome

Chosen option: "Validation in `packages/shared`, file loading in
`apps/server`", because validation is pure and reusable in the browser, while
reading files is server-only.

* `packages/shared/src/schema/`: the format's rules and TypeScript types
  (`format.ts`), label derivation (`labels.ts`) and `validateObjectSchema()`
  (`validate.ts`).
* `apps/server/src/schema/loader.ts`: `loadObjectSchema(file)` reads the file,
  removes a UTF-8 byte-order mark, parses the JSON, validates it and throws a
  `SchemaError` on any problem.

### Consequences

* Good, because the browser and the server share one validator.
* Neutral, because the server now depends on the shared package at runtime
  (see ADR-0021).

## Pros and Cons of the Options

### Validation in shared, loading in server

* Good, because each piece lives where it is used.

### Everything in the server

* Good, because simpler for now.
* Bad, because the schema editor would need a copy of the validation or a
  round trip to the API.

## More Information

Decided in the V1-03 design proposal, decision D5. The proposal presented
only the chosen option; the other option above was added when writing this
ADR, for context.
