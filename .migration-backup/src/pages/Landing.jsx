import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden bg-forest-900 px-4 py-16 sm:px-6">
      {/* soft radial glow layers for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60rem 40rem at 80% 10%, rgba(200,241,105,0.14), transparent 60%), radial-gradient(50rem 35rem at 10% 90%, rgba(42,111,43,0.5), transparent 60%)',
        }}
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="text-center lg:text-left">
          <p className="font-mono text-xs tracking-[0.2em] text-lime-300 uppercase">Student Business Initiative</p>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] font-medium tracking-tight text-paper sm:text-6xl lg:text-7xl">
            Help Your Business Grow — Or Help Others Grow Theirs
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-forest-100 lg:mx-0">
            SBI is a network of student-run chapters that build websites, promo videos, and branding for local
            small businesses — completely free. Business owners get professional work at no cost. Students get
            real-world skills helping their community.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/business"
              className="rounded bg-lime-300 px-8 py-4 text-center text-base font-semibold text-forest-950 shadow-[0_8px_24px_-8px_rgba(200,241,105,0.6)] transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 active:translate-y-0"
            >
              I'm a local business owner
            </Link>
            <Link
              to="/chapter"
              className="rounded border-2 border-lime-300/80 px-8 py-4 text-center text-base font-semibold text-lime-300 transition-[transform,opacity] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 active:translate-y-0"
            >
              I want to start a chapter
            </Link>
          </div>
        </div>
        <div className="hidden justify-center lg:flex">
          {/* photo placeholder — swap this div for an <img> of the founders when ready */}
          <div
            aria-hidden="true"
            className="flex h-[520px] w-[420px] flex-col items-center justify-center gap-2 rounded-2xl border border-lime-300/30 bg-forest-800 shadow-[0_24px_48px_-16px_rgba(2,41,30,0.7)]"
          >
            <span className="font-display text-4xl font-semibold text-lime-300">F + CF</span>
            <span className="font-mono text-xs tracking-[0.2em] text-forest-100/70 uppercase">
              Founders photo soon
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
