# SBI Network multi-page website

React/Vite site for SBI Network: a Figma-inspired scroll-controlled landing page, responsive supporting routes, and multi-step application/request forms. This remains a review draft, not a launch-ready product; see `README.md` for current blockers.

## Run & Operate

- Use the managed `artifacts/figma-design: web` workflow for the preview at `/`.
- `pnpm --filter @workspace/figma-design run build` — build the static frontend.
- Chapter applications and business requests use internal progress forms. Custom email delivery is unavailable until an SBI-owned sender address is configured; keep the existing external form links as fallbacks. There is no member login.
- Existing landing-page links without confirmed destinations use the public contact email rather than fabricated program, social-profile, or app-store URLs.
- The animated reference is frame 179:153 in the Figma keyframe timeline: https://www.figma.com/design/G4ZwD09wMD1xasjvxlmTLB/sbi-new--Copy-?timeline=keyframe&node-id=179-153
- This is a full, scroll-controlled landing website, not a video. Preserve the authored Figma/video choreography—including the advanced arrow movement and coordinated transformations—rather than substituting generic section reveals. Scrolling controls progression; never autoplay or loop, and stop at the footer.
- Use the latest full-page composition (frame 151:22) for content and the supplied recording/keyframes (frame 179:153) as motion references, not as a fixed 736px page size. Fill the desktop viewport, keep Signup/Login visible, and show the complete footer underneath the closing headline without clipping its links or icons.
- The separately linked `sbi-new` file is a different, earlier static concept; do not combine its alternative layout into the latest page without direction.
- MADE Okine Sans PERSONAL USE, mooxy, and Origin font files were not supplied. Their local font declarations are preserved, with Outfit and Fraunces fallbacks; Instrument Sans is used by the footer.
- The Figma footer shader uses its authored WGSL source through WebGPU. Browsers without WebGPU show the original source image.
- The API server provides form readiness and optional Resend delivery. The database is not currently used by public form submissions.
- `pnpm --filter @workspace/api-server run dev` — run the API server workflow.
- `pnpm --filter @workspace/figma-design run check` — typecheck the website.
- `pnpm --filter @workspace/figma-design run build` — build the website.
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Form email delivery requires `SBI_RESEND_FROM_EMAIL` using a verified SBI-owned sender domain. Do not configure an unrelated sender domain.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/figma-design/client/src/components/sbi/` — Figma landing page and responsive scroll motion.
- `artifacts/figma-design/client/src/components/site/` — shared navigation, content shell, and form wizard.
- `artifacts/figma-design/client/src/pages/` — website routes.
- `artifacts/figma-design/client/src/data/siteContent.ts` — public contact, form fallbacks, verified network services, and known chapter locations.
- `artifacts/api-server/src/routes/forms.ts` — readiness check and optional form email delivery.
- `README.md` — review status, launch blockers, and release checklist.

## Architecture decisions

- Desktop landing continues to use the authored Figma scene; mobile uses responsive content with a scroll-linked timeline.
- Application/request data is not stored in a database. The current submission path is email when an approved sender is configured; otherwise the external form is the fallback.
- Chapter-level service availability and contact details are not inferred from network-wide service names.

## Product

The landing page is the main entry point. Supporting pages cover starting a chapter, business services and requests, the network, approved team information, and the interim chapter guide. The application and request wizards are professional multi-step forms with progress percentages; delivery still depends on the sender-domain blocker listed in `README.md`.

## User preferences

- Preserve the approved Figma desktop composition and authored motion when improving mobile behavior and navigation.
- Keep the landing page scroll-driven, reversible, and a website—not an autoplay video.
- Use the other SBI sites for verified copy and functional ideas, not as replacement design systems.

## Gotchas

- The chapter manual is a temporary working copy; do not publish policies marked `VERIFY`.
- The API readiness check currently reports email delivery unavailable until `SBI_RESEND_FROM_EMAIL` is configured with an SBI-owned verified sender address.
- The current landing-page star rating and “20+ Businesses” proof point still need owner verification before release.
- There is no member login; do not label the chapter application as login.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
