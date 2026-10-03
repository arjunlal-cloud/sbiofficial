import { useEffect, useRef } from 'react'
import { Link } from 'wouter'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import Accordion from '../components/Accordion'
import Cta from '../components/Cta'
import ConstellationField from '../components/ConstellationField'
import StickyMobileCta from '../components/StickyMobileCta'
import { Reveal, Stagger, SplitWords, EASE } from '../components/motion/Reveal'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import { initScrollDepth, trackApply } from '../lib/analytics'
import { useDocumentMeta } from '../lib/meta'

/**
 * The conversion page. Five sections, under 300 words of body copy.
 *
 * Everything that used to live here as its own section is either folded in
 * (the commitment sits inside step four of the path, the "why not start your
 * own thing" argument is two sentences in the hero) or moved out (the services
 * grid, the territory map, the full FAQ, the operations manual).
 */

const APPLY_LABEL = 'Start my chapter'
const APPLY_NOTE = 'Six questions, under two minutes.' // TODO: confirm the form is six questions and time it.

const STEPS = [
  ['01', 'Find a business that needs the work', 'A restaurant with no website. A barber whose Google hours are wrong.'],
  ['02', 'Build it with your team', 'You agree the scope and split the work. The student support team checks it before it ships.'],
  ['03', 'Give it to the business free', 'The business owns it outright. You keep the portfolio piece.'],
]

const PATH = [
  {
    step: '01',
    title: 'Apply',
    body: 'Two people, and neither of you needs to code. Tell us your town and why you want to lead.',
  },
  {
    step: '02',
    title: 'Talk to the student support team',
    // TODO: confirm the typical wait between applying and this conversation.
      body: (
      <>
          Student recruitment and setup leads answer questions, set expectations, and approve chapters they think will still be running in six months.
      </>
    ),
  },
  {
    step: '03',
    title: 'Set your service area',
    body: (
      <>
        The student support team sets your service area. There is one chapter per town, and the
        first approved chapter keeps any overlapping area.
      </>
    ),
  },
  {
    step: '04',
    title: 'Train, then deliver',
    // TODO: confirm how long onboarding plus both training sessions takes end to end.
        body: 'You get web and video training, then start with a supported client project. The commitment is two delivered projects a month.',
  },
]

const FAQ = [
  {
    q: 'How much time per week?',
    // TODO: confirm the real weekly hour range with the support team and put a number here.
    a: 'Two delivered projects a month, a weekly check-in, and one monthly meeting. Miss the two-project target three months running and the chapter closes.',
  },
  {
    q: 'What does it cost me?',
    a: 'Nothing. The one expense is a shared Claude Pro subscription, about $20 a month, usually covered by a GoFundMe.',
  },
  {
    q: 'Do I need experience?',
    a: 'No. The site work is done with AI tools, and the student support team trains you before your first client.',
  },
]

/* 1 - Hero */
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
          For future chapter leaders
        </motion.p>

        <h1 className="mx-auto mt-3 max-w-head font-display text-display-xl font-bold tracking-[-0.055em] text-ink sm:mt-5">
          <SplitWords text="Run a local team" delay={0.06} immediate />
          <span className="block text-ink-soft">
            <SplitWords text="in your town." delay={0.18} immediate />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 1, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mx-auto mt-3 max-w-measure-narrow text-body-lg text-ink"
        >
          <strong className="font-semibold">You start a chapter</strong> and lead a small team
          building websites and promo videos for local businesses, free. The student support team
          trains you first.
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.46, ease: EASE }}
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Cta to="/apply" size="xl" onClick={() => trackApply('hero')}>
            {APPLY_LABEL}
          </Cta>
          {/* The manual used to be linked once, at the very bottom. Both the
              form and the reference are one tap from the top now. */}
          <Cta to="/manual" tone="ghost" size="xl" arrow="→">
            Read the manual
          </Cta>
        </motion.div>

        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.58 }}
          className="mt-3 text-body-sm text-ink-soft"
        >
          Free. No coding experience. High school students only.
        </motion.p>
      </div>
    </Section>
  )
}

