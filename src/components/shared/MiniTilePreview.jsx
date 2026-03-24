import { C } from "../../constants";

export default function MiniTilePreview({ tile }) {
  const flat = tile.flat();
  if (!flat.some(Boolean)) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gridTemplateRows: "repeat(5,1fr)", width: "100%", height: "100%", padding: 2 }}>
      {flat.map((v, i) => (
        <div key={i} style={{ background: v ? C.pencil : "transparent", borderRadius: 1, transition: "background 0.2s" }} />
      ))}
    </div>
  );
}
