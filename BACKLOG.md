# Kaashi — Backlog

Work is planned as small, independently shippable stories, each with explicit
acceptance criteria and dependencies. Every story starts with a design proposal
that the project owner approves before any code is written.

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done · `[!]` blocked

Size legend: **S** small, contained change · **M** typical story · **L** large,
spans several layers

---

## EPIC V1: MVP

**Goal:** A working low-code platform that can define a data model, auto-generate
an API and UI for it, run a basic status workflow, and demonstrate one real
proof app (procurement for a small company) end to end.

**Definition of Done for the epic:** A stranger can watch a 3–5 minute demo and
see a purchase requisition move through an approval workflow using a UI that was
generated from a schema, not hand-coded per-object.

### V1-01: Project scaffolding
- **Status:** [x]
- **Completed:** 2026-11-22
- **Size:** M
- **Depends on:** none
- **Description:** Set up the repo, backend and frontend skeletons, folder
  structure, and core dependencies, using the stack chosen in this story's
  design proposal.
- **Acceptance criteria:**
  - [x] Backend starts with a health-check route returning 200
  - [x] Frontend starts and renders a placeholder page
  - [x] Repo has a README stub and .gitignore
  - [x] Architecture decision records are set up, with the decisions made so
    far recorded
- **Notes:** TypeScript monorepo (Fastify API, React and Vite web app, Vitest)
  runs with `npm run dev`; ADRs 0001–0008 recorded.

### V1-02: CI and code quality
- **Status:** [x]
- **Completed:** 2026-11-22
- **Size:** S
- **Depends on:** V1-01
- **Description:** Run linting, formatting checks, type-checking, tests, and the
  build automatically on every push and pull request.
- **Acceptance criteria:**
  - [x] CI runs on every push and pull request and fails on any error
  - [x] Linting and formatting rules are enforced
  - [x] README shows a build status badge
  - [x] Branch protection on main requires a pull request and passing CI
- **Notes:** GitHub Actions CI with Biome lint and format checks; `main`
  protected by a ruleset (pull request, passing CI, squash only); ADRs
  0009–0015 recorded.

### V1-03: Schema format and loader
- **Status:** [x]
- **Completed:** 2026-11-26
- **Size:** M
- **Depends on:** V1-01
- **Description:** Define the JSON schema shape for an object (name, fields,
  types, required flags). Write a loader that reads a schema file into memory.
- **Acceptance criteria:**
  - [x] Schema format documented (in code comments or a short spec file)
  - [x] Loader parses one hardcoded example schema without error
  - [x] Invalid schema shape throws a clear error
  - [x] Automated tests cover valid and invalid schemas
- **Notes:** Schema format v1 (one JSON file per object; text, number,
  boolean, date) specified in `docs/schema-format.md`, validated with Zod in
  the shared package and loaded by the server; ADRs 0016–0023 recorded.

### V1-04: Dynamic API generator (in-memory)
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-03
- **Description:** Given a loaded schema, auto-generate CRUD REST endpoints
  backed by an in-memory store.
- **Acceptance criteria:**
  - [ ] POST/GET/PUT/DELETE work for the hardcoded object via HTTP requests
  - [ ] Endpoints are generated from the schema, not hand-written per object
  - [ ] Automated tests cover each endpoint, including validation errors
- **Notes:**

### V1-05: Real persistence (database)
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-04
- **Description:** Replace the in-memory store with a database. Dynamically
  create tables from the schema on load.
- **Acceptance criteria:**
  - [ ] Table is created automatically from schema on startup
  - [ ] Same CRUD endpoints from V1-04 now persist across restarts
  - [ ] Automated tests cover table creation and persistence across restarts
- **Notes:**

### V1-06: One-command local run
- **Status:** [ ]
- **Completed:**
- **Size:** S
- **Depends on:** V1-05
- **Description:** Package the app so it runs with one command on any machine,
  without installing the stack locally.
- **Acceptance criteria:**
  - [ ] The app, including its database, starts with a single command on a
    clean machine
  - [ ] README documents the command
- **Notes:**

### V1-07: Continuous deployment
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-02, V1-06
- **Description:** Deploy the main branch automatically to a public URL, so a
  working demo is always available.
- **Acceptance criteria:**
  - [ ] Every merge to main deploys automatically after CI passes
  - [ ] The deployed app is reachable at a public URL
  - [ ] README links to the live app
- **Notes:**

### V1-08: Schema editor — schema API
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-05
- **Description:** Add an API to list, create, and delete objects and their
  fields, so schemas can be managed without editing files by hand.
