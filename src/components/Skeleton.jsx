/**
 * Skeleton placeholders.
 *
 * Shown while a lazily-loaded route or the map chunk is in flight. The shapes
 * mirror the real layout — hero kicker, two headline lines, a paragraph, two
 * buttons, then a card row — so the page does not visibly jump when the real
 * content swaps in.
 *
 * `aria-hidden` throughout, with a single polite live region announcing the
 * load, so a screen reader hears "Loading" once instead of reading out a
 * dozen empty boxes.
 */

function Bar({ className = '' }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />
}

/** Route-level fallback. Mirrors a hero plus the first content section. */
export function PageSkeleton() {
  return (
    <div className="w-full bg-canvas">
      <span className="sr-only" role="status" aria-live="polite">
        Loading
      </span>

      {/* Hero */}
      <section className="hero-h section-y-lg relative flex items-center overflow-hidden px-5 sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/75 via-transparent to-navy-50/50" />
        <div className="relative z-10 mx-auto w-full max-w-page">
          {/* kicker */}
          <Bar className="h-3 w-52 rounded-full" />
          {/* headline, two lines */}
          <Bar className="mt-5 h-[clamp(2.1rem,5vw,3.4rem)] w-[min(100%,22rem)] rounded-lg" />
          <Bar className="mt-3 h-[clamp(2.1rem,5vw,3.4rem)] w-[min(100%,28rem)] rounded-lg" />
          {/* paragraph */}
          <div className="mt-7 max-w-measure space-y-2.5">
            <Bar className="h-3.5 w-full rounded-full" />
            <Bar className="h-3.5 w-[92%] rounded-full" />
            <Bar className="h-3.5 w-[64%] rounded-full" />
          </div>
          {/* buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Bar className="h-14 w-full rounded-xl sm:w-52" />
            <Bar className="h-14 w-full rounded-xl sm:w-52" />
          </div>
          {/* proof line */}
          <Bar className="mt-6 h-3 w-72 max-w-full rounded-full" />
        </div>
      </section>

      {/* First content section: heading plus a three-card row */}
      <section className="section-y border-t border-[rgba(11,31,58,0.10)] px-5 sm:px-8">
        <div className="mx-auto max-w-page">
          <Bar className="h-3 w-40 rounded-full" />
          <Bar className="mt-4 h-[clamp(1.6rem,3vw,2.3rem)] w-[min(100%,20rem)] rounded-lg" />

          <div className="mt-7 grid gap-5 md:grid-cols-3 md:gap-7">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border-t border-[rgba(11,31,58,0.14)] pt-4">
                <Bar className="h-8 w-12 rounded" />
                <Bar className="mt-4 h-4 w-3/4 rounded-full" />
                <Bar className="mt-3 h-3 w-full rounded-full" />
                <Bar className="mt-2 h-3 w-5/6 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/** Fills the map container while the Leaflet chunk loads. */
export function MapSkeleton() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-canvas-surface">
      <span className="sr-only" role="status" aria-live="polite">
        Loading map
      </span>
      <div className="skeleton absolute inset-0 rounded-none" aria-hidden="true" />
      {/* Chapter switcher and legend, in their real positions. */}
      <div className="absolute left-3 top-3 flex gap-1.5" aria-hidden="true">
        <Bar className="h-9 w-28 rounded-lg" />
        <Bar className="h-9 w-24 rounded-lg" />
      </div>
      <div className="absolute bottom-3 left-3 space-y-2" aria-hidden="true">
        <Bar className="h-3 w-24 rounded-full" />
        <Bar className="h-3 w-40 rounded-full" />
      </div>
    </div>
  )
}
