import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { FadeIn, StaggerContainer } from '../components/FadeIn'
import StickyMobileCta from '../components/StickyMobileCta'

const WORDS = ["Websites", "Promo Videos", "GBP Optimization", "Social Media"]
const PROJECT_PREVIEWS = [
  { type: 'Website preview', title: 'A local business website', detail: 'Layout and interface preview — awaiting an approved project image.', mark: '</>' },
  { type: 'Web development preview', title: 'Building the digital basics', detail: 'Development update placeholder — real work imagery will appear here with approval.', mark: '{ }' },
  { type: 'New chapter preview', title: 'A growing local network', detail: 'Chapter launch update placeholder — awaiting a verified chapter announcement.', mark: '↗' },
  { type: 'Newsletter preview', title: 'What the network is working on', detail: 'Future newsletter and community update preview — awaiting approved content.', mark: '01' },
  { type: 'Meet the team preview', title: 'The people doing the work', detail: 'Team feature placeholder — awaiting approved photos and role details.', mark: '◎' },
]

function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="relative inline-block text-gold-500">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 whitespace-nowrap"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible sizer — stays fixed to widest word so layout doesn't jump */}
      <span className="invisible whitespace-nowrap" aria-hidden="true">Social Media</span>
    </span>
  )
}

function AnimatedCounter({ value, label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const end = parseInt(value.replace(/[^0-9]/g, ''));
      const timer = setInterval(() => {
        start += Math.ceil(end / 30);
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, duration / 30);
      return () => clearInterval(timer);
    }
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center md:text-left flex flex-col gap-2">
      <span className="font-display text-6xl md:text-[80px] leading-none font-medium tracking-tight text-gold-500">
        {count}{value.includes('+') ? '+' : ''}
      </span>
      <span className="font-mono text-xs uppercase tracking-widest text-ink-soft mt-2">
        {label}
      </span>
    </div>
  )
}

