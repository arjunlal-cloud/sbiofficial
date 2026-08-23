import ChapterMap from '../components/ChapterMap'
import Accordion from '../components/Accordion'
import StickyMobileCta from '../components/StickyMobileCta'
import sop from '../data/sop.jsx'
import glossary from '../data/glossary.json'

const APPLY_FORM_URL = 'https://docs.google.com/forms/d/1v1HwPRPeFm87FyT4HGVMMnwyHFn6khd_Z-j2XFp2Y1Q/viewform'

const ApplyButton = ({ children }) => (
  <a
    href={APPLY_FORM_URL}
    target={APPLY_FORM_URL.startsWith('http') ? '_blank' : undefined}
    rel="noreferrer"
    className="inline-block rounded bg-lime-300 px-8 py-4 text-base font-semibold text-forest-950 shadow-[0_8px_24px_-8px_rgba(200,241,105,0.6)] transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 active:translate-y-0"
  >
    {children}
  </a>
)

export default function Chapter() {
  return (
    <>
      <section className="bg-forest-900 px-4 py-16 text-center sm:px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-lime-300 uppercase">For future chapter leaders</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight font-medium tracking-tight text-paper sm:text-5xl">
          Start an SBI Chapter in Your Town
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-forest-100">
          Join a network of students helping local businesses and building real skills — marketing, AI, web
          development, and leadership, all hands-on with real clients.
        </p>
        <div className="mt-8">
          <ApplyButton>Apply Now</ApplyButton>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-label="Chapter map">
        <p className="mb-4 text-center text-muted">
          See where chapters already exist — or start one in your town.
        </p>
        <ChapterMap />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-4 sm:px-6" aria-label="Standard operating procedures">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-forest-900 sm:text-3xl">
          The Playbook
        </h2>
        <p className="mt-2 mb-8 text-ink-soft">
          Everything you need to know about running a chapter. Dotted{' '}
          <span className="font-medium text-forest-700 underline decoration-lime-500 decoration-dotted decoration-2 underline-offset-4">
            terms
          </span>{' '}
          show a definition on hover or tap.
        </p>
        <div className="space-y-4">
          {sop.map((s) => (
            <Accordion key={s.id} title={s.title} defaultOpen={s.defaultOpen}>
              {s.content}
            </Accordion>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6" aria-label="Glossary">
        <Accordion title="Glossary">
          <dl className="divide-y divide-forest-100">
            {glossary.map((g) => (
              <div key={g.term} className="py-3">
                <dt className="font-display font-semibold text-forest-900">{g.term}</dt>
                <dd className="mt-0.5 leading-relaxed text-ink-soft">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </Accordion>
      </section>

      <section className="mt-8 bg-paper-dark px-4 py-14 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-forest-900">Ready to apply?</h2>
        <p className="mt-2 text-ink-soft">Two people and some drive is all it takes to start.</p>
        <div className="mt-6">
          <ApplyButton>Apply to Lead a Chapter</ApplyButton>
        </div>
      </section>

      <StickyMobileCta href={APPLY_FORM_URL} label="Apply to Lead a Chapter" />
    </>
  )
}
