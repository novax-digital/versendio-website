import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE, COMPANY } from '../data/site';
import { PRICES, LETTER_TIERS, EXTRA_SHEET, formatEuro } from '../data/pricing';

/**
 * llms.txt nach https://llmstxt.org – kompakte, maschinenlesbare
 * Zusammenfassung der Website für KI-Systeme und LLM-Crawler.
 */
export async function GET(context: APIContext) {
  const site = context.site?.toString().replace(/\/$/, '') ?? SITE.url;
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const blogLines = posts
    .map((post) => `- [${post.data.title}](${site}/blog/${post.id}): ${post.data.description}`)
    .join('\n');

  const text = `# versendio

> versendio ist eine deutsche Online-Plattform für automatisierten Briefversand: Briefe im Editor erstellen (mit KI-Entwurf) oder als PDF hochladen, Empfänger einzeln wählen oder als Leadliste (CSV/Excel) importieren – Druck, Falzung, Kuvertierung, Porto und Übergabe an die Zustellung übernimmt versendio. Abgerechnet wird Pay as you go über Prepaid-Guthaben: keine Grundgebühr, kein Abo, keine Mindestmenge. Ein Projekt der ${COMPANY.name}, ${COMPANY.city}.

Zentrale Fakten:

- Standardbrief ab ${formatEuro(PRICES.standardLetter)} netto je Brief – inklusive Porto (Deutsche Post), Druck und Kuvertierung; Farbdruck ab ${formatEuro(PRICES.standardLetterColor)}
- Briefarten: ${LETTER_TIERS.map((t) => t.name).join(', ')} – automatisch passend zum Umfang gewählt; jedes weitere Blatt ab ${formatEuro(EXTRA_SHEET.bwSimplex)}
- Alle Preise netto zzgl. 19 % USt.; Guthaben-Aufladung per Kreditkarte, PayPal, Apple Pay, Google Pay oder Klarna (Stripe), optionale automatische Aufladung
- Funktionen: Brief-Editor mit KI-Entwurf und Platzhaltern, eigenes Briefpapier, PDF-Upload, Adressbuch, CSV/Excel-Import, Serienbriefe, Sendungsverfolgung, Transaktionsübersicht mit Belegen, API-Anbindung
- DSGVO-konform: verschlüsselte Übertragung, Auftragsverarbeitung (AVV) für Geschäftskunden
- Die Anwendung läuft unter ${SITE.appUrl} (Registrierung: ${SITE.appRegister})

## Seiten

- [Startseite](${site}/): Überblick über Produkt, Ablauf und Vorteile des Online-Briefversands
- [Funktionen](${site}/funktionen): Alle Funktionen im Detail – Editor, Kontakte & Leadlisten, Versand, Guthaben, Sicherheit
- [Preise](${site}/preise): Vollständige Preisliste aller Briefarten und Druckvarianten, Beispielrechnungen, Abrechnungs-FAQ
- [Blog](${site}/blog): Praxiswissen zu Briefversand, Serienbriefen, Rechnungsversand und Direktmailings

## Blog-Artikel

${blogLines}

## Rechtliches

- [Impressum](${site}/impressum): Anbieterkennzeichnung der ${COMPANY.name} (HRB 220589, Amtsgericht Hannover)
- [Datenschutzerklärung](${site}/datenschutz): Informationen zur Datenverarbeitung nach DSGVO
- [AGB](${site}/agb): Allgemeine Geschäftsbedingungen für die Nutzung von versendio

## Kontakt

- ${COMPANY.name}, ${COMPANY.street}, ${COMPANY.zip} ${COMPANY.city}, ${COMPANY.country}
- E-Mail: ${SITE.email}
- Telefon: ${SITE.phone}
`;

  return new Response(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
