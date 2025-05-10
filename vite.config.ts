
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    cors: true,
    origin: "https://371e620a-e1ce-42d2-857f-77b09d64aff4.lovableproject.com",
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Adding optimized build settings for Netlify deployment
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
  },
}));
