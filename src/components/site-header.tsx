import { nav, hero } from "@/content/clinic";
import HeaderBehaviour from "./header-behaviour";

export default function SiteHeader() {
  return (
    <header id="site-header" className="site-header">
      <div className="page-container header-row">
        <a href="#" className="header-brand">
          <span className="leaf-dot header-leaf" aria-hidden="true" />
          <span className="header-name">Fernwick Dental</span>
        </a>

        <nav className="header-nav" aria-label="Main">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="header-link">
              {item.label}
              <span className="leaf-dot header-marker" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <a href="#book" className="btn-leaf btn-accent header-cta" data-magnetic>
          {hero.cta}
        </a>
      </div>
      <HeaderBehaviour />
    </header>
  );
}
