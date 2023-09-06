import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// dans package.json, "homepage": "/kijiji-monitoring/#", sources: https://stackoverflow.com/questions/71984401/react-router-not-working-with-github-pages
// base: "/kijiji-monitoring" : pour le hosting sur github pages, sources: https://dev.to/rashidshamloo/deploying-vite-react-app-to-github-pages-35hf

// https://vitejs.dev/config/
export default defineConfig({
  base: "/kijiji-monitoring",
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
