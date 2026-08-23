export default function StickyMobileCta({ href, label }) {
  const external = href.startsWith('http')
  return (
    <>
      <div className="h-[4.25rem] sm:hidden" aria-hidden="true" />
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-canvas/90 px-3 py-2.5 backdrop-blur-md sm:hidden shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.5)]"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className="mx-auto block w-fit max-w-full rounded bg-gold-500 px-4 py-2.5 text-center text-xs font-medium text-canvas shadow-[0_0_20px_rgba(192,155,45,0.2)] transition-[transform,background-color] duration-200 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 hover:bg-gold-400"
        >
          {label}
        </a>
      </div>
    </>
  )
}
