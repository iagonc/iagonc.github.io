import { defineConfig } from 'vite';

// Serve only the published files. Missing routes must remain HTTP 404s.
export default defineConfig({
  appType: 'mpa',
  build: { outDir: 'dist/client' },
});
