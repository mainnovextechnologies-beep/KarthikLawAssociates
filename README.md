# Karthik Advocate — React + Vite website

Premium responsive demo website for Karthik Advocate, Nellore, Andhra Pradesh.

## Requirements
- Node.js 18+
- npm

## Run locally
```bash
npm install
cp .env.example .env
npm run dev
```
On Windows PowerShell, copy the example with:
```powershell
Copy-Item .env.example .env
```

## Production build
Set `VITE_SITE_URL` in `.env` to the final canonical HTTPS domain, then run:
```bash
npm run build
npm run preview
```
The prebuild script creates `public/sitemap.xml` and `public/robots.txt` from the actual route list and `VITE_SITE_URL`. The files are copied into `dist/` by Vite. Do not deploy with `https://your-domain.com` still configured.

## Demo safety
`VITE_DEMO_MODE=true` is intentional. Call and WhatsApp controls show demo notices, and the appointment form only validates locally. No form information is sent to a server. Do not switch demo mode off until verified contact details and secure backend functionality have been configured and tested.

## Configure before launch
- `VITE_SITE_URL`: final production domain
- `VITE_PHONE`: verified phone number in international format for `tel:`
- `VITE_WHATSAPP`: verified digits including country code, e.g. `91...` (digits only recommended)
- `VITE_EMAIL`: verified office email (not used by the demo frontend)
- `VITE_GOOGLE_BUSINESS_URL`: verified Google Business Profile/reviews URL

Also confirm practice areas, rating/review count, office hours, exact map pin, photo authorization, qualifications and Bar enrollment details with the advocate. The current portrait is the image supplied with the project.

## SEO notes
- Unique page titles/descriptions and canonical metadata are included.
- `LegalService` JSON-LD uses only the supplied business name and address; verify details before launch.
- Sitemap includes the current public routes. Keep the script route list synchronized with actual routes.
- `robots.txt` points to the configured sitemap.
- React Router is a client-side SPA. For strongest crawlability, consider prerendering/SSR or static generation of important routes before production.
- Submit the deployed sitemap in Google Search Console. A sitemap helps discovery but cannot guarantee indexing or rankings.
- Appointment page is included in the sitemap by default; remove it from the route list if you decide it should not be indexed.
- The demo does not claim Google reviews are embedded; the reported 5.0 rating / 7 reviews must be reverified and the official listing URL added before launch.

## Deployment
Works with static hosting such as Vercel, Netlify or Cloudflare Pages. Use `npm run build`; publish `dist/`. Configure SPA fallback rewrites to `/index.html` for direct navigation to nested React Router URLs. The generated sitemap and robots file are static assets.
