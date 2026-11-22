---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Use Biome for linting and formatting

## Context and Problem Statement

The code needs enforced lint rules and a consistent format, checked in CI.
The usual TypeScript setup (ESLint with typescript-eslint) does not support
TypeScript 7, which the project uses: typescript-eslint accepts TypeScript
below 6.1, and `eslint-plugin-jsx-a11y` does not support ESLint 10. Which
linting and formatting tools should we use?

## Decision Drivers

* Must work with TypeScript 7 without downgrading.
* Lint rules for React hooks and accessibility (V1-09 onwards requires
  keyboard navigation and labelled inputs).
* Few tools and config files to maintain.
* Fast enough to run on every push.

## Considered Options

* Biome (lint and format in one tool)
* ESLint 9 with typescript-eslint, react-hooks and jsx-a11y, plus Prettier

## Decision Outcome

Chosen option: "Biome", because it works with TypeScript 7 (it has its own
parser), covers linting and formatting in one tool and one config file
(`biome.json`), includes React hooks rules and most jsx-a11y accessibility
rules, and runs in well under a second.

Configuration:

* Lint rules: Biome's recommended preset plus the React and test domains;
  import order is enforced.
* Format: 2-space indent, 100-column lines, LF line endings, single quotes,
  semicolons, trailing commas.
* Markdown files are not formatted or linted, so hand-written docs (backlog,
  ADRs) keep their layout.
* Biome is pinned to an exact version, as its maintainers recommend, because
  rule changes between versions can fail CI.

### Consequences

* Good, because TypeScript 7 stays; no downgrade.
* Good, because one tool, one config, and a fast check.
* Bad, because fewer type-aware lint rules than typescript-eslint (for
  example, fewer checks for unhandled promises). TypeScript's strict mode
  covers part of this.
* Bad, because a smaller plugin ecosystem than ESLint.

## Pros and Cons of the Options

### Biome

* Good, because it supports TypeScript 7 and is a single fast tool.
* Good, because accessibility and React hooks rules are built in.
* Bad, because its type-aware analysis is more limited.

### ESLint 9 with typescript-eslint, react-hooks, jsx-a11y and Prettier

* Good, because it is the industry standard with full type-aware rules.
* Good, because jsx-a11y is the reference accessibility rule set.
* Bad, because it requires downgrading TypeScript 7 to 6.0 and staying on
  ESLint 9.
* Bad, because five or more packages and two config files, and slower.

## More Information

Decided in the V1-02 design proposal, decision D2. Excluding Markdown was an
implementer's choice made during V1-02, because Biome 2.6 also formats
Markdown and would have rewritten the backlog and ADRs. This decision can be
revisited when typescript-eslint supports TypeScript 7.
