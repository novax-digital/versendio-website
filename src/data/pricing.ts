/**
 * Alle Preisangaben der Website an einer Stelle (Netto-Preise in Euro).
 * WICHTIG: Vor dem Livegang mit den tatsächlichen Preisen aus der App abgleichen!
 */
export const VAT_RATE = 0.19;

export const PRICES = {
  standardLetter: 1.19, // Standardbrief, 1 Blatt s/w, inkl. Porto, Druck & Kuvertierung
  extraPage: 0.15, // je weiteres Blatt (s/w)
  colorPerPage: 0.2, // Aufpreis Farbdruck je Seite
  registeredDrop: 2.49, // Aufpreis Einschreiben Einwurf
  registered: 2.99, // Aufpreis Einschreiben (Übergabe)
  international: 2.49, // Auslandsbrief (Welt), 1 Blatt s/w, ab
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
