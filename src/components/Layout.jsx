import { Link, useLocation } from 'wouter'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Wordmark } from './Brand'

const CONTACT_EMAIL = 'ebsbi.official@gmail.com'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/chapter', label: 'For students' },
  { to: '/business', label: 'For businesses' },
  { to: '/team', label: 'Our team' },
]

const NAV_LEFT = NAV.filter((item) => ['/', '/chapter', '/business'].includes(item.to))
const NAV_RIGHT = NAV.filter((item) => ['/about', '/team'].includes(item.to))

const EXTRA_NAV = [
  { to: '/manual', label: 'Chapter leader guide' },
  { to: '/apply', label: 'Application' },
]

const navLink = (isActive) =>
  `flex min-h-[44px] items-center whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-300 ${
    isActive ? 'text-navy-900 bg-canvas-elevated' : 'text-ink-soft hover:text-navy-900 hover:bg-canvas-elevated/50'
  }`

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [location] = useLocation()
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  useEffect(() => {
    closeMenu()
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [location, closeMenu])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !menuRef.current) return

      const focusables = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const onPointerDown = (event) => {
      if (menuRef.current?.contains(event.target)) return
      if (toggleRef.current?.contains(event.target)) return
      closeMenu()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    menuRef.current?.querySelector('a, button')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [isMenuOpen, closeMenu])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas font-body text-ink selection:bg-gold-200/50">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
        <nav
          className={`relative mx-auto grid max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-full border border-canvas-border px-3 transition-all duration-500 sm:px-4 ${
            scrolled
              ? 'bg-white/95 py-3 shadow-lg shadow-navy-900/5 backdrop-blur-xl'
              : 'bg-white/80 py-4 shadow-sm backdrop-blur-md'
          }`}
        >
          <div className="flex min-w-0 items-center justify-start">
            <div className="hidden items-center gap-0.5 lg:flex">
              {NAV_LEFT.map((item) => {
                const isActive = item.to === '/' ? location === '/' : location.startsWith(item.to)
                return (
                  <Link key={item.to} href={item.to} className={navLink(isActive)}>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <Link
            href="/"
            className="flex min-h-[44px] shrink-0 items-center justify-center rounded-full px-2"
            aria-label="SBI home"
          >
            <Wordmark />
          </Link>

          <div className="flex min-w-0 items-center justify-end">
            <div className="hidden items-center gap-0.5 lg:flex">
              {NAV_RIGHT.map((item) => {
                const isActive = location.startsWith(item.to)
                return (
                  <Link key={item.to} href={item.to} className={navLink(isActive)}>
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="ml-3 hidden items-center gap-4 lg:flex">
              <Link href="/manual" className="whitespace-nowrap text-sm font-medium text-ink-soft transition-colors hover:text-navy-900">
                Resources
              </Link>
              <Link href="/apply" className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-navy-900 px-5 text-sm font-medium text-white transition-colors hover:bg-navy-800">
                Apply to lead
              </Link>
            </div>

            <button
              ref={toggleRef}
              type="button"
              className="grid h-[44px] w-[44px] place-items-center rounded-full text-ink-soft transition-colors hover:bg-canvas-elevated hover:text-ink lg:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                {isMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 top-[calc(100%+0.5rem)] flex flex-col gap-2 rounded-3xl border border-canvas-border-strong bg-white/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {NAV.map((item) => {
              const isActive = item.to === '/' ? location === '/' : location.startsWith(item.to)
              return (
                <Link 
                  key={item.to} 
                  href={item.to} 
                  className={`flex h-12 items-center rounded-xl px-4 text-base font-medium ${isActive ? 'bg-canvas-elevated text-navy-900' : 'text-ink'}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              )
            })}
            <div className="my-2 h-px bg-canvas-border" />
            {EXTRA_NAV.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className="flex h-12 items-center rounded-xl px-4 text-base font-medium text-ink-soft"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </header>

      <main className="relative z-0 flex w-full flex-1 flex-col pt-24 sm:pt-28">
        {children}
      </main>

      <footer className="border-t border-canvas-border-strong bg-canvas-surface px-6 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto flex max-w-page flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-6 text-body-sm leading-relaxed text-ink-soft">
              SBI student chapters build websites, improve Google Business Profiles, and set up
              social media for nearby businesses and community groups at no cost.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            <nav className="flex flex-col gap-4" aria-label="Footer">
              <p className="font-mono text-label font-semibold text-navy-900 uppercase tracking-wider">Explore</p>
              {[...NAV, ...EXTRA_NAV].map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  className="w-fit text-sm text-ink-soft transition-colors hover:text-navy-600"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-4">
              <p className="font-mono text-label font-semibold text-navy-900 uppercase tracking-wider">Contact</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="w-fit break-all text-sm text-gold-600 transition-colors hover:text-gold-700"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href="tel:+12019889390"
                className="w-fit text-sm text-gold-600 transition-colors hover:text-gold-700"
              >
                (201) 988-9390
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-page border-t border-canvas-border pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-ink-soft">
            © {new Date().getFullYear()} SBI Network
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="text-sm text-ink-soft hover:text-navy-900">About SBI</Link>
            <Link href="/team" className="text-sm text-ink-soft hover:text-navy-900">Team</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export { CONTACT_EMAIL }
