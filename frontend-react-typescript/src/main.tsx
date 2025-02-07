import { scan } from "react-scan"; // import this BEFORE react

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Providers from "./providers/index.tsx";

if (typeof window !== "undefined") {
  scan({
    enabled: true,

    trackUnnecessaryRenders: true,
    animationSpeed: "slow",
    showToolbar: true,
  });
}

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>
);
