# Fernwick Dental — Demo Website

**Demo website for a fictional clinic, built by Muhammad Ahsan ([ahsandev.site](https://ahsandev.site)).** No real business, patients, reviews or results are shown.

Live: https://demo-dental-teal-two.vercel.app

A polished, mobile-first one-page website for **Fernwick Dental**, a fictional family dental clinic in downtown Portland, Oregon. Built as a portfolio demo with Next.js 16 (App Router, React 19) and Tailwind CSS v4.

## What it is

A single-page marketing site with ten sections: demo banner, header, hero with folder-tab stack, "why us" statement with inline photos, services and pricing, visit walkthrough with leaf-particle SVG, live booking form (client-side only — nothing is sent), hours and map, FAQ accordion, and footer with a decorative fern frond.

All copy, prices, hours and FAQs come from `src/content/clinic.ts`. Photos are Pacific Northwest landscapes stored in `public/img/`.

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and deploy

```bash
pnpm build
pnpm start
```

Deploy to Vercel, Netlify, or any Node.js host that supports Next.js 16.

## Test

```bash
pnpm test
```

Runs Vitest unit tests for the booking validation library (`src/lib/booking.ts`).

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config)
- [Jost](https://fonts.google.com/specimen/Jost) typeface via `next/font`
- [Vitest](https://vitest.dev/) for unit testing

## Credits

Photos by Paul Jarvis, Buzo Jesús, Liane Metzler, Kim Daniel and Forrest Cavale on [Unsplash](https://unsplash.com/license). Map © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright).

Motion techniques were studied on 21st.dev and rebuilt in our own code; see `docs/21st-study.md`. Adapted ideas from MIT-licensed spell-ui (TiltCard) and motion-primitives (Magnetic, TextEffect); no component was copied whole.

The reviews section shows sample quotes written for this demo; the clinic and the patients are fictional.
