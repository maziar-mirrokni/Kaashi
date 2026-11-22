---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Host the code in a public GitHub repo and work one branch per story

## Context and Problem Statement

The project needs version control, a public home for the live demo and the
README, and a workflow where every story is reviewed in a pull request. How is
the repository set up, and how does work reach `main`?

## Decision Drivers

* The project is a public showcase with a live demo.
* Every story is reviewed in a pull request before it reaches `main`.
* Branch protection (V1-02) will block direct pushes to `main`.

## Considered Options

* Public GitHub repo, `main` as default branch, one branch and pull request
  per story
* Private GitHub repo with the same workflow
* Trunk-based development with direct commits to `main`

## Decision Outcome

Chosen option: "Public GitHub repo, `main` as default branch, one branch and
pull request per story", because it suits a public demo and gives every story
a reviewable pull request with its test evidence and ADRs.

Details:

* The repository is `github.com/maziar-mirrokni/Kaashi`, public, with `main`
  as the default branch.
* The first commit went directly to `main` and holds only the backlog, the
  instructions, the README and `.gitignore`. Everything after it arrives
  through pull requests.
* Story branches are named `<type>/<story-id>-<short-title>`, for example
  `feat/v1-01-project-scaffolding`.
* Commit messages follow Conventional Commits.
* `CLAUDE.local.md`, `.env` and other machine-specific files are listed in
  `.gitignore`.

### Consequences

* Good, because every change to `main` is reviewed and traceable to a story.
* Good, because the public repo can show a CI badge and link the live demo.
* Bad, because anything committed is public, so secrets must never be
  committed.

## Pros and Cons of the Options

### Public GitHub repo with one branch per story

* Good, because it suits a public showcase.
* Good, because pull requests carry test evidence and ADRs.

### Private GitHub repo

* Good, because the code is not exposed.
* Bad, because a showcase project loses visibility.

### Trunk-based development

* Good, because there is less ceremony.
* Bad, because stories are not reviewed as a unit before reaching `main`.

## More Information

Decided in the V1-01 design proposal, decision D8. The owner chose a public
repository. The trunk-based option was added when writing this ADR, for
context.
