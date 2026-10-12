# Sellora

Landing page for **Sellora**, an Amazon agency based in Paris that helps brands launch and grow on Amazon across Europe.

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

## Project structure

```
sellora/
├── index.html                  # HTML shell: fonts, icons, link preview (Open Graph) tags, canonical URL
├── public/                     # Copied as is into the build
│   ├── favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png
│   ├── site.webmanifest        # Home screen icon settings
│   ├── og-image.png            # Link preview image (1200x630)
│   └── robots.txt, sitemap.xml
├── vite.config.js
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
    │   ├── CallToAction.jsx, FormModal.jsx          # Audit and contact forms
    │   ├── Footer.jsx
    │   └── SectionHeader.jsx, EmphasisTitle.jsx, FadeIn.jsx
    ├── content/
    │   ├── site.js             # Shared settings: email, form endpoint, languages, stats, service icons, form fields
    │   └── locales/            # All page text, one file per language
    │       └── fr.json, en.json, sv.json, es.json
    ├── forms/forms.js          # Form validation and sending
    ├── assets/brand/           # Logo SVGs (light, dark, seal)
    ├── i18n/LanguageContext.jsx  # Current language, remembered in the visitor's browser
    ├── hooks/useInView.js      # Scroll fade-in
    └── styles/global.css       # All styles; color tokens at the top
```

## Editing content

All visible text lives in `src/content/locales/<lang>.json`, so you rarely need to touch the components. When you change text, change it in all four language files.

**Contact email:** set once in `src/content/site.js` (`email`). The footer link, the audit and contact forms, and the forms' error message all use it. It is currently `contact@hellosellora.com`.

**Audit and contact forms:** the "Demander mon audit gratuit" and "Nous contacter" buttons open form pop-ups. Fields are defined in `forms` in `src/content/site.js`; labels and error messages are in each locale file under `forms`. While `formEndpoint` in `site.js` is empty, submitting opens the visitor's email app with a message to contact@ already filled in. To receive submissions directly, create a form on a service such as Formspree and paste its URL into `formEndpoint`.

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

**Hero stats:** values are in `stats` in `src/content/site.js`, labels under `panel.stats` in each locale file.

**Add a language:** create `src/content/locales/<code>.json` (copy `en.json` as a starting point), import it in `src/content/locales/index.js`, and add it to `languages` in `src/content/site.js`.

**Colors:** all colors are tokens at the top of `src/styles/global.css` (`:root`). The page is cream with navy text and gold accents; the method section and the call to action use the navy tokens (`.theme-dark`).

**Logo:** the logo files are in `src/assets/brand/`. The nav and footer show the seal plus the "Sellora" wordmark, and only the seal on very narrow phones.

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

## Domain and email

The domain `hellosellora.com` is registered at **Namecheap**. Email runs on **Google Workspace**.

DNS records (Namecheap, Advanced DNS):

| Type | Host | Value | Purpose |
|---|---|---|---|
| A | `@` | `185.199.108.153` | Website (GitHub Pages) |
| A | `@` | `185.199.109.153` | Website (GitHub Pages) |
| A | `@` | `185.199.110.153` | Website (GitHub Pages) |
| A | `@` | `185.199.111.153` | Website (GitHub Pages) |
| CNAME | `www` | `lemming97.github.io.` | www redirects to the main domain |
| TXT | `_github-pages-challenge-Lemming97` | (GitHub code) | Domain verified on GitHub |
| TXT | `@` | `google-site-verification=…` | Domain verified on Google Workspace |
| MX | `@` | `smtp.google.com` (priority 1) | Email delivered to Gmail |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | SPF: Google may send for the domain |
| TXT | `google._domainkey` | `v=DKIM1;k=rsa;p=…` | DKIM: Google signs outgoing email |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:lindsey@hellosellora.com` | DMARC: reports on email authentication |

Mail Settings in Namecheap is set to **Custom MX**. Keep only one record starting with `v=spf1`.

**Google Workspace:**
* `lindsey@hellosellora.com` is the admin account.
* `contact@hellosellora.com` is a Google Group ("Contact Sellora"), not a paid user. It accepts email from outside (Who can post: External) and delivers each message to its members. Add new team members to the group so they receive website enquiries.

## Launch checklist

- [x] Rebrand to Sellora
- [x] Convert to React
- [x] Light cream palette with navy sections, all colors as tokens
- [x] Phosphor duotone icons on the service cards
- [x] Logo, favicon, app icons and link preview image
- [x] Testimonials carousel (placeholders show locally only; Sellora's promise shows live)
- [x] Audit and contact form pop-ups, in all four languages
- [x] Deploy to GitHub Pages (auto deploys on every push to main)
- [x] Connect hellosellora.com (DNS at Namecheap, GitHub Pages custom domain, HTTPS)
- [x] robots.txt, sitemap and canonical URL
- [x] Google Workspace with SPF, DMARC and MX records
- [x] contact@hellosellora.com set up as a Google Workspace group; every email on the site points to it
- [ ] Turn on DKIM in Google Workspace (Apps, Google Workspace, Gmail, Authenticate email, Start authentication)
- [ ] Branded Gmail signatures
- [ ] Send form submissions straight to the inbox (set `formEndpoint`, e.g. Formspree)
- [ ] Replace placeholder stats (+147%, -38%) with real client results, or reword them as goals
- [ ] Add real client testimonials and delete the placeholders and the promise
- [ ] Check "Sellora" on INPI and EUIPO trademark databases
