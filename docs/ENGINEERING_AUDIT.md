# Engineering audit

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
| A03 | Low / confirmed middleware defects | `vite.config.mjs:10` throws on malformed absolute URLs; its portrait source stream remains open when the response closes early. The abort regression test fails against the original implementation and passes after the fix. This concerns local dev/preview middleware, not Vercel/Pages production servers. | Catch URL parsing failures and destroy the source on response close (`vite.config.mjs:19`). GET/HEAD tests verify unchanged original bytes and root/prefixed URLs. |
| A04 | Low / maintainability and resource overhead | `src/motion.ts` marks each revealed element as complete but retains it in the IntersectionObserver until an animation event. Cancellation/reduced-motion changes can bypass that event. This is bounded, not an unbounded memory leak. | Unobserve when the one-time reveal is scheduled; remove animation-end listener bookkeeping. Preserve CSS and timing. |
| A05 | Low / confirmed documentation defect | `public/images/README.md` names missing WebP paths, includes removed Lumier, and recommends cropping despite approved `object-fit: contain` artwork. | Replace with actual asset inventory and preservation rules. |
| A06 | Low / type-safety risk | Locale navigation/descriptions/awards use unconstrained arrays indexed alongside fixed sections/projects. Missing entries can compile and yield undefined text. | Encode existing cardinalities as readonly tuples without changing strings or runtime output. |
| A07 | Low / maintainability | `External` in `src/components.tsx` has no consumers. The special-case project markup makes `App.tsx` harder to review alongside unrelated sections. | Remove unused helper; isolate project rendering with identical DOM and attributes. |
| A08 | Medium / performance limitation, approval required for alternatives | Original hero PNG is 17,320,495 bytes at 3375×4219: approximately 56,956,500 bytes of decoded RGBA storage. Plain lossless IDAT recompression saves 53,365 bytes (0.308%), before chunk overhead. | Preserve all image bytes/URLs. Responsive derivatives or another delivery format need a separate reviewed proposal. No invented LCP improvement claim. |
| A09 | Low / CSS maintenance risk | `src/styles.css` contains historical rules followed by overrides. Some old rules still contribute inherited defaults/borders. Removing entire early blocks is unsafe. | Remove only 19 unused rules listed in `docs/css-removals.json`; retain the active cascade and verify exact parity. |
| A10 | Review decision / existing interaction behavior | `.project:focus-within *` cancels reveals; removing focus can restart CSS animation. Header Escape also attempts to focus the menu control at desktop widths where it is hidden. | Do not alter approved focus/motion behavior in this audit; flag for owner decision. |
| A11 | Review decision / existing fallback behavior | `Asset` retains failure state if its `src` prop changes on a mounted instance. Current assets are static so this path is not exercised by current routes. | Document; no speculative visible fallback changes. |
| A12 | Low / test isolation defect exposed by new coverage | Playwright's default discovery executes Node `.test.mjs` unit files alongside browser specs. CI logs showed duplicate unit execution. | Set `testMatch: '**/*.spec.ts'` in `playwright.config.ts`; Node tests run once under their own runner. |
| A13 | Low / delivery hardening | Mutable action tags and a manual Pages dispatch on another branch weaken reproducibility/review safeguards. Windows build compatibility was not tested. | Pin existing verification action majors by SHA, guard Pages with an explicit main ref, add Windows build/test job, and disable Vercel deployments for this audit branch. |

## Dependency and security review

`npm audit --json` on 2026-10-20 reports zero known vulnerabilities (production and development). React/React DOM 19.3.0, Vite 7.3.7, esbuild 0.28.2 and Playwright 1.64.0 are locked. No major upgrades are warranted by that evidence. The site is static: no application secrets, form backend or server-rendered user input. External new-tab links use `noopener noreferrer`. Prerender metadata is escaped. This is not a penetration test and cannot establish that future advisories will remain empty.

## Asset measurements

All original assets remain unchanged. Recompression experiments ran on decoded IDAT streams in scratch storage; they do not change approved source files or their provenance metadata. The hero has embedded metadata (`caBX`, EXIF and text chunks), so arbitrary metadata stripping is deliberately avoided.

## Verification and results

All application changes pass [the complete two-host audit run](https://github.com/tricialinewberg/tricia-linewberg-portfolio/actions/runs/39462702325) at `ce6db364735c8692c052a9b103313252249bc7b4`. Later commits change CI/test capture setup and documentation only; application code is identical.

| Check | Result |
| --- | --- |
| TypeScript and standard production build | Passed on Linux and Windows, Node 24 |
| Node regression tests | 5 passed on both operating systems |
| Static content, locale parity, counts, base URLs | Passed |
| Prerender HTML including metadata | All 3 locales identical apart from generated bundle hashes, for each hosting base |
| Exact full-page screenshots | 48/48 per hosting base; 96 total, zero pixel tolerance |
| Computed styles, content/link/image data and accessible trees | 48/48 identical per hosting base |
| Existing Playwright suite | 47/47 per hosting base, covering keyboard, language switching, project destinations, wand, clicks, touch, reduced motion and JavaScript-disabled content |
| Chromium / Firefox / WebKit compatibility | 18/18 per hosting base: 3 locales × 2 widths × 3 engines |
| axe WCAG 2 A/AA and 2.1 AA checks | No violations in the tested states |
| Runtime/hydration errors and horizontal overflow | None in the tested routes/states |
| Dependency audit | Zero known vulnerabilities at audit time |
| Existing public routes (read-only checks) | PT-BR/EN/ES and encoded original portrait return HTTP 200 on Pages and Vercel |
| Scope review | No image bytes, copy values, project/contact URLs, touch effects or active style rules changed |

[Linux/Windows build evidence](https://github.com/tricialinewberg/tricia-linewberg-portfolio/actions/runs/39464482216).
[Final deterministic capture run](https://github.com/tricialinewberg/tricia-linewberg-portfolio/actions/runs/39464482175).

Download `audit-root` and `audit-pages` from the audit run's **Artifacts** section. Each ZIP contains `audit/before/` and `audit/after/` full-page PNGs, matching JSON/ARIA evidence, the JSON test reports, and existing interaction screenshots/videos. Filenames encode locale, width and mouse/touch context; for example `pt-br-375-touch.png` and `en-1440-mouse.png`. Baseline and candidate contact sheets were also visually inspected. The [initial unchanged-site control run](https://github.com/tricialinewberg/tricia-linewberg-portfolio/actions/runs/39460015397) passed both 48-case matrices before runtime changes.

## Deployment safeguards

The Pages workflow remains main-only. `vercel.json` disables Git-triggered deployment specifically for `audit/senior-code-quality`; all other branches retain existing settings. This follows [Vercel's git.deploymentEnabled documentation](https://vercel.com/docs/project-configuration/git-configuration). The audit workflow has read-only contents permission and no deployment job.

## Coverage and deliberate non-changes

- React: reviewed `App`, `Header`, `Asset`, `ContactLinks`, project data and locale selection. Extracted only the project list, where independent Assistant destinations deserve an isolated review boundary. SSR markup is unchanged.
- Motion: reviewed media-query changes, observer teardown, wand animation pools, pointer listeners, touch activation timers, cancellation, and unmount cleanup. `touch-motion.ts`, `motion.css`, `hero.css`, the wand SVG and all approved timings remain byte-for-byte unchanged. Added cleanup tests instead of rewriting working effects.
- Styling: removed exactly 19 rules whose obsolete class names have no rendered consumers; see [the removal ledger](css-removals.json). Kept active cascade layers, responsive breakpoints, fonts and inherited defaults.
- Localization/SEO: no translation values changed. Tuple types protect the existing 3 navigation labels, 4 project descriptions, 8 competencies and 2 awards. Reviewed prerender escaping, locale paths, canonical/hreflang metadata and hydration. Static HTML comparison ignores only generated bundle hashes.
- Delivery: reviewed scripts, TypeScript settings, lockfile, GitHub Actions, Pages base paths and Vercel rewrites. Existing verification actions are pinned to immutable SHAs without changing their major versions. Added Windows build coverage and a main-ref guard to the Pages build job, including manual dispatch.
- Test isolation: adding Node unit tests exposed Playwright's default discovery of `.test.mjs` files. Restricting its existing suite to `**/*.spec.ts` prevents duplicate execution under the wrong runner.

## Measured production output

Comparable Linux production build logs (approved main versus candidate) report:

| Bundle | Approved main | Candidate | Interpretation |
| --- | ---: | ---: | --- |
| CSS | 31.38 kB | 30.25 kB | Removed obsolete selectors; no active styling replacement |
| CSS gzip | 7.58 kB | 7.33 kB | Approximately 0.25 kB transfer reduction |
| JavaScript | 246.91 kB | 246.86 kB | Effectively unchanged |
| JavaScript gzip | 77.52 kB | 77.52 kB | No transfer reduction claimed |

These are bundler output sizes, not measured page-load or LCP improvements. [Image inventory](image-audit.json) and [dependency audit](dependency-audit.json) preserve the underlying measurements. No PNG bytes, filenames, URLs, crops or metadata changed.

## Remaining risks and approval decisions

1. The 17.32 MB portrait remains the dominant asset cost. A future responsive-image proposal should compare original and derivatives visually and retain provenance; this audit does not introduce one.
2. Existing focus/reveal behavior deserves separate review: leaving a project focus-within state can restart its animation. Header Escape attempts to focus its menu button even at desktop widths where that control is hidden; browser-specific impact needs an explicit interaction decision. Neither behavior was changed.
3. `Asset` does not reset a previous error when its `src` changes. Current static props do not exercise this case; adding speculative fallback behavior is deferred.
4. GitHub reports upstream Node 20 action-runtime and `punycode`/`url.parse()` deprecation warnings. Current Linux/Windows builds pass. Action major-version upgrades are deferred rather than bundled with this audit.
5. Browser emulation is not physical-device or screen-reader user testing. Automated WCAG checks cannot establish full conformance. External destinations can change independently of this repository.
6. Audit artifacts expire after 30 days. Download the before/after evidence for longer retention. The immutable baseline SHA and committed harness allow reproduction.

## Reproduction

Use Node 24 and `npm ci`, then `npm run build`, `npm test`, and `npx playwright test`. `npm run build` includes TypeScript checking. The audit workflow builds the immutable baseline on port 4174 and candidate on 4173 for both hosting bases, captures with `AUDIT_CAPTURE=1`, and compares with `playwright.audit.config.ts`; `playwright.compatibility.config.ts` adds Chromium, Firefox and WebKit checks. See the workflow for exact `VITE_BASE_PATH` and `SITE_URL` values.

The local Windows sandbox blocks esbuild child processes (`spawn EPERM`), so standard build evidence comes from clean Linux and Windows GitHub runners. An in-process local build and isolated Node tests also passed; they are supplementary, not substitutes for CI.

### Visual test investigation

The initial unchanged-code control run passed all 96 comparisons across both hosting bases. One later root-hosted comparison reported 258 differing pixels in a 29×33 area at the top-left corner: the custom wand was visible in one capture and hidden in the other after scrolling. All 48 root-hosted computed-style/content JSON and accessibility snapshots were identical; the other 47 image pairs were exactly identical. An independent rerun passed the same screenshot. The test now moves the pointer outside the viewport before static capture so native pointer-leave handling removes that race. No application cursor code, CSS, image mask or screenshot tolerance was changed. Separate mouse-motion, hover, click and touch tests continue to verify the decorative effects.
