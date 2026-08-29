import ChapterMap from '../components/ChapterMap'
import Accordion from '../components/Accordion'
import StickyMobileCta from '../components/StickyMobileCta'
import sop from '../data/sop.jsx'
import glossary from '../data/glossary.json'
import chapters from '../data/chapters.json'
import { FadeIn, StaggerContainer } from '../components/FadeIn'
import { CONTACT_EMAIL } from '../components/Layout'

const APPLY_FORM_URL = 'https://docs.google.com/forms/d/1v1HwPRPeFm87FyT4HGVMMnwyHFn6khd_Z-j2XFp2Y1Q/viewform'

const ApplyButton = ({ children, className = "" }) => (
  <a
    href={APPLY_FORM_URL}
    target={APPLY_FORM_URL.startsWith('http') ? '_blank' : undefined}
    rel="noreferrer"
    className={`inline-flex items-center justify-center rounded bg-gold-500 px-8 py-4 text-[15px] font-medium text-canvas transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-[0_0_32px_rgba(192,155,45,0.25)] hover:shadow-[0_0_40px_rgba(192,155,45,0.4)] ${className}`}
  >
    {children}
  </a>
)

const glossaryGroups = [
  {
    title: 'Chapter foundations',
    terms: ['Chartered', 'HQ', 'Chapter Leader', 'Chapter Boundaries', 'Deactivation'],
  },
  {
    title: 'Client delivery team',
    terms: ['Coder', 'Cameraman', 'Editor', 'Marketer'],
  },
  {
    title: 'HQ support roles',
    terms: ['Quality Lead', 'Recruitment Lead', 'Onboarding Lead', 'Support Lead'],
  },
]

