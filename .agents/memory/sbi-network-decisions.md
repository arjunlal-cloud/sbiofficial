---
name: SBI Network — Design & Build Decisions
description: Key decisions, constraints, and patterns established during the SBI Network visual overhaul. Read before any future work on this artifact.
---

# SBI Network — Design & Build Decisions

## Brand

**Color system (confirmed):** Navy/gold dark canvas. Deep navy-black canvas (`#080d1a`), warm white text (`#eef3ff`), gold accent (`#c09b2d`). Tokens live in `artifacts/sbi-network/src/index.css` @theme block. User confirmed this direction over neon/techy alternatives (though they flagged willingness to revert to original green if it still feels lame after polish).

**Typography:** Space Grotesk (display/headings, 400–500 weight, tight negative tracking -0.03 to -0.04em), Inter (body), IBM Plex Mono (eyebrow labels, uppercase + wide tracking).

**Logo:** No real logo file yet. Using inline React `SBILogo` component in `Layout.jsx` — white "SBI" + gold SVG growth-arrow mark + gold "Network". Comment in code: `// LOGO PLACEHOLDER`. Do NOT use an external SVG file for the logo — Space Grotesk won't load in external SVG `<text>` elements.

**Gold hex:** `#c09b2d` is estimated from draft logo images. Confirm and update once real logo file arrives.

## Architecture

**Content:** Page content remains static in `src/data/chapters.json`, `src/data/sop.jsx`, and `src/data/glossary.json`; the live Ask SBI Concierge is the only server-backed feature and is intentionally stateless.

**Routing:** react-router-dom BrowserRouter. 5 routes: `/`, `/business`, `/chapter`, `/team`, `/about`. Keep this — don't change.

**Animation system:** Framer Motion throughout. `FadeIn` and `StaggerContainer` components in `src/components/FadeIn.jsx` handle scroll-triggered reveals. Do NOT use `animate` without `whileInView` — sections start at opacity:0 and animate on scroll.

## Intro visual direction

The three `/enter` scenes intentionally use distinct lightweight visuals: connected globe/network, laptop/interface, and handshake/local partnership. The latter two are inline SVG/Framer Motion illustrations rather than uploaded images, generated media, 3D libraries, or paid services.

**Why:** The introduction needed clearer narrative progression while respecting the project's very limited budget, existing navy/gold identity, and no-unnecessary-dependencies constraint.

**How to apply:** Preserve the scene order and visual distinction if the intro is refined later; prefer edits to the existing SVG/CSS motion over adding external assets or animation packages.

**Custom cursor:** `src/components/CustomCursor.jsx` — gold dot + lagging ring. Registered in `App.jsx`. CSS hides native cursor on pointer-fine devices via `cursor: none !important` in index.css.

**Noise grain overlay:** Fixed in `Layout.jsx` — a data URI SVG FeTurbulence filter repeating at 200px, mix-blend-overlay opacity 0.04. This adds the film grain texture across the whole site.

## Key Component Patterns

**RotatingText (Landing hero):** Uses `AnimatePresence mode="wait"`. Invisible sizer is "Social Media" (widest word in cycle) with `whitespace-nowrap` to prevent wrapping at large type sizes. The outer span uses `relative inline-block`; the rotating word uses `absolute left-0 whitespace-nowrap`.

**Hero h1 structure:** Uses `<span className="block">` for each line (NOT `<br />` tags, which create double line-height gaps with large type and absolute-positioned rotating text).

**ChapterMap:** react-leaflet MapContainer + Circle for radius overlay. Map tiles use CARTO light_all; CSS filter in index.css darkens/navy-tints them. Circle radius parsed from `chapters.json` `radius` field ("5 miles" → meters).

**Team cards:** Click to expand role description via React useState `openCard`. framer-motion AnimatePresence toggles between hint text and description.

