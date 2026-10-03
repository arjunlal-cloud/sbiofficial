import { Link } from 'wouter'
import { motion } from 'framer-motion'
import { Wordmark } from '../components/Brand'
import Cta from '../components/Cta'
import ConstellationField from '../components/ConstellationField'
import chapters from '../data/chapters.json'
import { stats } from '../data/stats'
import { LEADERSHIP } from '../data/team'
import { Reveal, Stagger, EASE } from '../components/motion/Reveal'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import { trackOutbound } from '../lib/analytics'
import { useDocumentMeta } from '../lib/meta'

const MAKES = [
  ['Websites', 'Built around how the business actually works. Clean, fast, and easy to update.'],
  ['Promo videos', 'Short-form video, shot and cut by students to tell your story.'],
  ['Google profiles', 'Correct hours, clear photos, proper categories, and a strong description.'],
  ['Social media', 'Account setup, strategy, and a first run of content to get you started.'],
]

const HOW = [
  ['01', 'Tell us what needs work', 'A business owner requests help, or a chapter reaches out locally.'],
  ['02', 'Match with a local chapter', 'We confirm the town, the need, and what the student team can deliver.'],
  ['03', 'Students build the project', 'SBI’s central student team answers questions and checks the finished work.'],
  ['04', 'Hand it over', 'The business owns the finished work. Students keep the experience.'],
]

const NETWORK_MODEL = [
  ['A team in your town', 'A small student chapter works directly with nearby businesses and community groups.'],
  ['Training before client work', 'SBI’s central student team teaches chapter leaders how to plan projects and work with clients.'],
  ['A check before handoff', 'The central student team reviews finished work before the business receives it.'],
]

const PROOF = [
  ['Meet the students', 'See the students who train chapter leaders, answer questions, and review finished work.', '/team'],
  ['See how chapters start', 'Read what applying, training, and a first business project look like.', '/chapter'],
  ['See only approved work', 'SBI publishes client examples and testimonials only after the client gives permission.'],
]

const PATHS = [
  {
    to: '/chapter',
    label: 'Start a chapter',
    detail: 'Start with two high school students. SBI trains your team before you work with a local business.',
    cta: 'See how chapters start',
    primary: true,
  },
  {
    to: '/business',
    label: 'I own a business',
    detail: 'Ask a nearby chapter for a website, Google Business Profile help, social media setup, or selected video work.',
    cta: 'Request free digital help',
    primary: false,
  },
]

/* ── Hero ───────────────────────────────────────────────── */

function Hero() {
  return (
    <Section
      weight="anchor"
      center
      className="reference-glow hero-h relative flex items-center justify-center"
      backdrop={
        <ConstellationField
          density={48}
          reach={170}
          className="opacity-[0.4] sm:opacity-[0.52]"
        />
      }
    >
      <div className="relative z-10 mx-auto w-full max-w-[56rem] text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col items-center"
        >
          <Wordmark size="lg" className="justify-center" />
          <p className="mt-4 rounded-full border border-navy-100 bg-navy-50 px-4 py-1.5 font-mono text-label font-medium uppercase tracking-label text-navy-600">
            Student Business Initiative
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          className="mt-8 flex items-center justify-center gap-3 font-mono text-label uppercase tracking-label text-gold-700"
        >
          <span className="h-px w-10 bg-gold-500" />
          A local student organization
          <span className="h-px w-10 bg-gold-500" />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          className="mx-auto mt-4 font-display text-display-xl font-medium leading-[0.96] tracking-[-0.055em] text-navy-950"
        >
          Practical work.
          <span className="mt-2 block text-navy-600">Local leadership.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
          className="mx-auto mt-7 max-w-[42rem] text-body-lg leading-relaxed text-ink-soft"
        >
          High school students lead free digital projects for nearby businesses. SBI trains
          chapter leaders, supports the work, and reviews finished projects before handoff.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: EASE }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Cta to="/chapter" size="xl" onClick={() => trackOutbound('fork_click', 'chapter')}>
            Start a chapter
          </Cta>
          <Cta to="/business" tone="ghost" size="xl" onClick={() => trackOutbound('fork_click', 'business')}>
            I own a business
          </Cta>
        </motion.div>

        <p className="mx-auto mt-5 max-w-[36rem] text-body-sm text-ink-soft">
          Today, SBI has chapters in East Brunswick, Guadalajara, and Simi Valley.
        </p>
      </div>
    </Section>
  )
}

