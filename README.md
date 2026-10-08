# Trícia Linewberg — The Legend’s Portfolio

Mobile-first React, TypeScript and Vite portfolio with authored CSS and three statically rendered language routes. No backend.

## GitHub Pages and Vercel

The `Deploy portfolio to GitHub Pages` workflow builds, checks all three languages on mobile and desktop, and deploys `dist` using the official configure-pages, upload-pages-artifact and deploy-pages actions on every push to `main`. It can also be run manually. Repository Settings → Pages → Source must be **GitHub Actions**.

Live URL: https://tricialinewberg.github.io/tricia-linewberg-portfolio/

The workflow sets `VITE_BASE_PATH=/tricia-linewberg-portfolio/` and `SITE_URL=https://tricialinewberg.github.io/tricia-linewberg-portfolio`. These apply to both the browser and prerender builds. Assets, language links, route detection and SEO use the same base. The static `pt-br/index.html`, `en/index.html` and `es/index.html` files support direct navigation and refresh on Pages; no catch-all rewrite is needed. The site root defaults to Portuguese. Original PNG filenames are preserved, with reserved URL characters encoded.

For **Vercel**, leave `VITE_BASE_PATH` unset (defaults to `/`), set `SITE_URL` to the Vercel site's origin, and use build command `npm run build` with output directory `dist`. The existing `vercel.json` root redirect remains in place. The regular verification workflow tests the root-path build independently of Pages.

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

Set `SITE_URL` to the complete site URL, including any repository base path, at build time to add canonical, OpenGraph URL, hreflang and x-default links. `vercel.json` supports the static language directories and root redirect; it does not deploy Vercel automatically.

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
