# SBI Network website

> **Status: review draft, not a final product and not ready to launch.** The site has a working visual and navigation prototype, but several operational and content decisions still need SBI approval. Do not present it as final or production-ready.

SBI Network is a student-led network of digital agency chapters. Local chapters connect student talent with nearby businesses for no-cost digital support; service availability varies by chapter.

## What works in this draft

- The Figma-inspired desktop landing composition and scroll-controlled timeline.
- A responsive mobile landing page with scroll-linked, reversible motion and quick section navigation.
- A final student/business choice with direct routes into the chapter application and business request flow.
- Footer links limited to real SBI pages and the public inbox; unapproved social and app-store links are omitted.
- Supporting routes for About, Chapter, Business, Team, Manual, Apply, and Request.
- Internal chapter-application and business-request wizards with validation, review steps, and completion percentages.
- Existing external form links as a fallback when SBI email delivery is unavailable.
- Reduced-motion handling and keyboard-operable site navigation.

These are implementation claims for the current draft, not final release approval. Test important flows on actual phones and desktop browsers before launch.

## Remaining work before this can be final

### SBI content and approvals

- Replace the temporary chapter operations manual with the approved official manual. Do not publish any unconfirmed policy marked `VERIFY`.
- Confirm each chapter's current status, services, service area, and public contact. Do not infer local availability from network-wide service names.
- Confirm or remove the Figma star rating and “20+ Businesses” claim. Do not imply reviews, impact, results, or volume without an approved source.
- Approve public team names and roles. Add social profiles or app-store listings only after SBI supplies verified URLs.
- Decide whether member login is in scope. Authentication, member access, and roles are not implemented.

### Forms, email, and privacy

- Configure email delivery only after SBI verifies a sender address on an SBI-owned domain and sets `SBI_RESEND_FROM_EMAIL`. `GET /api/forms/status` currently returns `{"ready":false}`; do not use another organization's sender domain.
- Confirm the submission recipient, delivery workflow, and what happens when email delivery fails. The current public inbox is not an approved sender address.
- Approve privacy, data-retention, and follow-up disclosures before collecting real submissions. Test successful delivery, validation errors, and failure states end to end.
- Keep the supplied external form fallback visible until the professional forms are confirmed to deliver reliably.

### Design, accessibility, and quality

- Get final design sign-off by comparing all sections, arrows, transitions, and closing states with the approved Figma and video references. Preserve the approved desktop timeline; mobile choreography remains an implementation draft, not a claim of pixel-identical motion.
- Test on real phones, tablet, and desktop browsers. Verify scroll-driven motion, text spacing, navigation, route links, touch targets, keyboard access, and reduced-motion behavior.
- Check screen-reader labels and focus order on navigation and multi-step forms.
- Measure performance on target phones and review the 535.65 kB JavaScript chunk warning. Investigate the preview's nonfatal WebGPU-context warning and verify the fallback across browsers before deciding whether to split or replace anything.

### Repository handoff and release

- The requested GitHub destination is `https://github.com/arjunlal-cloud/sbiofficial`. The `main` branch is being replaced with this pnpm workspace; its previous commits remain in history, but the previous standalone site's files and Vercel SPA configuration will no longer be at the branch tip.
- Production hosting is not configured or verified for this workspace. Reassess the deployment build and API hosting before relying on Vercel or another production host; do not assume the old Vercel setup still applies.
- Keep temporary manuals, internal agent notes, migration backups, and generated output out of the public repository.
- Complete final regression checks and SBI approval before treating the site as production-ready.

Until these items are resolved and approved, treat this as a review draft—not a production website.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/about` | Network overview |
| `/chapter` | Starting a chapter |
| `/business` | Business services and coverage |
| `/request` | Business request form |
| `/apply` | Chapter application |
| `/team` | Public team information |
| `/manual` | Chapter guide |

## Forms and delivery

The form pages use the generated API client and the API server's `/api/forms/status` and `/api/forms/:kind` endpoints. The recipient inbox is `sbi.official@gmail.com`; it is not an approved sending address. Until an SBI-owned sender domain is verified, the site must clearly state that custom email delivery is unavailable and keep the supplied external form fallback visible.

## Run and verify

```sh
pnpm install --frozen-lockfile
pnpm --filter @workspace/figma-design run dev
pnpm --filter @workspace/figma-design run check
pnpm --filter @workspace/figma-design run build
```

Run the API in a second terminal when testing form submission:

```sh
pnpm --filter @workspace/api-server run dev
```

The configured Replit workflows are `artifacts/figma-design: web` and `artifacts/api-server: API Server`.

## Project map

- `artifacts/figma-design/client/src/components/sbi/` — Figma-based landing page, desktop scene, and mobile motion.
- `artifacts/figma-design/client/src/components/site/` — shared supporting-page shell and multi-step forms.
- `artifacts/figma-design/client/src/pages/` — route pages.
- `artifacts/figma-design/client/src/data/siteContent.ts` — verified network service names, chapter locations, links, and public contact.
- `artifacts/api-server/src/routes/forms.ts` — form readiness, validation, rate limiting, and optional Resend delivery.

## Content and design rules

- Keep the approved Figma desktop composition and authored motion intact while refining navigation and mobile behavior.
- The reference websites are sources for verified text and functional ideas, not replacement design systems.
- Use only confirmed SBI-wide claims. Chapter-specific services, contacts, coverage, staff, pricing, outcomes, and testimonials require confirmation.
- The temporary operations manual is intentionally not included in this repository. Use only an approved official manual for final policy content.
