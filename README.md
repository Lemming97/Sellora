# Hello Sellora

Website for **Hello Sellora**, an Amazon agency based in Paris that helps brands launch, grow and scale on Amazon across Europe: audits for brands already selling, and a full store launch for brands not on Amazon yet.

> © 2026 Lindsey Martin. All rights reserved. The Hello Sellora name, logos, seal, illustrations, texts and code are the property of Lindsey Martin and may not be copied or reused without written permission. See [Ownership and licence](#ownership-and-licence).

**Live site:** https://hellosellora.com
**Contact:** contact@hellosellora.com

Built with React and Vite, hosted on GitHub Pages. The site is available in French (default), English, Swedish and Spanish.

## Getting started

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install     # once, after cloning
npm run dev     # local dev server with live reload (http://localhost:5173)
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

Always run `git pull` before you start editing, so your copy has the latest changes.

## Deployment

Every push to `main` deploys the site automatically through GitHub Actions (`.github/workflows/deploy.yml`). It builds with Vite and publishes `dist/` to GitHub Pages. The live site updates within a minute or two; you can follow each run in the repo's **Actions** tab.

GitHub Pages settings: **Source** is "GitHub Actions", **Custom domain** is `hellosellora.com`, and **Enforce HTTPS** is on. The domain is verified on the Lemming97 GitHub account.

## Analytics, Google Ads and cookies

Google Analytics 4 (`G-5NCZPXGX3Q`) and Google Ads (`AW-18513143620`) load **only after a visitor clicks Accept** in the cookie banner (Consent Mode v2, basic setup). Before that, no Google script is downloaded. The choice is stored in the browser for 6 months and can be changed from **Cookies** in the footer or on the cookie policy page; refusing later also deletes the Google cookies, which are capped at 13 months.

* IDs and the Ads conversion label are in `googleTag` in `src/content/site.js`. Empty an ID to switch that part off.
* Code: `src/analytics/googleTag.js` and `src/components/CookieBanner.jsx`. Banner text is under `cookies` in each locale file.
* When the audit or contact form is delivered, the site sends a GA4 `generate_lead` event (with `form_name` audit, launch or contact) and the Google Ads "Submit lead form" conversion. In GA4, mark `generate_lead` as a key event (Admin, Events).
* To test: open https://tagassistant.google.com, connect to hellosellora.com, accept cookies and send a test form.

## Project structure

```
sellora/
├── index.html                  # HTML shell: fonts, icons, link preview (Open Graph) tags, canonical URL
├── public/                     # Copied as is into the build
│   ├── favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png
│   ├── site.webmanifest        # Home screen icon settings
│   ├── og-image.png            # Link preview image (1200x630)
│   ├── fonts/                  # Self-hosted DM Sans and Instrument Serif (no Google Fonts)
│   └── robots.txt, sitemap.xml
├── vite.config.js
├── email/auto-reply/         # Google Apps Script: automatic confirmation email to form senders
├── .github/workflows/deploy.yml  # Build and deploy to GitHub Pages
└── src/
    ├── main.jsx                # Entry point
    ├── App.jsx                 # Page layout: which sections, in what order
    ├── components/             # One file per section or reusable piece
    │   ├── Nav.jsx, LanguageSwitcher.jsx, Logo.jsx
    │   ├── Hero.jsx, StatBox.jsx
    │   ├── SectorsStrip.jsx
    │   ├── Services.jsx, ServiceCard.jsx
    │   ├── Method.jsx, MethodStep.jsx
    │   ├── Testimonials.jsx, TestimonialCard.jsx   # Testimonials carousel
    │   ├── HeroBand.jsx             # Image band above the hero
    │   ├── Audit.jsx                # "What's in your Amazon audit" section
    │   ├── LaunchSection.jsx        # "Not on Amazon yet?" launch service
    │   ├── LegalPage.jsx            # Legal notice, privacy, cookies, terms
    │   ├── CallToAction.jsx, FormModal.jsx          # Audit and contact forms
    │   ├── Footer.jsx, CookieBanner.jsx
    │   └── SectionHeader.jsx, EmphasisTitle.jsx, FadeIn.jsx
    ├── content/
    │   ├── site.js             # Shared settings: email, form endpoint, languages, stats, icons, form fields, legal details
    │   ├── redirects.js        # Short addresses (/audit, /launch, /privacy...) and where they go
    │   ├── legal/              # Legal pages text, one file per language (French prevails)
    │   └── locales/            # All page text, one file per language
    │       └── fr.json, en.json, sv.json, es.json
    ├── analytics/googleTag.js  # Google Analytics and Ads, loaded after cookie consent
    ├── forms/forms.js          # Form validation and sending
    ├── assets/brand/           # Logo SVGs (light, dark, seal)
    ├── i18n/LanguageContext.jsx  # Current language, remembered in the visitor's browser
    ├── hooks/useInView.js      # Scroll fade-in
    └── styles/global.css       # All styles; color tokens at the top
```

## Editing content

All visible text lives in `src/content/locales/<lang>.json`, so you rarely need to touch the components. When you change text, change it in all four language files.

**Contact email:** set once in `src/content/site.js` (`email`). The footer link and the forms' messages use it. It is currently `contact@hellosellora.com`.

**Audit and contact forms:** the "Demander mon audit" and "Nous contacter" buttons open form pop-ups. Fields are defined in `forms` in `src/content/site.js`; labels and error messages are in each locale file under `forms`. Submissions are sent through [Web3Forms](https://web3forms.com) (`web3formsKey` in `site.js`) and arrive at contact@ with an English subject and field labels; replying answers the visitor directly. If the key is ever removed, the forms fall back to opening the visitor's email app.

**Testimonials (carousel):** each locale file has a `testimonials` list. The carousel slides to the next quote every 8 seconds, and visitors can use the arrows, dots, keyboard, drag or swipe.
* Entries marked `"placeholder": true` are example quotes. They only show when you run the site locally (`npm run dev`), with an "Example" badge, and are hidden on the live site so visitors never see invented quotes.
* The entry with `"kind": "promise"` is Sellora's own promise. It shows on the live site until real client quotes exist.
* To add a real testimonial, add an entry without `placeholder` to every locale file:

  ```json
  { "quote": "…", "author": "Name", "role": "Title, Company (City)" }
  ```

  When you have real quotes, delete the placeholder entries and the promise entry.

**Service cards:**
1. Pick an icon on [phosphoricons.com](https://phosphoricons.com) (we use the duotone style), import it at the top of `src/content/site.js`, and add `{ id: 'my-service', icon: ShoppingCart }` to `services`.
2. Add `"my-service": { "title": "…", "description": "…" }` under `services.items` in every locale file.

**Audit section:** the text is under `audit` in each locale file (what the audit covers, what you receive, how it works, pricing note). The six items and their icons are listed in `auditItems` in `src/content/site.js`. Keep the steps in line with the auto-reply email in `email/auto-reply/Code.gs`.

**Launch section:** the text is under `launch` in each locale file, the six items and icons in `launchItems` in `src/content/site.js`. The request form's first question ("Are you already selling on Amazon?") turns an audit request into a launch request when the visitor answers "Not yet".

**Hero stats:** values are in `stats` in `src/content/site.js`, labels under `panel.stats` in each locale file.

**Add a language:** create `src/content/locales/<code>.json` (copy `en.json` as a starting point), import it in `src/content/locales/index.js`, and add it to `languages` in `src/content/site.js`.

**Colors:** all colors are tokens at the top of `src/styles/global.css` (`:root`). The page is cream with navy text and gold accents; the method section and the call to action use the navy tokens (`.theme-dark`).

**Logo:** the logo files are in `src/assets/brand/`. The logo reads "Hello Sellora": a gold italic "Hello" above "Sellora", left aligned with it. The nav and footer show the seal plus that wordmark, and only the seal on very narrow phones.

## Legal pages

The legal notice (`/mentions-legales/`), privacy policy (`/confidentialite/`), cookie policy (`/cookies/`) and terms of use (`/conditions/`) are linked in the footer, in all four languages. Their text is in `src/content/legal/`; the French version prevails.

The publisher details (name, SIREN, address, publication director, host) are in `legal` in `src/content/site.js`. Until Hello Sellora is registered as its own business, the site is published by Lindsey Martin, entrepreneur individuel. When that changes, update `legal` and the `lastUpdated` date, and the pages follow.

## Brand

| | |
|---|---|
| Navy | `#0B1929` |
| Gold | `#E8A020` (buttons, highlights, the S in the seal) |
| Dark gold | `#9A6210` (gold text on light backgrounds) |
| Cream | `#FAF8F4` (page background) |
| Headings and logo | Instrument Serif |
| Body text | DM Sans |

The full logo pack (SVG and PNG, light and dark, seal, favicons, Google Workspace logo, profile picture) is kept outside this repo.

The Hello Sellora name, logos, seal and visual identity are the property of Lindsey Martin and may not be used without written permission.

## Launch checklist

- [x] Rebrand to Sellora
- [x] Convert to React
- [x] Light cream palette with navy sections, all colors as tokens
- [x] Phosphor duotone icons on the service cards
- [x] Logo, favicon, app icons and link preview image
- [x] Testimonials carousel (placeholders show locally only; Sellora's promise shows live)
- [x] Audit and contact form pop-ups, in all four languages
- [x] Deploy to GitHub Pages (auto deploys on every push to main)
- [x] Connect hellosellora.com with HTTPS
- [x] robots.txt, sitemap and canonical URL
- [x] Business email set up
- [x] Every email on the site points to contact@hellosellora.com
- [x] Branded email signatures and company footer
- [x] Audit and contact forms send straight to contact@ (Web3Forms)
- [x] Install the auto-reply script (`email/auto-reply/`) in Google Apps Script
- [x] Legal notice, privacy policy, cookie policy and terms of use
- [x] Launch service for brands not on Amazon yet
- [ ] Replace placeholder stats (+147%, -38%) with real client results, or reword them as goals
- [ ] Add real client testimonials and delete the placeholders and the promise
- [ ] Check "Sellora" on INPI and EUIPO trademark databases

## Ownership and licence

© 2026 Lindsey Martin. All rights reserved.

Everything in this repository is the property of Lindsey Martin, entrepreneur individuel (SIREN 131 358 541, Paris), who runs Hello Sellora: the names "Hello Sellora" and "Sellora", the logos and seal, the illustrations and visual design, all texts and translations, and the source code. The repository is public so the site can be hosted on GitHub Pages; this does not grant any licence. Nothing here may be copied, modified, distributed or reused, in whole or in part, without prior written permission. To ask, write to contact@hellosellora.com.

Third-party components keep their own licences: the fonts in `public/fonts` (SIL Open Font License) and the open-source packages in `package.json`.

Amazon and its service names (Seller Central, Brand Registry, FBA, Sponsored Products, A+, Vine) are trademarks of Amazon.com, Inc. or its affiliates, and Google's product names are trademarks of Google LLC. Hello Sellora is independent and not affiliated with or endorsed by Amazon or Google.

The full terms are in [LICENSE](LICENSE). The site's own [legal notice](https://hellosellora.com/mentions-legales/) and [terms of use](https://hellosellora.com/conditions/) apply to the website.
