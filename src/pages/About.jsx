import { useState } from 'react'
import { motion } from 'framer-motion'
import Cta from '../components/Cta'
import ConstellationField from '../components/ConstellationField'
import StickyMobileCta from '../components/StickyMobileCta'
import Section from '../components/Section'
import { Reveal, Stagger, SplitWords, Parallax, EASE } from '../components/motion/Reveal'
import SectionHead from '../components/motion/SectionHead'
import { LEADERSHIP } from '../data/team'
import { trackApply } from '../lib/analytics'
import { useDocumentMeta } from '../lib/meta'

/* The two founders are named in the story and their portraits already exist in
   public/team, so the page shows them rather than describing them. */
const FOUNDERS = LEADERSHIP.filter((m) => ["Da'El Kim", 'James Yu'].includes(m.name))

const PERSPECTIVES = {
  business: {
    label: 'For local businesses',
    eyebrow: 'A free local agency',
    title: 'Get the digital work that usually gets pushed off.',
    body:
      'A nearby student chapter scopes the need, builds the work, and gives it to you. The student support team supports the chapter and reviews the work before it goes live.',
    points: [
      ['Useful from day one', 'Websites, promo videos, Google profiles, and social setup. This is work for real organizations.'],
      ['Local by design', 'The chapter understands the town and can meet the people behind the business.'],
      ['Yours when the work is finished', 'The business owns the finished work. There is no invoice and no retained ownership.'],
    ],
    cta: 'Get work for my business',
    to: '/business',
  },
  student: {
    label: 'For high schoolers',
    eyebrow: 'A real proving ground',
    title: 'Build work that gives you something specific to show.',
    body:
      'You lead a small team, work with real clients, and finish projects that matter outside school. The student support team provides training, review, and people to call when a project gets difficult.',
    points: [
      ['Portfolio and résumé', 'Leave with client work, clear responsibilities, and outcomes you can explain.'],
      ['College applications', 'Show sustained leadership and local impact instead of another generic club title.'],
      ['Skills under pressure', 'Practice AI tools, marketing, communication, project scoping, and team leadership.'],
    ],
    cta: 'Start a chapter',
    to: '/chapter',
  },
}

const OPERATING_MODEL = [
  ['01', 'A business has a real need', 'A website, video, profile, or social presence that is missing or outdated.'],
  ['02', 'A local chapter owns the relationship', 'Students scope the project, communicate with the client, and do the work.'],
  ['03', 'The student support team provides support', 'Training, setup help, shared standards, weekly support, and quality review keep chapters aligned.'],
  ['04', 'Both sides leave with value', 'The business keeps the finished work. Students keep the portfolio, skills, and leadership experience.'],
]

const STUDENT_OUTCOMES = [
  ['Real clients', 'Learn to ask good questions, set a scope, respond to feedback, and finish what you promised.'],
  ['Visible work', 'Build a portfolio around websites, videos, local search, and social work people can actually see.'],
  ['Leadership', 'Recruit a team, divide responsibility, run check-ins, and keep a chapter active over time.'],
  ['Local impact', 'Help small businesses that are often ignored or overcharged while improving your own town.'],
]

const PHASES = [
  {
    id: 'phase-1',
    n: '01',
    marker: 'East Brunswick, 2025',
    title: 'It started with one chapter.',
    body: [
      'Small businesses deserve a real website, the kind normally priced for companies that can afford an agency. So a group of students did the work themselves and never charged for it.',
    ],
    image: '/about-work-session.webp',
    imageAlt: 'SBI members working on laptops at the East Brunswick Public Library',
  },
  {
    id: 'phase-2',
    n: '02',
    marker: 'Two people, every free hour',
    title: 'Then we kept showing up.',
    body: [
      'That group was really just the two of us, building sites and shooting videos on free afternoons. Word got around fast.',
    ],
    showFounders: true,
  },
  {
    id: 'phase-3',
    n: '03',
    marker: 'One town becomes many',
    title: 'So we opened it up.',
    body: [
      'We were learning more doing this than in a classroom, which raised the obvious question: why keep it to one town?',
      'Local teams now exist in East Brunswick, Guadalajara, and Simi Valley. Each chapter serves its own community while following the same shared process.',
    ],
  },
]

