# versendio.de – Marketing-Website

Statische Marketing-Website für [versendio](https://versendio.de) – die Online-Plattform für automatisierten Briefversand. Ein Projekt der Novax Digital GmbH, Hannover. Die App läuft separat unter [app.versendio.de](https://app.versendio.de).

Gebaut mit [Astro 5](https://astro.build) – komplett statisch, extrem schnell und suchmaschinenoptimiert.

## Features

- **SEO-Maximalausbau:** Meta-Tags, Canonicals, Open Graph/Twitter Cards, JSON-LD (Organization, WebSite, SoftwareApplication, Product, FAQPage, BlogPosting, BreadcrumbList), XML-Sitemap, RSS-Feed, robots.txt, sprechende URLs
- **App-Mockups in reinem HTML/CSS** (Dashboard, Brief-Editor, Kontakte, Guthaben) – gestochen scharf auf jedem Display, skaliert per Container Queries
- **Blog** als Astro Content Collection mit 5 SEO-Artikeln inkl. KI-generierter Cover (automatische WebP/AVIF-Optimierung, responsive `srcset`)
- **Selbst gehostete Fonts** (Poppins, Lato, PT Serif) als subsettete WOFF2-Dateien, Preloading fürs LCP
- **Launch-Banner** mit Ablaufdatum und Dismiss-Funktion
- Kein Framework-JS, keine Cookies, kein Tracking – nur ~2 kleine Inline-Scripts (Nav-Toggle, Banner)

## Entwicklung

```bash
npm install
npm run dev       # Dev-Server auf localhost:4321
npm run build     # Produktions-Build nach dist/
npm run preview   # Build lokal testen
```

## Inhalte pflegen

| Was | Wo |
| --- | --- |
| Preise | `src/data/pricing.ts` (eine Stelle, überall verwendet) |
| Kontaktdaten, URLs, Firmenangaben | `src/data/site.ts` |
| Launch-Banner (Text, Ablauf, an/aus) | `src/data/site.ts` → `BANNER` |
| Blog-Artikel | `src/content/blog/*.md` (Frontmatter-Schema in `src/content.config.ts`) |
| Blog-Cover | `src/assets/blog/` |
| Rechtsseiten | `src/pages/impressum.astro`, `datenschutz.astro`, `agb.astro` |

**Neuer Blog-Artikel:** Markdown-Datei in `src/content/blog/` anlegen, Cover-Bild (16:9) nach `src/assets/blog/` legen, Frontmatter ausfüllen – Sitemap, RSS, Blog-Index und Schema.org werden automatisch aktualisiert.

## Vor dem Livegang ausfüllen

- [ ] `src/pages/impressum.astro`: **HRB-Nummer** und **USt-IdNr.** ergänzen
- [ ] Preise in `src/data/pricing.ts` mit den echten App-Preisen abgleichen
- [ ] Login-/Registrierungs-URLs prüfen (`src/data/site.ts` → `appLogin`, `appRegister`)
- [ ] Datenschutz & AGB juristisch prüfen lassen (Entwurfsqualität)

## Deployment auf Vercel

1. Repository auf GitHub pushen (siehe unten)
2. In [Vercel](https://vercel.com/new) das Repo importieren – Astro wird automatisch erkannt (`vercel.json` liegt bei: Clean URLs, Security-Header, Cache-Header für Fonts/Assets)
3. Build Command `astro build`, Output `dist/` (automatisch)
4. Domain `versendio.de` im Vercel-Projekt hinzufügen und DNS umstellen (A-Record `76.76.21.21` bzw. CNAME `cname.vercel-dns.com`)

## Google Search Console

1. Property `versendio.de` (Domain-Property) anlegen und per DNS verifizieren
2. Sitemap einreichen: **`https://versendio.de/sitemap-index.xml`**
   (verlinkt zusätzlich in `robots.txt` und im `<head>` jeder Seite)
3. Optional: RSS-Feed `https://versendio.de/rss.xml`

## Struktur

```
src/
├── assets/          # Logos, Blog-Cover (von Astro optimiert)
├── components/      # Header, Footer, Banner, FAQ, CTA, Mockups …
│   └── mockups/     # App-Mockups in HTML/CSS
├── content/blog/    # Blog-Artikel (Markdown)
├── data/            # site.ts (Stammdaten), pricing.ts (Preise)
├── layouts/         # BaseLayout mit komplettem SEO-Head
├── pages/           # Alle Routen (inkl. rss.xml.ts, 404)
└── styles/          # global.css (Design-Tokens, Basis-Styles)
public/
├── fonts/           # WOFF2-Subsets (Poppins, Lato, PT Serif)
├── og/              # Open-Graph-Bild (1200×630)
└── robots.txt, favicons, site.webmanifest
```

---

© Novax Digital GmbH · Schierholzstr. 27 · 30655 Hannover
