import { useEffect, useState } from 'react'
import { Link } from 'wouter'
import Cta from '../components/Cta'
import Section from '../components/Section'
import { Reveal } from '../components/motion/Reveal'
import { applyUrl, trackApply } from '../lib/analytics'
import { useDocumentMeta } from '../lib/meta'

const STORAGE_KEY = 'sbi-application-form-complete-v1'

const STAGES = [
  {
    title: 'Learn what chapter leaders do',
    detail: 'Chapter leaders organize a student team and complete two business projects each month.',
  },
  {
    title: 'Submit the application form',
    detail: 'Tell SBI about your town, your teammate, and why you want to lead a chapter.',
  },
  {
    title: 'Wait for the student team to contact you',
    detail: 'A student recruitment lead reviews the form and contacts you using the details you submitted.',
  },
  {
    title: 'Prepare your chapter launch',
    detail: 'If approved, you submit a photo and the information needed to introduce your local chapter.',
  },
  {
    title: 'Complete training and start locally',
    detail: 'SBI trains your team before you begin the first supported project with a nearby business.',
  },
]

export default function Apply() {
  useDocumentMeta('apply')
  const [formComplete, setFormComplete] = useState(false)

  useEffect(() => {
    setFormComplete(window.localStorage.getItem(STORAGE_KEY) === 'true')
  }, [])

  const markComplete = () => {
    window.localStorage.setItem(STORAGE_KEY, 'true')
    setFormComplete(true)
  }

  const reset = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setFormComplete(false)
  }

  const currentStage = formComplete ? 2 : 1
  const progress = formComplete ? 40 : 20

  return (
    <div className="w-full bg-canvas">
      <Section weight="anchor" className="pt-10 sm:pt-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <Reveal variant="up">
            <p className="font-mono text-label uppercase tracking-label text-gold-600">
              Start an SBI chapter
            </p>
            <h1 className="mt-4 max-w-head-lg font-display text-display-xl font-medium text-navy-950">
              Apply without wondering what happens next
            </h1>
            <p className="mt-6 max-w-measure-narrow text-body-lg text-ink-soft">
              The application is a short Google Form. After you submit it, a student recruitment
              lead reviews your answers and contacts you using the information in the form.
            </p>

            <div className="mt-8 rounded-2xl border border-canvas-border-strong bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-label uppercase tracking-label text-gold-600">
                    Your current step
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-medium text-navy-950">
                    {formComplete ? 'Waiting for application review' : 'Submit the application form'}
                  </h2>
                </div>
                <span className="rounded-full bg-gold-100 px-3 py-1 text-sm font-semibold text-gold-700">
                  {progress}%
                </span>
              </div>

              <div
                className="mt-5 h-2 overflow-hidden rounded-full bg-canvas-elevated"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progress}
                aria-label="Application progress"
              >
                <div
                  className="h-full rounded-full bg-gold-500 transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-4 text-body-sm text-ink-soft">
                {formComplete
                  ? 'The form is marked complete on this device. SBI still confirms reviews, approval, and later steps directly with you.'
                  : 'Open the real SBI form when you are ready. Return here after submitting it to save your progress on this device.'}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Cta
                  href={applyUrl('application-hub')}
                  size="lg"
                  arrow="↗"
                  onClick={() => trackApply('application-hub')}
                >
                  {formComplete ? 'Open the form again' : 'Open the application form'}
                </Cta>
                {!formComplete ? (
                  <button
                    type="button"
                    onClick={markComplete}
                    className="focus-gold min-h-[48px] rounded-xl border border-canvas-border-strong bg-white px-5 text-body-sm font-semibold text-navy-900 transition-colors hover:bg-canvas-elevated"
                  >
                    I submitted the form
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={reset}
                    className="focus-gold min-h-[44px] rounded-lg px-3 text-body-sm font-semibold text-ink-soft transition-colors hover:text-navy-900"
                  >
                    Reset this device
                  </button>
                )}
              </div>
            </div>

            <p className="mt-5 text-body-sm text-ink-soft">
              Want the full role details first?{' '}
              <Link
                href="/chapter"
                className="font-semibold text-gold-700 underline decoration-gold-500/40 underline-offset-4"
              >
                Read the chapter leader overview
              </Link>
              .
            </p>
          </Reveal>

          <Reveal variant="up" delay={0.08}>
            <div className="rounded-2xl bg-navy-900 p-6 text-white sm:p-8">
              <p className="font-mono text-label uppercase tracking-label text-gold-300">
                Application path
              </p>
              <ol className="mt-6 space-y-1">
                {STAGES.map((stage, index) => {
                  const isComplete = index < currentStage
                  const isCurrent = index === currentStage
                  return (
                    <li
                      key={stage.title}
                      className={`grid grid-cols-[2.75rem_1fr] gap-4 border-t border-white/12 py-5 first:border-t-0 first:pt-0 ${
                        index > currentStage ? 'opacity-60' : ''
                      }`}
                    >
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full border font-mono text-label font-semibold ${
                          isComplete
                            ? 'border-gold-300 bg-gold-300 text-navy-950'
                            : isCurrent
                              ? 'border-gold-300 text-gold-300'
                              : 'border-white/25 text-white/70'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h2 className="font-display text-xl font-medium text-white">{stage.title}</h2>
                        <p className="mt-2 text-body-sm text-white/70">{stage.detail}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  )
}