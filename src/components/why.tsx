import Image from "next/image";
import { why, photos } from "@/content/clinic";
import Reveal from "./reveal";

export default function Why() {
  return (
    <section
      aria-labelledby="why-heading"
      className="section-gap"
      style={{ background: "var(--bg)" }}
    >
      <div className="page-container">
        <Reveal>
          <h2 id="why-heading" className="sr-only">
            {why.heading}
          </h2>

          {/* Statement paragraph */}
          <p
            className="reveal-item"
            style={{
              fontSize: "clamp(1.3125rem, 0.9rem + 1.7vw, 2.25rem)",
              fontWeight: 500,
              lineHeight: 1.2,
              color: "var(--ink)",
              maxWidth: "92%",
            }}
          >
            {why.parts.map((part, i) => {
              const photo = photos[part.image as keyof typeof photos];
              return (
                <span key={i}>
                  {part.text}{" "}
                  <span
                    style={{
                      display: "inline-block",
                      height: "1em",
                      width: "clamp(1.5em, 1.5em + 0.5vw, 1.9em)",
                      borderRadius: "0.5em 0",
                      overflow: "hidden",
                      position: "relative",
                      verticalAlign: "-0.12em",
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={1600}
                      height={1000}
                      sizes="120px"
                      className="object-cover"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </span>{" "}
                </span>
              );
            })}
          </p>

          <div className="why-row">
          <div className="why-photo leaf-xl reveal-item reveal-delay-1">
            <Image
              src={photos["moss-trail"].src}
              alt={photos["moss-trail"].alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {/* Support text + CTA */}
          <div className="why-support reveal-item reveal-delay-2">
            <p style={{ fontSize: "var(--step-body)", color: "var(--ink)" }}>
              {why.support}
            </p>
            <a
              href="#prices"
              className="btn-leaf"
              style={{
                background: "var(--accent)",
                color: "var(--accent-ink)",
                marginTop: "24px",
              }}
            >
              See prices
            </a>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
