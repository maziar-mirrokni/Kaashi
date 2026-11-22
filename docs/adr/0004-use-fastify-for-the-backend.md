---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Use Fastify as the backend web framework

## Context and Problem Statement

The backend will generate CRUD endpoints at runtime from object schemas
(V1-04) and validate requests against those schemas. Which Node web framework
should it use?

## Decision Drivers

* Routes must be registered at runtime from schema definitions.
* Request validation against JSON Schema should be built in.
* Good TypeScript support.
* Endpoints should be testable without opening a network port.

## Considered Options

* Fastify
* Express
* NestJS
* Hono

## Decision Outcome

Chosen option: "Fastify", because it validates requests and responses against
JSON Schema out of the box, supports registering routes at runtime, ships its
own TypeScript types, and its `inject()` lets tests call the API in memory.

### Consequences

* Good, because generated endpoints can reuse schema-derived JSON Schema for
  validation without extra libraries.
* Good, because tests use `app.inject()` (see `apps/server/test/`).
* Bad, because Fastify's plugin and encapsulation model is less familiar than
  Express middleware.

## Pros and Cons of the Options

### Fastify

* Good, because built-in JSON Schema validation and serialization.
* Good, because first-class TypeScript types and in-memory `inject()`.
* Neutral, because its ecosystem is smaller than Express's but covers our needs.

### Express

* Good, because it is the most widely known Node framework.
* Bad, because validation needs extra libraries, its types are maintained
  separately, and its JSON parser rejects non-object top-level JSON by default.

### NestJS

* Good, because it gives a strong structure for large teams.
* Bad, because it is built around decorators and classes declared at build
  time, which works against objects defined at runtime.

### Hono

* Good, because it is light, modern and runs on many runtimes.
* Bad, because its ecosystem for Node servers is smaller.

## More Information

Decided in the V1-01 design proposal, decision D3.
