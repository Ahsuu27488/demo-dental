"use client";

import { useEffect } from "react";

// Pointer and scroll behaviours, wired by data attribute so the sections stay
// server components. Techniques adapted (not copied) from MIT sources studied on
// 21st.dev: spell-ui TiltCard (tilt maths) and motion-primitives Magnetic
// (distance fall-off). See docs/21st-study.md.
//
//   data-tilt="4"         3D tilt towards the pointer, max N degrees (fine pointers only)
//   data-magnetic         pulled up to 6px towards a nearby pointer (fine pointers only)
//   data-parallax="-0.05" scroll parallax, clamped to ±40px
//   data-scrub            sets --p (0..1): progress of the element through the viewport
//
// Nothing runs under prefers-reduced-motion; CSS then shows every final state.

const MAX_PULL = 6;
const PULL_RANGE = 90;

export default function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    // --- Tilt -------------------------------------------------------------
    if (finePointer) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const limit = Number(el.dataset.tilt) || 5;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          el.style.transition = "transform 120ms linear";
          el.style.transform = `perspective(1000px) rotateX(${((0.5 - py) * limit * 2).toFixed(2)}deg) rotateY(${((px - 0.5) * limit * 2).toFixed(2)}deg)`;
        };
        const leave = () => {
          el.style.transition = "transform 500ms var(--ease-out-expo)";
          el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    // --- Magnetic ---------------------------------------------------------
    if (finePointer) {
      const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
      let frame = 0;
      let lastX = -1e4;
      let lastY = -1e4;
      const update = () => {
        frame = 0;
        for (const el of magnets) {
          const r = el.getBoundingClientRect();
          const dx = lastX - (r.left + r.width / 2);
          const dy = lastY - (r.top + r.height / 2);
          // Distance from the button's edge, not its centre, so big buttons work too.
          const edge = Math.max(0, Math.hypot(Math.max(Math.abs(dx) - r.width / 2, 0), Math.max(Math.abs(dy) - r.height / 2, 0)));
          if (edge < PULL_RANGE) {
            const k = 1 - edge / PULL_RANGE;
            const tx = Math.max(-MAX_PULL, Math.min(MAX_PULL, (dx / (r.width / 2)) * MAX_PULL * k));
            const ty = Math.max(-MAX_PULL, Math.min(MAX_PULL, (dy / (r.height / 2)) * MAX_PULL * k));
            el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
            el.dataset.pulled = "1";
          } else if (el.dataset.pulled) {
            el.style.transform = "";
            delete el.dataset.pulled;
          }
        }
      };
      const onMove = (e: PointerEvent) => {
        lastX = e.clientX;
        lastY = e.clientY;
        if (!frame) frame = requestAnimationFrame(update);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        cancelAnimationFrame(frame);
      });
    }

    // --- Parallax + scrub (scroll-linked) ----------------------------------
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const scrubs = Array.from(document.querySelectorAll<HTMLElement>("[data-scrub]"));
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        schedule();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    [...parallax, ...scrubs].forEach((el) => io.observe(el));

    let scrollFrame = 0;
    const tick = () => {
      scrollFrame = 0;
      const vh = window.innerHeight;
      for (const el of parallax) {
        if (!visible.has(el)) continue;
        const r = el.getBoundingClientRect();
        const offset = (r.top + r.height / 2 - vh / 2) * (Number(el.dataset.parallax) || 0);
        const y = Math.max(-40, Math.min(40, offset));
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      }
      for (const el of scrubs) {
        if (!visible.has(el)) continue;
        const r = el.getBoundingClientRect();
        // 0 when the top enters at the bottom; 1 when the bottom passes 30% from the top.
        const p = (vh - r.top) / (vh - vh * 0.3 + r.height);
        el.style.setProperty("--p", Math.max(0, Math.min(1, p)).toFixed(3));
      }
    };
    function schedule() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(tick);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    document.documentElement.classList.add("motion-on");
    schedule();
    cleanups.push(() => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(scrollFrame);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
