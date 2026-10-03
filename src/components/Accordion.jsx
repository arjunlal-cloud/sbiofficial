/**
 * Native <details> disclosure.
 *
 * Open state is signalled by a filled index chip, a brightened rule, and the
 * chevron rotation. No coloured side-stripe: the emphasis lives in the type.
 */
export default function Accordion({ title, defaultOpen = false, children, id, indexNumber }) {
  return (
    <details
      id={id}
      open={defaultOpen}
      className="group scroll-mt-28 border-t border-[rgba(11,31,58,0.14)] transition-colors duration-300 open:border-gold-500/40"
      data-testid={id ? `accordion-${id}` : `accordion-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <summary 
        className="flex cursor-pointer list-none select-none items-center justify-between gap-4 py-4 transition-colors duration-300 hover:text-gold-300 focus-gold [&::-webkit-details-marker]:hidden"
        data-testid={id ? `summary-${id}` : `summary-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex min-w-0 items-center gap-5">
          {indexNumber && (
            <span className="shrink-0 font-mono text-label tracking-label text-ink-soft transition-colors duration-300 group-open:text-gold-400">
              {indexNumber}
            </span>
          )}
          <span className="min-w-0 font-display text-display-sm font-medium leading-snug tracking-display text-ink transition-colors duration-300 group-open:text-gold-300 sm:text-display-sm">
            {title}
          </span>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0 text-ink-soft transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-180 group-open:text-gold-400"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="max-w-measure break-words pb-7 pl-0 text-body leading-relaxed text-ink [overflow-wrap:anywhere] sm:pl-[3.6rem]">
        {children}
      </div>
    </details>
  )
}
