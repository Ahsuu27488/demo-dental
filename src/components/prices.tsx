import { prices } from "@/content/clinic";
import Reveal from "./reveal";
import SplitHeading from "./split-heading";

// Tiles step up like a bar chart: the bigger the work, the taller the tile.
const tileColors = ["lichen", "moss", "forest"] as const;

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatFrom(from: number) {
  return from === 0 ? "Free" : `from ${fmt.format(from)}`;
}

export default function Prices() {
  return (
    <section id="prices" className="section-gap" aria-labelledby="prices-heading">
      <div className="page-container">
        <Reveal className="prices-grid">
          <div className="prices-head">
            <SplitHeading
              id="prices-heading"
              text={prices.heading}
              className="display-head step-head"
            />
            <p className="prices-note reveal-item reveal-delay-1">{prices.note}</p>
          </div>

          {prices.groups.map((group, i) => (
            <div
              key={group.id}
              className={`price-tile-wrap price-tile-${i} reveal-item reveal-delay-${i}`}
            >
              <div
                className={`price-tile field-${tileColors[i]}`}
                data-tilt="3"
              >
                <div className="price-tile-body">
                  <h3 className="price-group">{group.name}</h3>
                  <p className="display-head step-head price-summary">{group.summary}</p>
                  <ul className="price-list">
                    {group.services.map((service) => (
                      <li key={service.id}>
                        <span className="leaf-dot" aria-hidden="true" />
                        <span className="price-name">{service.name}</span>
                        <span className="price-value">{formatFrom(service.from)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#book" className="price-strip">
                  <span>Book {group.name.toLowerCase()}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
