---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Run on Node 22 with ES modules, and start both apps with one dev command

## Context and Problem Statement

The backend and frontend need a fixed runtime version, a module system, a way
to run in development and in production, and a source of configuration. How
should the runtime and the development setup work?

## Decision Drivers

* The same Node version locally, in CI and in deployment.
* One command to start everything during development.
* Configuration from environment variables, never from committed secrets.
* The frontend should call the API on the same origin in development.

## Considered Options

* Node 22, ES modules, `tsx watch` in development, `tsc` build, Vite proxy
* Node 24, ES modules, the same tooling
* CommonJS modules with `ts-node`

## Decision Outcome

Chosen option: "Node 22, ES modules, `tsx watch` in development, `tsc` build,
Vite proxy", because Node 22 is the installed LTS release and ES modules are
the standard module system for current libraries.

Details:

* Node 22 is pinned by `engines` in `package.json` (22.13 or later, required
  by the test tooling) and by `.nvmrc`.
* All packages use ES modules (`"type": "module"`).
* `npm run dev` starts the backend (`tsx watch`, port 3000) and the frontend
  (Vite, port 5173) together.
* The backend is built with `tsc` and run with `node dist/index.js`
  (`npm start`).
* Vite forwards `/api` requests to `http://127.0.0.1:<PORT>`.
* The health route is `GET /api/health`, returning 200 and `{"status":"ok"}`.
* Configuration (`HOST`, `PORT`, `LOG_LEVEL`) comes from environment
  variables, optionally loaded from a repo-root `.env` file. Every variable is
  documented in the committed `.env.example`.
* Deferred to later stories: the database (V1-05) and linting and formatting
  (V1-02).

### Consequences

* Good, because one command starts the whole app in development.
* Good, because no secrets or machine-specific values are committed.
* Bad, because Node 22 must be upgraded before it leaves long-term support
  (end of life April 2027).

## Pros and Cons of the Options

### Node 22 with ES modules

* Good, because it is the version installed on the development machine.
* Good, because it supports `process.loadEnvFile` and modern ESM.
* Bad, because it reaches end of life sooner than Node 24.

### Node 24 with ES modules

* Good, because a longer support window.
* Bad, because it would need a new install on the development machine.

### CommonJS with `ts-node`

* Good, because it is a long-established setup.
* Bad, because many current libraries are ESM-only, and `ts-node` is slower
  than `tsx`.

## More Information

Decided in the V1-01 design proposal, decision D6. The proposal presented
only the chosen setup; the other options above were added when writing this
ADR, for context.
