import Image from "next/image";
import { contact, hero, photos } from "@/content/clinic";

// Folder colours, back to front. The front folder is the booking one.
const folderColors = ["lichen", "rain", "moss", "forest", "accent"] as const;

// Tab positions, staggered left to right (percent of the stack width).
const tabPositions = [4, 22, 40, 58, 76];

// No entrance animation here: the headline and photo are the LCP and must paint at once.
export default function Hero() {
  const photo = photos["tall-trunks"];

  return (
    <section className="hero">
      <div className="page-container">
        <div className="hero-top">
          <div className="hero-copy">
            <h1 className="display-head hero-title">{hero.headline}</h1>
            <p className="hero-sub">{hero.sub}</p>
          </div>
          <div className="hero-photo leaf-xl">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 768px) 38vw, 100vw"
              className="hero-drift object-cover"
            />
          </div>
        </div>

        <nav aria-label="Sections" className="folder-stack">
          {hero.folders.map((folder, i) => {
            const isFront = i === hero.folders.length - 1;
            return (
              <div
                key={folder.id}
                className={`folder folder-${folderColors[i]}${isFront ? " folder-front" : ""}`}
                style={{ zIndex: i + 1 }}
              >
                <a
                  href={`#${folder.id}`}
                  className="folder-tab"
                  style={{ ["--x" as string]: tabPositions[i] }}
                >
                  {folder.label}
                </a>
                {isFront && (
                  <div className="folder-front-body">
                    <a href="#book" className="btn-leaf btn-light">
                      {hero.cta}
                    </a>
                    <a href={contact.phoneHref} className="folder-call">
                      or call {contact.phoneDisplay}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
