import { motion } from 'framer-motion'
import Cta from '../components/Cta'
import StickyMobileCta from '../components/StickyMobileCta'
import { Reveal, Stagger, SplitWords, EASE } from '../components/motion/Reveal'
import Section from '../components/Section'
import SectionHead from '../components/motion/SectionHead'
import { LEADERSHIP, SUPPORT_ROLES, initials } from '../data/team'
import { formUrl, trackApply, trackOutbound, EXEC_FORM_URL } from '../lib/analytics'
import { useDocumentMeta } from '../lib/meta'

/**
 * /team exists so an on-the-fence chapter applicant can check the org is real.
 * It used to convert them into a competing funnel: "Apply for an exec role" was
 * the gold CTA and owned the mobile sticky bar, while starting a chapter was
 * demoted to a ghost button. That is now reversed.
 */

function Portrait({ member }) {
  /* The bio used to be collapsed to max-height:0 above `sm` and revealed only
     by clicking the card -- a card that carried no chevron, no plus, nothing
     that said it opened. On desktop that meant every description on the page
     was invisible, and mid-transition it rendered as a line of text sliced off
     by the card edge. It is one or two lines. It just shows. */
  const [w, h] = member.photoSize ?? [600, 800]

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-[rgba(11,31,58,0.16)] bg-canvas-surface transition-colors duration-500 hover:border-gold-400/70">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name ? `${member.name}, ${member.role}` : member.role}
            width={w}
            height={h}
            style={{ objectPosition: member.photoPosition ?? '50% 30%' }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-navy-100">
            <span className="font-display text-display-lg font-medium tracking-display text-navy-600/60">
              {initials(member.name ?? member.role)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-grow flex-col border-t border-canvas-border px-4 pb-5 pt-4">
        <p className="text-body-sm font-semibold text-gold-700">{member.role}</p>
        {member.name && (
          <h3 className="mt-1 font-display text-display-sm font-medium leading-tight tracking-display text-ink">
            {member.name}
          </h3>
        )}
        <p className="mt-3 text-body-sm leading-relaxed text-ink-soft">{member.desc}</p>
      </div>
    </article>
  )
}

export default function Team() {
  useDocumentMeta('team')

  return (
    <div className="w-full bg-canvas">
      <Section
        weight="support"
        center
        backdrop={
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-navy-50/60" />
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
            Who runs this
          </motion.p>

          <h1 className="mt-5 font-display text-display-lg font-bold leading-[1.02] tracking-[-0.045em] text-ink">
            <SplitWords text="The people behind it." delay={0.08} immediate />
          </h1>

          <motion.p
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35, ease: EASE }}
            className="mx-auto mt-4 max-w-measure text-body leading-relaxed text-ink"
          >
            These are the people who&rsquo;ll read your application, train you, and check your work
            before it goes live.
          </motion.p>

          <motion.div
            initial={{ opacity: 1, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: EASE }}
            className="mt-7 flex justify-center"
          >
            <Cta to="/apply" size="lg" onClick={() => trackApply('team-hero')}>
              Start my chapter
            </Cta>
          </motion.div>
        </div>
      </Section>

      {/* The grid belongs to the headline above it, so it gets inline weight
          rather than opening a band of its own. */}
      <Section weight="inline">
        <Stagger className="grid grid-cols-2 items-stretch gap-4 sm:grid-cols-3 lg:grid-cols-4" gap={0.06}>
          {LEADERSHIP.map((member) => (
            <Reveal key={member.role} stagger variant="up" className="h-full">
              <Portrait member={member} />
            </Reveal>
          ))}
        </Stagger>
      </Section>

      <Section weight="support" bordered>
        <SectionHead weight="support" title="Who you'll actually message." />
        <Reveal variant="up" delay={0.08}>
          {/* Honest about what isn't public yet, rather than implying names exist. */}
          <p className="mt-3 max-w-measure text-body-sm leading-relaxed text-ink-soft">
             These student support roles are filled. Names go up as each person signs off.
          </p>
        </Reveal>

        <Stagger className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {SUPPORT_ROLES.map((item) => (
              <Reveal key={item.role} stagger variant="up">
                <div className="border-t border-[rgba(11,31,58,0.14)] pt-4">
                  <h3 className="font-display text-body font-semibold tracking-display text-gold-300">
                    {item.role}
                  </h3>
                  <p className="mt-1.5 max-w-measure-narrow text-body-sm leading-relaxed text-ink-soft">
                    {item.desc}
                  </p>
                </div>
            </Reveal>
          ))}
        </Stagger>
      </Section>

      <Section weight="support" bordered>
        <Reveal variant="up">
          <Cta to="/apply" size="xl" onClick={() => trackApply('team-close')}>
            Start my chapter
          </Cta>
          <p className="mt-4 max-w-measure text-body-sm text-ink-soft">
            Want to help run the network instead?{' '}
            <a
              href={formUrl(EXEC_FORM_URL, 'team-exec')}
              target="_blank"
              rel="noopener"
              onClick={() => trackOutbound('exec_apply_click', 'team')}
              data-testid="link-apply-hq"
              className="focus-gold rounded-sm text-gold-400 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-300"
            >
               Apply for a student support team role
            </a>
            .
          </p>
        </Reveal>
      </Section>

      <StickyMobileCta
        href="/apply"
        label="Start my chapter"
        onClick={() => trackApply('sticky-team')}
      />
    </div>
  )
}
