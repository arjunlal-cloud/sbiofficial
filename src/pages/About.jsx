import { Link } from 'react-router-dom'
import { FadeIn } from '../components/FadeIn'
import StickyMobileCta from '../components/StickyMobileCta'

export default function About() {
  return (
    <div className="bg-canvas w-full overflow-hidden">
      {/* Full Viewport Hero */}
      <section className="relative isolate flex min-h-[90vh] items-center py-24 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 network-grid opacity-35 pointer-events-none" />
        {/* Editorial ambient glow */}
        <div className="absolute top-1/3 left-0 w-full h-[500px] bg-gradient-to-r from-gold-500/10 via-transparent to-transparent blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-7xl mx-auto z-10">
          <FadeIn>
            <p className="font-mono text-[10px] tracking-[0.25em] text-gold-500 uppercase mb-8 flex items-center gap-3">
              <span className="w-12 h-px bg-gold-500/50 block"></span>
              Our Story
            </p>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="font-display text-[64px] leading-[1.05] tracking-[-0.04em] sm:text-[80px] md:text-[100px] lg:text-[120px] font-medium text-ink max-w-[900px] break-words">
              Built by doing.
            </h1>
            <p className="font-display text-2xl md:text-4xl text-ink-soft mt-6 font-medium max-w-3xl">
              Started in East Brunswick. Built from scratch.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Large Pull Quote */}
      <section className="w-full bg-canvas-surface py-32 px-4 sm:px-6 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-gold-500/5 mix-blend-screen pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <span className="text-gold-500 text-6xl md:text-8xl font-display leading-none block mb-8 opacity-50">"</span>
            <blockquote className="font-display text-3xl md:text-5xl lg:text-[56px] leading-[1.1] font-medium text-ink tracking-tight">
              We didn't pitch it. We just started building websites for our neighbors and eventually had to give it a name.
            </blockquote>
            <p className="font-mono text-sm tracking-widest text-gold-500 uppercase mt-12">
              — Da'El Kim, CEO
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Alternating Story Layout */}
      <section className="py-24 md:py-32 px-4 sm:px-6 bg-canvas">
        <div className="max-w-7xl mx-auto space-y-32">
          
          {/* Story 1 */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeIn className="order-2 lg:order-1">
              <div className="font-mono text-xs text-gold-500 uppercase tracking-widest mb-4">Phase 01</div>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-6 text-ink">It started with EBSBI.</h2>
              <div className="prose prose-invert prose-lg prose-p:text-ink-soft prose-p:leading-relaxed">
                <p>
                  SBI Network started with one chapter, EBSBI, built on a simple idea: small businesses deserve real
                  branding, real websites, and real marketing — the kind usually reserved for companies that can afford
                  agency prices. So a group of students decided to just do that work themselves, for free.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="order-1 lg:order-2 h-full">
              <div className="aspect-square bg-canvas-surface border border-white/10 rounded-2xl overflow-hidden relative group shadow-2xl">
                <img
                  src="/about-work-session.jpg"
                  alt="EBSBI members working on laptops at the East Brunswick Public Library"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <p className="font-mono text-xs uppercase tracking-widest text-gold-500">East Brunswick, NJ</p>
                  <p className="font-display text-2xl font-medium text-ink mt-1">Est. 2025</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Story 2 */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeIn className="order-1 h-full hidden lg:block">
              <div className="aspect-square bg-canvas-elevated border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
                <div className="grid grid-cols-2 gap-8 w-full">
                  <div>
                    <span className="block font-display text-6xl text-gold-500 mb-2">2</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Original team</span>
                  </div>
                  <div>
                    <span className="block font-display text-6xl text-gold-500 mb-2">1</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Year</span>
                  </div>
                  <div className="col-span-2 pt-8 border-t border-white/5">
                    <span className="block font-display text-[80px] text-gold-500 mb-2">100+</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">Hours Volunteered</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="order-2">
              <div className="font-mono text-xs text-gold-500 uppercase tracking-widest mb-4">Phase 02</div>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-6 text-ink">Then we kept showing up.</h2>
              <div className="prose prose-invert prose-lg prose-p:text-ink-soft prose-p:leading-relaxed">
                <p>
                  That group was really just two of us, Da'El Kim and James Yu, building sites and shooting promo videos
                  for local businesses whenever we had free time. Word got around fast, and pretty soon we were spending
                  every free hour on it, figuring out branding for businesses that shouldn't have to settle for a bad
                  website just because they couldn't afford an agency.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Story 3 */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeIn className="order-2 lg:order-1">
              <div className="font-mono text-xs text-gold-500 uppercase tracking-widest mb-4">Phase 03</div>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-6 text-ink">One chapter becomes many.</h2>
              <div className="prose prose-invert prose-lg prose-p:text-ink-soft prose-p:leading-relaxed">
                <p>
                  We noticed something else. We were learning more doing this than we ever did in a classroom. Real
                  clients, real deadlines, real feedback. So we asked ourselves why this had to stay one chapter. If two
                  students could do this for one town, a hundred students could do it for a hundred towns.
                </p>
                <p>
                  That's the whole idea behind SBI Network. Every chapter is students doing what we did in their own town:
                  building real skills by doing real work for the businesses down the street, for free. No corporate
                  backing, no catch. Just people who'd rather build something than just talk about it.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="order-1 lg:order-2 h-full">
              <div className="aspect-[4/3] lg:aspect-square bg-canvas-surface border border-white/10 rounded-2xl flex items-center justify-center text-center shadow-2xl relative">
                <div className="font-display text-[120px] md:text-[180px] font-medium text-gold-500/20 select-none">
                  1<span className="text-gold-500/40 text-[60px] md:text-[80px] align-middle mx-4">&rarr;</span>&infin;
                </div>
              </div>
            </FadeIn>
          </div>
          
        </div>
      </section>

      {/* Mission Statement Standalone */}
      <section className="py-32 px-4 sm:px-6 bg-canvas-surface border-y border-white/5 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(21,46,82,0.4),transparent)] relative">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <FadeIn>
            <h2 className="mx-auto mb-8 max-w-4xl text-balance font-display text-[clamp(2.35rem,6vw,4rem)] font-medium leading-[1.06] tracking-[-0.045em] text-ink">
              <span className="mx-auto block max-w-3xl">
                Every student deserves real experience.
              </span>
              <span className="relative mx-auto mt-7 block max-w-3xl pb-4">
                Every business deserves a real website.
                <span className="absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gold-500/80 sm:w-36" />
              </span>
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="scroll-mt-28 py-32 px-4 sm:px-6 bg-canvas relative isolate">
        <div className="pointer-events-none absolute inset-0 network-grid opacity-20" />
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="font-mono text-xs text-gold-500 uppercase tracking-widest mb-6">Support</div>
            <h2 className="font-display text-4xl md:text-5xl font-medium mb-6 text-ink">Support the mission.</h2>
            <p className="text-ink-soft text-lg mb-10 leading-relaxed">
              SBI is entirely student-run and free for every business we serve. If you believe in what we're building, even a small contribution helps us grow.
            </p>
            
              <div className="inline-flex flex-col items-center rounded-xl border border-gold-500/20 bg-canvas-elevated p-2">
                <button
                  disabled
                  title="A secure donation page has not been provided yet"
                  className="rounded bg-gold-500 px-10 py-4 text-[15px] font-medium text-canvas opacity-70 cursor-not-allowed w-full sm:w-auto"
              >
                Donate
              </button>
                <span className="mt-4 font-mono text-center text-[10px] tracking-widest uppercase text-muted">
                  Preview — secure donation link awaiting approval.
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="py-24 px-4 sm:px-6 bg-canvas-surface border-t border-white/5 text-center">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight mb-10">Get Involved</h2>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/business"
              className="inline-flex items-center justify-center rounded bg-gold-500 px-8 py-4 text-[15px] font-medium text-canvas transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-[0_0_32px_rgba(192,155,45,0.25)] hover:shadow-[0_0_40px_rgba(192,155,45,0.4)]"
            >
              Own a business?
            </Link>
            <Link
              to="/chapter"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-4 text-[15px] font-medium text-ink transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              Want to lead?
            </Link>
          </div>
        </FadeIn>
      </section>

       <StickyMobileCta href="/business" label="Find Business Support" />
    </div>
  )
}
