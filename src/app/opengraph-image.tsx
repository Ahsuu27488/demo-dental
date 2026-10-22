import { ImageResponse } from "next/og";

export const alt = "Fernwick Dental — Demo website · Portland, Oregon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#143525",
          color: "#e9f3eb",
          padding: "60px",
        }}
      >
        {/* Decorative leaves */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "16px 0",
              background: "#a6c290",
            }}
          />
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "12px 0",
              background: "#a6c290",
            }}
          />
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "8px 0",
              background: "#a6c290",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "80px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            textAlign: "center",
          }}
        >
          FERNWICK DENTAL
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "28px",
            marginTop: "24px",
            opacity: 0.8,
          }}
        >
          Demo website · Portland, Oregon
        </div>
      </div>
    ),
    { ...size },
  );
}