- **Acceptance criteria:**
  - [ ] New schema is persisted and loadable by the backend
  - [ ] Objects and fields can be created and deleted via the API
  - [ ] Automated tests cover creating and deleting objects and fields,
    including error cases
- **Notes:**

### V1-09: Schema editor — UI
- **Status:** [ ]
- **Completed:**
- **Size:** L
- **Depends on:** V1-08
- **Description:** Basic UI to view objects and their fields, define a new
  object and its fields, and delete them, using the V1-08 schema API.
- **Acceptance criteria:**
  - [ ] User can create an object with 2+ fields via the UI, no manual JSON editing
  - [ ] User can delete an object or a field via the UI
  - [ ] End-to-end UI testing is set up, with a test that creates an object
    with fields and deletes it
  - [ ] Pages are keyboard-navigable, and every input has a label
- **Notes:**

### V1-10: Dynamic form renderer
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-05, V1-09
- **Description:** Given an object schema, auto-render a create/edit form by
  mapping field types to input components.
- **Acceptance criteria:**
  - [ ] Form renders correctly for at least 3 different field types
  - [ ] Submitting the form creates/updates a record via the API
  - [ ] End-to-end test covers creating and editing a record through the form
  - [ ] Pages are keyboard-navigable, and every input has a label
- **Notes:**

### V1-11: Dynamic list/table view
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-10
- **Description:** Auto-generate a data grid page for any object: list, view
  detail, delete. Wire to the V1-10 form for editing.
- **Acceptance criteria:**
  - [ ] List view shows all records for an object
  - [ ] Clicking a record opens it in the edit form
  - [ ] Delete removes a record and updates the list
  - [ ] End-to-end test covers listing, opening, and deleting a record
  - [ ] Pages are keyboard-navigable, and every input has a label
- **Notes:**

### V1-12: Basic workflow (status field)
- **Status:** [ ]
- **Completed:**
- **Size:** L
- **Depends on:** V1-11
- **Description:** Add a "status" field type with a fixed set of states and
  allowed transitions. UI to move a record between states; invalid
  transitions blocked server-side.
- **Acceptance criteria:**
  - [ ] Status field type is selectable when defining an object
  - [ ] UI only offers valid next-states for a record's current status
  - [ ] API rejects an invalid transition even if called directly
  - [ ] Automated tests cover allowed and rejected transitions
- **Notes:**

### V1-13: Object relationships
- **Status:** [ ]
- **Completed:**
- **Size:** L
- **Depends on:** V1-11
- **Description:** Support foreign keys / one-to-many relationships between
  objects, with auto-generated joined views.
- **Acceptance criteria:**
  - [ ] Schema supports a "reference" field type pointing to another object
  - [ ] Detail view for a record shows its related child records
  - [ ] Automated tests cover reference validation and related-record lookups
- **Notes:**

### V1-14: Authentication (login and sessions)
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-05
- **Description:** Single login/session layer (no roles yet) protecting API
  and UI routes.
- **Acceptance criteria:**
  - [ ] Unauthenticated requests to API/UI routes are rejected
  - [ ] Valid login grants a session that persists across page reloads
  - [ ] Automated tests cover rejected and accepted requests
- **Notes:**

### V1-15: Workflow transition rules
- **Status:** [ ]
- **Completed:**
- **Size:** L
- **Depends on:** V1-12, V1-13, V1-14
- **Description:** Let a schema define conditions that must hold before a status
  transition, including who may perform it, and record who performed each
  transition.
- **Acceptance criteria:**
  - [ ] A transition can require a condition on the record or its related records
    (e.g. at least one related record exists)
  - [ ] A transition can be restricted based on the current user (e.g. not the
    user who performed an earlier transition)
  - [ ] The user who performed each transition is recorded on the record
  - [ ] The API rejects a transition whose conditions are not met, with a clear
    error
  - [ ] Automated tests cover allowed and blocked transitions
- **Notes:**

### V1-16: Status-based locking
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-12, V1-13
- **Description:** Let a schema make a record, and its related child records,
  read-only once it reaches certain statuses.
- **Acceptance criteria:**
  - [ ] A schema can mark the statuses in which a record is read-only
  - [ ] Child records of a locked record are read-only too
  - [ ] The API rejects edits to locked records, and the UI shows them as
    read-only
  - [ ] Automated tests cover edits to locked and unlocked records
- **Notes:**

### V1-17: Calculated fields
- **Status:** [ ]
- **Completed:**
- **Size:** L
- **Depends on:** V1-13
- **Description:** Let a schema define fields whose values are calculated from
  other fields of the same record or from related records.
