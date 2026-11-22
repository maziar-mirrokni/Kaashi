# Kaashi

[![CI](https://github.com/maziar-mirrokni/Kaashi/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/maziar-mirrokni/Kaashi/actions/workflows/ci.yml?query=branch%3Amain)

Kaashi is a schema-driven low-code platform. You describe your business
objects (their fields, types, relationships and workflow) and Kaashi generates
the API, the forms and the list views from that description, with no
hand-written code per object.

The proof app is **procurement for a small company**: vendors, items, purchase
requisitions and line items, with a requisition moving through an approval
workflow from Draft to Received.

## Status

Early development. The project skeleton runs: a backend with a health check
and a placeholder web page. The schema-driven features come next.

Progress is tracked story by story in [BACKLOG.md](BACKLOG.md):

- **V1: MVP.** A working platform that defines a data model, generates an API
  and UI for it, runs a status workflow, and demonstrates the procurement app
  end to end.
- **V2: Enterprise features.** Roles and permissions, audit trail, API
  documentation and governance, visual builders, and more.

## Running Kaashi

You need [Node.js](https://nodejs.org/) 22.13 or later (22.x).

```sh
git clone https://github.com/maziar-mirrokni/Kaashi.git
cd Kaashi
npm install
npm run dev
```

Then open <http://localhost:5173>. The page shows "API status: Connected"
when the backend is running. The API itself listens on
<http://127.0.0.1:3000>; try <http://127.0.0.1:3000/api/health>.

Configuration is optional. To change the defaults, copy `.env.example` to
`.env` and edit it.

| Task | Command |
|---|---|
| Run the tests | `npm test` |
| Lint | `npm run lint` |
| Format the code | `npm run format` |
| Run every check CI runs | `npm run check` |
| Type-check | `npm run typecheck` |
| Build | `npm run build` |
| Start the built backend | `npm start` |

A one-command run that needs no local Node install is planned (V1-06).

### Project layout

| Folder | Contents |
|---|---|
| `apps/server` | Backend API (Fastify, TypeScript) |
| `apps/web` | Web app (React, Vite, TypeScript) |
| `packages/shared` | Code shared by the backend and the web app |
| `docs/adr` | Architecture decision records |

## Live demo

Not available yet. A public demo will be deployed automatically from `main`
once continuous deployment is set up.

## Design decisions

Architecture decisions are recorded in [docs/adr/](docs/adr/) in the
[MADR](https://adr.github.io/madr/) format.

## License

[MIT](LICENSE)
