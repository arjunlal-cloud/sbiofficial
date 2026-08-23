/** Native <details> accordion — no JS state, keyboard accessible for free. */
export default function Accordion({ title, defaultOpen = false, children }) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-xl border border-forest-100 bg-card shadow-[0_2px_12px_-4px_rgba(4,63,46,0.12)] open:shadow-[0_8px_24px_-8px_rgba(4,63,46,0.18)]"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 font-display text-lg font-semibold text-forest-900 transition-colors duration-200 select-none hover:bg-forest-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 sm:px-7 sm:text-xl [&::-webkit-details-marker]:hidden">
        {title}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0 text-forest-700 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="px-5 pt-1 pb-6 sm:px-7">{children}</div>
    </details>
  )
}
