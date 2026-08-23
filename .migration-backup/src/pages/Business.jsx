import ChapterMap from '../components/ChapterMap'
import StickyMobileCta from '../components/StickyMobileCta'
import { CONTACT_EMAIL } from '../components/Layout'

const steps = [
  {
    title: 'Free, professional services',
    body: "If your business is inside a chapter's service radius, everything is free — a professional website, a promotional video, and optional extras like flyers, social media setup, and Google review optimization. No catch, no trial, no upsell. Free means free.",
  },
  {
    title: 'Reach out to your local chapter',
    body: "Find your area on the map above and click the pin — each chapter lists its services and contact info. Send a quick email describing your business, and the chapter leader will set up a conversation about what you need.",
  },
  {
    title: 'Outside a chapter’s radius?',
    body: 'You can still get the same services at a fraction of agency prices — chapters may charge for work outside their home radius, typically far below the $300+ agencies ask. Or reach out to us about bringing a chapter to your town.',
  },
]

export default function Business() {
  return (
    <>
      <section className="bg-forest-900 px-4 py-16 text-center sm:px-6">
        <p className="font-mono text-xs tracking-[0.2em] text-lime-300 uppercase">For business owners</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight font-medium tracking-tight text-paper sm:text-5xl">
          Free Services for Your Business — If You're in a Chapter's Radius
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-forest-100">
          Student-run SBI chapters build websites, shoot promo videos, and design branding for local small
          businesses at no cost. Find out if a local chapter serves your area.
        </p>
        <div className="mt-8">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Free%20services%20for%20my%20business`}
            className="inline-block rounded bg-lime-300 px-8 py-4 text-base font-semibold text-forest-950 shadow-[0_8px_24px_-8px_rgba(200,241,105,0.6)] transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 active:translate-y-0"
          >
            Email Us — No Map Needed
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-label="Chapter map">
        <ChapterMap />
        <p className="mt-4 text-center text-muted">
          Can't find your location?{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Bring%20SBI%20to%20my%20area`}
            className="rounded-sm font-medium text-forest-700 underline underline-offset-4 hover:text-forest-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
          >
            Contact us to start a chapter near you.
          </a>
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6" aria-label="How it works">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-forest-900 sm:text-3xl">
          How it works
        </h2>
        <div className="mt-8 space-y-8">
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-5">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-900 font-mono text-sm font-semibold text-lime-300"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-forest-900">{s.title}</h3>
                <p className="mt-1 leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-dark px-4 py-14 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-forest-900">Questions?</h2>
        <p className="mt-2 text-ink-soft">We'll point you to the right chapter or answer anything directly.</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-6 inline-block rounded bg-forest-900 px-8 py-4 text-base font-semibold text-paper shadow-[0_8px_24px_-8px_rgba(4,63,46,0.5)] transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-700 active:translate-y-0"
        >
          Email us
        </a>
      </section>

      <StickyMobileCta href={`mailto:${CONTACT_EMAIL}?subject=Free%20services%20for%20my%20business`} label="Email Us" />
    </>
  )
}
