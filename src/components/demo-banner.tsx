import { site } from "@/content/clinic";

export default function DemoBanner() {
  return (
    <div
      className="text-center py-2 px-4"
      style={{
        background: "var(--field-forest)",
        color: "var(--field-forest-ink)",
        fontSize: "15px",
      }}
    >
      {site.demoNote} (
      <a
        href={site.builderUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {site.builderLabel}
      </a>
      )
    </div>
  );
}
