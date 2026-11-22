# Kaashi — Instructions for Claude Code

Kaashi is a schema-driven low-code platform. The proof app is procurement
for a small company.

| File | Purpose |
|---|---|
| `README.md` | Public overview: what Kaashi is, how to run it, current status, and links to the live demo. |
| `BACKLOG.md` | Stories and their status. The single source of truth for progress. |
| `docs/adr/` | Architecture decision records (MADR format). |

## Roles

The project owner acts as Solution Architect and owns all design and domain
decisions. Claude Code provides implementation support only. Before
implementing anything that involves a design choice (data models, schema
formats, API contracts, libraries, architecture, UX flows), present the options
with a recommendation and wait for the owner's approval. Implementing a design
the owner has already approved needs no further sign-off.

- Start each story with a design proposal, before writing any code.
- When a choice has to be made during implementation without the owner, report
  it afterwards as an implementer's choice so the owner can review it.

## Decision records

- Record design decisions as architecture decision records (ADRs) in
  `docs/adr/`, using the MADR format.
- When a story is completed, write ADRs for the decisions in its approved
  design proposal: one ADR per decision, as MADR intends, with the options
  considered and the owner's choice.
- Name files with a sequential number and a short title, e.g.
  `docs/adr/0001-record-architecture-decisions.md`. Never renumber or delete
  an ADR; if a decision changes, write a new ADR that supersedes the old one.

## Engineering rules

- Every story ships with automated tests for its acceptance criteria.
- Work on one branch per story and open a pull request for it.
- Every pull request description links the story, lists the ADRs written, and
  shows the test evidence.
- CI must pass before a pull request is merged or a story is marked done.
- Write commit messages in the Conventional Commits format (`feat:`, `fix:`,
  `docs:`, `test:`, `chore:`, ...).
- Never commit secrets or credentials. Configuration comes from environment
  variables, documented in a committed `.env.example`.

## Backlog

Each story is a small, independently shippable unit of work, sized S, M, or L,
with explicit acceptance criteria and dependencies. Work stories in order
within an epic unless a dependency allows parallelizing.

- When starting a story, set its status to `[~]`.
- When a story is done, check its box (`[x]`), set **Completed** to the date,
  add a one-line outcome in **Notes**, write its ADRs, and update the progress
  table (Done, Remaining, Remaining by size, and the Last updated date). If the
  story changes what users see or how to run the app, update `README.md` too.
- Do not mark a story done unless every acceptance criterion is met and the
  app still runs. Once continuous deployment is set up (V1-07), the deployed
  demo must also still work.
- Keep design detail out of `BACKLOG.md`.

## Shortcuts

When the owner types this word on its own:

- **"status"**: give a short progress report from `BACKLOG.md`: for each epic,
  stories done and remaining (with sizes); any story in progress or blocked;
  the next stories that are ready to start (all dependencies done); and whether
  the repo has uncommitted or unpushed changes.

## Commands

To be filled in by V1-01 (Project scaffolding), once the stack is chosen. Keep
this section up to date as commands are added: how to install, run in
development, test, lint, and build.
