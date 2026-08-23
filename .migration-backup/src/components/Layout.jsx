import { Link, NavLink, Outlet } from 'react-router-dom'

const CONTACT_EMAIL = 'sbinetwork.official@gmail.com'

const navLink = ({ isActive }) =>
  `rounded-md px-2 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 sm:px-3 sm:text-sm ${
    isActive ? 'text-lime-300' : 'text-paper hover:text-lime-300'
  }`

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 bg-forest-900 shadow-[0_2px_16px_-4px_rgba(2,41,30,0.5)]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="rounded-md font-display text-lg font-bold tracking-tight whitespace-nowrap text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 sm:text-xl"
          >
            SBI<span className="text-lime-300"> Network</span>
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-1">
            <NavLink to="/business" className={navLink}>
              For Businesses
            </NavLink>
            <NavLink to="/chapter" className={navLink}>
              Start a Chapter
            </NavLink>
            <NavLink to="/team" className={navLink}>
              Team
            </NavLink>
            <NavLink to="/about" className={navLink}>
              Our Story
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-forest-950 px-4 py-8 text-center text-sm text-forest-100">
        <p className="font-display text-base font-semibold text-paper">Student Business Initiative</p>
        <p className="mt-2">
          Questions?{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-sm text-lime-300 underline underline-offset-4 hover:text-lime-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
          >
            {CONTACT_EMAIL}
          </a>{' '}
          ·{' '}
          <a
            href="tel:+12019889390"
            className="rounded-sm text-lime-300 underline underline-offset-4 hover:text-lime-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300"
          >
            (201) 988-9390
          </a>
        </p>
        <p className="mt-3 text-xs text-forest-100/60">
          © {new Date().getFullYear()} SBI Network. Students helping local businesses grow.
        </p>
      </footer>
    </div>
  )
}

export { CONTACT_EMAIL }
