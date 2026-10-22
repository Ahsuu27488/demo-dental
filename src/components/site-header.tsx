import { nav, hero } from "@/content/clinic";

export default function SiteHeader() {
  return (
    <header className="page-container flex items-center justify-between py-4">
      <a href="#" className="flex items-center gap-2 no-underline">
        <span
          className="inline-block w-3.5 h-3.5"
          style={{
            borderRadius: "7px 0",
            background: "var(--accent)",
          }}
          aria-hidden="true"
        />
        <span className="font-bold header-name" style={{ color: "var(--ink)" }}>
          Fernwick Dental
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-6" aria-label="Main">
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="no-underline"
            style={{
              fontSize: "var(--step-body)",
              color: "var(--ink)",
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        href="#book"
        className="btn-leaf header-cta"
        style={{
          background: "var(--accent)",
          color: "var(--accent-ink)",
        }}
      >
        {hero.cta}
      </a>
    </header>
  );
}