function Hero() {
  return (
    <Section
      weight="anchor"
      center
      className="reference-glow flex items-center justify-center lg:hero-h"
      backdrop={
        <>
          <ConstellationField
            density={44}
            reach={168}
            className="opacity-[0.38] sm:opacity-[0.5]"
          />
          <div className="pointer-events-none absolute inset-0 bg-white/[0.04]" />
        </>
      }
    >
      <div className="mx-auto max-w-[48rem] text-center">
        <motion.p
          initial={{ opacity: 1, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center justify-center gap-3 font-mono text-label uppercase tracking-label text-gold-400"
        >
          <span className="h-px w-10 bg-gold-500/50" />
          Why SBI exists
        </motion.p>

        <h1 className="mt-5 font-display text-display-xl font-bold leading-[0.92] tracking-[-0.055em] text-ink">
          <SplitWords text="Free for businesses." delay={0.08} immediate />
          <span className="block text-gold-400">
            <SplitWords text="Real stakes for students." delay={0.18} immediate />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          className="mx-auto mt-5 max-w-measure text-body leading-relaxed text-ink sm:text-body"
        >
          SBI is a student-run agency network. Local businesses get useful digital work at no
          cost. High schoolers get real clients, real responsibility, and work worth showing.
        </motion.p>

        {/* Previously the only page-top on the site with no CTA at all. */}
        <motion.div
          initial={{ opacity: 1, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Cta to="/apply" size="lg" onClick={() => trackApply('about-hero')}>
            Start my chapter
          </Cta>
          <Cta to="/business" tone="ghost" size="lg">
            I own a business
          </Cta>
        </motion.div>
      </div>
    </Section>
  )
}

function ValueExchange() {
  const [active, setActive] = useState('business')
  const perspective = PERSPECTIVES[active]

  return (
    <Section weight="anchor" bordered>
      <SectionHead
        weight="anchor"
        kicker="One network, two outcomes"
        title="Built for both sides of the work."
        lede="Like a service marketplace, SBI connects a real business need with people ready to do the work. Unlike a marketplace, no money changes hands."
        align="center"
      />

      <div
        role="tablist"
        aria-label="Choose an SBI perspective"
        className="mx-auto mt-7 grid max-w-[38rem] grid-cols-2 rounded-full border border-[rgba(11,31,58,0.14)] bg-navy-50/70 p-1.5"
      >
        {Object.entries(PERSPECTIVES).map(([key, item]) => {
          const selected = active === key
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="about-perspective-panel"
              onClick={() => setActive(key)}
              className={`focus-gold min-h-[46px] rounded-full px-4 text-body-sm font-semibold transition-all duration-300 ${
                selected
                  ? 'bg-navy-900 text-white shadow-[0_10px_28px_-16px_rgba(11,31,58,0.8)]'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <motion.div
        key={active}
        id="about-perspective-panel"
        role="tabpanel"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: EASE }}
        className="mt-7 grid overflow-hidden rounded-3xl border border-[rgba(11,31,58,0.14)] bg-white shadow-[0_24px_70px_-42px_rgba(11,31,58,0.45)] lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="bg-navy-900 p-6 text-white sm:p-8 lg:p-10">
          <p className="font-mono text-label uppercase tracking-label text-navy-300">
            {perspective.eyebrow}
          </p>
          <h2 className="mt-3 max-w-head-lg font-display text-display-lg font-medium tracking-display text-white">
            {perspective.title}
          </h2>
          <p className="mt-4 max-w-measure-narrow text-body text-white/72">{perspective.body}</p>
          <div className="mt-7">
            <Cta to={perspective.to} size="lg">
              {perspective.cta}
            </Cta>
          </div>
        </div>

        <div className="grid divide-y divide-[rgba(11,31,58,0.1)] p-6 sm:p-8">
          {perspective.points.map(([title, body], index) => (
            <div key={title} className="grid gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-label tracking-label text-gold-400">
                0{index + 1}
              </span>
              <div>
                <h3 className="font-display text-display-sm font-medium tracking-display text-ink">{title}</h3>
                <p className="mt-1.5 max-w-measure text-body-sm text-ink-soft">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

function OperatingModel() {
  return (
    <Section weight="support" bordered className="bg-canvas-elevated/55">
      <SectionHead
        weight="support"
        kicker="The operating system"
        title="The idea is simple. The operation is not."
        lede="The visible result is a free website or video. Behind it is a coordinated chapter model designed to make the work reliable."
        align="center"
      />

      <Stagger className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
        {OPERATING_MODEL.map(([n, title, body]) => (
          <Reveal key={n} stagger variant="up" className="h-full">
            <article className="group h-full rounded-2xl border border-[rgba(11,31,58,0.12)] bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-[0_18px_46px_-28px_rgba(11,31,58,0.45)]">
              <span className="font-display text-display-lg font-medium leading-none tracking-display text-gold-500/28">
                {n}
              </span>
              <h3 className="mt-5 font-display text-display-sm font-medium tracking-display text-ink">{title}</h3>
              <p className="mx-auto mt-2 max-w-measure-narrow text-body-sm text-ink-soft">{body}</p>
            </article>
          </Reveal>
        ))}
      </Stagger>
    </Section>
  )
}

function StudentOutcomes() {
  return (
    <Section weight="anchor" bordered className="bg-navy-900">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <div>
          <p className="font-mono text-label uppercase tracking-label text-navy-300">Why students join</p>
          <h2 className="mt-3 max-w-head-lg font-display text-display-lg font-medium tracking-display text-white">
            More useful than another club title.
          </h2>
          <p className="mt-4 max-w-measure-narrow text-body text-white/70">
            SBI gives high schoolers a record of work, leadership, and community impact they can
            discuss on a résumé or college application without pretending a title was the outcome.
          </p>
          <p className="mt-5 max-w-measure-narrow text-body-sm text-white/52">
            It does not guarantee admission or a job. It gives you real experiences worth explaining.
          </p>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2" gap={0.08}>
          {STUDENT_OUTCOMES.map(([title, body], index) => (
            <Reveal key={title} stagger variant="up" className="h-full">
              <article className="h-full rounded-2xl border border-white/12 bg-white/[0.055] p-5 transition-colors duration-300 hover:bg-white/[0.09]">
                <span className="font-mono text-label tracking-label text-navy-300">
                  0{index + 1}
                </span>
                <h3 className="mt-6 font-display text-display-sm font-medium tracking-display text-white">{title}</h3>
                <p className="mt-2 text-body-sm text-white/65">{body}</p>
              </article>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

function Narrative() {
  return (
    <Section weight="support" bordered>
      <SectionHead
        weight="support"
        kicker="The origin"
        title="One chapter became a network."
        lede="The model started in East Brunswick, then opened up when the founders realized the learning and local impact should not stay in one town."
        align="center"
      />

      <div className="mt-9 space-y-12 lg:space-y-16">
          {PHASES.map((item) => (
            <article key={item.id} id={item.id} className="scroll-mt-32">
              <Reveal variant="up">
                {/* A sticky 17rem rail used to carry this number on desktop.
                    It left the entire left third of the page empty and pushed
                    every story headline off the site's left edge, so the
                    marker just sits inline at every width now. */}
                <p className="font-mono text-label uppercase tracking-label text-gold-400">
                  {item.n} · {item.marker}
                </p>
                <h2 className="mt-2.5 max-w-head-lg font-display text-display-lg font-medium tracking-display text-ink">
                  {item.title}
                </h2>
              </Reveal>

              <div className="mt-5 space-y-4">
                {item.body.map((paragraph, i) => (
                  <Reveal key={paragraph.slice(0, 24)} variant="up" delay={0.08 + i * 0.08}>
                    <p className="max-w-measure text-body leading-relaxed text-ink">{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              {item.image && (
                <Reveal variant="scale" delay={0.15} className="mt-8">
                  <Parallax speed={0.08}>
                    <figure className="relative overflow-hidden rounded-2xl border border-[rgba(11,31,58,0.14)]">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        width="1000"
                        height="625"
                        className="aspect-[16/10] w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-canvas/85 via-transparent to-transparent" />
                      <figcaption className="absolute inset-x-0 bottom-0 p-5">
                        <p className="font-mono text-label uppercase tracking-label text-gold-400">
                          East Brunswick, New Jersey
                        </p>
                      </figcaption>
                    </figure>
                  </Parallax>
                </Reveal>
              )}

              {item.showFounders && FOUNDERS.length > 0 && (
                <Reveal variant="up" delay={0.15} className="mt-8">
                  <div className="flex flex-wrap gap-4">
                    {FOUNDERS.map((founder) => {
                      const [w, h] = founder.photoSize ?? [600, 800]
                      return (
                        <figure key={founder.name} className="w-[10.5rem]">
                          <img
                            src={founder.photo}
                            alt={founder.name}
                            width={w}
                            height={h}
                            style={{ objectPosition: founder.photoPosition ?? '50% 30%' }}
                            className="aspect-[3/4] w-full rounded-xl border border-[rgba(11,31,58,0.14)] object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                          <figcaption className="mt-2 font-display text-body-sm font-medium text-ink">
                            {founder.name}
                          </figcaption>
                        </figure>
                      )
                    })}
                  </div>
                </Reveal>
              )}
            </article>
          ))}
      </div>
    </Section>
  )
}

/* The story used to run on "we" for 240 lines and then flip to "your town is
   next" in the final heading. It turns to the reader here, before the ask.
   The donate block that used to sit between the emotional peak and the CTA is
   gone entirely - it rendered a permanently disabled button. */
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
        <p className="font-mono text-label uppercase tracking-label text-gold-400">Phase 04</p>
        <h2 className="mt-3 max-w-head font-display text-display-xl font-medium tracking-display text-ink">
          Your town is next.
        </h2>
        <p className="mt-4 max-w-measure text-body leading-relaxed text-ink">
          The next chapter is somebody reading this and deciding to start one.
        </p>
      </Reveal>
      <Reveal variant="up" delay={0.18} className="mt-6 flex flex-col gap-4 sm:flex-row">
          <Cta to="/apply" size="xl" onClick={() => trackApply('about-close')}>
            Start my chapter
          </Cta>
        <Cta to="/business" tone="ghost" size="xl">
          I own a business
        </Cta>
      </Reveal>
    </Section>
  )
}

export default function About() {
  useDocumentMeta('about')

  return (
    <div className="w-full bg-canvas">
      <Hero />
      <ValueExchange />
      <OperatingModel />
      <StudentOutcomes />
      <Narrative />
      <Close />
      <StickyMobileCta
        href="/apply"
        label="Start my chapter"
        onClick={() => trackApply('sticky-about')}
      />
    </div>
  )
}
