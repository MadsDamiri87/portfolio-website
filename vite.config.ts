import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Split React out so app-code changes do not invalidate the vendor chunk.
    rollupOptions: {
      output: {
        manualChunks: (id) =>
          id.includes("node_modules/react") || id.includes("node_modules/scheduler")
            ? "react"
            : undefined,
      },
    },
  },
});
