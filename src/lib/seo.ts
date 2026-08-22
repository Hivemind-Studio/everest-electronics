/**
 * Shared, pure helpers for the accepted SEO iteration-1 findings.
 * Kept free of React/DB/sharp imports so it is unit-testable in vitest
 * and importable from generateMetadata / layout / not-found alike.
 */

export const SITE_URL = "https://everest-electronics.zeabur.app";

/** Bare platform-homepage defaults seeded in GlobalSettings (S-F08). */
export const BARE_SOCIAL_DEFAULTS = [
  "https://instagram.com",
  "https://facebook.com",
  "https://youtube.com",
  "https://linkedin.com",
  "https://tiktok.com",
];

/** S-F08: drop placeholder socials so sameAs never carries bare domains. */
export function filterSameAs(values: (string | null | undefined)[]): string[] {
  return values.filter(
    (v): v is string => !!v && v.trim() !== "" && !BARE_SOCIAL_DEFAULTS.includes(v.trim()),
  );
}

/**
 * S-F05: normalize Indonesian phone strings to E.164-ish (+62…) for
 * ContactPoint.telephone. Returns null when the format is unrecognizable —
 * callers then omit the field instead of emitting junk.
 */
export function toE164ish(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-().]/g, "").trim();
  if (!/^\+?\d+$/.test(cleaned)) return null;
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("62")) return `+${cleaned}`;
  if (cleaned.startsWith("0")) return `+62${cleaned.slice(1)}`;
  if (cleaned.startsWith("8")) return `+62${cleaned}`;
  return null;
}

/** C-F07: cap a meta title at `max` chars without splitting words. */
export function truncateTitle(text: string, max = 55): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  // No usable word boundary -> hard slice (degenerate long-token case).
  return lastSpace > 0 ? cut.slice(0, lastSpace).trimEnd() : cut.trimEnd();
}

/**
 * C-F01: meta description derived from the first ~155 chars of article body
 * (newlines collapsed), with excerpt fallback. Visible card excerpts are NOT
 * touched — this is applied in generateMetadata only.
 */
export function deriveDescription(
  content: string,
  excerpt: string,
  max = 155,
): string {
  const flat = content.replace(/\s+/g, " ").trim();
  const base = flat.length > 0 ? flat : excerpt;
  if (base.length <= max) return base;
  const cut = base.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim();
}
