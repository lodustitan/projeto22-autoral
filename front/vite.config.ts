import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

export default defineConfig({
  plugins: [
    react(),
  ],
  optimizeDeps: {
    include: ['linked-dep'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
  },
  esbuild: {
    loader: 'jsx',
  },
});