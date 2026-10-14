import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { redirects, languagePaths } from './src/content/redirects.js';

// A tiny page that forwards the visitor straight away. Search engines are told
// not to index it and that the real page is the homepage.
function redirectPage(target, setLanguage) {
  const store = setLanguage
    ? `try { localStorage.setItem('sellora-lang', '${setLanguage}'); } catch (e) {}\n    `
    : '';
  return `<!DOCTYPE html>
<html lang="${setLanguage || 'fr'}">
<head>
  <meta charset="UTF-8">
  <title>Hello Sellora</title>
  <meta name="robots" content="noindex">
  <link rel="canonical" href="https://hellosellora.com/">
  <script>
    ${store}location.replace('${target}');
  </script>
  <meta http-equiv="refresh" content="0; url=${target}">
</head>
<body>
  <a href="${target}">Hello Sellora</a>
</body>
</html>
`;
}

// Writes the short address pages (dist/audit/index.html...) and the 404 page
// GitHub Pages shows for any address that doesn't exist. Lists: src/content/redirects.js
function staticPages() {
  return {
    name: 'sellora-static-pages',
    apply: 'build',
    generateBundle() {
      for (const [path, target] of Object.entries(redirects)) {
        this.emitFile({ type: 'asset', fileName: `${path.slice(1)}/index.html`, source: redirectPage(target) });
      }
      for (const lang of languagePaths) {
        this.emitFile({ type: 'asset', fileName: `${lang}/index.html`, source: redirectPage('/', lang) });
      }
      const notFound = readFileSync(new URL('./src/pages/404.html', import.meta.url), 'utf8')
        .replace('__REDIRECTS__', JSON.stringify(redirects))
        .replace('__LANGUAGES__', JSON.stringify(languagePaths));
      this.emitFile({ type: 'asset', fileName: '404.html', source: notFound });
    },
  };
}

// base: './' keeps asset paths relative, so the build works on GitHub Pages
// (with or without a custom domain) and on Netlify or Vercel.
export default defineConfig({
  plugins: [react(), staticPages()],
  base: './',
});
