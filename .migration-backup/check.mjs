// Screenshots all routes at desktop + mobile → ../temporary screenshots/
// Usage: node check.mjs [baseUrl]  (default http://localhost:5173)
import { createRequire } from 'module'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(
  'file:///C:/Users/Da%27El/AppData/Roaming/npm/node_modules/puppeteer/package.json'
)
const puppeteer = require('./lib/puppeteer/puppeteer.js')

const base = process.argv[2] || 'http://localhost:5173'
const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'temporary screenshots')
mkdirSync(outDir, { recursive: true })

const routes = [
  ['landing', '/'],
  ['business', '/business'],
  ['chapter', '/chapter'],
]
const viewports = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 390, height: 844, deviceScaleFactor: 2 }],
]

const browser = await puppeteer.launch({
  // puppeteer-cache Chrome binaries are corrupt (side-by-side config error) — use system Chrome
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`))
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))

for (const [vpName, vp] of viewports) {
  await page.setViewport(vp)
  for (const [routeName, path] of routes) {
    await page.goto(base + path, { waitUntil: 'networkidle2', timeout: 30000 })
    await new Promise((r) => setTimeout(r, 1200))
    // horizontal-scroll check
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    if (overflow > 1) errors.push(`${routeName}@${vpName}: horizontal overflow ${overflow}px`)
    const out = join(outDir, `sbi-${routeName}-${vpName}.png`)
    await page.screenshot({ path: out, fullPage: true })
    console.log(out)
  }
}

// --- interaction checks (desktop viewport, /chapter) ---
await page.setViewport({ width: 1440, height: 900 })
await page.goto(base + '/chapter', { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 1000))

// accordion: second <details> opens on click
const opened = await page.evaluate(() => {
  const d = document.querySelectorAll('details')[1]
  d.querySelector('summary').click()
  return d.open
})
if (!opened) errors.push('interaction: second accordion did not open on click')

// regression: hovering the accordion (but not a term) must NOT show tooltips
await page.hover('details summary')
const leaked = await page.evaluate(
  () => [...document.querySelectorAll('[role="tooltip"]')].some((t) => getComputedStyle(t).display !== 'none')
)
if (leaked) errors.push('interaction: tooltip visible on accordion hover (should require hovering the term)')

// glossary tooltip: focusing a term makes its tooltip visible
const tooltipShown = await page.evaluate(() => {
  const btn = document.querySelector('button[aria-label^="Definition of"]')
  btn.focus()
  const tip = btn.parentElement.querySelector('[role="tooltip"]')
  return getComputedStyle(tip).display !== 'none'
})
if (!tooltipShown) errors.push('interaction: glossary tooltip not shown on focus')

// map: clicking the chapter pin opens a popup with the chapter name
// (center the map first — a partially-visible marker under the sticky nav
// would receive the click on the nav instead)
// behavior:'instant' — the site sets scroll-behavior:smooth, and clicking
// mid-animation misses the marker
await page.evaluate(() =>
  document.querySelector('.leaflet-container').scrollIntoView({ block: 'center', behavior: 'instant' })
)
await page.click('.leaflet-marker-icon')
await new Promise((r) => setTimeout(r, 500))
const popupText = await page.evaluate(() => document.querySelector('.leaflet-popup')?.innerText || '')
if (!popupText.includes('East Brunswick SBI')) errors.push('interaction: map pin popup missing chapter info')

await browser.close()
if (errors.length) {
  console.error('ISSUES:\n' + errors.join('\n'))
  process.exit(1)
}
console.log('PASS: no console errors, no horizontal overflow')
