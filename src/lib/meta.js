import { useEffect } from 'react'

/**
 * Per-route document metadata.
 *
 * Unfurlers (Instagram, iMessage, Discord, Slack) do not run JavaScript, so
 * this hook is only half the fix - it corrects the tab title and the meta for
 * anything that *does* execute JS. The static side is generated at build time
 * by scripts/prerender.mjs, which reads this same table so the two can never
 * drift apart.
 */

export const SITE_NAME = 'SBI Network'
export const SITE_URL = 'https://sbinetwork.org' // TODO: confirm the production domain.
export const OG_IMAGE = '/og.png'

export const ROUTE_META = {
  home: {
    path: '/',
    title: 'Free websites for local businesses, built by high schoolers',
    description:
      'SBI is a free, student-run digital agency. Local chapters build websites, improve Google Business Profiles, and support social media for nearby businesses and community groups.',
  },
  chapter: {
    path: '/chapter',
    title: 'Start an SBI chapter in your town',
    description:
       'Two high school students can start a chapter. You build websites and promo videos for local businesses, free, and the student support team trains you before your first client.',
  },
  business: {
    path: '/business',
    title: 'Free websites and promo videos for local businesses: SBI Network',
    description:
       'A local student chapter can build your website, improve your Google Business Profile, or support social media, then give the work to you free.',
  },
  team: {
    path: '/team',
    title: 'The team behind SBI Network',
    description:
       'The student support team that approves chapters, trains new leaders, and reviews every piece of client work before it goes live.',
  },
  manual: {
    path: '/manual',
    title: 'Chapter operations manual: SBI Network',
    description:
       'The manual for chapter leaders: roles, how chapters get approved, what happens if one goes quiet, and a glossary.',
  },
  about: {
    path: '/about',
    title: 'A free student agency for local businesses: SBI Network',
    description:
      'SBI connects local businesses that need digital work with high school chapters ready to build it free, giving students real clients, portfolios, leadership experience, and local impact.',
  },
  apply: {
    path: '/apply',
    title: 'Apply to start an SBI chapter',
    description:
      'See each step for starting an SBI chapter, open the application form, and keep track of what happens after you apply.',
  },
}

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) ?? []
    if (key && val) el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export function useDocumentMeta(routeKey) {
  useEffect(() => {
    const meta = ROUTE_META[routeKey]
    if (!meta) return

    const fullTitle =
      routeKey === 'home' ? `${meta.title} | ${SITE_NAME}` : meta.title
    document.title = fullTitle

    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', `${SITE_URL}${meta.path}`)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', meta.description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE_URL}${meta.path}`)
  }, [routeKey])
}
