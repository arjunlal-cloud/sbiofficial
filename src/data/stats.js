import chapters from './chapters.json'

/**
 * Single source of truth for every network figure shown on the site.
 *
 * Only `chapters` is rendered anywhere. It is derived from chapters.json, so it
 * is correct by construction and cannot drift from the map or the roster.
 *
 * The other three were previously rendered with an animated counter, which gave
 * unconfirmed numbers the visual authority of measured data — on a site whose
 * whole argument is that it does not fake things. They stay here, unrendered,
 * until someone verifies them. Confirm a number, delete its TODO, and add it
 * back to the hero proof line.
 */

export const stats = {
  /* Verified: derived from the chapter roster. */
  chapters: {
    value: chapters.length,
    suffix: '',
    label: 'chapters running',
    verified: true,
  },

  // TODO: confirm the real count of students currently active across all chapters.
  students: { value: null, suffix: '+', label: 'students involved', verified: false },

  // TODO: confirm how many local businesses SBI has actually delivered work for.
  businesses: { value: null, suffix: '+', label: 'businesses served', verified: false },

  // TODO: confirm volunteer hours logged in the first year, or drop the metric.
  hours: { value: null, suffix: '+', label: 'hours volunteered', verified: false },
}

/* The founding year is the one date used in visible copy. */
// TODO: confirm SBI actually started in 2025 and not earlier.
export const FOUNDED_YEAR = 2025

/** Only ever render a stat that has been confirmed. */
export const isRenderable = (stat) => Boolean(stat?.verified && stat.value !== null)

export const format = (stat) => (isRenderable(stat) ? `${stat.value}${stat.suffix}` : '')
