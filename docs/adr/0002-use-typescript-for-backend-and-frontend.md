---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Use TypeScript for both the backend and the frontend

## Context and Problem Statement

Kaashi generates its API and its UI from the same object schemas. The schema
format, its validation and the field types are needed on both sides. Which
language(s) should the backend and frontend use?

## Decision Drivers

* Schema types and validation should be written once and shared.
* One toolchain is simpler to set up, run in CI and maintain.
* Objects are defined at runtime, so compile-time types per object add little.
* Node 22 is already installed on the development machine.

## Considered Options

* TypeScript everywhere (Node backend, TypeScript frontend)
* Python (FastAPI) backend with a TypeScript frontend
* C# (ASP.NET Core) backend with a TypeScript frontend

## Decision Outcome

Chosen option: "TypeScript everywhere", because it lets the server and the web
app share the schema types and validation code (in `packages/shared`) and
keeps a single language, package manager and test tool.

### Consequences

* Good, because schema code is shared instead of duplicated.
* Good, because one toolchain covers install, build, test and CI.
* Bad, because the Node ecosystem has fewer data-modelling libraries than
  Python or .NET.

## Pros and Cons of the Options

### TypeScript everywhere

* Good, because types and validation are shared between API and UI.
* Good, because one language for the whole repo.
* Neutral, because Node's performance is ample for this workload.

### Python (FastAPI) backend with a TypeScript frontend

* Good, because Pydantic offers strong validation.
* Bad, because two toolchains, and schema types are written twice.

### C# (ASP.NET Core) backend with a TypeScript frontend

* Good, because it is a mature enterprise stack.
* Bad, because it is heavier to set up, and its main strength (compile-time
  types) matters less when objects are defined at runtime.

## More Information

Decided in the V1-01 design proposal, decision D1.
