# Sellora

Landing page for Sellora, a French Amazon agency helping French brands launch and grow on Amazon.fr.

Built with React and Vite.

## Getting started

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install     # once, after cloning
npm run dev     # local dev server with live reload (http://localhost:5173)
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

## Project structure

```
sellora/
├── index.html                  # HTML shell (fonts, icons, link preview tags)
├── public/                     # Favicons, app icons, og-image.png (link preview)
├── vite.config.js
└── src/
    ├── main.jsx                # Entry point
    ├── App.jsx                 # Page layout: which sections, in what order
    ├── components/             # One file per section or reusable piece
    │   ├── Nav.jsx, LanguageSwitcher.jsx, Logo.jsx
    │   ├── Hero.jsx, StatBox.jsx
    │   ├── SectorsStrip.jsx
    │   ├── Services.jsx, ServiceCard.jsx
    │   ├── Method.jsx, MethodStep.jsx
    │   ├── Testimonials.jsx, TestimonialCard.jsx
    │   ├── CallToAction.jsx, Footer.jsx
    │   └── SectionHeader.jsx, EmphasisTitle.jsx, FadeIn.jsx
    ├── content/
    │   ├── site.js             # Shared data: email, languages, stats, service icons
    │   └── locales/            # All page text, one file per language
    │       └── fr.json, en.json, sv.json, es.json
    ├── assets/brand/           # Logo SVGs (light, dark, seal)
    ├── i18n/LanguageContext.jsx  # Current language, saved in localStorage
    ├── hooks/useInView.js      # Scroll fade-in
    └── styles/global.css
```

## Editing content

All text lives in `src/content/locales/<lang>.json`, so you rarely need to touch the components.

**Testimonials (carousel):** each locale file has a `testimonials` list. Entries marked `"placeholder": true` only show when you run the site locally (`npm run dev`), with an "Example" badge, and are hidden on the live site so visitors never see invented quotes. While there are no real testimonials, the live site hides the section and the "See our results" link. To add a real one, add an entry without `placeholder` to every locale file:

```json
{ "quote": "…", "author": "Name", "role": "Title, Company (City)" }
```

When you have real quotes, delete the placeholder entries.

**Add a service card:**
1. Pick an icon on [phosphoricons.com](https://phosphoricons.com), import it at the top of `src/content/site.js`, and add `{ id: 'my-service', icon: ShoppingCart }` to `services`.
2. Add `"my-service": { "title": "…", "description": "…" }` under `services.items` in every locale file.

**Change the stats:** edit the values in `stats` in `src/content/site.js` and the labels under `panel.stats` in each locale file.

**Change the contact email:** edit `email` in `src/content/site.js`.

**Add a language:** create `src/content/locales/<code>.json` (copy `en.json` as a starting point), import it in `src/content/locales/index.js`, and add it to `languages` in `src/content/site.js`.

## Launch checklist

- [x] Rebrand to Sellora
- [x] Convert to React
- [ ] Confirm the real contact email (currently `contact@sellora.fr`)
- [ ] Replace placeholder stats (+147%, -38%) with real client results
- [x] Testimonials carousel (placeholders show locally only)
- [ ] Add real client testimonials and delete the placeholders
- [x] Replace emoji icons with Phosphor duotone icons
- [x] Add logo, favicon, app icons and link preview image
- [ ] Update the og:url and og:image addresses in index.html once the custom domain is live
- [ ] Connect the CTA buttons to a contact form (e.g. Tally, Typeform, or Calendly)
- [x] Deploy to GitHub Pages (auto deploys on every push to main)
- [ ] Connect the custom domain
