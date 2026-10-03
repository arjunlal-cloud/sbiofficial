/**
 * The HQ roster. Read by /team (full grid) and /chapter (support strip), so a
 * role only has to be corrected in one place.
 *
 * Only people who have approved their portrait carry a `photo`. Everyone else
 * renders as initials — never substitute a stock or generated image.
 */

export const LEADERSHIP = [
  {
    role: 'Runs the network',
    name: "Da'El Kim",
    photo: '/team/dael-kim.webp',
    avatar: '/team/dael-kim-96.webp',
    photoSize: [610, 800],
    photoPosition: '50% 62%',
    desc: 'Sets network direction, chapter strategy, and client standards.',
  },
  {
    role: 'Runs operations',
    name: 'James Yu',
    photo: '/team/james-yu.webp',
    avatar: '/team/james-yu-96.webp',
    photoSize: [613, 800],
    photoPosition: '50% 52%',
    desc: 'Keeps day-to-day operations running across chapters.',
  },
  {
    role: 'Runs marketing',
    name: 'Ekam Kaur',
    photo: '/team/ekam-kaur.webp',
    photoSize: [658, 800],
    photoPosition: '50% 22%',
    desc: "Runs SBI's own marketing across every platform.",
  },
  {
    role: 'Builds the tools',
    name: 'Arjun Lal',
    photo: '/team/arjun-lal.webp',
    photoSize: [700, 700],
    photoPosition: '50% 38%',
    desc: 'Owns the tech stack and the tools chapters rely on.',
  },
  {
    role: 'Video Training Lead',
    name: 'Aarav Sharma',
    photo: '/team/aarav-sharma.webp',
    avatar: '/team/aarav-sharma-96.webp',
    photoSize: [461, 1000],
    photoPosition: '50% 32%',
    desc: 'Trains chapter videographers and runs the video resources.',
  },
  {
    role: 'Starts new chapters',
    name: 'Arlin', // TODO: add surname, or confirm they prefer first name only.
    desc: 'Finds new leaders and opens new towns.',
  },
  {
    role: 'Handles the money',
    name: 'Neel', // TODO: add surname, or confirm they prefer first name only.
    desc: 'Handles finances and budgets.',
  },
  {
    role: 'Chapter and partner relations',
    name: 'Jaymond Wong',
    desc: 'Builds relationships with chapters, businesses, and partners.',
  },
]

/**
 * Roles a chapter leader actually depends on week to week.
 *
 * TODO: fill in `name` for each of these once the holder is confirmed. Named
 * people are far stronger proof to an applicant than a role title alone.
 */
export const SUPPORT_ROLES = [
  { role: 'Quality Lead', desc: 'Approves every client deliverable before it goes live.' },
  { role: 'Recruitment Lead', desc: 'Reads every application and runs the first conversation.' },
  { role: 'Onboarding Lead', desc: 'Walks a new chapter through its first client project.' },
  { role: 'Web Training Lead', desc: 'Teaches you to build client sites.' },
  { role: 'Support Lead', desc: 'Who you message when a project goes sideways.' },
  { role: 'Partnerships Lead', desc: 'Sources business and community relationships for chapters.' },
]

/**
 * The subset shown on /chapter: the people who train a new leader and answer
 * them when they are stuck. Named holders first so real faces lead.
 */
export const TRAINING_AND_SUPPORT = [
  LEADERSHIP.find((m) => m.role === 'Video Training Lead'),
  ...SUPPORT_ROLES.filter((r) => r.role !== 'Video Training Lead'),
].filter(Boolean)

export const initials = (text = '') =>
  text
    .split(/[\s\-']+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
