import Image from "next/image";
import { hours, contact, photos } from "@/content/clinic";
import Reveal from "./reveal";

export default function FindUs() {
  const band = photos["cloud-hills"];

  return (
    <section id="find-us" className="section-gap" aria-labelledby="find-us-heading">
      <div className="page-container">
        <Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "clamp(32px, 4vw, 64px)",
            }}
            className="findus-grid"
          >
            {/* Left column */}
            <div className="reveal-item">
              <h2
                id="find-us-heading"
                className="display-head"
                style={{
                  fontSize: "var(--step-head)",
                  color: "var(--ink)",
                }}
              >
                {hours.heading}
              </h2>

              <table
                style={{
                  width: "100%",
                  maxWidth: "420px",
                  marginTop: "24px",
                  borderCollapse: "collapse",
                  fontSize: "var(--step-body)",
                }}
              >
                <tbody>
                  {hours.rows.map((row, i) => (
                    <tr
                      key={row.day}
                      style={{
                        background:
                          i % 2 === 0 ? "var(--surface)" : "transparent",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 16px",
                          fontWeight: 500,
                        }}
                      >
                        {row.day}
                      </td>
                      <td
                        style={{
                          padding: "10px 16px",
                          textAlign: "right",
                        }}
                      >
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p
                style={{
                  marginTop: "24px",
                  fontSize: "var(--step-body)",
                  color: "var(--ink)",
                }}
              >
                {hours.emergency}
              </p>

              <div style={{ marginTop: "24px" }}>
                <p style={{ fontSize: "var(--step-body)" }}>{contact.area}</p>
                <p
                  style={{
                    fontSize: "var(--step-small)",
                    color: "var(--muted)",
                    marginTop: "4px",
                  }}
                >
                  {contact.addressNote}
                </p>
                <p style={{ marginTop: "12px" }}>
                  <a href={contact.phoneHref} style={{ color: "var(--ink)" }}>
                    {contact.phoneDisplay}
                  </a>
                </p>
                <p style={{ marginTop: "4px" }}>
                  <a
                    href={`mailto:${contact.email}`}
                    style={{ color: "var(--ink)" }}
                  >
                    {contact.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Right column: map */}
            <div className="reveal-item reveal-delay-1">
              <div
                className="leaf-xl"
                style={{
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  background: "var(--surface)",
                }}
              >
                <iframe
                  src={contact.mapEmbed}
                  title="Map of the Pioneer Courthouse Square area, downtown Portland"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                  }}
                />
              </div>
              <p style={{ marginTop: "8px" }}>
                <a
                  href={contact.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "var(--step-small)",
                    color: "var(--accent)",
                  }}
                >
                  Open the map
                </a>
              </p>
            </div>
          </div>

          {/* City park photo band */}
          <div
            className="reveal-item reveal-delay-2"
            style={{
              marginTop: "clamp(48px, 6vw, 80px)",
              position: "relative",
              width: "100%",
              aspectRatio: "21 / 9",
              borderRadius: "var(--leaf-xl) 0",
              overflow: "hidden",
            }}
          >
            <Image
              src={band.src}
              alt={band.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .findus-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
