import Image from "next/image";
import { photos, visit as visitData } from "@/content/clinic";
import Reveal from "./reveal";
import SplitHeading from "./split-heading";

// Seeded pseudo-random numbers (Mulberry32) so server and client draw the same leaves.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Leaf = {
  x: number;
  y: number;
  tone: 0 | 1 | 2;
  dx: number;
  dy: number;
  dr: number;
};

// Leaves drawn in a "long × short" box: along = the reading direction
// (left→right on desktop, top→bottom on phones), across = the other axis.
function layout(along: number, across: number, size: number): Leaf[] {
  const rng = mulberry32(7);
  const third = along / 3;
  const leaves: Leaf[] = [];
  // Talk: worries arrive loosely scattered, two pale tones.
  for (let i = 0; i < 48; i++) {
    leaves.push({
      x: rng() * (third - size * 2) + size * 0.5,
      y: rng() * (across - size * 2) + size * 0.5,
      tone: rng() > 0.5 ? 0 : 1,
      dx: Math.round((rng() * 2 - 1) * 60),
      dy: Math.round((rng() * 2 - 1) * 60),
      dr: Math.round((rng() * 2 - 1) * 40),
    });
  }
  // Look: pulled into a tight ribbon three leaves high.
  const ribbonTop = across / 2 - size * 1.75;
  const perRow = Math.min(16, Math.floor((third - size) / (size * 1.3)));
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < perRow; i++) {
      leaves.push({
        x: third + size * 0.5 + i * ((third - size * 2) / (perRow - 1)) + (rng() - 0.5) * size * 0.3,
        y: ribbonTop + row * size * 1.25,
        tone: 1,
        dx: Math.round((rng() * 2 - 1) * 60),
        dy: Math.round((rng() * 2 - 1) * 60),
        dr: Math.round((rng() * 2 - 1) * 40),
      });
    }
  }
  // Plan: fanned out into neat rows.
  const cols = 7;
  const rows = 6;
  const gapX = (third - size * 2) / (cols - 1);
  const gapY = (across - size * 2) / (rows - 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      leaves.push({
        x: third * 2 + size + c * gapX,
        y: size * 0.5 + r * gapY,
        tone: 2,
        dx: Math.round((rng() * 2 - 1) * 60),
        dy: Math.round((rng() * 2 - 1) * 60),
        dr: Math.round((rng() * 2 - 1) * 40),
      });
    }
  }
  return leaves;
}

// One leaflet: a square with two opposite corners rounded.
function leafPath(s: number) {
  const r = s * 0.62;
  return `M0 ${s}V${r}A${r} ${r} 0 0 1 ${r} 0H${s}V${s - r}A${r} ${r} 0 0 1 ${s - r} ${s}Z`;
}

const fills = ["var(--field-rain)", "var(--field-forest-ink)", "var(--field-moss)"];
const SIZE = 13;
const wide = layout(900, 200, SIZE);
const tall = layout(420, 300, SIZE);
const leaf = leafPath(SIZE);

export default function Visit() {
  return (
    <section id="visit" className="section-gap field-forest" aria-labelledby="visit-heading">
      <div className="page-container">
        <Reveal className="visit-grid">
          <div className="visit-head">
            <SplitHeading
              id="visit-heading"
              text={visitData.heading}
              className="display-head step-head"
            />
            <p className="visit-intro reveal-item reveal-delay-1">{visitData.intro}</p>
          </div>
          <div className="visit-photo leaf-xl reveal-item reveal-delay-2">
            <Image
              src={photos["fog-bridge"].src}
              alt={photos["fog-bridge"].alt}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="visit-diagram reveal-item reveal-delay-2" data-scrub aria-hidden="true">
            <svg viewBox="0 0 900 200" className="visit-svg-wide">
              {wide.map((l, i) => (
                <g
                  key={i}
                  className="leaf"
                  style={{
                    ["--dx" as string]: l.dx,
                    ["--dy" as string]: l.dy,
                    ["--dr" as string]: l.dr,
                  }}
                >
                  <path
                    d={leaf}
                    transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)})`}
                    fill={fills[l.tone]}
                  />
                </g>
              ))}
            </svg>
            <svg viewBox="0 0 300 420" className="visit-svg-tall">
              {tall.map((l, i) => (
                <g
                  key={i}
                  className="leaf"
                  style={{
                    ["--dx" as string]: l.dx,
                    ["--dy" as string]: l.dy,
                    ["--dr" as string]: l.dr,
                  }}
                >
                  <path
                    d={leaf}
                    transform={`translate(${l.y.toFixed(1)} ${l.x.toFixed(1)})`}
                    fill={fills[l.tone]}
                  />
                </g>
              ))}
            </svg>
          </div>

          <ol className="visit-steps">
            {visitData.steps.map((step, i) => (
              <li key={step.name} className={`reveal-item reveal-delay-${i}`}>
                <p className="visit-step-name">{step.name}</p>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