/* ── Trust band ─────────────────────────────────────────── */

function TrustBand() {
  return (
    <section className="border-y border-canvas-border-strong bg-navy-900 px-5 py-8 text-white sm:px-8">
      <div className="mx-auto grid max-w-page gap-7 sm:grid-cols-3 sm:divide-x sm:divide-navy-700">
        <div className="border-l-2 border-gold-400 pl-4 sm:border-l-0 sm:pl-0 sm:pr-8">
          <p className="font-mono text-label uppercase tracking-label text-navy-300">Current footprint</p>
          <p className="mt-1 font-display text-display-sm font-medium tracking-tight text-white">
            {stats.chapters.value} local chapters
          </p>
          <p className="mt-1 text-body-sm text-navy-100/75">
            East Brunswick, Guadalajara, and Simi Valley.
          </p>
        </div>
        <div className="border-l-2 border-gold-400 pl-4 sm:border-l-0 sm:px-8">
          <p className="font-mono text-label uppercase tracking-label text-navy-300">For businesses</p>
          <p className="mt-1 font-display text-display-sm font-medium tracking-tight text-white">Free locally</p>
          <p className="mt-1 text-body-sm text-navy-100/75">Businesses keep the finished work with no invoice.</p>
        </div>
        <div className="border-l-2 border-gold-400 pl-4 sm:border-l-0 sm:pl-8">
          <p className="font-mono text-label uppercase tracking-label text-navy-300">Shared standard</p>
          <p className="mt-1 font-display text-display-sm font-medium tracking-tight text-white">Checked before handoff</p>
          <p className="mt-1 text-body-sm text-navy-100/75">The central student team reviews finished work.</p>
        </div>
      </div>
    </section>
  )
}

/* ── What a chapter makes ───────────────────────────────── */

