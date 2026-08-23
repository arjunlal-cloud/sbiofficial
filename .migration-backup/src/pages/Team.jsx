import { Link } from 'react-router-dom'
import StickyMobileCta from '../components/StickyMobileCta'

const EXEC_FORM_URL = 'https://docs.google.com/forms/d/16H_5sU03cJnv2lYYlE2311UYtBx-OVw53ngVBGM6opc/viewform'

/* Exec team — swap placeholder images for real photos when ready */
const execTeam = [
  { role: 'Founder', name: "Da'El Kim" },
  { role: 'Co-Founder', name: 'James Yu' },
  { role: 'Quality Lead' },
  { role: 'Recruitment Lead' },
  { role: 'Onboarding Lead' },
  { role: 'Web Training Lead' },
  { role: 'Video Training Lead' },
  { role: 'Support Lead' },
  { role: 'Social Media Lead' },
  { role: 'Partnerships Lead' },
  { role: 'Technical Lead' },
]

const initials = (text) =>
  text
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join('')

export default function Team() {
  return (
    <>
      <section className="bg-forest-900 px-4 py-16 text-center sm:px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-lime-300 uppercase">Who runs this thing</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight font-medium tracking-tight text-paper sm:text-5xl">
          Meet the Exec Team
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-forest-100">
          The HQ crew that helps every chapter from first DM to first client.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6" aria-label="Executive team">
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {execTeam.map(({ role, name }) => (
            <li key={role} className="text-center">
              {/* photo placeholder — swap this div for an <img> when real photos are ready */}
              <div
                aria-hidden="true"
                className="mx-auto flex aspect-square w-full max-w-40 flex-col items-center justify-center gap-1 rounded-2xl bg-forest-800 shadow-[0_8px_20px_-8px_rgba(4,63,46,0.3)]"
              >
                <span className="font-display text-3xl font-semibold text-lime-300">
                  {initials(name ?? role)}
                </span>
                <span className="font-mono text-[10px] tracking-wide text-forest-100/70 uppercase">Photo soon</span>
              </div>
              {name && <p className="mt-3 font-display font-semibold text-forest-900">{name}</p>}
              <p className={name ? 'text-sm text-ink-soft' : 'mt-3 font-display font-semibold text-forest-900'}>
                {role}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 bg-paper-dark px-4 py-14 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-forest-900">Want in?</h2>
        <p className="mt-2 text-ink-soft">
          Apply for an exec role to run things at HQ, or start a chapter in your own town.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={EXEC_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded bg-lime-300 px-8 py-4 text-base font-semibold text-forest-950 shadow-[0_8px_24px_-8px_rgba(200,241,105,0.6)] transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 active:translate-y-0"
          >
            Apply for an Exec Role
          </a>
          <Link
            to="/chapter"
            className="inline-block rounded border-2 border-forest-900/80 px-8 py-4 text-base font-semibold text-forest-900 transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700 active:translate-y-0"
          >
            Start a Chapter
          </Link>
        </div>
      </section>

      <StickyMobileCta href={EXEC_FORM_URL} label="Apply for an Exec Role" />
    </>
  )
}
