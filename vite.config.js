import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps asset paths relative, so the build works on GitHub Pages
// (with or without a custom domain) and on Netlify or Vercel.
export default defineConfig({
  plugins: [react()],
  base: './',
});
