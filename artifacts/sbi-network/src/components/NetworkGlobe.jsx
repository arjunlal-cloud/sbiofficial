import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Lightweight, reusable visual for SBI's connected local network.
 * It deliberately uses SVG + existing Framer Motion instead of a 3D package.
 */
export default function NetworkGlobe({ className = '', scrollDriven = false, progress, id = 'default' }) {
  const { scrollYProgress } = useScroll()
  const source = progress ?? scrollYProgress
  const rotate = useTransform(source, [0, 1], [-12, 30])
  const scale = useTransform(source, [0, 1], [1, 1.16])
  const opacity = useTransform(source, [0, 0.75, 1], [1, 1, 0.42])
  const animation = scrollDriven
    ? { rotate, scale, opacity }
    : { rotate: [0, 5, 0, -5, 0], y: [0, -8, 0] }

  return (
    <motion.div
      aria-hidden="true"
      className={`relative aspect-square w-full max-w-[560px] select-none ${className}`}
      style={scrollDriven ? animation : undefined}
      animate={scrollDriven ? undefined : animation}
      transition={scrollDriven ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-[10%] rounded-full bg-gold-500/10 blur-3xl" />
      <svg viewBox="0 0 500 500" className="relative h-full w-full overflow-visible" fill="none">
        <defs>
          <radialGradient id={`globe-fill-${id}`} cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#17345f" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#080d1a" stopOpacity="0.94" />
          </radialGradient>
          <clipPath id={`globe-clip-${id}`}><circle cx="250" cy="250" r="185" /></clipPath>
          <filter id={`glow-${id}`}><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <circle cx="250" cy="250" r="186" fill={`url(#globe-fill-${id})`} stroke="#c09b2d" strokeOpacity="0.7" strokeWidth="1.5" />
        <g clipPath={`url(#globe-clip-${id})`} stroke="#c09b2d" strokeOpacity="0.25" strokeWidth="1">
          <ellipse cx="250" cy="250" rx="185" ry="66" />
          <ellipse cx="250" cy="250" rx="185" ry="128" />
          <ellipse cx="250" cy="250" rx="72" ry="185" />
          <ellipse cx="250" cy="250" rx="132" ry="185" />
          <path d="M65 250h370M82 180h336M82 320h336" />
          <path d="M130 115c55 42 184 42 240 0M130 385c55-42 184-42 240 0" />
        </g>
        <motion.g
          stroke="#e8cb6a"
          strokeOpacity="0.6"
          strokeWidth="1.25"
          animate={{ opacity: [0.45, 0.9, 0.45] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M145 205L225 157 303 197 366 155" />
          <path d="M123 288L206 331 279 270 357 306" />
          <path d="M225 157L206 331M303 197L279 270M145 205L123 288" />
        </motion.g>
        <motion.path
          d="M145 205L225 157 303 197 366 155"
          pathLength="1"
          stroke="#f2dfa0"
          strokeOpacity="0.9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="0.08 0.92"
          animate={{ strokeDashoffset: [1, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M123 288L206 331 279 270 357 306"
          pathLength="1"
          stroke="#c09b2d"
          strokeOpacity="0.75"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="0.06 0.94"
          animate={{ strokeDashoffset: [0, -1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'linear', delay: 1.1 }}
        />
        {[[145,205],[225,157],[303,197],[366,155],[123,288],[206,331],[279,270],[357,306]].map(([cx, cy], index) => (
          <motion.g
            key={`${cx}-${cy}`}
            filter={`url(#glow-${id})`}
            animate={{ opacity: [0.55, 1, 0.55], scale: [0.92, 1.08, 0.92] }}
            transition={{ duration: 2.8 + (index % 3) * 0.7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.22 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <circle cx={cx} cy={cy} r="6" fill="#c09b2d" />
            <circle cx={cx} cy={cy} r="12" fill="#c09b2d" fillOpacity="0.12" />
            {index === 0 && <circle cx={cx} cy={cy} r="20" stroke="#c09b2d" strokeOpacity="0.35" />}
          </motion.g>
        ))}
        <motion.circle
          cx="250"
          cy="250"
          r="199"
          stroke="#c09b2d"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="3 12"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '250px 250px' }}
        />
      </svg>
      <div className="absolute inset-0 rounded-full border border-gold-500/10 animate-[ping_5s_ease-in-out_infinite]" />
    </motion.div>
  )
}