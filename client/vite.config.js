import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "./",
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000/", // Replace with your backend server URL
      "/shop": "http://localhost:3000/",
    },
  },
});