**SOP Playbook (Chapter page):** Renamed "Chapter Operations Guide." Horizontal scrollable pill navigation at top (01–07) that scrollIntoView the relevant accordion. Accordion uses native `<details>` — do NOT rewrite its core logic.

**Responsive layout rule:** Never combine percentage grid tracks that total 100% with an added gap; use flexible `minmax(0, fr)` tracks and `min-w-0` on split-content children so text and maps can shrink inside their container.

**Why:** The chapter coverage layout overflowed at desktop widths because its percentage tracks consumed the full container before the gap was added.

**How to apply:** Use this whenever a chapter page section pairs narrative content with a map or other wide visual.

## Business page map section
2-column layout: `md:grid-cols-[35%_65%]`. Left: "Find Your Chapter" heading + chapter cards from `chapters.json` + "Don't see your area?" CTA. Right: ChapterMap taking full column height.

## Chapters data
One chapter: East Brunswick SBI (EBSBI). Lat/lng is in NJ. Services: Websites, Promo Videos, Branding, Social Media. Radius: "5 miles (founder-decided, placeholder)".

## Content
Contact email: `sbinetwork.official@gmail.com`  
Phone: `(201) 988-9390`  
Apply form: Google Forms URL in Chapter.jsx  
Exec form: Google Forms URL in Team.jsx  
11 exec roles total in Team.jsx execTeam array.

## What NOT to break
- Accordion.jsx logic (restyle only, never change native `<details>` structure)
- G.jsx glossary tooltip logic
- StickyMobileCta.jsx logic
- ChapterMap.jsx base react-leaflet structure (just restyle wrapper/popup content)
- App.jsx routing
- All Google Forms / mailto links

## Donation section
Placeholder on About page. Button is disabled (opacity-70, cursor-not-allowed, disabled attr). Label: "Donation page coming soon." Will need real payment page later.

## Team photos & exec roles (updated Aug 2026)
4 approved portraits live in `public/team/`: Da'El Kim (CEO), James Yu (COO), Ekam Kaur (CMO), Aarav Sharma (Video Training Lead). Exec C-suite roles: CEO=Da'El, CGO=Arlin, CMO=Ekam, CFO=Neel, COO=James, CTO=Arjun. CGO/CFO/CTO are placeholder cards (no portrait yet). Founder/Co-Founder labels removed everywhere. Team.jsx cards use per-member `photoPosition` object-position to keep faces framed in 4:3 crop.

**Publish rules (owner-set):** never publish a portrait without a confirmed name + role + explicit permission; never use iMessage screenshots as final images — originals only. Jaymond Wong's portrait is approved but his role is undecided → stays unpublished. The "eb sbi" logo is the East Brunswick *chapter* mark only, not the network logo. Group photos (Magnifico's, library) and video await captioning/participant approval before use.

## Pending (do these next)
- Real logo file from Da'El → replace SBILogo component with `<img src="/logo.svg">`
- Real testimonials → update Landing.jsx testimonials section
- Confirm gold hex from real logo
- Jaymond Wong role confirmation → then publish his approved portrait
- Group photos/video captioning + approval before any gallery use

## AI Concierge (live)
SBIGuide.jsx is now a live streaming AI chat ("Ask SBI") backed by POST /api/openai/conversations/:id/messages in the api-server (Replit OpenAI AI Integration, gpt-5-nano). Cost guards (user demanded <30¢ total): system prompt is sole knowledge source, history capped at 6 turns, input 400 chars, 12 user messages per session, short-answer instruction in prompt. No DB persistence — deliberate, keep it stateless. Handshake scene 3 uses scaled lucide handshake line-art paths (HANDSHAKE_PATHS) with pathLength draw-on; user rejected earlier filled pseudo-realistic hands.

**Mobile streaming rule:** Never run smooth scrolling on every streamed token in the Concierge; iOS can queue overlapping scroll animations and appear frozen. Use frame-throttled instant scrolling while streaming, a short client timeout, and deterministic fallback copy.
