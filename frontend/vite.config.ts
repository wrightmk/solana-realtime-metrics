/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // don't need to import it, describe,test etc
    environment: "jsdom", // defaults to node otherwise
    css: true, // test to be visible etc
    setupFiles: "./src/test/setup.ts", // setup file for jest
  },
});
