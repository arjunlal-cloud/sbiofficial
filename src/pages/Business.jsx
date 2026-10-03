import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { MapSkeleton } from '../components/Skeleton'
import Cta from '../components/Cta'
import ConstellationField from '../components/ConstellationField'
import StickyMobileCta from '../components/StickyMobileCta'
import { CONTACT_EMAIL } from '../components/Layout'
import chapters from '../data/chapters.json'
import { Reveal, Stagger, SplitWords, EASE } from '../components/motion/Reveal'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import { BUSINESS_REQUEST_FORM_URL, formUrl, trackOutbound } from '../lib/analytics'
import { useDocumentMeta } from '../lib/meta'

const ChapterMap = lazy(() => import('../components/ChapterMap'))

const REQUEST_URL = formUrl(BUSINESS_REQUEST_FORM_URL, 'business')

/**
 * Four sections. Three chapters exist, so for almost every visitor the action
 * that actually works is requesting one. That stays the primary CTA
 * throughout. The three objections are a compact definition list now rather
 * than a section of their own.
 */

const PROCESS = [
  ['01', 'Tell us what needs work', 'Request a website, promo video, Google profile, or social setup.'],
  ['02', 'A local chapter replies', 'We confirm your town, the need, and a realistic scope before work starts.'],
   ['03', 'Students build it', 'The chapter works with you while the student support team supports the team and reviews the work.'],
   ['04', 'You own the result', 'The finished work is given to you free. No invoice and no strings.'],
]

const ANSWERS = [
  [
    'What does it cost?',
    'Nothing. The finished work is yours the moment it is handed over.',
  ],
  [
    'Why would students do this free?',
    'Real client work is the only way they get real experience.',
  ],
  [
    'Is the work any good?',
    <>
       The student support team reviews every deliverable before it goes live.
    </>,
  ],
  [
    'How do we connect?',
    'Submit a request and the nearest chapter emails you. If there is not one nearby yet, your request helps put your town on the list.',
  ],
]

function Hero() {
  return (
    <Section
      weight="anchor"
      center
      className="reference-glow flex items-center justify-center lg:hero-h"
      backdrop={
        <>
          <ConstellationField density={34} reach={164} className="opacity-[0.28] sm:opacity-[0.36]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-navy-50/60" />
        </>
      }
    >
      <div className="mx-auto max-w-[48rem] text-center">
        <motion.p
          initial={{ opacity: 1, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center justify-center gap-3 font-mono text-label uppercase tracking-label text-gold-400"
        >
          <span className="h-px w-10 bg-gold-500/50" />
          For business owners
        </motion.p>

        <h1 className="mx-auto mt-3 max-w-head font-display text-display-xl font-bold tracking-[-0.055em] text-ink sm:mt-5">
          <SplitWords text="A stronger online" delay={0.06} immediate />
          <span className="block text-ink-soft">
            <SplitWords text="presence. Free." delay={0.18} immediate />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 1, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mx-auto mt-3 max-w-measure-narrow text-body-lg text-ink"
        >
          <strong className="font-semibold">A local student team does the work</strong> and you own
          it outright. Three chapters now serve East Brunswick, Guadalajara, and Simi Valley; other
          areas can request coverage.
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
          className="mt-6 flex justify-center"
        >
          <Cta
            href={REQUEST_URL}
            size="xl"
            arrow="↗"
            onClick={() => trackOutbound('business_request_click', 'hero')}
          >
            Request a chapter
          </Cta>
        </motion.div>

        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.54 }}
          className="mt-3 text-body-sm text-ink-soft"
        >
          Websites, Google Business Profile, social media, and selected promo video projects.
        </motion.p>
      </div>
    </Section>
  )
}

