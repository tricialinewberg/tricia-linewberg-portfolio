# Trícia Linewberg — The Legend's Portfolio

## Codex implementation instructions (English)
Build a production-ready, accessible, visually original, **mobile-first**, trilingual personal portfolio landing page for UX/UI & Product Designer Trícia Linewberg. The repository is the implementation target. DO NOT imitate an AI-generated generic portfolio. The concept is an **editorial cream invitation to a magical theatrical performance**, inspired atmospherically by Stephanie Garber's Caraval trilogy, while using **original** visuals, words and interactions. Trícia calls her creative persona **The Legend**. No copyrighted Caraval artwork, branding or long book quotations.

### Locked design decisions
- Base surfaces must be cream/ivory/sand (NOT pure white, NOT dark themed sections). Suggested palette: #F7F0E6 main, #EFE6D8 alternate, #E4D6C3 details, #B08A57 antique-gold accent, #342A24 body text. Check all WCAG contrast pairings; subtle gold is decorative, not for small low-contrast labels.
- Editorial sophistication with **subtle theatrical ornament**, strong typography, generous whitespace, restrained motion. No stars scattered everywhere, generic gradients, neon accents or excessive purple.
- Main navbar: brand logo on far left, clear anchor links Projects/About/Contact, real PT/EN/ES language switcher, responsive mobile menu. The logo appears only in navbar, not repeatedly as ornament.
- Hero immediately shows both **headline and user portrait** on the first viewport as a theatrical invitation. On mobile, make the layout intentionally mobile-first and prioritize meaning/readability above forcing every item above the fold.
- Approved English hero:
  "Welcome, welcome — you've arrived at the portfolio of Trícia Linewberg."
  "A grand display of product thinking, interface design, and digital storytelling."
  Label: "THE LEGEND PRESENTS" / role: "UX/UI & Product Designer".
  Translate idiomatically (not word-for-word mechanically) in pt-BR and Spanish, with natural typography and responsive line breaks. **Do not replace this with a generic slogan**. Copy must fit naturally in all 3 languages.
- Primary CTA ALWAYS reads **ADMIT ONE**, unchanged across all languages. It is styled as an ornate ticket and smooth-scrolls to the selected works section on the SAME page. Accessible name and screen-reader context may be localized.
- Project links open the matching Behance case in a new tab with rel="noopener noreferrer". Use the user's authentic project covers only.
- Only these 5 projects (not 6). Place SATRA first and visually featured. Display only verifiable outcomes, no fabricated metrics or client work. Projects:
  1. SATRA Wallet, Hack4Freedom 2026 1st place: https://www.behance.net/gallery/254727621/SATRA-WALLET-(-1ST-PLACE-AT-HACK4FREEDOM-)
  2. Avec — UX/UI Audit & Redesign: https://www.behance.net/gallery/254739999/AVEC-(REDESIGN)
  3. Bitcoin Beauty School: https://www.behance.net/gallery/254405015/Bitcoin-Beauty-School
  4. Assistant to the Villain (fictional website / fan project): https://www.behance.net/gallery/254726489/WebSite-(Fictional)
  5. Lumier — fictional aesthetic-clinic landing page: https://www.behance.net/gallery/246952025/Lumier-Case-Study
- About section titled "Behind the Legend" (localized) shares a compelling but *truthful* professional arc and competences; NO second photo is needed. She has freelance and independent work since 2024; research, user flows, wireframes, hi-fi UI, design systems, Figma, accessibility, UX writing, tests, handoff, functional HTML/CSS/JS prototypes, and fintech/Bitcoin app experience. SATRA won a hackathon; her conversational UX Writing bootcamp project also placed 1st. She is completing postgraduate study in Innovation and Design at UNINTER. Never pretend she has an employee/CLT history or fabricate named clients.
- Clear professional contact footer / last invitation with WhatsApp https://wa.me/5586995473936 (use localized prefilled message if appropriate), email mailto:triciaux@gmail.com, LinkedIn https://www.linkedin.com/in/tricia-linewberg/ . Behance project links are above; portfolio Behance profile URL needs owner verification before adding.
- Fully localized pt-BR/en/es text, nav, card descriptions, accessible labels, page titles/descriptions, lang attribute; language-specific routes preferred: /pt-br/, /en/, /es/ with links/hreflang/canonical as appropriate. Default pt-BR for Brazilian visitors or explicit predictable default; preserve locale switching. Language selector accessible via keyboard.
- Responsiveness 320px through wide desktop; test 320, 375, 768, 1024, 1440. No horizontal overflow. Semantic sections and heading hierarchy, meaningful alt text, visible keyboard focus, reduced-motion support; clickable project cards with keyboard access. Respect adequate tap targets.
- Tech: React + TypeScript + Vite, lean dependencies, preferably CSS modules or authored CSS + tokens, no backend. Well separated project metadata, translations, and components. Optimize LCP image, explicit sizing/aspect ratios, lazy load below fold; SEO + OpenGraph + favicon (if feasible), Vercel SPA rewrite or static language routing, instructions in README.
- Interaction philosophy: don't gate content behind a theatrically animated splash, don't auto-play sounds, don't obstruct recruiting flow, do not animate continuously.
- Keep logo in navbar only. Asset filename mapping included below. Avoid automatic screenshot-like white backgrounds around the logo if possible; crop/reduce accordingly. The user portrait may preserve its original photography, while the SITE background stays light.

### Assets expected at these exact paths
Copy provided assets package's **public/** directory into repo root; don't substitute AI-generated images.
- public/images/profile/tricia-portrait.webp (user's top hat / theatrical portrait)
- public/images/branding/tricia-logo.png (cropped user logo)
- public/images/projects/satra-wallet.webp
- public/images/projects/avec-redesign.webp
- public/images/projects/bitcoin-beauty-school.webp
- public/images/projects/assistant-to-the-villain.webp
- public/images/projects/lumier.webp

### Page sections
1. The Invitation (hero + portrait + ticket CTA)
2. Selected Works / Main Acts (5 original cover cards, first featured)
3. Behind the Legend (human, specific, credible biography/skills)
4. Proof & Awards (concise, honest recognition)
5. Final Invitation / Contact (WhatsApp, email, LinkedIn; optional CV download only if asset is supplied)

Use a pragmatic process: inspect repo/files first; implement; install/build/typecheck; resolve errors; validate accessibility and localization keys and URLs; deliver a concise change summary and any remaining TODOs. Do not claim verified testing unless run. Ask for input only when an essential detail is genuinely missing.