# SBI Network

SBI Network connects student-led chapters with local small businesses for free digital services, while giving future chapter leaders a clear path to launch their own chapter.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/sbi-network/` — public-facing React + Vite website
- `artifacts/sbi-network/src/index.css` — brand tokens, global typography, background motifs, and accessibility motion settings
- `artifacts/sbi-network/src/pages/` — landing, business, chapter, team, and story pages
- `artifacts/sbi-network/src/components/` — reusable navigation, motion, globe, map, and guide components

## Architecture decisions

- The landing introduction uses a dependency-free SVG globe and existing Framer Motion rather than a 3D service or paid visual asset.
- The SBI Guide is an explicitly deterministic route helper; it must never be presented as live AI until a real AI integration is approved.
- Asset-dependent visuals carry preview labels and unverified testimonials are not shown as fact.

## Product

- Businesses can find nearby chapters, learn what services are free, and email the right contact.
- Students can learn about chapter leadership, read the operations guide, and open the chapter application.
- Visitors can explore the organization’s story, team roles, and the upcoming donation opportunity.

## User preferences

- Avoid paid media generation, external paid APIs, and unnecessary dependencies; keep optional visual work within a $3/3-credit budget unless the user explicitly approves more.
- Do not invent testimonials, client results, or other trust-building claims. Mark temporary content as previews awaiting approved assets.
- Prioritize polished, organized, animated experiences without sacrificing working links, readability, or mobile usability.

## Gotchas

- The external text-based SVG logo cannot rely on custom web fonts, so the temporary logo is rendered inline in React until an approved asset is supplied.
- The site intentionally respects `prefers-reduced-motion`; keep any new motion compatible with that global CSS rule.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
