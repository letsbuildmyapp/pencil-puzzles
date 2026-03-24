import { C } from "../../constants";

export default function AuthInput({ label, type = "text", value, onChange, placeholder, error }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, width: "100%" }}>
      <label style={{ fontSize: 9, color: C.muted, fontFamily: "'Courier Prime',monospace", letterSpacing: 3, textTransform: "uppercase" }}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: "12px 14px", background: C.paper, border: `1.5px solid ${error ? C.wrong : C.line}`, borderRadius: 8, fontFamily: "'Courier Prime',monospace", fontSize: 14, color: C.ink, outline: "none", transition: "border-color 0.15s" }}
        onFocus={e => e.target.style.borderColor = C.accent}
        onBlur={e => e.target.style.borderColor = error ? C.wrong : C.line}
      />
      {error && <div style={{ fontSize: 10, color: C.wrong, fontFamily: "'Courier Prime',monospace" }}>{error}</div>}
    </div>
  );
}
