import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Sequence,
  spring,
} from "remotion";

// Placeholder screenshots - replace with real email screenshots
const emails = [
  { brand: "MONA", file: "mona.jpg", color: "#000000" },
  { brand: "PANGAIA", file: "pangaia.jpg", color: "#1a1a1a" },
  { brand: "Lucy Folk", file: "lucyfolk.jpg", color: "#e8d5b7" },
  { brand: "theSkimm", file: "theskimm.jpg", color: "#f5f0eb" },
  { brand: "Stripe", file: "stripe.jpg", color: "#635bff" },
  { brand: "Superhuman", file: "superhuman.jpg", color: "#ffffff" },
  { brand: "Linear", file: "linear.jpg", color: "#5E6AD2" },
  { brand: "Liquid Death", file: "liquiddeath.jpg", color: "#000000" },
  { brand: "Glossier", file: "glossier.jpg", color: "#f5e6e0" },
  { brand: "Allbirds", file: "allbirds.jpg", color: "#e8ded2" },
  { brand: "Figma", file: "figma.jpg", color: "#1e1e1e" },
  { brand: "Duolingo", file: "duolingo.jpg", color: "#58cc02" },
];

const TitleCard = ({ frame, fps }) => {
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const subtitleSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const tagSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

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
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
          opacity: titleSpring,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
            color: "#888",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          The
        </div>
        <div
          style={{
            fontSize: 72,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 10,
          }}
        >
          57 Best
        </div>
        <div
          style={{
            fontSize: 72,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 10,
          }}
        >
          Email Designs
        </div>
        <div
          style={{
            fontSize: 48,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 300,
            color: "#666",
            lineHeight: 1.1,
            opacity: subtitleSpring,
            transform: `translateY(${interpolate(subtitleSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          of 2026
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: tagSpring,
          transform: `translateY(${interpolate(tagSpring, [0, 1], [10, 0])}px)`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 400,
            color: "#555",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Hand-Curated &bull; Free Figma File
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EmailCard = ({ email, frame, fps, index, totalEmails }) => {
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 200 },
  });

  const scale = interpolate(enterSpring, [0, 1], [0.85, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: email.color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Email screenshot placeholder - replace with staticFile when screenshots are ready */}
      <div
        style={{
          width: "85%",
          height: "85%",
          backgroundColor: "#fff",
          borderRadius: 12,
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
          opacity,
          overflow: "hidden",
        }}
      >
        {/* When screenshots are available, use: <Img src={staticFile(email.file)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> */}
        <div
          style={{
            fontSize: 36,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 700,
            color: "#333",
          }}
        >
          {email.brand}
        </div>
      </div>
      {/* Brand label */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 40,
          fontSize: 16,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 600,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: 2,
          textTransform: "uppercase",
          opacity: enterSpring,
        }}
      >
        {email.brand}
      </div>
      {/* Counter */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 40,
          fontSize: 14,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 400,
          color: "rgba(255,255,255,0.5)",
          opacity: enterSpring,
        }}
      >
        {index + 1} / 57
      </div>
    </AbsoluteFill>
  );
};

export const EmailShowcase = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Title card: first 30 frames (2 seconds)
  const titleDuration = 30;
  // Email flick section: remaining frames
  const flickStart = titleDuration;
  // End card: last 25 frames
  const endCardStart = durationInFrames - 25;
  const flickDuration = endCardStart - flickStart;

  // Each email shows for ~8 frames at 15fps (~0.5s each), getting faster
  const framesPerEmail = [];
  for (let i = 0; i < emails.length; i++) {
    // Start slow, get faster
    const speed = interpolate(i, [0, emails.length - 1], [10, 4]);
    framesPerEmail.push(Math.round(speed));
  }

  // Calculate cumulative start frames
  const emailStartFrames = [];
  let cumulative = flickStart;
  for (let i = 0; i < emails.length; i++) {
    emailStartFrames.push(cumulative);
    cumulative += framesPerEmail[i];
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {/* Title Card */}
      {frame < flickStart && <TitleCard frame={frame} fps={fps} />}

      {/* Email Flick-Through */}
      {emails.map((email, i) => {
        const start = emailStartFrames[i];
        const duration = framesPerEmail[i];
        if (frame >= start && frame < (i < emails.length - 1 ? emailStartFrames[i + 1] : endCardStart)) {
          return (
            <EmailCard
              key={i}
              email={email}
              frame={frame - start}
              fps={fps}
              index={i}
              totalEmails={emails.length}
            />
          );
        }
        return null;
      })}

      {/* End Card */}
      {frame >= endCardStart && (
        <TitleCard frame={frame - endCardStart} fps={fps} />
      )}
    </AbsoluteFill>
  );
};
