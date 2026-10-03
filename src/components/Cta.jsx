import { Link } from 'wouter'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

/**
 * The site's single call-to-action component. Every CTA on every page routes
 * through this so weight, motion, and focus behaviour stay identical.
 *
 * Interaction: the button pulls gently toward the cursor, a gold light sweep
 * crosses the face on hover, and the arrow travels. Three cues, one gesture.
 */

const SIZES = {
  md: 'px-7 py-3.5 text-body-sm',
  lg: 'px-8 py-[0.95rem] text-body',
  xl: 'px-8 py-[1.05rem] text-body sm:px-10 sm:py-[1.15rem] text-body',
}

const TONES = {
  primary:
     'bg-gold-500 text-white shadow-[0_10px_40px_-12px_rgba(18,61,105,0.32)] hover:shadow-[0_16px_60px_-10px_rgba(18,61,105,0.42)]',
   ghost:
     'border border-[rgba(11,31,58,0.18)] bg-white/70 text-ink hover:border-[rgba(45,103,167,0.5)] hover:bg-navy-50',
  blue:
     'bg-navy-500 text-white shadow-[0_10px_40px_-12px_rgba(45,103,167,0.35)] hover:shadow-[0_16px_60px_-10px_rgba(45,103,167,0.45)]',
}

export default function Cta({
  children,
  to,
  href,
  onClick,
  tone = 'primary',
  size = 'lg',
  arrow = '→',
  className = '',
  full = false,
  ...rest
}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.4 })

  const onMove = (event) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    /* Pull at most 8px so the affordance never feels slippery. */
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 16)
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 10)
  }
  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const classes = [
    'group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl',
    /* Sentence-case Inter semibold. Tracked-out monospace caps were the least
       legible form on the site and it was applied to every button. */
    'font-body font-semibold transition-[background-color,border-color,box-shadow] duration-300',
    'focus-gold select-none',
    SIZES[size],
    TONES[tone],
    full ? 'w-full' : '',
    className,
  ].join(' ')

  const inner = (
    <>
      {/* Light sweep — crosses the face on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.42),transparent)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-full"
      />
      <span className="relative z-10">{children}</span>
      {arrow && (
        <span
          aria-hidden="true"
          className="relative z-10 leading-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
        >
          {arrow}
        </span>
      )}
    </>
  )

  const motionProps = {
    ref,
    className: classes,
    style: reduced ? undefined : { x, y },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileTap: reduced ? undefined : { scale: 0.975 },
  }

  if (to) {
    return (
      <motion.div style={reduced ? undefined : { x, y }} className={full ? 'w-full' : 'inline-flex'}>
        <Link 
          ref={ref} 
          href={to} 
          onMouseMove={onMove} 
          onMouseLeave={onLeave} 
          onClick={onClick}
          className={classes} 
          data-testid={`link-${to.replace(/\W+/g, '-').replace(/^-|-$/g, '')}`}
          {...rest}
        >
          {inner}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <motion.div style={reduced ? undefined : { x, y }} className={full ? 'w-full' : 'inline-flex'}>
        <a
          ref={ref}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener' : undefined}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className={classes}
          data-testid={`link-external`}
          {...rest}
        >
          {inner}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button 
      type="button" 
      onClick={onClick} 
      data-testid="button-action"
      {...motionProps} 
      {...rest}
    >
      {inner}
    </motion.button>
  )
}
