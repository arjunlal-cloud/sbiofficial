import { motion } from 'framer-motion'

/* ─── shared animation helpers ─────────────────────────────── */
const pulse = (delay = 0) => ({
  animate: { opacity: [0.25, 1, 0.25], scale: [0.82, 1.18, 0.82] },
  transition: { duration: 2.6 + delay * 0.4, repeat: Infinity, ease: 'easeInOut', delay },
})
const float = (delay = 0, distance = 7) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay },
})

/* ─── LaptopVisual ─────────────────────────────────────────── */
export function LaptopVisual() {
  return (
    <motion.div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[560px] select-none"
      {...float(0, 9)}
    >
      <div className="absolute inset-[15%] rounded-full bg-gold-500/10 blur-3xl" />

      {/* floating badge — top-left */}
      <motion.div
        className="absolute left-[6%] top-[18%] flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-500/25 bg-navy-800/70 backdrop-blur-sm shadow-lg"
        {...float(1.2, 5)}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
          <path d="M3 17l4-8 4 5 3-3 5 6" stroke="#c09b2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* floating badge — top-right */}
      <motion.div
        className="absolute right-[5%] top-[24%] flex items-center gap-2 rounded-xl border border-white/10 bg-canvas-elevated/90 px-3 py-2 shadow-xl backdrop-blur-sm"
        {...float(2, 4)}
      >
        <motion.span className="h-2.5 w-2.5 flex-none rounded-full bg-gold-400" {...pulse(0)} style={{}} />
        <span className="h-1.5 w-12 rounded-full bg-white/20" />
      </motion.div>

      <svg viewBox="0 0 500 500" className="relative h-full w-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="laptop-screen" x1="250" y1="70" x2="250" y2="320" gradientUnits="userSpaceOnUse">
            <stop stopColor="#17345f" />
            <stop offset="1" stopColor="#0a1f3d" />
          </linearGradient>
          <filter id="laptop-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* shadow */}
        <ellipse cx="250" cy="404" rx="178" ry="16" fill="#02050b" fillOpacity="0.5" />

        {/* lid / screen — gentle breathe */}
        <motion.g
          animate={{ rotate: [0, 1.2, 0, -0.8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '250px 320px' }}
        >
          <rect x="91" y="68" width="318" height="250" rx="18" fill="#0a1f3d" stroke="#c09b2d" strokeOpacity="0.85" strokeWidth="2" />
          <rect x="108" y="85" width="284" height="216" rx="8" fill="url(#laptop-screen)" stroke="#e8cb6a" strokeOpacity="0.12" />

          {/* menu bar */}
          <path d="M125 111h250" stroke="#e8cb6a" strokeOpacity="0.28" />
          <circle cx="133" cy="99" r="3.5" fill="#c09b2d" />
          <circle cx="145" cy="99" r="3.5" fill="#e8cb6a" fillOpacity="0.45" />
          <circle cx="157" cy="99" r="3.5" fill="#eef3ff" fillOpacity="0.22" />

          {/* chart card */}
          <rect x="130" y="130" width="102" height="70" rx="7" fill="#080d1a" fillOpacity="0.6" stroke="#c09b2d" strokeOpacity="0.3" />
          <path d="M145 180l20-18 17 10 26-28" stroke="#e8cb6a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="145" cy="180" r="4.5" fill="#c09b2d" filter="url(#laptop-glow)" />
          <circle cx="165" cy="162" r="4.5" fill="#c09b2d" filter="url(#laptop-glow)" />
          <circle cx="182" cy="172" r="4.5" fill="#c09b2d" filter="url(#laptop-glow)" />
          <circle cx="208" cy="144" r="4.5" fill="#c09b2d" filter="url(#laptop-glow)" />

          {/* animated chart dot */}
          <motion.circle
            cx="208" cy="144" r="8"
            fill="#c09b2d" fillOpacity="0.18"
            {...pulse(0.4)}
          />
          <motion.path
            d="M145 180l20-18 17 10 26-28"
            pathLength="1"
            stroke="#fff1bd"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="0.12 0.88"
            animate={{ strokeDashoffset: [1, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'linear', delay: 0.6 }}
          />

          {/* copy card */}
          <rect x="252" y="130" width="120" height="74" rx="7" fill="#080d1a" fillOpacity="0.45" stroke="#e8cb6a" strokeOpacity="0.1" />
          <rect x="263" y="143" width="98" height="8" rx="4" fill="#eef3ff" fillOpacity="0.72" />
          <rect x="263" y="159" width="72" height="5.5" rx="2.75" fill="#a8bdd4" fillOpacity="0.45" />
          <rect x="263" y="171" width="88" height="5.5" rx="2.75" fill="#a8bdd4" fillOpacity="0.28" />
          <rect x="263" y="188" width="58" height="24" rx="6" fill="#c09b2d" fillOpacity="0.18" stroke="#c09b2d" strokeOpacity="0.65" />
          <path d="M271 200h42" stroke="#e8cb6a" strokeWidth="1.8" strokeLinecap="round" />

          {/* typing cursor blink */}
          <motion.rect
            x="371" y="143" width="2" height="8" rx="1" fill="#e8cb6a"
            animate={{ opacity: [1, 1, 0, 0, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.45, 0.5, 0.95, 1] }}
          />

          {/* body text rows */}
          <rect x="130" y="222" width="242" height="6" rx="3" fill="#eef3ff" fillOpacity="0.15" />
          <rect x="130" y="237" width="188" height="6" rx="3" fill="#eef3ff" fillOpacity="0.09" />

          {/* bottom CTA chip */}
          <rect x="130" y="268" width="70" height="10" rx="5" fill="#c09b2d" fillOpacity="0.8" />
        </motion.g>

        {/* base / keyboard */}
        <path d="M62 319c48 22 328 22 376 0l27 40c-79 30-351 30-430 0l27-40Z" fill="#102a52" stroke="#c09b2d" strokeOpacity="0.7" strokeWidth="1.5" />
        <path d="M62 319c78 20 298 20 376 0" stroke="#e8cb6a" strokeOpacity="0.45" />
        <path d="M218 336h64" stroke="#c09b2d" strokeOpacity="0.7" strokeWidth="4" strokeLinecap="round" />

        {/* ambient pulse top-right */}
        <motion.circle cx="392" cy="112" r="5" fill="#c09b2d" {...pulse(0)} />
      </svg>
    </motion.div>
  )
}

/* ─── HandshakeVisual ──────────────────────────────────────── */
const HANDSHAKE_PATHS = [
  'm11 17 2 2a1 1 0 1 0 3-3',
  'm14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4',
  'm21 3 1 11h-2',
  'M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3',
  'M3 4h8',
]

/* ─── HandshakeVisual (line-art) ───────────────────────────── */
export function HandshakeVisual() {
  return (
    <motion.div
      aria-hidden="true"
      className="relative aspect-square w-full max-w-[560px] select-none"
      {...float(1, 8)}
    >
      <div className="absolute inset-[14%] rounded-full bg-gold-500/12 blur-3xl" />

      <svg viewBox="0 0 500 500" className="relative h-full w-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="hs-stroke" x1="60" y1="140" x2="440" y2="380" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e8cb6a" />
            <stop offset="1" stopColor="#c09b2d" />
          </linearGradient>
          <radialGradient id="hs-glow-center" cx="50%" cy="52%" r="30%">
            <stop offset="0%" stopColor="#c09b2d" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#c09b2d" stopOpacity="0" />
          </radialGradient>
          <filter id="hs-glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* orbit rings */}
        <circle cx="250" cy="258" r="196" stroke="#c09b2d" strokeOpacity="0.08" strokeDasharray="4 14" />
        <circle cx="250" cy="258" r="158" stroke="#e8cb6a" strokeOpacity="0.07" />

        {/* centre glow */}
        <circle cx="250" cy="258" r="100" fill="url(#hs-glow-center)" />

        {/* network connector lines + nodes */}
        <motion.g
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <line x1="82" y1="150" x2="175" y2="215" stroke="#c09b2d" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="5 8" />
          <line x1="418" y1="150" x2="325" y2="215" stroke="#c09b2d" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="5 8" />
          <line x1="250" y1="78" x2="250" y2="170" stroke="#e8cb6a" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="5 8" />
        </motion.g>
        <motion.circle cx="82" cy="150" r="6" fill="#c09b2d" filter="url(#hs-glow)" {...pulse(0)} />
        <motion.circle cx="418" cy="150" r="6" fill="#c09b2d" filter="url(#hs-glow)" {...pulse(0.7)} />
        <motion.circle cx="250" cy="78" r="6" fill="#c09b2d" filter="url(#hs-glow)" {...pulse(1.3)} />

        {/* handshake line-art (24x24 icon scaled) */}
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <g transform="translate(66, 76) scale(15.3)">
            {HANDSHAKE_PATHS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="url(#hs-stroke)"
                strokeWidth="1.15"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.22, ease: 'easeInOut' }}
              />
            ))}
          </g>
        </motion.g>

        {/* grip pulse at the clasp */}
        <motion.circle
          cx="250" cy="268" r="26"
          fill="#c09b2d" fillOpacity="0.16"
          animate={{ scale: [0.7, 1.25, 0.7], opacity: [0.05, 0.3, 0.05] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          style={{ transformOrigin: '250px 268px' }}
        />

        {/* sparkles at clasp */}
        {[[-30, -26], [30, -26], [0, -42], [-42, 8], [42, 8]].map(([dx, dy], i) => (
          <motion.circle
            key={i}
            cx={250 + dx}
            cy={268 + dy}
            r="2.5"
            fill="#e8cb6a"
            animate={{ opacity: [0, 0.9, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.8 + i * 0.34, ease: 'easeInOut' }}
          />
        ))}
      </svg>

      {/* label pill */}
      <div className="absolute bottom-[9%] left-1/2 -translate-x-1/2 rounded-full border border-gold-500/25 bg-canvas-elevated/80 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-300 backdrop-blur-sm whitespace-nowrap">
        local partnership
      </div>
    </motion.div>
  )
}
