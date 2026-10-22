"use client";

import { useState } from "react";
import { faq } from "@/content/clinic";
import SplitHeading from "./split-heading";
import Reveal from "./reveal";

const cardColors = ["lichen", "rain", "moss"] as const;

// Index cards filed in a drawer: each tab steps right, one card open at a time.
// Without JavaScript every answer stays visible (collapsing needs html.js).
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-gap" aria-labelledby="faq-heading">
      <div className="page-container">
        <Reveal className="faq-wrap">
          <SplitHeading
            id="faq-heading"
            text={faq.heading}
            className="display-head step-head"
          />
          <div className="faq-stack">
            {faq.items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={item.topic}
                  className={`faq-card field-${cardColors[i % cardColors.length]}${isOpen ? " open" : ""}`}
                  style={{ zIndex: i + 1, ["--i" as string]: i }}
                >
                  <span className="faq-tab" aria-hidden="true">
                    {item.topic}
                  </span>
                  <h3 className="faq-q">
                    <button
                      id={`faq-btn-${i}`}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    >
                      <span className="faq-q-text">{item.q}</span>
                      <span className="leaf-dot faq-toggle" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className="faq-answer"
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
