/** Native <details> accordion — dramatic style. */
export default function Accordion({ title, defaultOpen = false, children, id, indexNumber }) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="group rounded-2xl border border-white/5 bg-canvas-elevated shadow-lg transition-all open:border-l-4 open:border-l-gold-500 open:border-white/10 open:shadow-xl scroll-mt-24"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-5 transition-colors duration-200 select-none hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:gap-4 sm:px-8 sm:py-6 [&::-webkit-details-marker]:hidden">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          {indexNumber && (
            <span className="font-mono text-xs font-medium text-gold-500 bg-gold-500/10 px-2 py-1 rounded-sm block min-w-[30px] text-center">
              {indexNumber}
            </span>
          )}
          <span className="min-w-0 font-display text-lg font-medium tracking-tight text-ink sm:text-2xl">{title}</span>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="min-w-0 w-full max-w-full overflow-hidden break-words [overflow-wrap:anywhere] px-4 pb-7 pt-2 text-[15px] leading-relaxed text-ink-soft sm:px-8 sm:pb-8 sm:pl-[5.25rem]">
        {children}
      </div>
    </details>
  )
}
