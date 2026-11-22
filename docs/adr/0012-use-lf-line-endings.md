---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Use LF line endings in the repository and in working copies

## Context and Problem Statement

The development machine runs Windows with Git's `core.autocrlf=true`, which
checks files out with CRLF line endings. The formatter and CI (Linux) expect
LF. Without a rule, the format check would pass in CI but fail locally. How
should line endings be handled?

## Decision Drivers

* The format check must give the same result locally and in CI.
* No mixed line endings in the repository.
* Must work regardless of each developer's Git settings.

## Considered Options

* `.gitattributes` with `* text=auto eol=lf`
* Configure the formatter to accept any line ending

## Decision Outcome

Chosen option: "`.gitattributes` with `* text=auto eol=lf`", because it makes
Git store and check out text files with LF on every platform, overriding
`core.autocrlf`, so the formatter sees the same files everywhere.

Windows script types (`.bat`, `.cmd`, `.ps1`) keep CRLF, and common binary
types are marked binary.

### Consequences

* Good, because local and CI format checks agree.
* Good, because Git's "LF will be replaced by CRLF" warnings stop.
* Neutral, because existing clones need their files checked out again once
  (for example `git rm -r --cached . && git reset --hard` on a clean tree).

## Pros and Cons of the Options

### `.gitattributes` with `eol=lf`

* Good, because it is enforced by Git for everyone who clones the repo.

### Formatter accepts any line ending

* Good, because no Git changes.
* Bad, because mixed line endings can creep into the repository.

## More Information

Decided in the V1-02 design proposal, decision D4.
