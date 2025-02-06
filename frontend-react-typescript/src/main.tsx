import { scan } from "react-scan"; // import this BEFORE react

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "./providers/index.tsx";

if (typeof window !== "undefined") {
  scan({
    enabled: true,
    log: true,
    // logs render info to console (default: false)
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
