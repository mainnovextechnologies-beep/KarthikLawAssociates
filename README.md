# Karthik Advocate — React + Vite

Premium responsive one-page legal website for Karthik Advocate, Nellore, Andhra Pradesh.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Before publishing

1. Replace `YOUR-PRODUCTION-DOMAIN` in `index.html`/JSON-LD in `src/main.jsx`, `public/sitemap.xml`, and `public/robots.txt` with the actual deployed domain.
2. Verify the Google Maps pin and that the supplied review excerpts belong to the intended business listing. Remove any unverified review before publishing.
3. Confirm which practice areas are actually offered; the website currently labels them as enquiry categories and asks visitors to confirm availability.
4. Confirm the supplied portrait is approved for public use and that the phone number/address are correct.
5. The enquiry form validates input and opens WhatsApp with a prefilled message. It does not submit to a backend or store leads on a server; the visitor must press Send in WhatsApp. For server-side lead storage, connect a secure form backend/CRM.
6. Confirm business hours before adding them; this site does not claim 24-hour availability.
7. Review all website content for compliance with applicable professional conduct rules before launch.

## Included
- Responsive React + Vite site
- Premium legal navy/gold visual system
- Supplied portrait and MA Innovex Technologies logo
- Custom law-themed SVG favicon
- Call, WhatsApp, Google Maps, directions and copy-address actions
- Validated enquiry form that opens WhatsApp
- Review excerpts section with verification caveat
- FAQs, legal disclaimer and privacy information dialogs
- SEO title, description, JSON-LD starter, robots.txt and sitemap.xml
- Footer developer credit linking to MA Innovex Technologies
