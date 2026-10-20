import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { redirects, languagePaths } from './src/content/redirects.js';
import { legalPages } from './src/content/site.js';

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

// Each legal page (/mentions-legales/...) gets its own copy of the built
// index.html, so the address works directly. The app reads the address and shows
// the right page. Paths in the copy go one folder up, and the canonical address
// points at the page itself.
function legalPageFiles() {
  return {
    name: 'sellora-legal-pages',
    apply: 'build',
    closeBundle() {
      const dist = new URL('./dist/', import.meta.url);
      const html = readFileSync(new URL('index.html', dist), 'utf8');
      for (const path of Object.values(legalPages)) {
        const url = `https://hellosellora.com${path}`;
        const page = html
          .replace(/(href|src|content)="\.\//g, '$1="../')
          .replace('<link rel="canonical" href="https://hellosellora.com/">', `<link rel="canonical" href="${url}">`)
          .replace('<meta property="og:url" content="https://hellosellora.com/">', `<meta property="og:url" content="${url}">`);
        const dir = new URL(`.${path}`, dist);
        mkdirSync(dir, { recursive: true });
        writeFileSync(new URL('index.html', dir), page);
      }
    },
  };
}

// base: './' keeps asset paths relative, so the build works on GitHub Pages
// (with or without a custom domain) and on Netlify or Vercel.
export default defineConfig({
  plugins: [react(), staticPages(), legalPageFiles()],
  base: './',
});
