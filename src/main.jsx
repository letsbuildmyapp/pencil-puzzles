import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Viewport: prevent pinch-zoom on mobile
const viewport = document.querySelector("meta[name=viewport]") || document.createElement("meta");
viewport.name = "viewport";
viewport.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
document.head.appendChild(viewport);

document.addEventListener("gesturestart", e => e.preventDefault(), { passive: false });
document.addEventListener("gesturechange", e => e.preventDefault(), { passive: false });
document.addEventListener("gestureend", e => e.preventDefault(), { passive: false });
document.addEventListener("touchmove", e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });

// Google Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap";
document.head.appendChild(fontLink);

createRoot(document.getElementById("root")).render(<App />);
