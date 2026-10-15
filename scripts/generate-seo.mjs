import fs from 'node:fs'
const envPath = '.env'
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (match && !match[2].startsWith('#') && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2')
    }
  }
}
const site = (process.env.VITE_SITE_URL || 'https://your-domain.com').replace(/\/$/, '')
const routes = [
  '/', '/about', '/legal-services', '/legal-services/civil-rights',
  '/legal-services/criminal-defence', '/legal-services/disability-benefits',
  '/legal-services/eviction', '/legal-services/landlord-tenant',
  '/legal-services/traffic-tickets', '/legal-services/will-writing',
  '/legal-services/workers-compensation', '/gallery', '/reviews', '/faq',
  '/contact', '/appointment', '/privacy-policy', '/terms', '/legal-disclaimer'
]
const image = `${site}/images/karthik-advocate.png`
const urls = routes.map(route => {
  const loc = `${site}${route === '/' ? '/' : route}`
  const imageTag = ['/', '/gallery'].includes(route) ? `<image:image><image:loc>${image}</image:loc><image:title>Karthik Advocate professional portrait</image:title></image:image>` : ''
  return `  <url><loc>${loc}</loc>${imageTag}</url>`
}).join('\n')
fs.mkdirSync('public', { recursive: true })
fs.writeFileSync('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`)
fs.writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${site}/sitemap.xml\n`)
console.log(`Generated sitemap.xml and robots.txt for ${site}`)
