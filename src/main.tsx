import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Self-hosted so the site looks the same on every machine and no visitor data
// leaves the domain. The two variable fonts cover every weight in one file
// each; IBM Plex Mono has no variable build, so only the 400 it uses is loaded.
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/ibm-plex-sans";
import "@fontsource/ibm-plex-mono/400.css";

import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
