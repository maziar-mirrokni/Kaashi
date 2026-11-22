# Kaashi

Kaashi is a schema-driven low-code platform. You describe your business
objects (their fields, types, relationships and workflow) and Kaashi generates
the API, the forms and the list views from that description, with no
hand-written code per object.

The proof app is **procurement for a small company**: vendors, items, purchase
requisitions and line items, with a requisition moving through an approval
workflow from Draft to Received.

## Status

Early development. Nothing runnable yet: project scaffolding is in progress.

Progress is tracked story by story in [BACKLOG.md](BACKLOG.md):

- **V1: MVP.** A working platform that defines a data model, generates an API
  and UI for it, runs a status workflow, and demonstrates the procurement app
  end to end.
- **V2: Enterprise features.** Roles and permissions, audit trail, API
  documentation and governance, visual builders, and more.

## Running Kaashi

Instructions will be added once the project scaffolding is in place.

## Live demo

Not available yet. A public demo will be deployed automatically from `main`
once continuous deployment is set up.

## Design decisions

Architecture decisions are recorded in [docs/adr/](docs/adr/) in the
[MADR](https://adr.github.io/madr/) format.
