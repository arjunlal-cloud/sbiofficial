import { motion, useReducedMotion } from 'framer-motion'
import { EASE, SplitWords } from './Reveal'

export default function SectionHead({
  kicker,
  title,
  lede,
  weight = 'anchor',
  align = 'left',
  className = '',
  children,
}) {
  const reduced = useReducedMotion()
  const centered = align === 'center'

  if (weight !== 'anchor') {
    return (
      <div className={`${centered ? 'mx-auto text-center' : ''} ${className}`}>
        {kicker && (
          <p className={`mb-3 font-mono text-label uppercase tracking-widest text-gold-600 font-semibold ${centered ? 'justify-center' : ''}`}>
            {kicker}
          </p>
        )}
        <h2
          className={`max-w-[20ch] font-display text-3xl sm:text-4xl font-medium tracking-tight text-navy-950 ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {title}
        </h2>
        {lede && (
          <p className={`mt-4 max-w-measure-narrow text-lg text-ink-soft leading-relaxed ${centered ? 'mx-auto' : ''}`}>
            {lede}
          </p>
        )}
        {children}
      </div>
    )
  }

  return (
    <div className={`${centered ? 'mx-auto text-center flex flex-col items-center' : ''} ${className}`}>
      {kicker && (
        <motion.p
          className={`mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest font-semibold text-gold-600 ${
            centered ? 'justify-center' : ''
          }`}
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          {kicker}
        </motion.p>
      )}

      <h2
        className={`max-w-head-lg font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-navy-950 leading-[1.1] ${
          centered ? 'mx-auto' : ''
        }`}
      >
        <SplitWords text={title} delay={0.15} immediate />
      </h2>

      {lede && (
        <motion.p
          className={`mt-6 max-w-measure-narrow text-xl text-ink-soft leading-relaxed ${centered ? 'mx-auto' : ''}`}
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          {lede}
        </motion.p>
      )}

      {children}
    </div>
  )
}