- **Acceptance criteria:**
  - [ ] A field can be calculated from other fields of its record (e.g. quantity
    × unit price)
  - [ ] A field can be calculated as a sum over related records
  - [ ] Calculated values update when their inputs change and cannot be edited
    directly
  - [ ] Automated tests cover both kinds of calculation
- **Notes:**

### V1-18: Proof app — procurement objects and workflow
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-12, V1-13, V1-14
- **Description:** Using the platform itself, define objects for a small
  company's procurement (Vendor, Item, Purchase Requisition, Line Item) and
  run one purchase requisition through the full workflow using the generated
  UI: Draft → Submitted → Approved / Rejected → Ordered → Received.
- **Acceptance criteria:**
  - [ ] All four objects defined via the platform's own schema tool
  - [ ] One purchase requisition can be created as a draft, submitted, and
    approved or rejected; an approved requisition can then be marked ordered
    and received, entirely through the generated UI
  - [ ] An end-to-end test runs a purchase requisition from Draft to Received
- **Notes:**

### V1-19: Proof app — business rules
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-15, V1-16, V1-17, V1-18
- **Description:** Configure the procurement app's business rules using the
  platform's workflow rules, locking, and calculated fields.
- **Acceptance criteria:**
  - [ ] A requisition with no line items cannot be submitted
  - [ ] After submission, the requisition and its line items cannot be edited
  - [ ] Line totals (quantity × unit price) and the requisition total are
    calculated automatically
  - [ ] Line item quantity must be above 0, and unit price cannot be negative
  - [ ] The submitter cannot approve their own requisition
  - [ ] Automated tests cover each business rule
- **Notes:**

### V1-20: Security hardening
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-07, V1-14
- **Description:** Review and harden the deployed app against common security
  risks.
- **Acceptance criteria:**
  - [ ] Dependencies are scanned automatically for known vulnerabilities in CI
  - [ ] No secrets are stored in the repo; configuration comes from environment
    variables
  - [ ] Security headers are set on all responses
  - [ ] API input handling is reviewed against common attacks (e.g. injection),
    with automated tests for anything found
- **Notes:**

### V1-21: Demo polish
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-19, V1-20
- **Description:** Seed realistic demo data, finish the README, and record a
  3–5 minute walkthrough of the proof app.
- **Acceptance criteria:**
  - [ ] Realistic seed data loads cleanly on a fresh install
  - [ ] README explains what the project is, how to run it, and links to the
    live demo
  - [ ] A recorded walkthrough exists and is linked from the README
  - [ ] An automated accessibility check passes on every page
- **Notes:**

---

## EPIC V2: Enterprise Features

**Goal:** Layer in enterprise-grade features, in priority order. Work top to
bottom; stop at any point and the demo is still coherent.

### V2-01: Role-based access control (RBAC)
- **Status:** [ ]
- **Completed:**
- **Size:** L
- **Depends on:** V1-14, V1-19
- **Description:** Define roles/permissions per object, enforce in the API,
  hide/show UI elements accordingly.
- **Acceptance criteria:**
  - [ ] At least 2 roles exist with different object-level permissions
  - [ ] API enforces permissions even if UI is bypassed
  - [ ] UI hides actions the current role can't perform
  - [ ] Purchase requisitions over a set amount can only be approved by a
    Manager
  - [ ] Automated tests cover permission checks for each role
- **Notes:**

### V2-02: Audit trail
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-05, V1-18
- **Description:** Track every change to a record (who, what, when), with a
  history view per record.
- **Acceptance criteria:**
  - [ ] Every create/update/delete is logged with actor and timestamp
  - [ ] A record's history is viewable in the UI
  - [ ] A purchase requisition shows who approved or rejected it, and when
  - [ ] Automated tests cover that each kind of change is logged
- **Notes:**

### V2-03: Cross-record validation
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-13, V1-18
- **Description:** Let a schema define validation rules that compare a record
  with its related records.
- **Acceptance criteria:**
  - [ ] A schema supports at least one rule that checks related records
  - [ ] All line items in a purchase requisition must come from one vendor
  - [ ] The API rejects changes that break the rule, with a clear error
  - [ ] Automated tests cover the rule
- **Notes:**

### V2-04: API documentation (OpenAPI)
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-08
- **Description:** Generate an OpenAPI specification from the object schemas
  and serve interactive API documentation, so the generated API documents
  itself.
