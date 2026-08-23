import { useEffect, useRef, useState } from 'react'
import glossary from '../data/glossary.json'

const defs = Object.fromEntries(glossary.map((g) => [g.term, g.definition]))
const EDGE_MARGIN = 16

export default function G({ t, children }) {
  const def = defs[t]
  const termRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState({ display: 'none' })

  function updatePosition() {
    const rect = termRef.current?.getBoundingClientRect()
    if (!rect) return

    const width = Math.min(288, window.innerWidth - EDGE_MARGIN * 2)
    const idealLeft = rect.left + rect.width / 2 - width / 2
    const left = Math.max(EDGE_MARGIN, Math.min(idealLeft, window.innerWidth - EDGE_MARGIN - width))
    const placeBelow = rect.top < 160

    setTooltipStyle({
      display: 'block',
      position: 'fixed',
      left: `${left}px`,
      top: placeBelow ? `${rect.bottom + 12}px` : `${rect.top - 12}px`,
      width: `${width}px`,
      transform: placeBelow ? 'none' : 'translateY(-100%)',
    })
  }

  useEffect(() => {
    if (!open) return undefined
    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open])

  if (!def) return children

  return (
    <span ref={termRef} className="group/term relative inline">
      <button
        type="button"
        aria-label={`Definition of ${t}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onFocus={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onBlur={() => setOpen(false)}
        className="inline cursor-help rounded-sm border-0 bg-transparent p-0 align-baseline font-medium text-gold-400 underline decoration-gold-500/40 decoration-dotted decoration-2 underline-offset-4 transition-colors hover:text-gold-300 hover:decoration-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
      >
        {children ?? t}
      </button>
      {open && (
        <span
          role="tooltip"
          style={tooltipStyle}
          className="pointer-events-none z-[80] rounded-xl border border-white/10 bg-canvas-elevated px-5 py-4 text-[13px] leading-relaxed text-ink shadow-2xl"
        >
          <span className="mb-2 block font-mono text-[10px] tracking-widest text-gold-500 uppercase">{t}</span>
          {def}
        </span>
      )}
    </span>
  )
}
