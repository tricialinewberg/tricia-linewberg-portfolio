# Engineering audit — review draft

Issue: [#2](https://github.com/tricialinewberg/tricia-linewberg-portfolio/issues/2)

Approved baseline: `9dd07425446935efd2e49e6a31d3142c6b5d49da`.
Branch: `audit/senior-code-quality`. No production deployment or merge is authorized.

## Scope and method

Reviewed every tracked source/configuration/test/document file, the lockfile, original PNG inventory, and CI workflows. Browser checks cover the root-hosted and GitHub Pages-prefixed builds. Baseline screenshots, accessible trees, link attributes, image dimensions and computed styles are captured at 320/375/390/768/1024/1280/1440/1920 in PT-BR/EN/ES for mouse and touch contexts. Both builds use the same Node/browser/environment to isolate code differences. Motion is allowed to finish before comparison; interaction tests separately protect transient effects.

Do not interpret automated axe checks as a certification of WCAG compliance. Physical iOS/Android devices and assistive-technology users are outside this environment.

## Findings ledger

| ID | Priority / classification | Evidence and impact | Disposition |
| --- | --- | --- | --- |
| A01 | Medium / proven test gap | `.github/workflows/verify.yml` only builds `/`; Pages-prefixed checks previously ran only in the main-branch deployment workflow. Regressions could reach main before being detected. | Add non-deploying verification for both hosting bases. |
| A02 | Medium / proven test gap | Existing screenshots are artifacts, not comparisons; `tests/assistant-links.spec.ts` can capture a restarted reveal immediately after focus leaves a row. A passing suite alone cannot demonstrate visual parity. | Add immutable baseline comparisons of pixels, styles, accessible trees, and labels with settled motion. |
| A03 | Low / proven resource risk | `vite.config.mjs` pipes a portrait file stream to the response but does not explicitly destroy the source on an aborted download. A malformed absolute request URL also throws before delegation. This concerns local dev/preview middleware, not Vercel/Pages production servers. | Harden stream/request lifecycle with focused Node tests. |
| A04 | Low / maintainability and resource overhead | `src/motion.ts` marks each revealed element as complete but retains it in the IntersectionObserver until an animation event. Cancellation/reduced-motion changes can bypass that event. This is bounded, not an unbounded memory leak. | Unobserve when the one-time reveal is scheduled; remove animation-end listener bookkeeping. Preserve CSS and timing. |
| A05 | Low / confirmed documentation defect | `public/images/README.md` names missing WebP paths, includes removed Lumier, and recommends cropping despite approved `object-fit: contain` artwork. | Replace with actual asset inventory and preservation rules. |
| A06 | Low / type-safety risk | Locale navigation/descriptions/awards use unconstrained arrays indexed alongside fixed sections/projects. Missing entries can compile and yield undefined text. | Encode existing cardinalities as readonly tuples without changing strings or runtime output. |
| A07 | Low / maintainability | `External` in `src/components.tsx` has no consumers. The special-case project markup makes `App.tsx` harder to review alongside unrelated sections. | Remove unused helper; isolate project rendering with identical DOM and attributes. |
| A08 | Medium / performance limitation, approval required for alternatives | Original hero PNG is 17,320,495 bytes at 3375×4219: approximately 56,956,500 bytes of decoded RGBA storage. Plain lossless IDAT recompression saves 53,365 bytes (0.308%), before chunk overhead. | Preserve all image bytes/URLs. Responsive derivatives or another delivery format need a separate reviewed proposal. No invented LCP improvement claim. |
| A09 | Low / CSS maintenance risk | `src/styles.css` contains historical rules followed by overrides. Some old rules still contribute inherited defaults/borders. Removing entire early blocks is unsafe. | Retain cascade unless exact parity proves a narrowly scoped removal safe; no broad redesign or specificity rewrite. |
| A10 | Review decision / existing interaction behavior | `.project:focus-within *` cancels reveals; removing focus can restart CSS animation. Header Escape also focuses the menu control at desktop widths where it is hidden. | Do not alter approved focus/motion behavior in this audit; flag for owner decision. |
| A11 | Review decision / existing fallback behavior | `Asset` retains failure state if its `src` prop changes on a mounted instance. Current assets are static so this path is not exercised by current routes. | Document; no speculative visible fallback changes. |

## Dependency and security review

`npm audit --json` on 2026-10-20 reports zero known vulnerabilities (production and development). React/React DOM 19.3.0, Vite 7.3.7, esbuild 0.28.2 and Playwright 1.64.0 are locked. No major upgrades are warranted by that evidence. The site is static: no application secrets, form backend or server-rendered user input. External new-tab links use `noopener noreferrer`. Prerender metadata is escaped. This is not a penetration test and cannot establish that future advisories will remain empty.

## Asset measurements

All original assets remain unchanged. Recompression experiments ran on decoded IDAT streams in scratch storage; they do not change approved source files or their provenance metadata. The hero has embedded metadata (`caBX`, EXIF and text chunks), so arbitrary metadata stripping is deliberately avoided.

## Verification and results

Pending final runs. Evidence will be linked here before draft PR delivery.

## Deployment safeguards

The Pages workflow remains main-only. `vercel.json` disables Git-triggered deployment specifically for `audit/senior-code-quality`; all other branches retain existing settings. This follows [Vercel's git.deploymentEnabled documentation](https://vercel.com/docs/project-configuration/git-configuration). The audit workflow has read-only contents permission and no deployment job.
