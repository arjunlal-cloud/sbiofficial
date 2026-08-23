import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SBIGuide from './SBIGuide'

const CONTACT_EMAIL = 'ebsbi.official@gmail.com'

const navLink = ({ isActive }) =>
  `rounded-md px-3 py-2 text-[13px] font-mono tracking-widest uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${
    isActive ? 'text-gold-400' : 'text-ink hover:text-gold-300'
  }`

/**
 * Inline logo — rendered via React so Space Grotesk loads correctly.
 * LOGO PLACEHOLDER: replace this with <img src="/logo.svg"> once the real
 * vector logo file is delivered. Until then this wordmark is the brand mark.
 */
function SBILogo() {
  return (
    <span className="inline-flex items-center gap-1.5 font-display font-bold tracking-tight whitespace-nowrap select-none leading-none">
      <span className="text-[22px] text-ink">SBI</span>
      {/* Growth-line mark */}
      <svg width="13" height="17" viewBox="0 0 13 17" fill="none" aria-hidden="true" className="shrink-0 mt-[1px]">
        <rect x="0" y="11" width="2.5" height="6" rx="1.25" fill="#c09b2d"/>
        <line x1="1.25" y1="11" x2="13" y2="0" stroke="#c09b2d" strokeWidth="2" strokeLinecap="round"/>
        <polyline points="7,0 13,0 13,6" stroke="#c09b2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      <span className="text-[22px] text-gold-500">Network</span>
    </span>
  )
}

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    if (!location.hash) window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-canvas text-ink font-body selection:bg-gold-500/30 overflow-hidden">
      {/* Noise grain overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />
      
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-5">
        <nav className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 shadow-xl backdrop-blur-xl transition-all duration-300 sm:px-5 ${scrolled ? 'border-gold-500/30 bg-canvas/95 py-2.5 shadow-black/40' : 'border-white/10 bg-canvas/80 py-3.5'}`}>
          <Link
            to="/enter"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm shrink-0"
          >
            <span className="relative"><SBILogo /><span className="absolute -bottom-3 left-0 font-mono text-[7px] uppercase tracking-[0.18em] text-gold-500/70">Preview mark</span></span>
          </Link>
          
          <div className="hidden md:flex flex-wrap items-center justify-end gap-1">
            <NavLink to="/business" onClick={() => setIsMobileMenuOpen(false)} className={navLink}>For Businesses</NavLink>
            <NavLink to="/chapter" onClick={() => setIsMobileMenuOpen(false)} className={navLink}>Start a Chapter</NavLink>
            <NavLink to="/team" onClick={() => setIsMobileMenuOpen(false)} className={navLink}>Team</NavLink>
            <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={navLink}>Our Story</NavLink>
            <Link
              to="/business"
              onClick={() => setIsMobileMenuOpen(false)}
              className="ml-3 rounded-xl bg-gold-500 px-4 py-2.5 text-xs font-mono uppercase tracking-widest text-canvas transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              Get Started
            </Link>
            <Link
              to="/about#donate"
              className="rounded-xl border border-gold-500/45 px-4 py-2.5 text-xs font-mono uppercase tracking-widest text-gold-300 transition-colors hover:bg-gold-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              Donate
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-ink-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-3 right-3 top-[calc(100%+0.5rem)] flex flex-col gap-4 rounded-2xl border border-white/10 bg-canvas-surface/95 px-4 py-4 shadow-2xl backdrop-blur-xl">
            <NavLink to="/business" className={navLink}>For Businesses</NavLink>
            <NavLink to="/chapter" className={navLink}>Start a Chapter</NavLink>
            <NavLink to="/team" className={navLink}>Team</NavLink>
            <NavLink to="/about" className={navLink}>Our Story</NavLink>
            <Link
              to="/business"
              className="mt-2 text-center rounded px-4 py-2.5 text-xs font-mono uppercase tracking-widest text-canvas bg-gold-500 hover:bg-gold-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              Get Started
            </Link>
            <Link to="/about#donate" onClick={() => setIsMobileMenuOpen(false)} className="text-center font-mono text-xs uppercase tracking-widest text-gold-300 hover:text-gold-200">Donation preview</Link>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col relative z-0 w-full overflow-hidden pt-24 sm:pt-28">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 bg-canvas-surface px-4 py-14 text-center text-sm text-ink-soft sm:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
        <p className="font-display text-xl font-medium tracking-tight text-ink">Student Business Initiative</p>
        <p className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 break-words font-mono text-[10px] uppercase tracking-[0.12em] sm:text-xs sm:tracking-widest">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-gold-400 hover:text-gold-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm px-1 break-all"
          >
            {CONTACT_EMAIL}
          </a>
          <span className="hidden sm:inline">&bull;</span>
          <a
            href="tel:+12019889390"
            className="text-gold-400 hover:text-gold-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-sm px-1"
          >
            (201) 988-9390
          </a>
        </p>
        <p className="mt-7 max-w-md text-xs leading-relaxed text-muted">
          © {new Date().getFullYear()} SBI Network. Students helping local businesses grow.
        </p>
        </div>
      </footer>
      <SBIGuide />
    </div>
  )
}

export { CONTACT_EMAIL }