function Makes() {
  return (
    <Section weight="support" bordered className="bg-canvas">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <SectionHead
            weight="support"
            title="What students make for local businesses"
            lede="A nearby business can request practical digital work from its local SBI chapter at no cost."
          />
          <div className="mt-8">
            <Cta to="/business" tone="ghost" size="md">
              Explore services for businesses
            </Cta>
          </div>
        </div>

        <Stagger className="grid gap-x-8 gap-y-12 sm:grid-cols-2" gap={0.08}>
          {MAKES.map(([name, detail]) => (
            <Reveal key={name} stagger variant="up">
              <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-[2px] before:bg-navy-200">
                <h3 className="font-display text-xl font-medium text-navy-950">
                  {name}
                </h3>
                <p className="mt-3 text-body text-ink-soft">{detail}</p>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

/* ── How the work runs ──────────────────────────────────── */

function How() {
  return (
    <Section weight="support" bordered className="bg-canvas-surface">
      <SectionHead
        weight="anchor"
        kicker="For local businesses"
        title="How a business gets help from SBI"
        lede="A business explains what it needs, students build it, and the business receives the finished work."
        align="center"
      />

      <div className="mx-auto mt-16 grid max-w-[68rem] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <Reveal variant="scale">
          <figure className="relative overflow-hidden rounded-2xl border border-canvas-border-strong bg-white shadow-xl shadow-navy-900/5">
            <img
              src="/about-work-session.webp"
              alt="SBI students working together at the East Brunswick Public Library"
              width="1000"
              height="625"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="border-t border-canvas-border bg-canvas-elevated p-4 text-body-sm text-ink-soft">
              SBI students planning a real project together in East Brunswick, New Jersey.
            </figcaption>
          </figure>
        </Reveal>

        <Stagger className="relative space-y-6" gap={0.09}>
          {HOW.map(([n, title, body], i) => (
            <Reveal key={n} stagger variant="wake" className="relative">
              <article className="flex gap-5">
                <span className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-gold-100 font-mono text-label font-semibold text-gold-700 border border-gold-200">
                  {n}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-lg font-medium text-navy-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-body-sm text-ink-soft leading-relaxed">{body}</p>
                </div>
              </article>
              {i !== HOW.length - 1 && (
                <div className="absolute left-5 top-10 h-full w-px -ml-[0.5px] bg-canvas-border" />
              )}
            </Reveal>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

/* ── The network model ───────────────────────────────────── */

function NetworkModel() {
  return (
    <Section weight="support" bordered className="bg-canvas-elevated">
      <SectionHead
        weight="support"
        title="How local chapters stay consistent"
        lede="Every chapter works locally, but all chapter leaders receive the same training and project review."
        align="center"
      />

      <Stagger className="mt-12 divide-y divide-navy-900/15 border-y border-navy-900/15" gap={0.08}>
        {NETWORK_MODEL.map(([title, body], index) => (
          <Reveal key={title} stagger variant="up">
            <article className="grid gap-4 py-7 sm:grid-cols-[5rem_1fr_1.25fr] sm:items-baseline sm:gap-8">
              <span className="font-mono text-label tracking-label text-gold-700">0{index + 1}</span>
              <h3 className="font-display text-display-sm font-medium tracking-display text-navy-950">{title}</h3>
              <p className="max-w-measure text-body-sm leading-relaxed text-ink-soft">{body}</p>
            </article>
          </Reveal>
        ))}
      </Stagger>
    </Section>
  )
}

/* ── Proof & Chapters ────────────────────────────────────── */

function Proof() {
  return (
    <Section weight="support" bordered className="bg-canvas">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
        <div>
          <SectionHead
            weight="support"
            title="What a business can expect"
            lede="A local student chapter does the work, SBI’s central student team checks it, and the business receives the finished result."
          />
          <div className="mt-8 space-y-4">
            {PROOF.map(([title, detail, to]) => {
              const content = (
                <>
                  <h3 className="font-display text-lg font-medium text-navy-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-body-sm text-ink-soft">{detail}</p>
                  {to && (
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-gold-600">
                      Explore <span aria-hidden="true" className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  )}
                </>
              )

              return to ? (
                <Link
                  key={title}
                  href={to}
                  className="group block rounded-xl border border-canvas-border bg-white p-6 transition-colors hover:border-gold-300 hover:bg-gold-50/30"
                >
                  {content}
                </Link>
              ) : (
                <div key={title} className="rounded-xl border border-dashed border-canvas-border-strong p-6 bg-canvas-elevated/50">
                  {content}
                </div>
              )
            })}
          </div>
        </div>

        <aside className="overflow-hidden rounded-2xl bg-navy-900 text-white shadow-xl">
          <div className="p-8 sm:p-10">
            <p className="font-mono text-label uppercase tracking-label text-gold-300">What exists today</p>
            <h3 className="mt-4 font-display text-3xl font-medium leading-tight text-white">
              Three chapters. One shared way of working.
            </h3>
            <p className="mt-4 text-body text-navy-100/80 leading-relaxed">
              SBI started in East Brunswick and now has local teams in three communities. Client work
              and quotes are published only after delivery and permission.
            </p>
            <div className="mt-8 divide-y divide-navy-700/50 border-y border-navy-700/50">
              {chapters.map((chapter) => (
                <div key={chapter.id} className="flex items-center justify-between gap-4 py-5">
                  <div>
                    <p className="font-display text-lg font-medium text-white">
                      {chapter.name}
                    </p>
                    <p className="mt-1 text-sm text-navy-200">{chapter.region}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-navy-600 bg-navy-800 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-navy-200">
                    Active team
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/business#coverage"
              className="mt-8 inline-flex items-center text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
            >
              See coverage and contact options <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </aside>
      </div>
    </Section>
  )
}

/* ── The students behind the work ───────────────────────── */

function Students() {
  const featured = LEADERSHIP.filter((member) => member.photo).slice(0, 4)

  return (
    <Section weight="support" bordered className="bg-canvas-surface">
      <SectionHead
        weight="support"
        title="Meet the students behind the work."
        lede="These students train new chapter leaders, answer project questions, and review finished work."
        align="center"
      />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
        {featured.map((member) => (
          <Reveal key={member.name} stagger variant="up">
            <Link
              href="/team"
              className="group block overflow-hidden rounded-2xl border border-canvas-border-strong bg-white transition-all hover:border-navy-300 hover:shadow-lg hover:shadow-navy-900/5"
            >
              <div className="aspect-[4/5] overflow-hidden bg-canvas-elevated">
                <img
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: member.photoPosition }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-label text-gold-600">{member.role}</p>
                <h3 className="mt-2 font-display text-lg font-medium text-navy-950">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{member.desc}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </Stagger>

      <div className="mt-10 text-center">
        <Link
          href="/team"
          className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-navy-600 bg-navy-50 hover:bg-navy-100 transition-colors"
        >
          Meet the full team <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
    </Section>
  )
}

/* ── Testimonial-ready proof ─────────────────────────────── */

/* ── The fork ───────────────────────────────────────────── */

function Paths() {
  return (
    <Section weight="anchor" bordered className="bg-canvas">
      <SectionHead
        weight="anchor"
        kicker="Get involved"
        title="Choose what you want to do"
        lede="Lead a student chapter in your town, or ask a nearby chapter to help your business."
        align="center"
      />

      <Stagger className="mt-12 grid gap-6 lg:grid-cols-2" gap={0.12}>
        {PATHS.map((path) => (
          <Reveal key={path.to} stagger variant="wake">
            <Link
              href={path.to}
              onClick={() => trackOutbound('fork_click', path.to.slice(1))}
              className={
                path.primary
                  ? 'group relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-navy-900 p-8 text-white shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl sm:p-10'
                  : 'group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-canvas-border-strong bg-white p-8 text-ink transition-transform hover:-translate-y-1 hover:shadow-xl sm:p-10'
              }
            >
              <h3 className="relative z-10 font-display text-3xl font-medium tracking-tight">
                {path.label}
              </h3>
              <p
                className={`relative z-10 mt-4 max-w-measure-narrow flex-grow text-lg leading-relaxed ${
                  path.primary ? 'text-navy-100' : 'text-ink-soft'
                }`}
              >
                {path.detail}
              </p>
              <span
                className={`relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-semibold ${
                  path.primary ? 'text-gold-400' : 'text-gold-600'
                }`}
              >
                {path.cta}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </Stagger>
    </Section>
  )
}

/* ── The close ────────────────────────────────────────────── */

function Close() {
  return (
    <Section weight="inline" className="pb-24 pt-8 text-center bg-canvas">
      <Reveal variant="up">
        <Cta to="/chapter" size="xl" onClick={() => trackOutbound('fork_click', 'chapter-close')}>
          Start a chapter
        </Cta>
      </Reveal>

      <Reveal variant="up" delay={0.1}>
        <p className="mt-6 text-body-sm text-ink-soft">
          Own a business instead?{' '}
          <Link
            href="/business"
            onClick={() => trackOutbound('fork_click', 'business-close')}
            className="font-medium text-gold-600 underline decoration-gold-600/40 underline-offset-4 transition-colors hover:text-gold-700"
          >
            Request free digital help
          </Link>
          .
        </p>
      </Reveal>
    </Section>
  )
}

export default function Landing() {
  useDocumentMeta('home')

  return (
    <div className="w-full bg-canvas">
      <Hero />
      <TrustBand />
      <Makes />
      <How />
      <NetworkModel />
      <Proof />
      <Students />
      <Paths />
      <Close />
    </div>
  )
}
