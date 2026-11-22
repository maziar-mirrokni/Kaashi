---
status: accepted
date: 2026-11-22
decision-makers: Project owner (Solution Architect)
---

# Use React with Vite for the frontend, and choose a component library later

## Context and Problem Statement

The frontend will render forms and data grids generated from object schemas
(V1-10, V1-11) and a schema editor (V1-09). Which UI framework and build tool
should it use, and should a component library be chosen now?

## Decision Drivers

* A large ecosystem of form and data-grid libraries.
* Fast development server and production builds.
* Accessibility requirements (keyboard navigation, labelled inputs) from V1-09.
* Avoid committing to a component library before there is real UI to build.

## Considered Options

* React with Vite
* Vue with Vite
* Svelte (SvelteKit)

## Decision Outcome

Chosen option: "React with Vite", because React has the largest ecosystem of
data-grid and form libraries that V1-10 and V1-11 will need, and Vite gives a
fast dev server, a dev proxy to the API and fast builds.

The UI component library is deliberately not chosen yet. The V1-01 placeholder
page does not need one; it will be chosen in V1-09, the first story with real
UI, and weighed against the accessibility criteria.

### Consequences

* Good, because the widest choice of libraries for generated forms and grids.
* Good, because Vite's proxy lets the frontend call `/api` in development.
* Neutral, because a component library decision is still open (V1-09).

## Pros and Cons of the Options

### React with Vite

* Good, because it has the largest ecosystem and community.
* Neutral, because React needs more choices (routing, forms) than an
  all-in-one framework.

### Vue with Vite

* Good, because it has a gentle learning curve and good built-in reactivity.
* Bad, because its ecosystem of data grids and form libraries is smaller.

### Svelte (SvelteKit)

* Good, because it produces small, fast bundles.
* Bad, because its ecosystem is the smallest of the three.

## More Information

Decided in the V1-01 design proposal, decision D4.
