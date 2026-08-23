# SBI Network

Website for the SBI (Student Business Initiative) Network — two paths, one site:
local business owners looking for free services, and students looking to start a chapter.

## Stack

React + Vite + Tailwind v4, react-router-dom for routing, react-leaflet for the chapter map.
No backend — all content lives in `src/data/`.

```
src/
├── data/
│   ├── chapters.json   Chapter locations, services, contact (add chapters here)
│   ├── glossary.json   Glossary term definitions
│   └── sop.jsx         SOP content by Part, with <G t="Term"> glossary markers inline
├── components/
│   ├── ChapterMap.jsx  Shared Leaflet map (used on /business and /chapter)
│   ├── Accordion.jsx   Native <details> accordion for the SOP
│   ├── G.jsx           Glossary term — tooltip on hover (desktop) / tap (mobile)
│   └── Layout.jsx       Nav + footer (contact email/phone)
└── pages/
    ├── Landing.jsx      /
    ├── Business.jsx     /business
    └── Chapter.jsx      /chapter
```

## Run

```bash
npm install
npm run dev      # → http://localhost:5173
npm run build
node check.mjs   # puppeteer: screenshots all routes at desktop+mobile,
                  # checks console errors, layout overflow, and key interactions
```

## Content notes

- Chapter data: `src/data/chapters.json` — only EBSBI for now.
- SOP source of truth: the org's SOP draft doc — update `src/data/sop.jsx` when it changes,
  keeping glossary terms marked with `<G t="Term">word</G>` only where the definition
  genuinely isn't already right there in the sentence.
- `APPLY_FORM_URL` in `src/pages/Chapter.jsx` is a placeholder — swap in the real
  "Apply to be a Chapter Leader" Google Form URL when it's ready.
- Exec team photos in `src/pages/Chapter.jsx` (`execRoles`) are placeholder tiles —
  swap for real `<img>` tags once headshots are ready.
