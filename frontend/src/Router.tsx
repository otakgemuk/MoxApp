import { useState } from "react";
import App from "./App";
import ContentGenerator from "./ContentGenerator";

const C = {
  bg: "#0a0e27",
  border: "#1a2332",
  gold: "#d4af37",
  green: "#4ade80",
  text: "#e8eaed",
  muted: "#8b92a9",
};

export default function Router() {
  const [activeTool, setActiveTool] = useState<"pricing" | "content">("pricing");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      {/* Navigation */}
      <nav style={{
        background: C.border,
        borderBottom: `1px solid ${C.border}`,
        padding: "12px 20px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}>
        <div style={{ fontSize: "18px", fontWeight: "600", color: C.gold }}>
          MightyOx Tools
        </div>
        <div style={{ display: "flex", gap: "12px", flex: 1 }}>
          <button
            onClick={() => setActiveTool("pricing")}
            style={{
              padding: "8px 16px",
              background: activeTool === "pricing" ? C.gold : "transparent",
              color: activeTool === "pricing" ? C.bg : C.text,
              border: `1px solid ${C.gold}`,
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            💰 Prop Firm Pricing
          </button>
          <button
            onClick={() => setActiveTool("content")}
            style={{
              padding: "8px 16px",
              background: activeTool === "content" ? C.gold : "transparent",
              color: activeTool === "content" ? C.bg : C.text,
              border: `1px solid ${C.gold}`,
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            ✍️ Content Generator
          </button>
        </div>
      </nav>

      {/* Tool Container */}
      <div style={{ padding: "20px" }}>
        {activeTool === "pricing" && <App />}
        {activeTool === "content" && <ContentGenerator />}
      </div>
    </div>
  );
}
