---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Use Vitest for unit and API tests, and choose the end-to-end tool in V1-09

## Context and Problem Statement

Every story ships with automated tests. The backend needs API tests and the
frontend needs component tests. End-to-end UI tests are first required in
V1-09. Which test tools should we use, and when?

## Decision Drivers

* One test runner for backend and frontend.
* Native support for TypeScript and ES modules, with little configuration.
* Fits the Vite build used by the frontend.

## Considered Options

* Vitest
* Jest

## Decision Outcome

Chosen option: "Vitest", because it runs TypeScript and ES modules with no
extra configuration, reuses the Vite config for the frontend, and one root
`npm test` runs every workspace as a Vitest project.

Frontend component tests use Testing Library and jest-dom in a jsdom
environment. The end-to-end tool is chosen in V1-09, which first needs it;
Playwright is the likely candidate.

### Consequences

* Good, because backend and frontend tests share one runner and one command.
* Good, because the frontend tests use the same transforms as the app.
* Neutral, because the end-to-end tool is still to be decided (V1-09).

## Pros and Cons of the Options

### Vitest

* Good, because native TypeScript and ESM support.
* Good, because a Jest-compatible API.
* Neutral, because it is younger than Jest.

### Jest

* Good, because it is mature and widely known.
* Bad, because ES modules and TypeScript need extra setup (Babel or ts-jest).

## More Information

Decided in the V1-01 design proposal, decision D5.
