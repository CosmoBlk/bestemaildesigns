import { AbsoluteFill } from "remotion";

export const OGCard = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
            color: "#888",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Hand-Curated Collection
        </div>
        <div
          style={{
            fontSize: 64,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          57 Best
        </div>
        <div
          style={{
            fontSize: 64,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          Email Designs
        </div>
        <div
          style={{
            fontSize: 42,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 300,
            color: "#666",
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          of 2026
        </div>
        <div
          style={{
            fontSize: 16,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 400,
            color: "#555",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Human Taste &bull; Free Figma File &bull; nitrosend.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
