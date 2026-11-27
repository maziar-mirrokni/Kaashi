---
status: accepted
date: 2026-11-26
decision-makers: Project owner (Solution Architect)
---

# Compile the shared package, and use its source in development

## Context and Problem Statement

V1-03 is the first story where the server imports `@kaashi/shared`. The
production server runs with plain Node (`npm start`), and Node 22.14 cannot
import TypeScript source files. How should the server use the shared package
at runtime, without slowing down development?

## Decision Drivers

* Production runs compiled JavaScript with plain Node.
* Development and tests need no build step for shared code.
* No extra build tools if possible.

## Considered Options

* Compile shared with `tsc`; use its source in development through an export
  condition
* Bundle the server (tsup or esbuild), including the shared code
* Run the server with `tsx` in production too

## Decision Outcome

Chosen option: "Compile shared with `tsc`; use its source in development
through an export condition", because production runs compiled code and
development needs no build step, using tools already in the project.

* `packages/shared` builds to `dist/` (JavaScript and type declarations).
* Its `package.json` exports have a custom condition, `@kaashi/source`, that
  points to `src/index.ts`; the default points to `dist/index.js`.
* Development and tests use the condition: TypeScript (`customConditions`),
  Vite and Vitest (`resolve.conditions`) and `tsx`
  (`--conditions=@kaashi/source`).
* The server's production build leaves the condition out, so it compiles
  against, and runs with, shared's `dist/`.
* `npm run build` builds shared before the apps.

### Consequences

* Good, because production runs plain compiled JavaScript.
* Good, because development and tests always use the current shared source.
* Bad, because every workspace that imports shared needs the condition in its
  TypeScript and Vite configs (documented in `CLAUDE.md`).

## Pros and Cons of the Options

### Compile shared with an export condition

* Good, because it uses only tools already in the project.
* Bad, because the condition must be configured in several places.

### Bundle the server

* Good, because one output file, no runtime package resolution.
* Bad, because another build tool to configure and maintain.

### Run `tsx` in production

* Good, because simplest.
* Bad, because TypeScript is compiled at every startup, and a development tool
  runs in production.

## More Information

Decided in the V1-03 design proposal, decision D6.
