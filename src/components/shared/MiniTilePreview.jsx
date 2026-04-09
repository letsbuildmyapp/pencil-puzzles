import { useEffect, useRef, useState } from "react";
import { C } from "../../constants";

export default function MiniTilePreview({ tile, animateReveal }) {
  const flat = tile.flat();
  const [animKey, setAnimKey] = useState(0);
  const prevReveal = useRef(false);

  useEffect(() => {
    if (animateReveal && !prevReveal.current) {
      setAnimKey(k => k + 1);
    }
    prevReveal.current = animateReveal;
  }, [animateReveal]);

  if (!flat.some(Boolean)) return null;

  // Only ink cells get staggered; stagger by position in the flat array
  let inkIndex = 0;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gridTemplateRows: "repeat(5,1fr)", width: "100%", height: "100%" }}>
      {flat.map((v, i) => {
        const delay = v && animateReveal ? inkIndex++ * 38 : 0;
        return (
          <div
            key={`${i}-${animKey}`}
            style={{
              background: v ? C.pencil : "transparent",
              animation: v && animateReveal ? `cellReveal 0.22s ease forwards` : undefined,
              animationDelay: v && animateReveal ? `${delay}ms` : undefined,
              animationFillMode: "both",
              opacity: v && animateReveal ? 0 : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
