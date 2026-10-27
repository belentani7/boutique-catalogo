# PROJECT MASTER PROMPT — boutique-catalogo

## Identity and source of truth
This is a Spanish-language, editorial fashion catalog built with React 19, TypeScript, Vite 8, Tailwind 4 and GSAP. It is not a shop, payment processor or customer CRM. Canonical source is `src/App.tsx`, `src/catalog-filter.ts`, `src/index.css`, `public/media/`, `index.html`, `package.json` and the npm lockfile. Preserve the original monochrome visual system, typography, collection names and creative intent; do not substitute a generic storefront.

## Product direction
Create a polished, keyboard-accessible, mobile-first catalog: locally searchable garments, collection filtering, legible captions, controlled video playback, meaningful empty/error states, and no invented stock, prices, contacts, sales or awards. Respect reduced motion. Keep queries local and avoid analytics until separately authorized.

## Preservation and publication gates
- Never alter or publish originals, private media or portraits without verified rights and a verified public destination. Check EXIF/GPS on copies intended for publication; do not destroy originals.
- Before destructive operations, verify full Git/LFS/metadata/data backup, encrypted offsite copy and restore; a Git bundle alone is insufficient. None is confirmed for this repo.
- GitHub currently reports this repository as PUBLIC/ACTIVE (verified 2026-10-27), contrary to older private labels. Do not change visibility automatically. Public GitHub media does not establish image/video distribution rights. No new cost, forced merge, deployment, or hosting without verified approval.
- Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `node --experimental-strip-types --test tests/catalog-filter.test.mjs`; then browser checks at 320, 375, 768 and 1280px, keyboard, focus, contrast, reduced motion and broken-media fallbacks.
- Check CI runner execution, vulnerability scanning, rights/attribution, and exact deployed SHA/URL before declaring release. GitHub Actions deployment jobs require explicit opt-in variables.
- Document each gate as VERIFIED, PARTIAL or BLOCKED with exact evidence; never call a PR, CI configuration or Vercel READY a completed release.

## Operational prompt
Inspect HEAD, PRs, branches and CI; identify a reproducible issue affecting the original catalog; implement minimal cohesive changes with regression coverage; compare code/docs/branding/media; test independently; preserve privacy and existing data; only merge and publish after all applicable gates pass. Record SHA, commands, status, remaining gaps and next task in the Factory issue #4. Canonical Factory index: #152.
