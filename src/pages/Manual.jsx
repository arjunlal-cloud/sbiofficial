import Accordion from '../components/Accordion'
import ChapterGuide from '../components/ChapterGuide'
import Cta from '../components/Cta'
import StickyMobileCta from '../components/StickyMobileCta'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import { Reveal } from '../components/motion/Reveal'
import { trackApply } from '../lib/analytics'
import { useDocumentMeta } from '../lib/meta'

/**
 * Reference, off the conversion path.
 *
 * Also the home for the questions that used to sit on the chapter page. Only
 * the three every applicant asks - time, cost, experience - stayed there; the
 * edge cases and the parent-facing answers live here.
 */

const QUESTIONS = [
  {
    q: 'What if no business says yes?',
     a: "A student setup lead gives you a list of who to approach first. Free professional work is an easy thing to say yes to. A student support lead works the list with you if you're striking out.",
  },
  {
    q: 'Is this run through my school?',
    a: "No. You don't need a teacher sponsor, club approval, or anything from your school.",
  },
  {
    q: 'Can I charge for work outside my area?',
     a: 'Yes. Everything inside your service area is free. Outside it, what you charge is up to you.',
  },
  {
    q: 'What happens if my co-founder leaves?',
     a: 'Talk to the student support team. Chapters have continued with a new second person before, and stepping down without closing the chapter is a normal conversation.',
  },
  {
    q: 'Who runs this? (for parents)',
     a: "A student-run support team. The team page lists everyone we can currently name. Email us about any role that isn't listed.",
  },
  {
    q: 'What happens to my child’s information? (for parents)',
    // TODO: confirm exactly what the application form collects and where responses are stored.
     a: 'Applications go through a Google Form, read by a student recruitment lead. Email us before your child applies for specifics on what it asks and who sees it.',
  },
  {
    q: 'Is money involved anywhere? (for parents)',
    a: "Nothing is charged and nothing is paid. Members are volunteers. The only money is the chapter's own tool subscription.",
  },
]

export default function Manual() {
  useDocumentMeta('manual')

  return (
    <div className="w-full bg-canvas">
      <Section weight="support">
        <Reveal variant="up">
          <p className="font-mono text-label uppercase tracking-label text-gold-400">Reference</p>
          <h1 className="mt-3 max-w-head-lg font-display text-display-lg font-medium tracking-display text-ink">
            The operations manual.
          </h1>
          <p className="mt-3 max-w-measure text-body text-ink">
             What a chapter leader uses after approval. You don&rsquo;t need it to apply.
          </p>
        </Reveal>

        <div className="mt-6 min-w-0">
          <ChapterGuide />
        </div>
      </Section>

      <Section weight="support" bordered>
        <SectionHead weight="support" title="Other questions" />
        <div className="mt-4">
          {QUESTIONS.map((item, i) => (
            <Reveal key={item.q} variant="up" delay={Math.min(i * 0.03, 0.12)}>
              <Accordion title={item.q} indexNumber={String(i + 1).padStart(2, '0')}>
                <p className="max-w-measure">{item.a}</p>
              </Accordion>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section weight="support" bordered>
        <Reveal variant="up">
          <Cta to="/apply" size="xl" onClick={() => trackApply('manual')}>
            Start my chapter
          </Cta>
        </Reveal>
      </Section>

      <StickyMobileCta
        href="/apply"
        label="Start my chapter"
        onClick={() => trackApply('sticky-manual')}
      />
    </div>
  )
}
