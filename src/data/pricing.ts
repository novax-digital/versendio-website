/**
 * Alle Preisangaben der Website an einer Stelle (Netto-VK-Preise in Euro).
 * Quelle: App-Preisliste (Admin → Preise), Stand Juli 2026.
 * Einschreiben-Zuschläge sind in der App vorhanden, aber deaktiviert –
 * sobald sie aktiv sind, hier `active: true` setzen und wieder einblenden.
 */
export const VAT_RATE = 0.19;

export type PrintVariant = 'bwSimplex' | 'bwDuplex' | 'colorSimplex' | 'colorDuplex';

export const VARIANT_LABELS: Record<PrintVariant, string> = {
  bwSimplex: 'S/W einseitig',
  bwDuplex: 'S/W beidseitig',
  colorSimplex: 'Farbe einseitig',
  colorDuplex: 'Farbe beidseitig',
};

export const VARIANT_ORDER: PrintVariant[] = [
  'bwSimplex',
  'bwDuplex',
  'colorSimplex',
  'colorDuplex',
];

/** Briefarten inkl. 1 Blatt – die App wählt die passende Art automatisch nach Umfang. */
export const LETTER_TIERS = [
  {
    key: 'standard',
    name: 'Standardbrief',
    note: 'bis ca. 3 Blatt',
    prices: { bwSimplex: 1.1, bwDuplex: 1.15, colorSimplex: 1.15, colorDuplex: 1.25 },
  },
  {
    key: 'kompakt',
    name: 'Kompaktbrief',
    note: 'bis ca. 8 Blatt',
    prices: { bwSimplex: 1.55, bwDuplex: 1.6, colorSimplex: 1.75, colorDuplex: 2.15 },
  },
  {
    key: 'gross',
    name: 'Großbrief',
    note: 'für umfangreiche Sendungen',
    prices: { bwSimplex: 2.75, bwDuplex: 2.85, colorSimplex: 3.15, colorDuplex: 4.15 },
  },
] as const;

/** Preis je weiterem Blatt (das erste Blatt ist im Briefpreis enthalten). */
export const EXTRA_SHEET: Record<PrintVariant, number> = {
  bwSimplex: 0.06,
  bwDuplex: 0.08,
  colorSimplex: 0.11,
  colorDuplex: 0.21,
};

/** In der App angelegt, aktuell aber nicht aktiv – daher nicht auf der Website bewerben. */
export const REGISTERED_SURCHARGES = {
  active: false,
  einwurf: 3.5,
  einschreiben: 4.0,
  rueckschein: 6.5,
} as const;

/** Meistgenutzte Referenzpreise für Texte & Schema.org */
export const PRICES = {
  standardLetter: LETTER_TIERS[0].prices.bwSimplex, // 1,10 € – Standardbrief s/w einseitig
  standardLetterColor: LETTER_TIERS[0].prices.colorSimplex, // 1,15 € – Farbe einseitig
  extraSheet: EXTRA_SHEET.bwSimplex, // ab 0,06 € je weiteres Blatt
} as const;

export function formatEuro(value: number): string {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' €';
}

export function gross(net: number): number {
  return Math.round(net * (1 + VAT_RATE) * 100) / 100;
}
