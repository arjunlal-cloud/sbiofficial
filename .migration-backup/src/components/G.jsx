import { useRef, useState } from 'react'
import glossary from '../data/glossary.json'

const defs = Object.fromEntries(glossary.map((g) => [g.term, g.definition]))
const EDGE_MARGIN = 16

/**
 * Glossary term. Wrap a word in SOP text: <G t="Chartered">chartered</G>.
 * Desktop: tooltip on hover/focus. Mobile: tap focuses → tooltip shows,
 * tap elsewhere blurs → dismisses.
 * Tooltip is center-anchored by default; on open we measure its rect and
 * nudge it back on-screen if the anchor sits near a viewport edge.
 */
export default function G({ t, children }) {
  const def = defs[t]
  const tooltipRef = useRef(null)
  const [shift, setShift] = useState(0)
  if (!def) return children

  function reposition() {
    // wait a frame: :focus-within/:hover must flip the tooltip to display:block
    // before its rect is meaningful, and that style recalc lands after this handler
    requestAnimationFrame(() => {
      const rect = tooltipRef.current?.getBoundingClientRect()
      if (!rect || rect.width === 0) return
      if (rect.left < EDGE_MARGIN) setShift(EDGE_MARGIN - rect.left)
      else if (rect.right > window.innerWidth - EDGE_MARGIN) setShift(window.innerWidth - EDGE_MARGIN - rect.right)
      else setShift(0)
    })
  }

  return (
    // named group (group/term) — the parent Accordion <details> is also a
    // Tailwind `group`, so a bare group-hover here fires on hovering the
    // whole accordion, not just the word
    <span className="group/term relative inline-block">
      <button
        type="button"
        aria-label={`Definition of ${t}`}
        onClick={(e) => e.currentTarget.focus()}
        onFocus={reposition}
        onMouseEnter={reposition}
        className="cursor-help rounded-sm font-medium text-forest-700 underline decoration-lime-500 decoration-dotted decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
      >
        {children ?? t}
      </button>
      <span
        ref={tooltipRef}
        role="tooltip"
        style={{ transform: `translateX(calc(-50% + ${shift}px))` }}
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden w-64 max-w-[calc(100vw-2rem)] rounded-lg bg-forest-900 px-4 py-3 text-sm leading-relaxed text-paper shadow-xl group-focus-within/term:block group-hover/term:block"
      >
        <span className="mb-1 block font-mono text-xs tracking-wide text-lime-300 uppercase">{t}</span>
        {def}
      </span>
    </span>
  )
}
