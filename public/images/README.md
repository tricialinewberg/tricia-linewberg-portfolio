# Approved original portfolio images

These filenames and public URLs are intentional. `src/projects.ts` owns project cover paths; `src/App.tsx` and `src/components.tsx` reference the portrait and logo. `withBase` prefixes URLs for GitHub Pages without changing encoded filenames.

| File | Use |
| --- | --- |
| `#2a1a30 (8).png` | Hero portrait, public URL `images/%232a1a30%20(8).png` |
| `01-cover (1).png` | SATRA Wallet |
| `cover.png` | Bitcoin Beauty School |
| `01-cover.png` | Assistant to the Villain |
| `01-cover (2).png` | Avec — Redesign |
| `tricia-logo-transparent.png` | Navbar brand |
| `Algumas logo que já desenvolvi.png` | Preserved original, not currently rendered |

Preserve filenames, accents, original image content, and metadata. Do not replace originals with stock/generated art or rename PNG bytes as another format. The approved covers and portrait use `object-fit: contain`; CSS controls their presentation and dimensions. A missing image has a localized fallback.

Vite dev/preview uses explicit middleware for the encoded `#` portrait filename. Production GitHub Pages and Vercel serve these as static assets. Validate both hosting bases when changing asset handling. Image resizing, alternate formats, responsive derivatives, cropping and metadata removal require separate review. See `docs/ENGINEERING_AUDIT.md` for measurements and limitations.