function ProjectPreviewCarousel() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const project = PROJECT_PREVIEWS[active]
  const move = (direction) => setActive((current) => (current + direction + PROJECT_PREVIEWS.length) % PROJECT_PREVIEWS.length)

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => move(1), 4800)
    return () => window.clearInterval(timer)
  }, [paused])

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-canvas-surface p-3 shadow-2xl">
      <div className="relative min-h-[420px] overflow-hidden rounded-xl border border-white/5 bg-[radial-gradient(circle_at_78%_22%,rgba(192,155,45,0.18),transparent_28%),linear-gradient(145deg,#132040,#080d1a)] p-7 sm:p-9">
        <div className="absolute inset-0 network-grid opacity-45" />
        <div className="absolute -right-14 -top-14 h-56 w-56 rounded-full border border-gold-500/20" />
        <div className="absolute -right-4 top-12 h-40 w-40 rounded-full border border-white/10" />
        <AnimatePresence mode="wait">
          <motion.div key={project.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.3 }} className="relative z-10 flex min-h-[352px] flex-col">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-gold-300">Preview update</span>
              <span className="font-mono text-xs text-ink-soft">{String(active + 1).padStart(2, '0')} / {String(PROJECT_PREVIEWS.length).padStart(2, '0')}</span>
            </div>
            <div className="mt-auto">
              <span className="font-display text-7xl font-medium tracking-[-0.08em] text-gold-500/70">{project.mark}</span>
              <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-400">{project.type}</p>
              <h2 className="mt-3 max-w-sm font-display text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-ink">{project.title}</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">{project.detail}</p>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft/70">Real approved images will replace these previews.</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 px-1 pb-1">
        <div className="flex gap-1.5" aria-label={`Preview ${active + 1} of ${PROJECT_PREVIEWS.length}`}>
          {PROJECT_PREVIEWS.map((item, index) => <button key={item.type} onClick={() => { setActive(index); setPaused(true) }} aria-label={`Show ${item.type}`} className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${index === active ? 'w-8 bg-gold-500' : 'w-2 bg-white/20 hover:bg-white/40'}`} />)}
        </div>
        <div className="flex gap-2">
          <button onClick={() => { move(-1); setPaused(true) }} aria-label="Previous preview" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-ink-soft transition-colors hover:bg-white/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">←</button>
          <button onClick={() => { move(1); setPaused(true) }} aria-label="Next preview" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-ink-soft transition-colors hover:bg-white/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">→</button>
          <button onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Resume automatic previews' : 'Pause automatic previews'} className="px-2 font-mono text-[9px] uppercase tracking-widest text-gold-300 hover:text-gold-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">{paused ? 'Play' : 'Pause'}</button>
        </div>
      </div>
    </div>
  )
}

const SERVICES = [
  {
    title: "Websites",
    desc: "Custom sites built to actually reflect how your business works — not a template dropped on your address."
  },
  {
    title: "Promo Videos",
    desc: "Short-form video shot and edited by students who do this for their own channels too."
  },
  {
    title: "Google Business Profile",
    desc: "Hours, photos, descriptions — the stuff that decides whether someone calls you or your competitor."
  },
  {
    title: "Social Media",
    desc: "A real starting point: handle setup, first content, and a template your team can actually keep up with."
  }
]

export default function Landing() {
  return (
    <div className="bg-canvas overflow-hidden w-full">
      {/* Hero Section */}
      <section id="sbi-home" className="relative isolate flex min-h-[90vh] scroll-mt-24 items-center pt-24 pb-24 md:pt-28 overflow-hidden">
        {/* Ambient light blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gold-500/20 blur-[140px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite] z-0" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/3 w-[500px] h-[500px] rounded-full bg-navy-800/20 blur-[120px] pointer-events-none z-0" />

        <div className="mx-auto grid w-full max-w-7xl px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-8 items-center relative z-10">
          <div className="text-left">
            <FadeIn>
              <p className="font-mono text-[10px] tracking-[0.25em] text-gold-500 uppercase mb-8 flex items-center">
                <span className="w-8 h-px bg-gold-500/40 inline-block mr-3 align-middle" />
                SBI · Student Business Initiative
              </p>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="font-display text-[clamp(2.75rem,6.8vw,5.5rem)] leading-[1.05] tracking-[-0.04em] font-medium text-ink max-w-full">
                <span className="block">Start a chapter.</span>
                <span className="block text-ink-soft">Build real skills.</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-lg text-[17px] md:text-lg leading-relaxed text-ink-soft">
                A place for ambitious teenagers to learn by doing, lead something of their own, and connect with peers building chapters in other towns.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/chapter"
                  className="rounded bg-gold-500 px-8 py-4 text-center text-[15px] font-medium text-canvas transition-all hover:bg-gold-400 hover:shadow-[0_0_32px_rgba(192,155,45,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  Start a chapter
                </Link>
                <Link
                  to="/business"
                  className="rounded border border-white/20 bg-white/5 px-8 py-4 text-center text-[15px] font-medium text-ink transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                >
                  I'm a business owner
                </Link>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.4} className="hidden lg:flex justify-end relative z-10">
            <ProjectPreviewCarousel />
          </FadeIn>
        </div>
      </section>

      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />

      {/* Ticker */}
      <div className="relative bg-canvas-surface/20 py-5 overflow-hidden whitespace-nowrap flex text-[13px] font-mono tracking-widest uppercase text-ink-soft">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-16 px-8 items-center"
        >
          {Array(4).fill([
            "3 Chapters Live", "5+ Businesses Served", "15+ Students Involved", "100% Free", "Est. 2025"
          ]).flat().map((text, i) => (
            <span key={i} className="flex items-center gap-16">
              {text}
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500/60 inline-block" />
            </span>
          ))}
        </motion.div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />

      {/* Impact Counters */}
      <section className="relative isolate py-24 md:py-32 bg-canvas">
        <div className="pointer-events-none absolute inset-0 network-grid opacity-30" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-2 gap-y-16 gap-x-8 md:grid-cols-4">
            <FadeIn stagger><AnimatedCounter value="5+" label="Businesses Helped" /></FadeIn>
            <FadeIn stagger><AnimatedCounter value="3" label="Chapters Live" /></FadeIn>
            <FadeIn stagger><AnimatedCounter value="15+" label="Students Involved" /></FadeIn>
            <FadeIn stagger><AnimatedCounter value="4" label="Services Offered" /></FadeIn>
          </StaggerContainer>
        </div>
      </section>

      {/* Split Audiences */}
      <section className="py-24 bg-canvas-surface bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(21,46,82,0.4),transparent)] relative isolate border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 h-full">
            <FadeIn className="h-full order-1 md:order-2">
              <div className="h-full rounded-2xl border border-white/5 bg-canvas p-10 md:p-14 transition-colors hover:border-white/10 group flex flex-col">
                <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase mb-4 block">For Local Businesses</span>
                <h3 className="font-display text-3xl font-medium tracking-tight mb-4 break-words">Professional work, zero cost.</h3>
                <p className="text-ink-soft leading-relaxed mb-10 flex-grow">
                  A local student team handles your website, promo video, or Google Business Profile — and they do it for free. You get real deliverables; they get real experience.
                </p>
                <Link to="/business" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold-500 group-hover:text-gold-400 transition-colors mt-auto">
                  Learn how it works <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="h-full order-2 md:order-1">
              <div className="h-full rounded-2xl border border-white/5 bg-canvas p-10 md:p-14 transition-colors hover:border-white/10 group flex flex-col">
                <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase mb-4 block">For Future Chapter Leaders</span>
                <h3 className="font-display text-3xl font-medium tracking-tight mb-4 break-words">Build an agency in your town.</h3>
                <p className="text-ink-soft leading-relaxed mb-10 flex-grow">
                  You run the chapter, manage real clients, and build skills that matter — alongside other ambitious students doing the same thing in their own towns.
                </p>
                <Link to="/chapter" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold-500 group-hover:text-gold-400 transition-colors mt-auto">
                  Start a chapter <span className="text-lg transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32 bg-canvas relative isolate">
        <div className="pointer-events-none absolute right-[-15rem] top-0 h-[35rem] w-[35rem] rounded-full border border-gold-500/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase mb-4 block flex items-center gap-3">
                  <span className="w-8 h-px bg-gold-500/40 inline-block" /> Capabilities
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight break-words">What we do.</h2>
              </div>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6 items-stretch">
            {SERVICES.map((srv) => (
              <FadeIn key={srv.title} stagger className="h-full">
                <div className="h-full flex flex-col p-10 rounded-xl border border-white/5 bg-canvas-elevated hover:-translate-y-1 hover:border-l-2 hover:border-l-gold-500/40 transition-all duration-300">
                  <h4 className="font-display text-2xl font-medium mb-3 text-ink">{srv.title}</h4>
                  <p className="text-ink-soft leading-relaxed flex-grow">{srv.desc}</p>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Approved stories only — no anonymous testimonials */}
      <section className="py-32 bg-canvas-surface bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(21,46,82,0.4),transparent)] relative border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gold-500/5 mix-blend-screen pointer-events-none" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 relative z-10">
          <FadeIn>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-500">Community stories</p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight">Verified stories are on their way.</h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-soft">We’ll publish approved business stories and outcomes here once the businesses have signed off. No placeholder reviews, no made-up quotes.</p>
            <span className="mt-8 inline-flex rounded-full border border-gold-500/30 bg-gold-500/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-gold-300">Preview — awaiting approved stories</span>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-canvas relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight">What can we build for you?</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 h-full items-stretch">
             <FadeIn delay={0.1} className="h-full">
               <div className="h-full rounded-2xl bg-gold-500 p-10 md:p-14 text-canvas flex flex-col justify-between shadow-[0_0_40px_rgba(192,155,45,0.15)] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                <div className="relative z-10">
                   <h3 className="font-display text-3xl font-medium tracking-tight mb-4 text-canvas">Chapter Leaders</h3>
                  <p className="text-canvas/80 leading-relaxed mb-10 text-[15px]">
                     Start an agency. Build real skills. Serve your community. We give you the playbook and support.
                  </p>
                </div>
                 <Link to="/chapter" className="mt-auto relative z-10 inline-flex items-center justify-between rounded-lg bg-canvas px-6 py-4 font-mono text-xs uppercase tracking-widest text-gold-500 transition-transform group-hover:scale-[1.02]">
                   Apply to Lead <span>&rarr;</span>
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} className="h-full">
              <div className="h-full rounded-2xl border-2 border-white/10 bg-canvas p-10 md:p-14 text-ink flex flex-col justify-between group transition-colors hover:border-white/20">
                <div>
                   <h3 className="font-display text-3xl font-medium tracking-tight mb-4">Businesses</h3>
                  <p className="text-ink-soft leading-relaxed mb-10 text-[15px]">
                     Get a professional website, video, or brand refresh created by top local students, completely free.
                  </p>
                </div>
                 <Link to="/business" className="mt-auto inline-flex items-center justify-between rounded-lg bg-white/5 px-6 py-4 font-mono text-xs uppercase tracking-widest text-ink transition-transform group-hover:scale-[1.02] group-hover:bg-white/10">
                   Find Business Support <span>&rarr;</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      
       <StickyMobileCta href="/business" label="Find Business Support" />
    </div>
  )
}