export default function Chapter() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.setAttribute('open', 'true');
    }
  };

  return (
    <div className="bg-canvas w-full overflow-hidden">
      {/* Hero */}
      <section className="py-24 md:py-32 px-4 sm:px-6 text-center border-b border-white/5 relative isolate">
        <div className="pointer-events-none absolute inset-0 network-grid opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-canvas-surface to-canvas -z-10" />
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <p className="font-mono text-[10px] tracking-widest text-gold-500 uppercase mb-6 flex items-center justify-center gap-3">
               <span className="w-8 h-px bg-gold-500/40 inline-block" /> For future chapter leaders <span className="w-8 h-px bg-gold-500/40 inline-block" />
            </p>
            <h1 className="font-display text-4xl leading-[1.1] sm:text-5xl md:text-7xl font-medium tracking-tight mb-6">
              Start an agency.<br />
              <span className="text-ink-soft">Build real skills.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-ink-soft mb-10">
              Join a network of students helping local businesses. Learn marketing, web development, and leadership — completely hands-on with real clients.
            </p>
            <ApplyButton>Apply to Start a Chapter</ApplyButton>
          </FadeIn>
        </div>
      </section>

      {/* SOP Section */}
      <section className="py-24 px-4 sm:px-6 bg-canvas relative z-10 overflow-x-hidden">
        <div className="mx-auto w-full min-w-0 max-w-4xl">
          <FadeIn>
            <div className="mb-8 text-center md:text-left">
              <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase mb-4 block flex items-center justify-center md:justify-start gap-3">
                <span className="w-8 h-px bg-gold-500/40 inline-block hidden md:block" /> Master Manual
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4">Chapter Operations Guide</h2>
              <p className="text-ink-soft text-base leading-relaxed sm:text-lg">
                A clear guide to starting and running a chapter. Dotted{' '}
                <span className="font-medium text-gold-400 underline decoration-gold-500/40 decoration-dotted decoration-2 underline-offset-4">
                  terms
                </span>{' '}
                show a definition on hover.
              </p>
            </div>
          </FadeIn>

          {/* Index Pills */}
          <FadeIn delay={0.1}>
            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-6 mb-8 snap-x scrollbar-hide hide-scrollbar sm:mx-0 sm:px-0">
              {sop.map((s, i) => (
                <button
                  key={`pill-${s.id}`}
                  onClick={() => scrollToSection(s.id)}
                  className="snap-start shrink-0 inline-flex items-center gap-2 rounded-full border border-white/10 bg-canvas-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-gold-500/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  <span className="font-mono text-[10px] text-gold-500 uppercase">0{i + 1}</span>
                  {s.title.split(' ').slice(0, 3).join(' ')}{s.title.split(' ').length > 3 ? '...' : ''}
                </button>
              ))}
            </div>
          </FadeIn>

          <StaggerContainer className="min-w-0 space-y-6">
            {sop.map((s, i) => (
              <FadeIn key={s.id} stagger delay={i * 0.05} className="min-w-0">
                <Accordion
                  id={s.id}
                  title={s.title}
                  defaultOpen={s.defaultOpen}
                  indexNumber={`0${i + 1}`}
                >
                  {s.content}
                </Accordion>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10" />

      {/* Map Section - 2 Column Layout */}
      <section className="py-24 px-4 sm:px-6 bg-canvas-surface">
        <div className="mx-auto max-w-7xl">
          <div className="grid min-w-0 gap-12 md:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] lg:gap-16">
            {/* Left Column */}
            <div className="flex min-w-0 flex-col gap-6">
              <FadeIn>
                <h2 className="font-display text-3xl font-medium">Network Coverage</h2>
                <p className="text-ink-soft mt-2 text-sm leading-relaxed mb-6">
                  See where chapters already exist — or claim your territory by starting one in your town.
                </p>
              </FadeIn>
              
              <StaggerContainer className="flex flex-col gap-4">
                {chapters.map(c => (
                  <FadeIn key={c.id} stagger>
                    <div className="bg-canvas rounded-xl p-6 border-l-4 border-l-gold-500 border border-white/5 shadow-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-display text-xl font-medium text-ink break-words">{c.name}</h3>
                        <span className="font-mono text-[10px] text-muted tracking-widest uppercase">{c.abbreviation}</span>
                      </div>
                      <p className="text-xs text-ink-soft mb-2">{c.description}</p>
                       {c.leader && (
                         <p className="mb-2 text-xs text-ink-soft">Chapter lead: <span className="text-ink">{c.leader}</span></p>
                       )}
                      
                      <div className="mb-4">
                        <span className="font-mono text-[10px] text-gold-500 uppercase tracking-widest">{c.radius}</span>
                      </div>
                      
                      <div className="mb-6">
                        <span className="font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2">Capabilities</span>
                        <div className="flex flex-wrap gap-2">
                          {c.services.map(s => (
                            <span key={s} className="px-2 py-1 rounded-sm bg-white/5 text-xs text-ink-soft border border-white/5">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </StaggerContainer>

              <FadeIn delay={0.3}>
                <div className="mt-4 p-6 rounded-xl border border-white/5 bg-canvas-elevated text-center">
                  <p className="text-sm text-ink-soft mb-3">Ready to claim your area?</p>
                  <a
                    href={APPLY_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs tracking-widest text-gold-500 uppercase hover:text-gold-400 underline decoration-gold-500/30 underline-offset-4 block"
                  >
                    Start an application
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right Column */}
            <FadeIn delay={0.2} className="h-full min-h-[500px] min-w-0">
              <div className="h-[min(600px,70vh)] min-h-96 w-full md:sticky md:top-24">
                <ChapterMap />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10" />

      {/* Glossary Section */}
      <section className="pb-24 px-4 sm:px-6 bg-canvas">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <Accordion title="Glossary" id="glossary">
              <p className="mb-7 max-w-2xl text-sm leading-relaxed text-ink-soft">
                A quick reference for the people, roles, and chapter terms used throughout the guide.
              </p>
              <div className="space-y-8">
                {glossaryGroups.map((group) => (
                  <section key={group.title} aria-labelledby={`glossary-${group.title}`}>
                    <h3
                      id={`glossary-${group.title}`}
                      className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-500"
                    >
                      <span className="h-px w-6 bg-gold-500/40" aria-hidden="true" />
                      {group.title}
                    </h3>
                    <dl className="grid gap-3 sm:grid-cols-2">
                      {group.terms.map((term) => {
                        const entry = glossary.find((g) => g.term === term)
                        if (!entry) return null
                        return (
                          <div
                            key={entry.term}
                            className="rounded-xl border border-white/8 bg-canvas/60 px-4 py-4 sm:px-5 sm:py-5"
                          >
                            <dt className="font-display text-[15px] font-semibold leading-snug text-gold-400">{entry.term}</dt>
                            <dd className="mt-2 text-[14px] leading-6 text-ink-soft">{entry.definition}</dd>
                          </div>
                        )
                      })}
                    </dl>
                  </section>
                ))}
              </div>
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 md:py-32 px-4 sm:px-6 bg-canvas-surface text-center border-t border-white/5 relative bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(21,46,82,0.4),transparent)]">
        <FadeIn className="relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4">Ready to lead?</h2>
          <p className="text-ink-soft mb-10 text-lg max-w-lg mx-auto">Two people and some drive is all it takes to start. We provide the rest.</p>
          <ApplyButton>Submit Application</ApplyButton>
        </FadeIn>
      </section>

      <StickyMobileCta href={APPLY_FORM_URL} label="Apply to Lead a Chapter" />
    </div>
  )
}
