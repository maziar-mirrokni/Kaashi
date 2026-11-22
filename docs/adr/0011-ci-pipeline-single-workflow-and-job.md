---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Run CI as one workflow with one job on every push and pull request

## Context and Problem Statement

CI must run on every push and pull request and fail on any error. How should
the pipeline be structured?

## Decision Drivers

* Every check (format, lint, types, tests, build) must run, and any failure
  must fail the run.
* Fast feedback at the repo's current size.
* One required status check for branch protection.
* Least privilege for the workflow.

## Considered Options

* One workflow with one job running the checks in sequence
* One workflow with a parallel job per check

## Decision Outcome

Chosen option: "One workflow with one job", because at this size one install
followed by the checks in sequence is faster overall than repeating the
install in several parallel jobs, and it gives a single **CI** check to
require on `main`.

Details (`.github/workflows/ci.yml`):

* Triggers: every push to any branch and every pull request.
* Steps: check out, set up Node from `.nvmrc` with npm caching, `npm ci`,
  then format check, lint, type check, tests and build. A failing step fails
  the run and skips the rest.
* Lint and format findings are reported as pull request annotations.
* A newer push to the same branch or pull request cancels the run in progress.
* The workflow token can only read the repository; checkout does not keep
  credentials.
* Third-party actions are pinned to full commit SHAs, with the version in a
  comment.
* `npm run check` runs the same checks locally.

### Consequences

* Good, because one required check (`CI`) covers everything.
* Good, because the pipeline is short and easy to read.
* Bad, because a failure in an early step hides the results of later steps
  until it is fixed.
* Neutral, because pushes to a branch with an open pull request run CI twice
  (push and pull request events).

## Pros and Cons of the Options

### One workflow with one job

* Good, because one dependency install per run.
* Bad, because steps run one after another.

### One workflow with a parallel job per check

* Good, because every check reports independently and in parallel.
* Bad, because each job repeats checkout and install, which is slower overall
  for a small repo, and branch protection must require several checks.

## More Information

Decided in the V1-02 design proposal, decision D3. Pinning actions to commit
SHAs was an implementer's choice made during V1-02.
