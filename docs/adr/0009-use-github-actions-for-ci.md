---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Use GitHub Actions for continuous integration

## Context and Problem Statement

Every push and pull request must be checked automatically (formatting, lint,
types, tests, build), and `main` must only accept pull requests whose checks
pass. Which CI platform should run these checks?

## Decision Drivers

* The code is hosted on GitHub (ADR-0008).
* Branch protection must be able to require the CI result.
* No extra accounts or services to manage.
* Free for a public repository.

## Considered Options

* GitHub Actions
* CircleCI
* GitLab CI (with the repo mirrored)

## Decision Outcome

Chosen option: "GitHub Actions", because it is built into the repository, is
free for public repos, and its check results are what GitHub branch rulesets
require.

### Consequences

* Good, because CI configuration lives in the repo (`.github/workflows/`).
* Good, because the README badge and pull request checks need no integration.
* Bad, because the workflow syntax is GitHub-specific, so moving platforms
  would mean rewriting it.

## Pros and Cons of the Options

### GitHub Actions

* Good, because it is integrated with pull requests and rulesets.
* Good, because a large marketplace of maintained actions.

### CircleCI

* Good, because it is a mature, fast CI service.
* Bad, because it is an extra service and sign-in to manage.

### GitLab CI

* Good, because it is a capable pipeline system.
* Bad, because it would require mirroring the repo to GitLab.

## More Information

Decided in the V1-02 (CI and code quality) design proposal, decision D1.
