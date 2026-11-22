---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Protect main with a branch ruleset and squash-only merging

## Context and Problem Statement

Changes to `main` should only arrive through reviewed pull requests whose CI
passes, and `main`'s history should map cleanly to stories. How should `main`
be protected, and how are pull requests merged?

## Decision Drivers

* No direct pushes, force pushes or deletion of `main`.
* A passing **CI** check is required before merging.
* One commit per story on `main`, with a Conventional Commits title.
* The project has a single maintainer, who cannot approve their own pull
  requests.

## Considered Options

* A repository ruleset on the default branch
* Classic branch protection rules

## Decision Outcome

Chosen option: "A repository ruleset on the default branch", because rulesets
are GitHub's current mechanism, can be inspected through the API, and support
restricting the allowed merge methods.

Ruleset "Protect main" (no bypass, including for administrators):

* Changes only through a pull request; zero approvals required.
* Only squash merging is allowed.
* The **CI** status check from GitHub Actions must pass, and the branch must be
  up to date with `main`.
* Linear history is required.
* Force pushes and deletion are blocked.

Repository merge settings:

* Squash merging only; merge commits and rebase merging are turned off.
* The squash commit title defaults to the pull request title, and the body to
  the branch's commit messages.
* Branches are deleted automatically after merging.

### Consequences

* Good, because every change on `main` passed CI and went through a pull
  request.
* Good, because each story becomes one commit with a Conventional Commits
  title.
* Bad, because urgent fixes also need a pull request and a CI run; the ruleset
  can be edited by the owner in an emergency.

## Pros and Cons of the Options

### Repository ruleset

* Good, because it supports allowed merge methods and is GitHub's current
  approach.
* Good, because rules are visible to anyone with read access.

### Classic branch protection

* Good, because it is long established.
* Bad, because it cannot restrict merge methods per branch, and GitHub is
  moving features to rulesets.

## More Information

Decided in the V1-02 design proposal, decision D5. The ruleset was applied
with the GitHub API after CI had run once, so the **CI** check could be
required. Using the branch's commit messages as the default squash body was
an implementer's choice made during V1-02.
