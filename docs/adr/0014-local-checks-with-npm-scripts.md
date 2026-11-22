---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Run checks locally with npm scripts and editor support, without git hooks

## Context and Problem Statement

CI enforces formatting, lint, types, tests and build. Developers should be
able to run the same checks before pushing. Should checks also be enforced
locally, for example with git hooks?

## Decision Drivers

* The checks CI runs should be easy to run locally with one command.
* Commits should stay fast.
* Avoid duplicating CI's enforcement.

## Considered Options

* npm scripts plus a recommended editor extension, no git hooks
* Pre-commit hooks with husky and lint-staged

## Decision Outcome

Chosen option: "npm scripts plus a recommended editor extension, no git
hooks", because CI already enforces every check, and hooks would slow every
commit and duplicate that enforcement.

Scripts:

* `npm run lint`: Biome lint rules and import order.
* `npm run format`: formats files and applies safe lint fixes.
* `npm run format:check`: reports formatting problems without changing files.
* `npm run check`: everything CI runs (format check, lint, type check, tests,
  build).

`.vscode/extensions.json` recommends the Biome extension, so files can be
formatted on save.

### Consequences

* Good, because commits stay fast, and one command reproduces CI.
* Bad, because problems can be pushed and only caught by CI. Hooks can be
  added later if this becomes a nuisance.

## Pros and Cons of the Options

### npm scripts and editor extension

* Good, because there is nothing to install beyond the dependencies.
* Bad, because local checks are optional.

### Pre-commit hooks with husky and lint-staged

* Good, because problems are caught before each commit.
* Bad, because it slows commits and duplicates CI.

## More Information

Decided in the V1-02 design proposal, decision D6.
