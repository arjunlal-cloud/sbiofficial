/** Fixed bottom action bar, mobile only — keeps the page's primary CTA one
 * tap away without scrolling back up. Renders its own spacer so it never
 * covers page content; it can still sit over the footer at max scroll,
 * which is an accepted tradeoff for keeping this a pure CSS component. */
export default function StickyMobileCta({ href, label }) {
  const external = href.startsWith('http')
  return (
    <>
      <div className="h-[4.5rem] sm:hidden" aria-hidden="true" />
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-forest-100 bg-paper/95 p-3 backdrop-blur-sm sm:hidden"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className="block rounded bg-lime-300 px-6 py-3 text-center text-sm font-semibold text-forest-950 shadow-[0_8px_24px_-8px_rgba(200,241,105,0.6)] transition-[transform,opacity] duration-200 ease-out active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
        >
          {label}
        </a>
      </div>
    </>
  )
}
