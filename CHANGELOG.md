# Changelog

## 2026-10-22

- Motion and interaction upgrade:
  - Added `--ease-out-expo` token to globals.css and sticky header hiding/active link styles to sections.css.
  - Mounted Motion controller in page.tsx and inserted the new Samples editorial reviews section between Visit and BookingCard.
  - Upgraded Hero: added tilt (4deg) on photo wrapper, parallax (-0.05) with 1.08 scale on photo image, removed 12s drift, made folder stack 3D fan-out/tilt scroll-scrubbed with hover/focus lift on tabs, added magnetic CTA button.
  - Switched section h2 headings to SplitHeading with word-mask reveal on scroll.
  - Upgraded non-hero photos with 1.12 scale clip entrance and parallax (-0.04) on Find Us band image.
  - Upgraded Prices: 32px expo entrance, 3deg tilt on tiles, flat tone pseudo-element hover on rows with 1.4 leaf dot scale.
  - Upgraded Visit: scroll-linked deterministic leaf migration from scattered/loose to placed with seeded Mulberry32 PRNG.
  - Created Samples component: one-quote-at-a-time editorial review tabs with oversized leaf quotation SVG, 7s in-view auto-advance with hover/focus pause, arrow-key navigation, no-JS list fallback, mobile dot row.
  - Upgraded BookingCard: 2deg tilt, magnetic submit and contact buttons, remounting live summary line transitions, success scale entrance.
  - Upgraded FAQ: 16px rotating leaf toggle (0->90deg), card hover lift.
  - Upgraded Footer: frond SVG scrub scaling leaflets 0.6->1 based on scroll progress.
  - Applied overflow: clip to sections to prevent horizontal overflow on small screens; all motion respects prefers-reduced-motion.
- Project created: Next.js 16 + Tailwind v4 demo site for the fictional
  Fernwick Dental (Portland, OR), as an international portfolio piece.
- Site built (foreman worker: Antigravity, Claude Opus 4.6 thinking; reviewed and
  partly rewritten by Claude): demo banner, header, hero with a folder-tab stack,
  "why" statement with inline photos, price tiles that step up, how-a-visit diagram
  drawn from leaf shapes, appointment-card booking form (client-only, validation
  unit-tested), hours + OpenStreetMap embed, FAQ index cards, fern-frond footer.
  SEO: metadata, OG image, sitemap, robots. Design: taste-skill inspector 0 FAIL
  at 1440/768/390.
- Live on Vercel: https://demo-dental-teal-two.vercel.app (site.url updated for canonical/OG/sitemap).
- Hero paints without an entrance animation (it is the LCP); Lighthouse mobile was 88 performance.
- Screenshots (live site) in docs/screenshots/. Lighthouse mobile (live): performance 95-96, accessibility/best practices/SEO 100.
- Branch feat/motion-21st (preview only, not production until the owner approves): motion and
  layout rework based on a 21st.dev study (`docs/21st-study.md`). Lead wrote the shared motion
  layer (`motion.tsx`: tilt, magnetic, parallax, scroll scrub; sticky header that hides on
  scroll down and marks the active section; word-mask headings); foreman worker (Antigravity,
  gemini-3.8-flash high) wired it into every section and built the labelled sample-reviews
  section. Review fixes: booking heading size, wordmark weight, parallax limited to each
  picture's spare edge, incoming quote stacked above the outgoing one. Checked in headless
  Chrome: header, active link, tilt, magnetic, no tilt on touch, no overflow at 390, reduced
  motion off, no-JS content complete. Taste inspector 0 FAIL.
- Preview checks (feat/motion-21st): Lighthouse mobile performance 94-99, accessibility 100, best practices 100 (SEO 66 only from Vercel's preview noindex); screenshots in docs/screenshots/motion/.