function Process() {
  return (
    <Section weight="support" bordered>
      <SectionHead weight="support" title="What actually happens." />
        {/* TODO: confirm the typical turnaround for a website and for a promo
            video, and state both here. */}
      <Stagger className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
        {PROCESS.map(([n, title, body]) => (
            <Reveal key={n} stagger variant="wake">
              <div className="border-t border-[rgba(11,31,58,0.14)] pt-4">
                <span className="font-display text-display-lg font-medium leading-none tracking-display text-gold-500/30">
                  {n}
                </span>
                <h3 className="mt-3 font-display text-display-sm font-medium tracking-display text-ink">
                  {title}
                </h3>
                <p className="mt-2 max-w-measure-narrow text-body-sm text-ink-soft">{body}</p>
              </div>
            </Reveal>
          ))}
        </Stagger>

      <Reveal variant="up" delay={0.1} className="mt-7">
        <dl className="grid gap-x-8 gap-y-5 border-t border-[rgba(11,31,58,0.14)] pt-5 sm:grid-cols-2 lg:grid-cols-4">
            {ANSWERS.map(([q, a]) => (
              <div key={q}>
                <dt className="text-body font-semibold text-ink">{q}</dt>
                <dd className="mt-1 text-body-sm text-ink-soft">{a}</dd>
              </div>
            ))}
        </dl>
      </Reveal>
    </Section>
  )
}

function Coverage() {
  return (
    <Section id="coverage" weight="support" bordered>
      <SectionHead weight="support" title="Where we are." />
      <Reveal variant="up" delay={0.05} className="mt-3">
        <p className="max-w-measure text-body text-ink">
            Inside these areas, email the chapter. Anywhere else, requesting one puts your town
            on the list.
          </p>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-8">
          <Stagger className="flex flex-col gap-2.5">
            {chapters.map((chapter) => (
              <Reveal key={chapter.id} stagger variant="up">
                <article className="rounded-2xl border border-[rgba(11,31,58,0.14)] bg-canvas-elevated/60 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-display-sm font-medium tracking-display text-ink">
                      {chapter.name}
                    </h3>
                    <span className="shrink-0 font-mono text-label uppercase tracking-label text-ink-soft">
                      {chapter.region}
                    </span>
                  </div>
                  <p className="mt-2 font-mono text-label uppercase tracking-label text-gold-400">
                     {chapter.radius} service area
                  </p>
                  <div className="mt-4">
                    <Cta
                      href={
                        chapter.contact
                          ? `mailto:${chapter.contact}`
                          : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Business enquiry: ${chapter.name}`)}`
                      }
                      size="md"
                      full
                      arrow="→"
                      onClick={() => trackOutbound('chapter_email_click', chapter.id)}
                    >
                      {chapter.contact ? 'Email this chapter' : `Ask about ${chapter.name}`}
                    </Cta>
                  </div>
                </article>
              </Reveal>
            ))}

            <Reveal variant="up" delay={0.1}>
              <div className="rounded-2xl border border-dashed border-gold-500/40 p-5">
                <p className="font-display text-display-sm font-medium tracking-display text-ink">
                  Anywhere else
                </p>
                <div className="mt-4">
                  <Cta
                    href={REQUEST_URL}
                    size="md"
                    full
                    arrow="↗"
                    onClick={() => trackOutbound('business_request_click', 'coverage')}
                  >
                    Request a chapter
                  </Cta>
                </div>
              </div>
            </Reveal>
          </Stagger>

          <Reveal variant="scale" className="min-h-[20rem]">
            <div className="h-[min(460px,55vh)] min-h-[20rem] w-full overflow-hidden rounded-2xl border border-[rgba(11,31,58,0.14)] lg:sticky lg:top-28">
              <Suspense
                fallback={<MapSkeleton />}
              >
                <ChapterMap />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function Close() {
  return (
    <Section
      weight="anchor"
      bordered
      backdrop={
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-navy-50/50" />
        </>
      }
    >
      <Reveal variant="blur">
        <h2 className="max-w-head font-display text-display-xl font-medium tracking-display text-ink">
          One email starts it.
        </h2>
      </Reveal>
      <Reveal variant="up" delay={0.15} className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Cta
            href={REQUEST_URL}
            size="xl"
            arrow="↗"
            onClick={() => trackOutbound('business_request_click', 'close')}
          >
            Request a chapter
          </Cta>
          <Cta
            href={`mailto:${CONTACT_EMAIL}`}
            tone="ghost"
            size="xl"
            arrow="→"
            onClick={() => trackOutbound('business_email_click', 'close')}
          >
          Email us
        </Cta>
      </Reveal>
    </Section>
  )
}

export default function Business() {
  useDocumentMeta('business')

  return (
    <div className="w-full bg-canvas">
      <Hero />
      <Process />
      <Coverage />
      <Close />
      <StickyMobileCta
        href={REQUEST_URL}
        label="Request a chapter"
        onClick={() => trackOutbound('business_request_click', 'sticky')}
      />
    </div>
  )
}