/* 2 - What you actually do */
function Steps() {
  return (
    <Section weight="support" bordered>
      <SectionHead weight="support" title="What you actually do." />

      <Stagger className="mt-5 grid gap-5 md:grid-cols-3 md:gap-8" gap={0.1}>
          {STEPS.map(([n, title, body]) => (
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
    </Section>
  )
}

/* 3 - What happens after you apply */
function Path() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })

  return (
    <Section weight="anchor" bordered>
      <SectionHead
        weight="anchor"
        kicker="Application to first client"
        title="What happens after you apply."
      />

      <div ref={ref} className="relative mt-7 pl-7 sm:pl-9">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-[rgba(11,31,58,0.14)] sm:left-[9px]" />
          <motion.div
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-gold-400 to-gold-600 sm:left-[9px]"
            style={reduced ? { scaleY: 1 } : { scaleY }}
          />

          <div className="space-y-5">
            {PATH.map((item) => (
              <Reveal key={item.step} variant="left">
                <div className="relative">
                  <span className="absolute -left-7 top-1.5 grid h-[15px] w-[15px] place-items-center rounded-full border border-gold-500/60 bg-canvas sm:-left-9 sm:h-[19px] sm:w-[19px]">
                    <span className="h-[5px] w-[5px] rounded-full bg-gold-400 sm:h-[6px] sm:w-[6px]" />
                  </span>
                  <span className="font-mono text-label tracking-label text-gold-400">
                    {item.step}
                  </span>
                  <h3 className="mt-1 font-display text-display-sm font-medium tracking-display text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 max-w-measure text-body text-ink">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* HqStrip, reduced to one line and a link. */}
        <Reveal variant="up" className="mt-7 border-t border-[rgba(11,31,58,0.14)] pt-5">
          <p className="max-w-measure text-body-sm text-ink-soft">
            Steps two to four are supported by SBI students: training, quality review, and someone
            to message when a project goes sideways.{' '}
            <Link
              href="/team"
              className="focus-gold rounded-sm text-gold-400 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-300"
              data-testid="link-chapter-team"
            >
              See the team
            </Link>
            .
          </p>
          {/* Territory used to be a section of its own, stranded between two
              rules with a headline for two sentences. It belongs to step 03,
              so it sits inside this section -- but at body weight, not folded
              into the dim support-team line above, because "your town is open" is the
              reassurance that decides it for a lot of people. */}
          <p className="mt-4 max-w-measure text-body text-ink">
            <strong className="font-semibold">One chapter per town, and yours is almost
            certainly open.</strong> Once your chapter is approved, another chapter cannot take
            over its service area.
          </p>
      </Reveal>
    </Section>
  )
}

/* 5 - The three questions everyone asks */
function Questions() {
  return (
    <Section weight="support" bordered>
      <SectionHead weight="support" title="Before you apply." />
      <div className="mt-4">
        {FAQ.map((item, i) => (
          <Reveal key={item.q} variant="up" delay={Math.min(i * 0.04, 0.12)}>
            <Accordion title={item.q} indexNumber={String(i + 1).padStart(2, '0')}>
              <p className="max-w-measure">{item.a}</p>
            </Accordion>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* 6 - Apply. This page owns "Two people. One town." */
function Apply() {
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
        <h2 className="max-w-head-lg font-display text-display-xl font-medium tracking-display text-ink">
          Two people. One town.
        </h2>
        <p className="mt-4 max-w-measure-narrow text-body-lg text-ink">
          That&rsquo;s the whole entry requirement.
        </p>
      </Reveal>

      <Reveal variant="up" delay={0.15} className="mt-6">
        <Cta to="/apply" size="xl" onClick={() => trackApply('close')}>
          {APPLY_LABEL}
        </Cta>
      </Reveal>

      <Reveal variant="up" delay={0.22}>
        <p className="mt-4 max-w-measure text-body-sm text-ink-soft">
          {APPLY_NOTE}{' '}
          <Link
            href="/manual"
            className="focus-gold rounded-sm text-gold-400 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-300"
            data-testid="link-chapter-manual"
          >
            Read the manual
          </Link>
          .
        </p>
      </Reveal>
    </Section>
  )
}

export default function Chapter() {
  useDocumentMeta('chapter')

  useEffect(() => initScrollDepth('chapter'), [])

  return (
    <div className="w-full bg-canvas">
      <Hero />
      <Steps />
      <Path />
      <Questions />
      <Apply />
      <StickyMobileCta
        href="/apply"
        label={APPLY_LABEL}
        onClick={() => trackApply('sticky')}
      />
    </div>
  )
}
