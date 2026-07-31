import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// The fonts are declared in styles/base/fonts.css and preloaded from index.html.
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
