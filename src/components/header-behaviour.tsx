"use client";

import { useEffect } from "react";

// Sticky header: slides away while scrolling down, back on scroll up (never in
// the first 200px), and marks the nav link of the section in view. Navbar
// pattern studied on 21st.dev, kept flat: no blur, no shadow.
export default function HeaderBehaviour() {
  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const hide = y > 200 && y > lastY + 4;
        const show = y < lastY - 4 || y <= 200;
        if (hide) header.classList.add("header-hidden");
        else if (show) header.classList.remove("header-hidden");
        lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Keyboard users tabbing into the header always see it.
    const onFocus = () => header.classList.remove("header-hidden");
    header.addEventListener("focusin", onFocus);

    const links = Array.from(header.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((a) => {
      const target = document.querySelector(a.getAttribute("href") ?? "");
      if (target) io.observe(target);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocus);
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  return null;
}
