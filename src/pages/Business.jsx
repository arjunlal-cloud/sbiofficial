import { Link } from 'react-router-dom'
import ChapterMap from '../components/ChapterMap'
import StickyMobileCta from '../components/StickyMobileCta'
import { CONTACT_EMAIL } from '../components/Layout'
import { FadeIn, StaggerContainer } from '../components/FadeIn'
import chapters from '../data/chapters.json'

const CHAPTER_REQUEST_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe-rm4vbP6Bkte7mILxS8CEHcrtabHW80qUrEat2kKHOSvbFw/viewform?usp=publish-editor'

const steps = [
  {
    title: 'Free, professional services',
    body: "If your business is inside a chapter's service radius, everything is free — a professional website, a promotional video, and optional extras like Google Business Profile optimization and social media. No catch, no trial, no upsell.",
  },
  {
    title: 'Reach out to your local chapter',
    body: "Find your area on the map below and click the pin — each available chapter lists its services and contact details when available. Send a quick email describing your business, and the local chapter team will set up a conversation.",
  },
  {
    title: 'No chapter in your area?',
    body: 'Help us grow the network by requesting a chapter in your area. We can use your response to understand local demand and connect with students who may want to start one.',
  },
]

export default function Business() {
  return (
    <div className="bg-canvas w-full overflow-hidden">
      {/* Hero */}
      <section className="py-24 md:py-32 px-4 sm:px-6 relative isolate border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 network-grid opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-canvas-surface to-canvas -z-10" />
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn>
            <p className="font-mono text-[10px] tracking-widest text-gold-500 uppercase mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-gold-500/40 inline-block" /> For Business Owners <span className="w-8 h-px bg-gold-500/40 inline-block" />
            </p>
            <h1 className="font-display text-4xl leading-[1.1] sm:text-5xl md:text-7xl font-medium tracking-tight mb-6">
              Grow the network.<br />
              <span className="text-ink-soft">Find support in your area.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-ink-soft mb-10">
              SBI grows through student-led chapters. Find a chapter for free digital support, or help bring one to
              your town so local students can learn, lead, and serve nearby businesses.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#find-your-chapter"
                className="inline-flex items-center justify-center rounded bg-gold-500 px-8 py-4 text-[15px] font-medium text-canvas transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-[0_0_32px_rgba(192,155,45,0.25)] hover:shadow-[0_0_40px_rgba(192,155,45,0.4)]"
              >
                Find Your Chapter
              </a>
              <a
                href={CHAPTER_REQUEST_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded border border-white/20 bg-white/5 px-8 py-4 text-[15px] font-medium text-ink transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                Request a Chapter
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Map Section - 2 Column Layout */}
      <section id="find-your-chapter" className="py-24 px-4 sm:px-6 bg-canvas scroll-mt-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-[35%_65%] gap-12 lg:gap-16 items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <FadeIn>
                <h2 className="font-display text-3xl font-medium">Find Your Chapter</h2>
                <p className="text-ink-soft mt-2 text-sm leading-relaxed mb-6">
                  Select a chapter below or find it on the map. If you're within their radius, their services are 100% free.
                </p>
              </FadeIn>
              
              <StaggerContainer className="flex flex-col gap-4">
                {chapters.map(c => (
                  <FadeIn key={c.id} stagger>
                    <div className="bg-canvas-elevated rounded-xl p-6 border-l-4 border-l-gold-500 border border-white/5 shadow-xl">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-display text-xl font-medium text-ink break-words">{c.name}</h3>
                        <span className="font-mono text-[10px] text-muted tracking-widest uppercase">{c.abbreviation}</span>
                      </div>
                      <p className="text-xs text-ink-soft mb-4">{c.radius}</p>
                       {c.leader && (
                         <p className="text-xs text-ink-soft mb-4">Chapter lead: <span className="text-ink">{c.leader}</span></p>
                       )}
                      
                      <div className="mb-6">
                        <span className="font-mono text-[10px] text-gold-500 tracking-widest uppercase block mb-2">Services</span>
                        <div className="flex flex-wrap gap-2">
                          {c.services.map(s => (
                            <span key={s} className="px-2 py-1 rounded-sm bg-white/5 text-xs text-ink-soft border border-white/5">{s}</span>
                          ))}
                        </div>
                      </div>
                      
                       {c.contact ? (
                         <a 
                           href={`mailto:${c.contact}`}
                           className="inline-flex w-full justify-center items-center rounded bg-white/5 px-4 py-3 text-xs font-mono tracking-widest uppercase text-ink transition-colors hover:bg-white/10 hover:text-gold-400"
                         >
                           Contact Chapter
                         </a>
                       ) : (
                         <span className="inline-flex w-full justify-center rounded bg-white/5 px-4 py-3 text-center text-xs font-mono tracking-widest uppercase text-muted">
                           Local contact coming soon · use the current network contact below
                         </span>
                       )}
                    </div>
                  </FadeIn>
                ))}
              </StaggerContainer>

              <FadeIn delay={0.3}>
                <div className="mt-4 p-6 rounded-xl border border-white/5 bg-canvas-surface text-center">
                   <p className="text-sm text-ink-soft mb-3">Don't see your area yet? Help us bring SBI there as the network grows.</p>
                  <a
                     href={CHAPTER_REQUEST_FORM_URL}
                     target="_blank"
                     rel="noreferrer"
                     className="font-mono text-xs tracking-widest text-gold-500 uppercase hover:text-gold-400 underline decoration-gold-500/30 underline-offset-4"
                  >
                     Request a chapter in your area
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* Right Column */}
            <FadeIn delay={0.2} className="h-full min-h-[500px]">
              <div className="h-[min(600px,70vh)] min-h-96 w-full md:sticky md:top-24">
                <ChapterMap />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How it works - Horizontal Cards */}
      <section className="py-24 px-4 sm:px-6 bg-canvas-surface border-t border-white/5 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(21,46,82,0.4),transparent)]">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="text-center mb-16">
            <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase mb-4 block flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-gold-500/40 inline-block" /> The Process <span className="w-8 h-px bg-gold-500/40 inline-block" />
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">How it works</h2>
          </FadeIn>
          
          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-6 left-12 right-12 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent z-0" />
            
            <StaggerContainer className="grid md:grid-cols-3 gap-8 md:gap-6 relative z-10 items-stretch">
              {steps.map((s, i) => (
                <FadeIn key={s.title} stagger className="h-full">
                  <div className="h-full flex flex-col group bg-canvas-elevated p-8 rounded-2xl border border-white/5 hover:border-gold-500/30 transition-colors shadow-lg">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-canvas border-2 border-gold-500/30 font-mono text-sm font-medium text-gold-500 mb-6 group-hover:border-gold-500 transition-colors shadow-[0_0_15px_rgba(192,155,45,0.1)] group-hover:shadow-[0_0_20px_rgba(192,155,45,0.3)]">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-xl font-medium text-ink mb-3">{s.title}</h3>
                    <p className="leading-relaxed text-ink-soft text-[14px] flex-grow">{s.body}</p>
                  </div>
                </FadeIn>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden border-t border-white/5 bg-canvas px-4 py-20 text-center sm:px-6 sm:py-24">
        <div className="pointer-events-none absolute inset-0 network-grid opacity-20" />
        <FadeIn className="relative mx-auto flex max-w-2xl flex-col items-center">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/30 bg-gold-500/10 font-display text-gold-400">?</span>
          <h2 className="mt-5 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-medium tracking-tight">Questions?</h2>
          <p className="mt-4 max-w-lg text-center leading-relaxed text-ink-soft">Our current network contact can point you to the right chapter or answer general questions.</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          >
             Email SBI&apos;s Current Contact
          </a>
        </FadeIn>
      </section>

       <StickyMobileCta href={CHAPTER_REQUEST_FORM_URL} label="Request a Chapter" />
    </div>
  )
}
