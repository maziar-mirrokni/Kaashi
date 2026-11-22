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
| [0009](0009-use-github-actions-for-ci.md) | Use GitHub Actions for continuous integration | Accepted | V1-02 |
| [0010](0010-use-biome-for-linting-and-formatting.md) | Use Biome for linting and formatting | Accepted | V1-02 |
| [0011](0011-ci-pipeline-single-workflow-and-job.md) | Run CI as one workflow with one job on every push and pull request | Accepted | V1-02 |
| [0012](0012-use-lf-line-endings.md) | Use LF line endings in the repository and in working copies | Accepted | V1-02 |
| [0013](0013-protect-main-with-a-ruleset.md) | Protect main with a branch ruleset and squash-only merging | Accepted | V1-02 |
| [0014](0014-local-checks-with-npm-scripts.md) | Run checks locally with npm scripts and editor support, without git hooks | Accepted | V1-02 |
| [0015](0015-show-ci-status-badge-in-readme.md) | Show the CI status badge in the README | Accepted | V1-02 |
