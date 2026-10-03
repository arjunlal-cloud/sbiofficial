import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Static meta per route, generated after the Vite build.
 *
 * Social unfurlers do not execute JavaScript, so the runtime useDocumentMeta
 * hook cannot update their previews. This writes a real HTML file per route
 * with that route's title, description, and canonical URL baked in.
 *
 * Route copy lives in src/lib/meta.js and is parsed from there rather than
 * duplicated, so the runtime and static metadata cannot drift.
 */

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..')
const dist = path.join(root, 'dist')

const metaSource = fs.readFileSync(path.join(root, 'src/lib/meta.js'), 'utf8')

const SITE_URL = metaSource.match(/SITE_URL = '([^']+)'/)?.[1] ?? ''
const SITE_NAME = metaSource.match(/SITE_NAME = '([^']+)'/)?.[1] ?? 'SBI Network'

const routes = []
const blockRe =
  /(\w+):\s*\{\s*path:\s*'([^']+)',\s*title:\s*'((?:[^'\\]|\\.)*)',\s*description:\s*\n?\s*'((?:[^'\\]|\\.)*)',\s*\}/g
let match

while ((match = blockRe.exec(metaSource))) {
  routes.push({
    key: match[1],
    path: match[2],
    title: match[3].replace(/\\'/g, "'"),
    description: match[4].replace(/\\'/g, "'"),
  })
}

if (!routes.length) {
  console.error('[prerender] no routes parsed from src/lib/meta.js — aborting')
  process.exit(1)
}

const shell = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const escape = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

let written = 0

for (const route of routes) {
  const fullTitle = route.key === 'home' ? `${route.title} | ${SITE_NAME}` : route.title
  const url = `${SITE_URL}${route.path}`

  const html = shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(fullTitle)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
      `$1${escape(route.description)}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[\s\S]*?(")/,
      `$1${escape(fullTitle)}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/,
      `$1${escape(route.description)}$2`,
    )
    .replace(/(<meta\s+property="og:url"\s+content=")[\s\S]*?(")/, `$1${escape(url)}$2`)
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[\s\S]*?(")/,
      `$1${escape(fullTitle)}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[\s\S]*?(")/,
      `$1${escape(route.description)}$2`,
    )
    .replace(/(<link\s+rel="canonical"\s+href=")[\s\S]*?(")/, `$1${escape(url)}$2`)

  const target =
    route.path === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, route.path.replace(/^\//, ''), 'index.html')

  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, html)
  written += 1
  console.log(`[prerender] ${route.path} -> ${path.relative(dist, target)}`)
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url>\n    <loc>${SITE_URL}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${route.path === '/' ? '1.0' : '0.7'}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)

console.log(`[prerender] ${written} route(s) + sitemap.xml written`)