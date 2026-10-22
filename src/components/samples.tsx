"use client";

import { useState, useRef, useEffect } from "react";
import { samples } from "@/content/clinic";
import SplitHeading from "./split-heading";
import Reveal from "./reveal";

export default function Samples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPausedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let inView = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inView = entry.isIntersecting;
        }
      },
      { threshold: 0.2 },
    );
    io.observe(section);

    const timer = setInterval(() => {
      if (inView && !isPausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % samples.items.length);
      }
    }, 7000);

    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      nextIndex = (index + 1) % samples.items.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      nextIndex = (index - 1 + samples.items.length) % samples.items.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = samples.items.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="samples"
      aria-labelledby="samples-heading"
      className="section-gap field-lichen"
      onMouseEnter={() => {
        isPausedRef.current = true;
      }}
      onMouseLeave={() => {
        isPausedRef.current = false;
      }}
      onFocusCapture={() => {
        isPausedRef.current = true;
      }}
      onBlurCapture={() => {
        isPausedRef.current = false;
      }}
    >
      <div className="page-container">
        <Reveal className="samples-grid">
          <div className="samples-left">
            <SplitHeading
              id="samples-heading"
              text={samples.heading}
              className="display-head step-head"
            />
            <p className="samples-note">{samples.note}</p>

            <div role="tablist" aria-label="Sample reviews" className="samples-tablist">
              {samples.items.map((item, i) => {
                const isSelected = activeIndex === i;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`sample-tab-${i}`}
                    role="tab"
                    type="button"
                    aria-label={item.who}
                    aria-selected={isSelected}
                    aria-controls={`sample-panel-${i}`}
                    tabIndex={isSelected ? 0 : -1}
                    className="samples-tab"
                    onClick={() => setActiveIndex(i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                  >
                    <span className="leaf-dot samples-tab-dot" aria-hidden="true" />
                    <span className="samples-tab-who">{item.who}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="samples-right">
            <div className="samples-panels">
              {samples.items.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <blockquote
                    key={item.id}
                    id={`sample-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`sample-tab-${i}`}
                    aria-hidden={!isActive}
                    className={`sample-panel sample-quote${isActive ? " is-active" : ""}`}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      className="sample-quote-leaf"
                    >
                      <path
                        d="M0 48V30A30 30 0 0 1 30 0H48V18A30 30 0 0 1 18 48Z"
                        fill="var(--accent)"
                      />
                    </svg>
                    <p className="sample-quote-text">“{item.quote}”</p>
                    <footer className="sample-quote-author">— {item.who}</footer>
                  </blockquote>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
