import { useEffect, useRef, useState } from 'react'
import Accordion from './Accordion'
import sop from '../data/sop.jsx'
import glossary from '../data/glossary.json'
import { Reveal } from './motion/Reveal'

const GLOSSARY_GROUPS = [
  { title: 'Chapter foundations', terms: ['Chartered', 'HQ', 'Chapter Leader', 'Radius', 'Deactivation'] },
  { title: 'Client delivery team', terms: ['Coder', 'Cameraman', 'Editor', 'Marketer'] },
  { title: 'Student support roles', terms: ['Quality Lead', 'Recruitment Lead', 'Onboarding Lead', 'Support Lead'] },
]

/**
 * The operations guide.
 *
 * A sticky index rail on the left tracks which part is in view while the parts
 * themselves stay collapsed on the right, so the whole manual is legible at a
 * glance instead of arriving as one uninterrupted wall.
 */
export default function ChapterGuide() {
  const [activeId, setActiveId] = useState(sop[0].id)
  const containerRef = useRef(null)

  useEffect(() => {
    const targets = sop
      .map((section) => document.getElementById(section.id))
      .filter(Boolean)
    if (!targets.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const open = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    el.open = true
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={containerRef} className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
      {/* Index rail */}
      <aside className="min-w-0 lg:sticky lg:top-32 lg:self-start">
        <p className="font-mono text-label uppercase tracking-label text-ink-soft">Contents</p>
        <nav className="mt-5 flex gap-2 overflow-x-auto pb-2 hide-scrollbar lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
          {sop.map((section, i) => {
            const isActive = activeId === section.id
            const short = section.title.replace(/^Part \d+:\s*/, '')
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => open(section.id)}
                data-testid={`button-chapter-guide-${section.id}`}
                className={`focus-gold group flex min-h-[44px] shrink-0 items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-left text-body-sm transition-colors duration-300 lg:w-full lg:whitespace-normal ${
                  isActive ? 'text-gold-300' : 'text-ink-soft hover:text-ink'
                }`}
              >
                <span
                  className={`h-px shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'w-7 bg-gold-500' : 'w-3 bg-[rgba(11,31,58,0.3)] group-hover:w-5'
                  }`}
                />
                <span className="font-mono text-label tracking-label text-ink-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {short}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Parts */}
      <div className="min-w-0">
        {sop.map((section, i) => (
          <Reveal key={section.id} variant="up" delay={Math.min(i * 0.04, 0.2)}>
            <Accordion
              id={section.id}
              title={section.title.replace(/^Part \d+:\s*/, '')}
              defaultOpen={section.defaultOpen}
              indexNumber={String(i + 1).padStart(2, '0')}
            >
              {section.content}
            </Accordion>
          </Reveal>
        ))}

        <Reveal variant="up">
          <Accordion id="glossary" title="Glossary" indexNumber={String(sop.length + 1).padStart(2, '0')}>
            <p className="mb-8 max-w-measure text-body leading-relaxed text-ink">
              Every role and chapter term used above, in one place.
            </p>
            <div className="space-y-9">
              {GLOSSARY_GROUPS.map((group) => (
                <section key={group.title}>
                  <h3 className="mb-4 flex items-center gap-3 font-mono text-label uppercase tracking-label text-gold-400">
                    <span className="h-px w-6 bg-gold-500/50" aria-hidden="true" />
                    {group.title}
                  </h3>
                  <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    {group.terms.map((term) => {
                      const entry = glossary.find((g) => g.term === term)
                      if (!entry) return null
                      return (
                        <div key={entry.term}>
                          <dt className="font-display text-body font-semibold text-gold-300">{entry.term}</dt>
                          <dd className="mt-1.5 text-body-sm leading-6 text-ink-soft">{entry.definition}</dd>
                        </div>
                      )
                    })}
                  </dl>
                </section>
              ))}
            </div>
          </Accordion>
        </Reveal>
      </div>
    </div>
  )
}
