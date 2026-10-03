/**
 * Conversion instrumentation.
 *
 * Everything funnels through here so there is exactly one place that knows how
 * an event is recorded. Vercel Analytics is cookie-free, so there is no consent
 * banner to build and nothing to explain to a teenage audience.
 *
 * Every call is defensive: analytics must never be able to break a page, and a
 * blocked script (ad blockers are near-universal in this audience) must degrade
 * to silence rather than to an exception.
 */

/** The live application form. One constant, imported everywhere. */
export const APPLY_FORM_URL =
  'https://docs.google.com/forms/d/1v1HwPRPeFm87FyT4HGVMMnwyHFn6khd_Z-j2XFp2Y1Q/viewform'

export const BUSINESS_REQUEST_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe-rm4vbP6Bkte7mILxS8CEHcrtabHW80qUrEat2kKHOSvbFw/viewform'

export const EXEC_FORM_URL =
  'https://docs.google.com/forms/d/16H_5sU03cJnv2lYYlE2311UYtBx-OVw53ngVBGM6opc/viewform'

export function track(name, props = {}) {
  try {
    if (typeof window === 'undefined') return
    /* Vercel Analytics exposes a queue-backed `va` as soon as its script tag
       is injected, so this works before the bundle finishes loading. */
    if (typeof window.va === 'function') window.va('event', { name, ...props })
  } catch {
    /* Instrumentation must never surface to a visitor. */
  }
}

/**
 * Every apply CTA reports which section it was clicked from, so the funnel can
 * be read section by section rather than as one undifferentiated total.
 */
export function trackApply(source) {
  track('apply_click', { source })
}

export function trackOutbound(name, source) {
  track(name, { source })
}

/**
 * Google Forms cannot see a Referer header from a `noreferrer` link, and the
 * site previously used `noreferrer` on every apply link, so no submission could
 * ever be attributed. UTMs put the origin in the URL itself, which survives
 * regardless of referrer policy.
 *
 * TODO: replace with a Google Forms prefill link carrying a hidden "source"
 * field, so the origin lands in the response row instead of only in analytics.
 * That needs the form's prefilled-entry ID, which is not in the repo.
 */
export function applyUrl(source) {
  const separator = APPLY_FORM_URL.includes('?') ? '&' : '?'
  return `${APPLY_FORM_URL}${separator}utm_source=site&utm_medium=cta&utm_content=${encodeURIComponent(source)}`
}

export function formUrl(base, source) {
  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}utm_source=site&utm_medium=cta&utm_content=${encodeURIComponent(source)}`
}

/**
 * Scroll depth on the conversion page, reported once per threshold so the
 * quartile a reader stops at is visible without spamming events.
 */
export function initScrollDepth(routeName) {
  if (typeof window === 'undefined') return () => {}

  const thresholds = [25, 50, 75, 100]
  const fired = new Set()
  let ticking = false

  const measure = () => {
    ticking = false
    const doc = document.documentElement
    const scrollable = doc.scrollHeight - window.innerHeight
    if (scrollable <= 0) return
    const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100))
    for (const t of thresholds) {
      if (pct >= t && !fired.has(t)) {
        fired.add(t)
        track('scroll_depth', { route: routeName, depth: t })
      }
    }
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(measure)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
