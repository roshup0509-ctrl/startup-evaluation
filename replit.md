# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

- **startup-eval** (`/`) — AI Startup Evaluation System: React + Vite admin-dashboard style web app for evaluating startup ideas. Pages: login, dashboard (animated stats), evaluate, results (gauge, radar, SWOT, roadmap, confetti on high score), suggestions, history, idea bank, profile, printable report, side-by-side Compare with multi-radar, AI Advisor chatbot, auto-generated 10-slide Pitch Deck (`/pitch-deck/:id`), 5-Year Financial Forecast (`/forecast/:id`), and Market Position Map (`/market-map/:id`). Frontend-only, data persisted to localStorage. Demo creds: admin@startup.ai / admin123.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
