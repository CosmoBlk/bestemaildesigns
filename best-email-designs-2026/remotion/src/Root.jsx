import { Composition } from "remotion";
import { EmailShowcase } from "./EmailShowcase";
import { OGCard } from "./OGCard";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="EmailShowcase"
        component={EmailShowcase}
        durationInFrames={150}
        fps={15}
        width={1080}
        height={1080}
      />
      <Composition
        id="EmailShowcaseWide"
        component={EmailShowcase}
        durationInFrames={150}
        fps={15}
        width={1200}
        height={675}
      />
      <Composition
        id="OGImage"
        component={OGCard}
        durationInFrames={1}
        fps={1}
        width={1200}
        height={630}
      />
      <Composition
        id="TwitterCard"
        component={OGCard}
        durationInFrames={1}
        fps={1}
        width={1200}
        height={675}
      />
      <Composition
        id="InstagramSquare"
        component={OGCard}
        durationInFrames={1}
        fps={1}
        width={1080}
        height={1080}
      />
    </>
  );
};
