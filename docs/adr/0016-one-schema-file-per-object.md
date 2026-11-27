---
status: accepted
date: 2026-11-26
decision-makers: Project owner (Solution Architect)
---

# Define each object in its own schema file

## Context and Problem Statement

Kaashi generates its API and UI from object schemas. Schemas must be stored
somewhere the backend can load them, and later (V1-08) be created and deleted
through an API. Should all objects of an app be defined in one file, or each
object in its own file?

## Decision Drivers

* Small, readable diffs when one object changes.
* A direct mapping to V1-08's "create or delete an object".
* Checks across objects (references, V1-13) must remain possible.

## Considered Options

* One JSON file per object in a `schemas/` folder
* One app file holding all objects (`app.json` with `objects: [...]`)

## Decision Outcome

Chosen option: "One JSON file per object in a `schemas/` folder", because a
change to one object touches one small file, and creating or deleting an
object maps to creating or deleting a file.

* Schema files live in `schemas/` at the repository root.
* The file name is the object's name plus `.json` (`schemas/vendor.json` for
  `vendor`); the loader enforces this, so two files cannot define the same
  object.
* Checks across objects will be done by validating the loaded set of objects
  together, once references exist (V1-13).

### Consequences

* Good, because diffs stay small and object-sized.
* Good, because file names identify objects at a glance.
* Bad, because cross-object validation needs all files loaded first, rather
  than reading one document.

## Pros and Cons of the Options

### One file per object

* Good, because it maps directly onto object-level create and delete.
* Bad, because an app is spread over several files.

### One app file

* Good, because cross-object checks work on a single document.
* Bad, because every edit rewrites one large shared file.

## More Information

Decided in the V1-03 (schema format and loader) design proposal, decision D1.
Enforcing that the file name matches the object name was an implementer's
choice made during V1-03. See [docs/schema-format.md](../schema-format.md).
