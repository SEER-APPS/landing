import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Seer — secure messaging and everyday services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 55%, #111111 100%)",
          color: "#f5f5f5",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#f5f5f5",
              color: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            S
          </div>
          Seer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              maxWidth: 900,
            }}
          >
            Fast. Secure. Convenient.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#a3a3a3",
              maxWidth: 820,
            }}
          >
            Private chats, airtime, data, and everyday services — in one app.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#737373",
            letterSpacing: "0.02em",
          }}
        >
          seer.app
        </div>
      </div>
    ),
    { ...size },
  );
}
