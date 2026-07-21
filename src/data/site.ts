/**
 * Zentrale Stammdaten der Website.
 * Änderungen an Kontaktdaten, URLs oder Firmenangaben nur hier pflegen.
 */
export const SITE = {
  name: 'versendio',
  url: 'https://versendio.de',
  appUrl: 'https://app.versendio.de',
  appLogin: 'https://app.versendio.de/login',
  appRegister: 'https://app.versendio.de/registrieren',
  title: 'versendio – Briefe online versenden. Automatisch gedruckt & zugestellt.',
  description:
    'Briefe, Rechnungen & Mailings online versenden: PDF hochladen oder im Editor erstellen – versendio übernimmt Druck, Kuvertierung, Porto und Versand. Pay as you go, ohne Grundgebühr.',
  email: 'info@versendio.de',
  phone: '0511 9012188-5',
  phoneHref: 'tel:+4951190121885',
  ogImage: '/og/og-default.png',
} as const;

export const COMPANY = {
  name: 'Novax Digital GmbH',
  street: 'Schierholzstr. 27',
  zip: '30655',
  city: 'Hannover',
  country: 'Deutschland',
  countryCode: 'DE',
  ceos: ['Philipp Polley', 'Christoph Pfad'],
} as const;

export const NAV = [
  { label: 'Funktionen', href: '/funktionen' },
  {
    label: 'Lösungen',
    href: '/loesungen',
    children: [
      {
        label: 'Agenturen',
        href: '/loesungen/agenturen',
        icon: 'sparkles',
        description: 'Onboarding, Weiterempfehlung & Kundenpost automatisieren',
      },
      {
        label: 'Vertrieb & Sales',
        href: '/loesungen/vertrieb',
        icon: 'chart',
        description: 'Adresslisten anschreiben, nachfassen, Zustellung im Blick',
      },
      {
        label: 'Rechnungswesen',
        href: '/loesungen/rechnungswesen',
        icon: 'euro',
        description: 'Rechnungen, Angebote & Mahnungen automatisch per Post',
      },
      {
        label: 'Software-Anbieter & SaaS',
        href: '/loesungen/software-anbieter',
        icon: 'zap',
        description: 'White Label: Briefversand per API in Ihrer Software',
      },
    ],
  },
  { label: 'Preise', href: '/preise' },
  { label: 'Blog', href: '/blog' },
] as const;

export type NavItem = (typeof NAV)[number];
export type NavChild = Extract<NavItem, { children: unknown }>['children'][number];

/**
 * Ankündigungs-Banner oben auf der Website.
 * Nach Ablauf von `expires` wird der Banner clientseitig ausgeblendet –
 * zum endgültigen Entfernen `enabled` auf false setzen.
 */
export const BANNER = {
  enabled: true,
  emoji: '🎉',
  label: 'Launch-Angebot',
  text: 'versendio ist live – 20 % zusätzliches Guthaben on top bei jeder Aufladung bis zum 30.08.2026.',
  ctaLabel: 'Jetzt sichern',
  ctaHref: 'https://app.versendio.de/registrieren',
  expires: '2026-08-30T23:59:59+02:00',
} as const;
