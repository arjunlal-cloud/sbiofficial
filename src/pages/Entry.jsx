import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import NetworkGlobe from '../components/NetworkGlobe'
import { HandshakeVisual, LaptopVisual } from '../components/IntroVisuals'

const scenes = [
  {
    label: 'A peer network for ambitious teenagers',
    title: 'Learn locally. Build together.',
    body: 'The SBI Network gives ambitious teenagers a framework to start building their own chapters independent of school. You learn by doing, and help local businesses, all while joining a prestigious network of like minded highschoolers doing the same exact thing.',
  },
  {
    label: 'Built by doing',
    title: 'Turn curiosity into client work.',
    body: "Students learn how to build websites with AI, do marketing, Google Business Profile optimization, and client communication by working with nearby businesses. The result is not only just a major asset on college applications, it's a launchpad for promising future entrepreneurs.",
  },
  {
    label: 'Local work, shared support',
    title: 'Your chapter is local. Your support system is bigger.',
    body: 'With students bringing their technical skills with guidance from the main organization, to experienced local business owners, we can help both sides significantly at the same time. A win win.',
  },
]

export default function Entry() {
  const [scene, setScene] = useState(0)
  const [entering, setEntering] = useState(false)
  const navigate = useNavigate()
  const current = scenes[scene]

  const nextScene = () => setScene((value) => Math.min(value + 1, scenes.length - 1))
  const previousScene = () => setScene((value) => Math.max(value - 1, 0))
  const enterNetwork = () => {
    window.sessionStorage.setItem('sbi-network-intro-complete', 'true')
    setEntering(true)
    window.setTimeout(() => navigate('/'), 420)
  }
  const skipIntro = () => {
    window.sessionStorage.setItem('sbi-network-intro-complete', 'true')
    navigate('/')
  }

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-canvas text-ink">
      <div className="pointer-events-none absolute inset-0 network-grid opacity-80" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[150px]" />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: entering ? 1 : 0 }}
        transition={{ duration: 0.28 }}
        className="pointer-events-none fixed inset-0 z-[200] bg-gold-100"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 py-6 sm:px-8 sm:py-8">
        <header className="flex items-center justify-between gap-4">
          <span className="font-display text-lg font-bold tracking-tight sm:text-xl">SBI <span className="text-gold-500">↗ Network</span></span>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.2em] text-ink-soft sm:inline">Introduction {String(scene + 1).padStart(2, '0')} / 03</span>
            <button onClick={skipIntro} className="rounded-lg border border-white/15 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-gold-500/50 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
              Skip intro
            </button>
          </div>
        </header>

        <main className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <motion.div
            key={`copy-${scene}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-2xl"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-500">{current.label}</p>
            <h1 className="mt-5 max-w-xl font-display text-[clamp(3rem,7vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.06em]">{current.title}</h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">{current.body}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {scene > 0 && (
                <button onClick={previousScene} className="rounded-xl border border-white/15 px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-ink-soft transition-colors hover:bg-white/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                  Back
                </button>
              )}
              {scene < scenes.length - 1 ? (
                <button onClick={nextScene} className="rounded-xl bg-gold-500 px-6 py-3.5 font-mono text-[11px] uppercase tracking-widest text-canvas transition-all hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                  Continue <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button onClick={enterNetwork} className="rounded-xl bg-gold-500 px-6 py-3.5 font-mono text-[11px] uppercase tracking-widest text-canvas transition-all hover:bg-gold-400 hover:shadow-[0_0_40px_rgba(192,155,45,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500">
                  Enter SBI Network <span aria-hidden="true">↗</span>
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            key={`visual-${scene}`}
            initial={{ opacity: 0, scale: 0.82, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none mx-auto w-[min(78vw,540px)] lg:w-full"
          >
            {scene === 0 && <NetworkGlobe id="entry-network-globe" />}
            {scene === 1 && <LaptopVisual />}
            {scene === 2 && <HandshakeVisual />}
          </motion.div>
        </main>

        <div className="flex items-center gap-2" aria-label={`Introduction step ${scene + 1} of 3`}>
          {scenes.map((item, index) => (
            <span key={item.label} className={`h-1 rounded-full transition-all ${index === scene ? 'w-12 bg-gold-500' : 'w-5 bg-white/15'}`} />
          ))}
          <span className="ml-3 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-soft">SBI Network introduction</span>
        </div>
      </div>
    </div>
  )
}