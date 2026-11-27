---
status: accepted
date: 2026-11-26
decision-makers: Project owner (Solution Architect)
---

# Shape of object and field schemas

## Context and Problem Statement

Every later story builds on the object schema: the generated API (V1-04), the
database tables (V1-05), the schema editor (V1-08, V1-09) and the generated
forms and lists (V1-10, V1-11). What properties does an object schema and each
of its fields have, and what rules do names follow?

## Decision Drivers

* Field order matters for generated forms and for reordering (V2-10).
* Names are used by the API and the database, which may ignore letter case.
* The format must be able to evolve without breaking existing files.
* Mistakes such as misspelt properties must be caught, not silently ignored.

## Considered Options

* Fields as an ordered array; strict, lowercase names; optional labels; a
  format version
* Fields as an object keyed by field name

## Decision Outcome

Chosen option: "Fields as an ordered array; strict, lowercase names; optional
labels; a format version", because it makes field order explicit and keeps
names safe for every database and file system.

* An object has `formatVersion` (must be `1`), `name`, optional `label`, and
  `fields` (at least one).
* A field has `name`, optional `label`, `type`, and optional `required`
  (default `false`).
* Object and field names match `^[a-z][a-z0-9_]*$` and are at most 63
  characters (PostgreSQL's identifier limit). Lowercase only, so names cannot
  collide by letter case.
* Field names are unique within an object. `id`, `created_at` and `updated_at`
  are reserved for fields the platform adds itself.
* Labels are what the UI shows. Missing labels are derived from names
  (`contact_email` becomes "Contact email").
* Unknown properties are rejected.
* `formatVersion` changes only for breaking changes; additions keep version 1.

### Consequences

* Good, because field order is explicit and stable.
* Good, because names work unchanged as API paths, column names and file
  names.
* Good, because typos in property names are reported.
* Bad, because names cannot use camelCase or capital letters; labels carry the
  human-friendly form instead.

## Pros and Cons of the Options

### Fields as an ordered array

* Good, because order is explicit.
* Bad, because name uniqueness must be validated separately.

### Fields as an object keyed by name

* Good, because names are unique by construction.
* Bad, because order relies on JSON key order, which tools may not preserve.

## More Information

Decided in the V1-03 design proposal, decision D2. Specified in
[docs/schema-format.md](../schema-format.md). Requiring at least one field and
trimming labels were implementer's choices made during V1-03.

The approved proposal also had an optional `pluralLabel` (the UI name for
several records, derived from `label` with English plural rules). The owner
removed it while reviewing V1-03 as premature: nothing used it yet. It can be
added when the generated UI needs it, without changing `formatVersion`.
