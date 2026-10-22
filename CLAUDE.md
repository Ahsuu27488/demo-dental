# CLAUDE.md — demo-dental

Demo website for **Fernwick Dental**, a FICTIONAL family dental clinic in
downtown Portland, Oregon. Portfolio piece for track 1 of Agency HQ (business
docs live in `../../`): it shows international clients (US/UK/Gulf small
businesses) what a small-business site from us looks like. Read
`docs/brief.md` first. Also read `AGENTS.md`: this is Next.js 16; check
`node_modules/next/dist/docs/` before using any Next.js API you are unsure of.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict ·
Tailwind CSS v4 · Vitest · pnpm · deployed on Vercel (auto-deploy from GitHub
`Ahsuu27488/demo-dental`, branch `main`).

## Commands

| Task | Command |
|---|---|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Unit tests | `pnpm test` |
| Lint | `pnpm lint` |

(If `pnpm` is not on PATH: `npx pnpm@10.28.0 <cmd>`.)

## Structure

- `src/content/clinic.ts` — ALL copy, prices, hours, FAQ, photo credits. Text changes go here.
- `src/lib/booking.ts` — form validation + visit estimate (unit-tested in `booking.test.ts`).
- `src/components/` — one component per section; `booking-card.tsx` is the only client form.
- `public/img/` — Unsplash photos (via picsum.photos), credited in the footer.
- `.taste-skill/` — design direction sheet (`direction.json`) and inspector output.

## Rules (non-negotiable)

- It is a demo of a fictional business. The demo note ("Demo website for a
  fictional clinic, built by Muhammad Ahsan (ahsandev.site)") stays visible on the page.
- No testimonials, star ratings, reviews, awards, insurer logos, statistics or
  photos of real patients/staff. Photos show the Pacific Northwest only.
- Phone numbers stay in the reserved 555-01xx range. The form submits nowhere.
- Design rules: `../../docs/design/workflow-brief.md` + the taste-skill house
  rules (no gradients, eyebrows, monospace, hairlines, shadows at rest, cards
  grids). Motion < 300 ms, transform/opacity only, respects reduced motion.
- After changes: update `CHANGELOG.md`; keep `pnpm lint`, `pnpm test`, `pnpm build` green.
