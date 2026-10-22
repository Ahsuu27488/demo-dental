import { site, contact, footer, photos, hero } from "@/content/clinic";

// The footer closes on the page's one motif, enlarged: a fern frond built from
// leaflets (squares with two opposite corners rounded) along a stem.
function leaf(x: number, y: number, w: number, h: number, r: number) {
  return `M${x} ${y + h}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}H${x + w}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}Z`;
}

function FernFrond() {
  const pairs = 15;
  const stemY = 150;
  const leaflets = Array.from({ length: pairs }, (_, i) => {
    const t = i / pairs;
    const h = 128 * (1 - t * 0.78); // leaflet length shrinks towards the tip
    const w = Math.max(18, h * 0.42);
    const x = 24 + i * 76;
    return { x, w, h, r: w * 0.85 };
  });
  return (
    <div data-scrub>
      <svg viewBox="0 0 1200 300" className="frond" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <rect x="0" y={stemY - 3} width="1176" height="6" fill="var(--field-moss)" />
        {leaflets.map((l, i) => (
          <g key={i} className="frond-pair" style={{ ["--i" as string]: i }}>
            <path
              d={leaf(l.x, stemY - 7 - l.h, l.w, l.h, l.r)}
              fill={i % 2 ? "var(--accent)" : "var(--field-moss)"}
            />
            <path
              d={leaf(l.x + 22, stemY + 7, l.w, l.h, l.r)}
              fill={i % 2 ? "var(--field-moss)" : "var(--accent)"}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

const credits = [...new Set(Object.values(photos).map((p) => p.credit))];

export default function SiteFooter() {
  return (
    <footer className="site-footer field-forest">
      <div className="page-container">
        <FernFrond />

        <div className="footer-cols">
          <nav aria-label="Footer">
            <ul className="footer-links">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-contact">
            <p className="footer-name">{site.name}</p>
            <p>
              <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
            </p>
            <p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p>{contact.area}</p>
          </div>
        </div>

        <div className="footer-notes">
          <p className="footer-demo">
            {site.demoNote} (
            <a href={site.builderUrl} target="_blank" rel="noopener noreferrer">
              {site.builderLabel}
            </a>
            )
          </p>
          <p>
            Photos: {credits.join(", ")} on{" "}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">
              Unsplash
            </a>
            . Map ©{" "}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">
              OpenStreetMap contributors
            </a>
            .
          </p>
        </div>

        <div className="footer-last">
          <p>© 2026 Fernwick Dental (fictional)</p>
          <a href="#book" className="btn-leaf btn-accent">
            {hero.cta}
          </a>
        </div>
      </div>
    </footer>
  );
}