- **Acceptance criteria:**
  - [ ] An OpenAPI spec is generated for every object's endpoints
  - [ ] Interactive API documentation is served by the app
  - [ ] Automated tests check that the spec is valid and matches the endpoints
- **Notes:**

### V2-05: API governance layer
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-04
- **Description:** Add rate limiting, API key management, and basic versioning
  to the auto-generated endpoints.
- **Acceptance criteria:**
  - [ ] Requests beyond a configured rate limit are rejected with a clear error
  - [ ] API key required for generated endpoints
  - [ ] At least one endpoint demonstrates a versioned path (e.g. /v1/, /v2/)
  - [ ] Automated tests cover rate limiting, API keys, and versioning
- **Notes:**

### V2-06: AI-assisted scaffolding
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-09
- **Description:** "Describe your app" text box that calls an AI model to
  generate a starter data model + form from natural language.
- **Acceptance criteria:**
  - [ ] Text prompt produces a valid schema in the V1-03 format
  - [ ] Generated schema is editable in the V1-09 schema editor before saving
  - [ ] Automated tests cover validating generated schemas, with the AI call
    mocked
- **Notes:**

### V2-07: Visual workflow builder
- **Status:** [ ]
- **Completed:**
- **Size:** L
- **Depends on:** V1-12
- **Description:** Replace the dropdown-based status UI with a node/edge
  visual state-machine editor.
- **Acceptance criteria:**
  - [ ] States and transitions can be added/edited visually
  - [ ] Changes in the visual editor update the enforced transition rules
  - [ ] Automated tests cover saving transition rules from the editor
- **Notes:**

### V2-08: Conditional field logic
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-10
- **Description:** Let a schema define field-level visibility/validation
  rules (e.g. show field X only if status = Y).
- **Acceptance criteria:**
  - [ ] Schema supports at least one conditional rule type
  - [ ] Form renderer correctly shows/hides or validates based on the rule
  - [ ] Automated tests cover each rule type
- **Notes:**

### V2-09: Notifications / webhooks
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-12
- **Description:** Trigger an email or outbound webhook on workflow
  transitions (e.g. notify the submitter when a purchase requisition is
  approved).
- **Acceptance criteria:**
  - [ ] At least one status transition triggers a notification
  - [ ] Notification includes relevant record context
  - [ ] Automated tests cover that a transition sends a notification
- **Notes:**

### V2-10: Visual drag-and-drop builder
- **Status:** [ ]
- **Completed:**
- **Size:** L
- **Depends on:** V1-09, V1-10
- **Description:** Upgrade the schema editor and form renderer into an actual
  drag-and-drop interface.
- **Acceptance criteria:**
  - [ ] Fields can be added/reordered via drag-and-drop
  - [ ] Resulting layout is reflected in the generated form
  - [ ] End-to-end test covers reordering fields
- **Notes:**

### V2-11: Theming / export
- **Status:** [ ]
- **Completed:**
- **Size:** L
- **Depends on:** V1-21
- **Description:** Basic branding customization per generated app, plus an
  "export as standalone app" option.
- **Acceptance criteria:**
  - [ ] At least colors/logo can be customized per app instance
  - [ ] Export produces a runnable standalone artifact
  - [ ] Automated test checks that an exported app builds and starts
- **Notes:**

### V2-12: API querying and partial updates
- **Status:** [ ]
- **Completed:**
- **Size:** M
- **Depends on:** V1-05
- **Description:** Extend the generated record endpoints with pagination,
  filtering, sorting, and PATCH (partial update).
- **Acceptance criteria:**
  - [ ] List endpoint supports pagination, with the total count in the response
  - [ ] List endpoint supports filtering by field value and sorting by any field
  - [ ] PATCH updates only the fields sent, with the same validation as PUT
  - [ ] Automated tests cover pagination, filtering, sorting, and PATCH
- **Notes:**

### V2-13: Schema editor: edit existing fields and object properties
- **Status:** [ ]
- **Completed:**
- **Size:** S
- **Depends on:** V1-09
- **Description:** Add UI to edit an existing field and an object's own
  properties (such as its label).
- **Acceptance criteria:**
  - [ ] An existing field's editable properties can be changed via the UI
  - [ ] An object's editable properties can be changed via the UI
  - [ ] End-to-end test covers editing a field and an object
- **Notes:**

---

## Progress tracking

_Last updated: 2026-11-26_

| Epic | Total stories | Done | Remaining | Remaining by size |
|---|---|---|---|---|
| V1 | 21 | 3 | 18 | 1 S · 12 M · 5 L |
| V2 | 13 | 0 | 13 | 1 S · 8 M · 4 L |
