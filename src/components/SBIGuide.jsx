import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { streamAi } from '../lib/aiStream'

const GREETING =
  "Hi! I'm the SBI Concierge. Ask me anything about our mission, free services for local businesses, or how to start a chapter."

const SESSION_MESSAGE_CAP = 12

const guideAnswers = [
  {
    matches: ['apply', 'application', 'start a chapter', 'become a chapter', 'leader'],
    answer: 'To start a chapter, complete the Chapter Leader application. The recruitment team reviews it, then you will have a short conversation before a chapter is chartered.',
  },
  {
    matches: ['minimum', 'people', 'team', 'roles', 'role'],
    answer: 'A chapter can begin with at least two people. One person may cover multiple roles while the team is small; the Chapter Leader keeps the work and communication on track.',
  },
  {
    matches: ['free', 'cost', 'charge', 'pricing', 'money'],
    answer: 'Work for businesses inside a chapter’s approved service area is free. Work outside those boundaries can be handled differently by the chapter.',
  },
  {
    matches: ['website', 'video', 'service', 'offer', 'branding', 'google business', 'profile'],
    answer: 'Core services are professional websites and promotional videos. Chapters may also offer approved extras such as flyers, social media setup, and Google Business Profile optimization.',
  },
  {
    matches: ['quality', 'review', 'approval', 'live'],
    answer: 'Before work goes live, it must meet the network’s baseline quality requirements. Quality Leads review work and help chapters maintain a consistent standard.',
  },
]

function getGuideFallback(question) {
  const normalized = question.toLowerCase()
  return guideAnswers.find((entry) => entry.matches.some((term) => normalized.includes(term)))?.answer ??
    'I can help with SBI Network’s mission, services, chapters, applications, roles, and quality review. For anything else, the Chapter Operations Guide has the full details.'
}

export default function SBIGuide() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const abortRef = useRef(null)
  const listRef = useRef(null)
  const scrollFrameRef = useRef(null)

  const userCount = messages.filter((m) => m.role === 'user').length
  const capped = userCount >= SESSION_MESSAGE_CAP

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [])

  useEffect(() => {
    if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current)
    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const list = listRef.current
      if (!list) return
      list.scrollTo({ top: list.scrollHeight, behavior: isStreaming ? 'auto' : 'smooth' })
      scrollFrameRef.current = null
    })
    return () => {
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current)
    }
  }, [messages, isStreaming])

  useEffect(() => () => {
    if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current)
    abortRef.current?.abort()
  }, [])

  const submit = async (event) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isStreaming || capped) return
    const history = messages.slice(-6)
    setInput('')
    setIsStreaming(true)
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }, { role: 'assistant', content: '' }])

    const controller = new AbortController()
    abortRef.current = controller
    const result = await streamAi(
      '/api/openai/conversations/concierge/messages',
      { content: trimmed, history },
      (chunk) => {
        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          next[next.length - 1] = { ...last, content: last.content + chunk }
          return next
        })
      },
      controller.signal,
    )
    if (!result.ok) {
      setMessages((prev) => {
        const next = [...prev]
        const last = next[next.length - 1]
        if (!last.content) {
          next[next.length - 1] = { ...last, content: getGuideFallback(trimmed) }
        }
        return next
      })
    }
    setIsStreaming(false)
  }

  return (
    <div className="fixed bottom-24 right-4 z-[60] sm:bottom-5 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="SBI Concierge"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-3 flex h-[min(32rem,calc(100dvh-9rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-canvas-elevated shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-navy-800/60 px-5 py-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-300">Ask SBI</p>
                <p className="mt-0.5 text-[11px] text-ink-soft">AI concierge · answers about SBI Network</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close SBI Concierge"
                className="grid h-7 w-7 place-items-center rounded-md text-ink-soft transition-colors hover:bg-white/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                ×
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'rounded-br-md bg-gold-500 text-canvas'
                        : 'rounded-bl-md border border-white/10 bg-canvas text-ink-soft'
                    }`}
                  >
                    {message.content ||
                      (isStreaming && index === messages.length - 1 && (
                        <span className="inline-flex gap-1 py-1" aria-label="Thinking">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-gold-400"
                              animate={{ opacity: [0.25, 1, 0.25] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
              {capped && (
                <p className="px-1 text-center text-[11px] text-muted">
                  Session limit reached. Email SBI&apos;s current network contact at{' '}
                  <a href="mailto:ebsbi.official@gmail.com" className="text-gold-300 hover:text-gold-200">
                    ebsbi.official@gmail.com
                  </a>{' '}
                  for anything else.
                </p>
              )}
            </div>

            <div className="border-t border-white/10 p-3">
              <form onSubmit={submit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={400}
                  disabled={capped}
                  placeholder={capped ? 'Session limit reached' : 'e.g. How do I start a chapter?'}
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-canvas px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-gold-500/50 focus:outline-none focus:ring-2 focus:ring-gold-500/40 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isStreaming || capped || !input.trim()}
                  className="rounded-xl bg-gold-500 px-3 font-mono text-[10px] uppercase tracking-widest text-canvas transition-colors hover:bg-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send
                </button>
              </form>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 px-1">
                <Link to="/business" onClick={() => setOpen(false)} className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-gold-300">
                  For businesses →
                </Link>
                <Link to="/chapter" onClick={() => setOpen(false)} className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-gold-300">
                  Start a chapter →
                </Link>
                <Link to="/team" onClick={() => setOpen(false)} className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-gold-300">
                  Meet the team →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Close SBI Concierge' : 'Open SBI Concierge'}
        className="group ml-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/40 bg-canvas-elevated px-0 py-0 text-left shadow-xl transition-colors hover:border-gold-500 hover:bg-canvas-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 sm:h-auto sm:w-auto sm:gap-3 sm:px-4 sm:py-3"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-500 text-sm font-bold text-canvas sm:h-8 sm:w-8">{open ? '×' : '?'}</span>
        <span className="hidden pr-1 font-mono text-[10px] uppercase tracking-widest text-ink sm:inline">Ask SBI</span>
      </button>
    </div>
  )
}
