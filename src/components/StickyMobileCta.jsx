import { useEffect } from 'react'
import { Link } from 'wouter'

/**
 * Persistent CTA on small screens.
 *
 * The bottom padding uses env(safe-area-inset-bottom), which only resolves to a
 * real value because index.html now sets viewport-fit=cover — without it the
 * bar can sit under the iOS home indicator.
 */
export default function StickyMobileCta({ href, label, onClick }) {
  /* The bar is fixed, so something has to reserve its height at the end of the
     document. An in-flow spacer inside the page could not do that job: the
     footer is rendered by Layout, *after* the page, so the spacer pushed the
     page down and the bar went on covering the copyright line anyway. Flagging
     the body instead lets the padding land on the last element on the screen,
     and only on the routes that actually mount a bar. */
  useEffect(() => {
    document.body.classList.add('has-sticky-cta')
    return () => document.body.classList.remove('has-sticky-cta')
  }, [])

  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  const isHash = href.startsWith('#')
  const isRoute = !isExternal && !isHash

  const className =
    'focus-gold block w-full rounded-xl bg-gold-500 px-5 py-3.5 text-center text-body font-semibold text-white shadow-[0_8px_28px_-8px_rgba(18,61,105,0.34)] transition-transform duration-200 active:scale-[0.98]'

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(11,31,58,0.12)] bg-white/92 px-5 py-3 backdrop-blur-md sm:hidden"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        {isRoute ? (
          <Link 
            href={href} 
            className={className} 
            onClick={onClick}
            data-testid="link-sticky-mobile"
          >
            {label}
          </Link>
        ) : (
          <a
            href={href}
            target={isExternal && !href.startsWith('mailto:') ? '_blank' : undefined}
            /* noopener rather than noreferrer, so the form can attribute it. */
            rel={isExternal ? 'noopener' : undefined}
            className={className}
            onClick={onClick}
            data-testid="link-sticky-external"
          >
            {label}
          </a>
        )}
      </div>
    </>
  )
}
