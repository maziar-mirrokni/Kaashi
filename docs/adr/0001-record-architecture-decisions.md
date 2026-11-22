---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Record architecture decisions as MADR files in docs/adr

## Context and Problem Statement

Kaashi's design decisions are made by the project owner, story by story, and
implemented with Claude Code. Without a written record, the reasons behind a
decision are lost, and later stories (or new contributors) cannot tell whether
a choice was deliberate. How and where do we record design decisions?

## Decision Drivers

* Every approved design proposal should leave a lasting, reviewable record.
* Records must live next to the code and change through pull requests.
* The format should be lightweight and widely recognised.

## Considered Options

* MADR 4 files in `docs/adr/`
* Nygard-style ADRs (title, context, decision, consequences)
* Design notes in the backlog or the wiki

## Decision Outcome

Chosen option: "MADR 4 files in `docs/adr/`", because it records the options
considered and why one was chosen, which matches how each story's design
proposal is presented, and it is a widely used, documented format.

Conventions:

* One ADR per decision, named `NNNN-short-title.md` with a sequential number.
* `0000-template.md` is the MADR 4 template to copy.
* ADRs are never renumbered or deleted. A changed decision gets a new ADR that
  supersedes the old one, and the old one's status is set to
  "superseded by ADR-NNNN".
* When a story is done, its approved design decisions are written up as ADRs
  and listed in the story's pull request.

### Consequences

* Good, because each decision keeps its options and rationale.
* Good, because ADRs are reviewed in the same pull request as the code.
* Bad, because writing an ADR per decision adds some work to every story.

## Pros and Cons of the Options

### MADR 4 files in `docs/adr/`

* Good, because options and trade-offs are part of the format.
* Good, because the template is maintained and documented at adr.github.io/madr.
* Neutral, because the full template is long; optional sections can be dropped.

### Nygard-style ADRs

* Good, because they are very short.
* Bad, because the options considered are not part of the format.

### Design notes in the backlog or the wiki

* Good, because no extra files.
* Bad, because the backlog is meant to stay free of design detail, and a wiki
  is not reviewed alongside the code.

## More Information

Decided in the V1-01 (project scaffolding) design proposal, decision D7. The
proposal presented only the chosen option; the other options above were added
when writing this ADR, for context.
