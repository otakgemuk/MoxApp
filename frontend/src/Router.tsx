import App from "./App";
import { Colors } from "./lib/colors";

const C = Colors;

export default function Router() {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text }}>
      {/* Content */}
      <div style={{ padding: "20px" }}>
        <App />
      </div>
    </div>
  );
}
