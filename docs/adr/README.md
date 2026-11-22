# Architecture decision records

Design decisions for Kaashi, in the [MADR](https://adr.github.io/madr/) format.
To add one, copy [0000-template.md](0000-template.md) to the next number.
ADRs are never renumbered or deleted; a changed decision gets a new ADR that
supersedes the old one.

| ADR | Decision | Status | Story |
|---|---|---|---|
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions as MADR files in docs/adr | Accepted | V1-01 |
| [0002](0002-use-typescript-for-backend-and-frontend.md) | Use TypeScript for both the backend and the frontend | Accepted | V1-01 |
| [0003](0003-monorepo-with-npm-workspaces.md) | Organise the code as a monorepo with npm workspaces | Accepted | V1-01 |
| [0004](0004-use-fastify-for-the-backend.md) | Use Fastify as the backend web framework | Accepted | V1-01 |
| [0005](0005-use-react-with-vite-for-the-frontend.md) | Use React with Vite for the frontend; choose a component library later | Accepted | V1-01 |
| [0006](0006-use-vitest-for-unit-and-api-tests.md) | Use Vitest for unit and API tests; choose the end-to-end tool in V1-09 | Accepted | V1-01 |
| [0007](0007-node-22-runtime-and-development-setup.md) | Run on Node 22 with ES modules; start both apps with one dev command | Accepted | V1-01 |
| [0008](0008-git-repository-and-branching.md) | Host the code in a public GitHub repo; one branch per story | Accepted | V1-01 |
