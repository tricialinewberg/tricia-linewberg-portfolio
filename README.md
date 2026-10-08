# Trícia Linewberg — The Legend’s Portfolio

Mobile-first React, TypeScript and Vite portfolio with authored CSS and three statically rendered language routes. No backend. No deployment performed.

## Local development and checks

Requires Node 22.12+ (developed with Node 24).

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
# In a second terminal, with preview running on port 4173:
npx playwright install chromium
npx playwright test
```

The build typechecks, bundles, and generates complete HTML at `/pt-br/`, `/en/`, and `/es/`. `/` predictably defaults to Brazilian Portuguese. Language switching preserves the section. Use production preview for prerendered pages; development uses client rendering.

Set `SITE_URL` to the verified final origin at build time to add canonical, OpenGraph URL, hreflang and x-default links. No final domain is assumed. `vercel.json` supports the static language directories and root redirect; it does not deploy. Wait for design review before deployment.

## Maintenance

- `src/locales.ts`: typed translations, metadata, descriptions and accessible labels.
- `src/projects.ts`: ordered project metadata and exact Behance links.
- `src/components.tsx`: navigation and graceful asset handling.
- `src/styles.css`: design tokens, responsive layouts, focus and reduced motion.
- `scripts/prerender.mjs`: static language HTML and SEO.
- `tests/portfolio.spec.ts`: all three locales at 320, 375, 768, 1024 and 1440 pixels, axe checks, keyboard navigation and language switching.

Cormorant Garamond and DM Sans use Google Fonts with font-display swap and local fallbacks. Image dimensions are reserved; the portrait is eager/high priority and project covers are lazy. No animation library, continuous motion, sounds or splash screen.

## Missing original assets — all seven

The source repository contained only the brief and README. Upload originals to these exact paths; references are already implemented:

1. `public/images/profile/tricia-portrait.webp`
2. `public/images/branding/tricia-logo.png`
3. `public/images/projects/satra-wallet.webp`
4. `public/images/projects/avec-redesign.webp`
5. `public/images/projects/bitcoin-beauty-school.webp`
6. `public/images/projects/assistant-to-the-villain.webp`
7. `public/images/projects/lumier.webp`

Until upload, image areas display localized empty-state labels and the navbar displays the designer’s name. No substitute artwork was generated. Review image crops, logo transparency and LCP after upload. Export guidance is in `public/images/README.md`. Favicon and OpenGraph image await approved branding assets. No CV or unverified Behance profile URL is included.

The brief is the source for biography and recognition. No metrics, clients or employee history were invented.
