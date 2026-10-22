# 21st.dev study (2026-10-22)

What we studied on 21st.dev for the motion + layout rework, and what we took. Nothing was
pasted whole. Every technique was rebuilt in plain React/CSS in our own design system (Jost,
OKLCH fern palette, leaf shape), with the house rules: no gradients, glows, shadows, blur or
glass, transform/opacity motion only, reduced motion respected, pointer effects only on
fine pointers.

How: browsed the category pages (Heroes, Features, Testimonials, FAQ, CTAs, Navigation,
Cards, Buttons) and templates in the in-app browser and in the owner's logged-in Chrome
(read-only). 21st.dev shows full source only to members (2 free views a day), so where a
component credits a public MIT repo we read the code there.

| Component / template | Source read? | Licence | What we took |
|---|---|---|---|
| Tilt Card (Spell / tom_ui) | yes: github.com/xxtomm/spell-ui `registry/spell-ui/tilt-card.tsx` | MIT | Tilt maths: pointer position → `rotateX((0.5-py)·2·limit)`, `rotateY((px-0.5)·2·limit)` in `perspective()`, fast linear follow + eased return on leave. Dropped its radial-gradient spotlight and 1.05 scale. → `src/components/motion.tsx` (`data-tilt`) |
| Magnetic, Tilt, InView, TextEffect (motion-primitives, credited across 21st cards) | yes: github.com/ibelick/motion-primitives `components/core/*` | MIT | Magnetic distance fall-off (`1 - distance/range`), in-view once, per-word "slide" text preset. Re-done without the motion library (rAF + CSS), pull capped at 6px. → `motion.tsx` (`data-magnetic`), `split-heading.tsx` |
| FAQ Accordion (ScrollX UI) | yes: full source view in the owner's account | MIT | Headline words rise 12px over 0.4s with 80ms stagger; intro fades at 0.4s; items rise 10px, 0.35s, 70ms stagger; single-open accordion. We dropped the blur filter (not transform/opacity). → FAQ + every section heading |
| Sliding Testimonial (kinfe123) | yes: full source view | none shown, so technique only | Large light pull-quote set at 2-3xl with tight tracking; quotes cycle. We did not use its marquee mask (gradient) or bordered cards. → `samples.tsx` |
| Testimonial 2 (ncdai), Mist Testimonials 5, Testimonials 3, Scroll Reel Testimonials | previews + descriptions | - | One quote at a time beats a grid of cards; author line under the quote; reels and staggered grids read as noise for a calm clinic. |
| Aurea Dental Studio (template, larsen66) | live preview only (code is paid) | - | Calm editorial rhythm: ~144px section padding, short two-part headlines, a "before you sit down" process section, reviews rail with keyboard support, contact as a dialog. We kept our own look; took the rhythm and the keyboard-accessible review control. |
| CTA 3 (Efferd) | preview | - | One headline + secondary/primary button pair. Its crop marks and hairlines break our house rules, so not used. |
| Navbars (Navigation category) | previews | - | Sticky bar that hides on scroll down and returns on scroll up, active-section marker. Ours is flat: no blur, no shadow. → `header-behaviour.tsx` |
| Hero Parallax, Scroll media expansion hero (Heroes category) | previews + descriptions | - | Scroll-linked depth on the hero picture. We use a small clamped parallax plus a pointer tilt, and a scroll-linked fan of the folder stack. |
