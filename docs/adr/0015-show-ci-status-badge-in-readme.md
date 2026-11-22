---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Show the CI status badge in the README

## Context and Problem Statement

Visitors to the public repository should see at a glance whether `main`
builds and passes its checks. How should the CI status be shown?

## Decision Drivers

* Visible on the repository's front page.
* Always current, with no maintenance.

## Considered Options

* The GitHub Actions workflow badge
* A shields.io badge
* No badge

## Decision Outcome

Chosen option: "The GitHub Actions workflow badge", because GitHub serves it
for the CI workflow directly, with no third-party service. It shows the status
of the latest run on `main` and links to the workflow's runs on `main`.

### Consequences

* Good, because it updates itself after every run on `main`.
* Neutral, because its look cannot be customised.

## Pros and Cons of the Options

### GitHub Actions workflow badge

* Good, because it needs no outside service.

### shields.io badge

* Good, because its style can be customised.
* Bad, because it depends on a third-party service.

### No badge

* Bad, because the build status is not visible from the README.

## More Information

Decided in the V1-02 design proposal, decision D7. The proposal presented
only the chosen option; the other options above were added when writing this
ADR, for context.
