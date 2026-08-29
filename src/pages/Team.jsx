import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StickyMobileCta from '../components/StickyMobileCta'
import { FadeIn, StaggerContainer } from '../components/FadeIn'

const EXEC_FORM_URL = 'https://docs.google.com/forms/d/16H_5sU03cJnv2lYYlE2311UYtBx-OVw53ngVBGM6opc/viewform'

// Only approved, role-confirmed portraits are listed here.
// Each entry may include `photo` (path under /team/) once the person has
// explicitly approved their image and their role is confirmed.
const execTeam = [
  {
    role: 'CEO',
    name: "Da'El Kim",
    photo: '/team/dael-kim.jpg',
    photoPosition: '50% 62%',
    desc: "Sets direction for the whole network — chapter strategy, client standards, and where SBI goes next.",
  },
  {
    role: 'COO',
    name: 'James Yu',
    photo: '/team/james-yu.jpg',
    photoPosition: '50% 52%',
    desc: "Keeps day-to-day operations running across chapters — processes, timelines, and delivery.",
  },
  {
    role: 'CMO',
    name: 'Ekam Kaur',
    photo: '/team/ekam-kaur.jpg',
    photoPosition: '50% 22%',
    desc: "Runs SBI's own brand presence and marketing across every platform.",
  },
  {
    role: 'Video Training Lead',
    name: 'Aarav Sharma',
    photo: '/team/aarav-sharma.jpg',
    photoPosition: '50% 32%',
    desc: "Runs the video production resources and trains chapter videographers.",
  },
  // Roles below have no confirmed photo — portrait placeholder shown.
  { name: 'Arlin', role: 'CGO', desc: "Drives chapter growth — finding new leaders and expanding the network into new towns." },
  { name: 'Neel', role: 'CFO', desc: "Handles finances, budgets, and keeps the organization sustainable." },
  {
    role: 'CTO',
    name: 'Arjun Lal',
    photo: '/team/arjun-lal.png',
    photoPosition: '50% 38%',
    desc: "Owns the tech stack, internal tools, and the infrastructure chapters rely on.",
  },
  { name: 'Jaymond Wong', role: 'CRO — Relations', desc: "Builds and maintains relationships with chapters, businesses, and community partners." },
  { role: 'Quality Lead',      desc: "Reviews and approves all client deliverables before launch." },
  { role: 'Recruitment Lead',  desc: "Finds and vets new chapter applicants across the country." },
  { role: 'Onboarding Lead',   desc: "Guides new chapters through their first client project, step by step." },
  { role: 'Web Training Lead', desc: "Maintains the web dev curriculum and mentors chapter members." },
  { role: 'Support Lead',      desc: "Helps chapters debug problems and handle difficult client situations in real time." },
  { role: 'Partnerships Lead', desc: "Sources business relationships and community organizations for chapters to work with." },
]

const initials = (text) =>
  text
    .split(/[\s-']+/)
    .map((w) => w[0])
    .join('')

export default function Team() {
  const [openCard, setOpenCard] = useState(null)

  const toggleCard = (index) => {
    setOpenCard(openCard === index ? null : index)
  }

  return (
    <div className="bg-canvas w-full overflow-hidden">
      {/* Hero */}
      <section className="py-24 md:py-32 px-4 sm:px-6 text-center border-b border-white/5 relative isolate">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-canvas-surface to-canvas -z-10" />
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <p className="font-mono text-[10px] tracking-widest text-gold-500 uppercase mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-gold-500/40 inline-block" /> HQ Operations <span className="w-8 h-px bg-gold-500/40 inline-block" />
            </p>
            <h1 className="font-display text-4xl leading-[1.1] sm:text-5xl md:text-7xl font-medium tracking-tight mb-6">
              The Exec Team.
            </h1>
            <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-ink-soft">
              The core group that helps every chapter from first DM to first client launch.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 md:py-32 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {execTeam.map((member, i) => {
              const isOpen = openCard === i
              const hasPhoto = Boolean(member.photo)
              return (
                <FadeIn key={member.role} stagger delay={i * 0.05} className="h-full">
                  <button
                    onClick={() => toggleCard(i)}
                    className="w-full h-full text-left bg-canvas-elevated rounded-2xl border border-white/5 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 transition-colors hover:border-white/20 flex flex-col shadow-lg"
                  >
                    {/* Visual Area */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-tr from-canvas-surface to-canvas-elevated border-b border-white/5 shrink-0">
                      {hasPhoto ? (
                        <>
                          {/* Portrait image, object-position keeps face in frame */}
                          <img
                            src={member.photo}
                            alt={member.name}
                            style={{ objectPosition: member.photoPosition ?? '50% 30%' }}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          {/* Subtle navy/gold gradient overlay — preserves authentic context */}
                          <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-canvas/10 to-transparent" />
                          {/* Gold accent line at bottom */}
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500/60 via-gold-400/40 to-transparent" />
                        </>
                      ) : (
                        /* Placeholder for unconfirmed portraits */
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="font-display text-5xl font-medium text-gold-500/20 group-hover:scale-110 transition-transform duration-500">
                            {initials(member.name ?? member.role)}
                          </span>
                          <span className="absolute bottom-4 font-mono text-[9px] tracking-widest text-ink-soft/30 uppercase">
                            Portrait coming soon
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow">
                      {member.name && (
                        <h3 className="font-display text-xl font-medium text-ink mb-1 break-words">
                          {member.name}
                        </h3>
                      )}
                      <p
                        className={`font-mono text-[11px] uppercase tracking-widest ${
                          member.name ? 'text-gold-500' : 'text-gold-500 text-base font-display'
                        }`}
                      >
                        {member.role}
                      </p>

                      <div className="mt-4 flex-grow relative overflow-hidden">
                        <AnimatePresence initial={false} mode="wait">
                          {isOpen ? (
                            <motion.div
                              key="desc"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="text-sm text-ink-soft leading-relaxed"
                            >
                              {member.desc}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="hint"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="text-[10px] text-muted font-mono uppercase tracking-widest flex items-center gap-2 mt-2"
                            >
                              <span className="w-4 h-px bg-muted/30" />
                              Click to learn more
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </FadeIn>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 md:py-32 px-4 sm:px-6 bg-canvas-surface border-t border-white/5 text-center bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(21,46,82,0.4),transparent)] relative">
        <FadeIn className="relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight mb-4">Want to join HQ?</h2>
          <p className="text-ink-soft mb-10 max-w-lg mx-auto text-lg">Apply for an exec role to help run the network, or start a chapter in your own town.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={EXEC_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded bg-gold-500 px-8 py-4 text-[15px] font-medium text-canvas transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 shadow-[0_0_32px_rgba(192,155,45,0.25)] hover:shadow-[0_0_40px_rgba(192,155,45,0.4)]"
            >
              Apply for Exec Role
            </a>
            <Link
              to="/chapter"
              className="inline-flex items-center justify-center rounded border border-white/20 bg-canvas px-8 py-4 text-[15px] font-medium text-ink transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              Start a Chapter
            </Link>
          </div>
        </FadeIn>
      </section>

      <StickyMobileCta href={EXEC_FORM_URL} label="Apply for Exec Role" />
    </div>
  )
}
