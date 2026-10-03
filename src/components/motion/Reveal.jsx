import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const EASE = [0.16, 1, 0.3, 1]

/* Variant table. Each entry is [hidden, visible]. Only transform/opacity/filter
   are animated, never layout properties. */
const VARIANTS = {
  up:    [{ opacity: 0, y: 40 },              { opacity: 1, y: 0 }],
  down:  [{ opacity: 0, y: -32 },             { opacity: 1, y: 0 }],
  left:  [{ opacity: 0, x: -48 },             { opacity: 1, x: 0 }],
  right: [{ opacity: 0, x: 48 },              { opacity: 1, x: 0 }],
  blur:  [{ opacity: 0, y: 24, filter: 'blur(14px)' }, { opacity: 1, y: 0, filter: 'blur(0px)' }],
  scale: [{ opacity: 0, scale: 0.94, y: 24 }, { opacity: 1, scale: 1, y: 0 }],
  /* Content that rises out of the beam's wake. */
  wake:  [{ opacity: 0, y: 56, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)' }],
}

/**
 * Scroll-triggered reveal. Use `stagger` when the element is a direct child of
 * a <Stagger> so timing is owned by the parent instead of a hand-tuned delay.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  stagger = false,
  as: Tag = motion.div,
  ...rest
}) {
  const reduced = useReducedMotion()
  const [hidden, visible] = VARIANTS[variant] ?? VARIANTS.up

  if (reduced) return <div className={className}>{children}</div>

  if (stagger) {
    return (
      <Tag
        variants={{ hidden, visible: { ...visible, transition: { duration, ease: EASE } } }}
        className={className}
        {...rest}
      >
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Parent that sequences any <Reveal stagger> children. */
export function Stagger({ children, className = '', gap = 0.09, delay = 0, ...rest }) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      variants={{ visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * Headline that rises word by word out of a clipped baseline.
 *
 * The scroll trigger has to sit on the unclipped wrapper, not on the words:
 * each word starts translated fully outside its own overflow-hidden mask, so
 * an observer attached to the word itself would never see it intersect and the
 * headline would stay invisible forever. The wrapper watches, the words follow
 * through variants.
 */
export function SplitWords({ text, className = '', delay = 0, wordClassName = '', immediate = false }) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  /* Hero headlines are frequently the LCP element. Animating them in from
     opacity 0 delays the largest paint by the full stagger, so `immediate`
     renders plain text and lets the paint happen on the first frame. */
  if (reduced || immediate) return <span className={className}>{text}</span>

  return (
    <motion.span
      className={className}
      initial="hidden"
      /* Hero headlines animate on mount. Waiting for an intersection callback
         leaves the first screen visibly empty for a beat on a cold load. */
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, margin: '-8% 0px -8% 0px' } })}
      variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  )
}

/**
 * Scroll-scrubbed parallax. `speed` is the fraction of the scrolled distance
 * the element lags behind by; negative values lead instead of lag.
 */
export function Parallax({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`])

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  )
}

export { EASE }
