/**
 * Consent-Modul – strikter Google Consent Mode „Basic Mode“.
 *
 * Dies ist die EINZIGE Stelle im Projekt, die gtag.js lädt. Vor einer
 * ausdrücklichen Einwilligung geht kein einziger Request an Google raus
 * (kein Advanced Mode, kein url_passthrough, keine cookieless Pings).
 *
 * Der Consent-Cookie ist eine fixe, domainweite Schnittstelle:
 * app.versendio.de liest denselben Cookie und blendet dann keinen Banner ein.
 */

/** Aktuelle Consent-Version. Erhöhen, wenn sich Umfang/Policy ändert –
 *  dann erscheint der Banner bei bestehenden Einwilligungen erneut. */
export const CONSENT_VERSION = 1;

export const CONSENT_COOKIE = 'versendio_consent';

/** Google-Ads-Conversion-ID. */
export const GOOGLE_ADS_ID = 'AW-18340516455';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 12 Monate in Sekunden

export interface ConsentState {
  v: number;
  ts: string;
  marketing: boolean;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Ruft den im <head> definierten gtag-Stub auf (SSR-sicher). */
function gtag(...args: unknown[]): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

/** Liest den Consent-Cookie inkl. Struktur-Validierung. */
export function readConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp('(?:^|;\\s*)' + CONSENT_COOKIE + '=([^;]+)'),
  );
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as Partial<ConsentState>;
    if (typeof parsed.v !== 'number' || typeof parsed.marketing !== 'boolean') {
      return null;
    }
    return { v: parsed.v, ts: String(parsed.ts ?? ''), marketing: parsed.marketing };
  } catch {
    return null;
  }
}

/**
 * Banner anzeigen, wenn (noch) keine gültige Entscheidung für die aktuelle
 * Consent-Version vorliegt.
 */
export function shouldShowBanner(): boolean {
  const c = readConsent();
  return !c || c.v < CONSENT_VERSION;
}

/** Schreibt den Consent-Cookie gemäß fixem Vertrag (.versendio.de, 12 Monate). */
function writeConsentCookie(marketing: boolean): void {
  if (typeof document === 'undefined') return;
  const state: ConsentState = {
    v: CONSENT_VERSION,
    ts: new Date().toISOString(),
    marketing,
  };
  const value = encodeURIComponent(JSON.stringify(state));

  // Produktiv gilt der fixe Vertrag: Domain=.versendio.de + Secure.
  // Auf localhost (Dev) werden beide Attribute weggelassen, sonst würde der
  // Browser den Cookie verwerfen – der Produktiv-Vertrag bleibt unberührt.
  const isVersendio = /(^|\.)versendio\.de$/.test(location.hostname);
  const domain = isVersendio ? '; Domain=.versendio.de' : '';
  const secure = location.protocol === 'https:' ? '; Secure' : '';

  document.cookie =
    CONSENT_COOKIE +
    '=' +
    value +
    '; Path=/' +
    domain +
    '; Max-Age=' +
    COOKIE_MAX_AGE +
    '; SameSite=Lax' +
    secure;
}

let adsLoaded = false;

/** Consent auf „granted“ setzen und gtag.js dynamisch nachladen. */
function loadGoogleAds(): void {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  });
  if (adsLoaded || typeof document === 'undefined') return;
  adsLoaded = true;
  gtag('js', new Date());
  gtag('config', GOOGLE_ADS_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID;
  document.head.appendChild(s);
}

/** Einwilligung erteilen: Cookie schreiben, dann Tag laden. */
export function grantConsent(): void {
  writeConsentCookie(true);
  loadGoogleAds();
}

/** Einwilligung ablehnen/widerrufen: Cookie schreiben, nichts laden. */
export function denyConsent(): void {
  writeConsentCookie(false);
  gtag('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

/**
 * Beim Seitenaufruf ausführen: Liegt eine gültige Einwilligung vor, wird das
 * Tag ohne Banner geladen. Ohne Entscheidung oder bei Ablehnung passiert
 * nichts – es geht kein Request an Google raus.
 */
export function initConsent(): void {
  const c = readConsent();
  if (c && c.v >= CONSENT_VERSION && c.marketing) {
    loadGoogleAds();
  }
}
