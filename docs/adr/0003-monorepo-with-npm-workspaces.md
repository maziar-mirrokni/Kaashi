---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Organise the code as a monorepo with npm workspaces

## Context and Problem Statement

Kaashi has a backend, a frontend and code shared between them. Most stories
change more than one of these. How should the repository be organised?

## Decision Drivers

* A story that touches backend and frontend should ship in one pull request.
* Shared code should be importable by both apps without publishing it.
* No extra tools to install on developer machines or in CI.

## Considered Options

* One repo with npm workspaces
* One repo with pnpm workspaces
* Separate repos for backend and frontend

## Decision Outcome

Chosen option: "One repo with npm workspaces", because it keeps every story in
one pull request and comes with npm, so nothing extra has to be installed.

Layout:

| Folder | Contents |
|---|---|
| `apps/server` | backend (`@kaashi/server`) |
| `apps/web` | frontend (`@kaashi/web`) |
| `packages/shared` | code shared by both (`@kaashi/shared`) |
| `docs/adr` | architecture decision records |

Root scripts (`npm run dev`, `npm test`, `npm run build`, `npm run typecheck`)
run across all workspaces.

### Consequences

* Good, because one clone, one install and one pull request per story.
* Good, because `@kaashi/shared` is linked locally by npm.
* Bad, because npm hoists dependencies, so a workspace can accidentally use a
  package it does not declare.

## Pros and Cons of the Options

### One repo with npm workspaces

* Good, because it is built into npm.
* Bad, because dependency isolation is looser than pnpm's.

### One repo with pnpm workspaces

* Good, because it is faster and stricter about undeclared dependencies.
* Bad, because pnpm must be installed on every machine and in CI.

### Separate repos for backend and frontend

* Good, because each side can be versioned and deployed alone.
* Bad, because cross-cutting stories need coordinated pull requests, and
  shared code would have to be published as a package.

## More Information

Decided in the V1-01 design proposal, decision D2.
