import "server-only";
import sharp from "sharp";
import { buildAssetUrl } from "./storage/url";

/**
 * S-F02 guardrail: social crawlers ignore OG images narrower than ~600px.
 * Post covers are DB-driven, so dimensions are probed with sharp ONCE per
 * image and memoized in a module-level Map (process lifetime). On any
 * failure (missing file, CDN error, timeout) the result is treated as
 * "unknown" and the branded fallback cover is used for cards.
 */

const MIN_CARD_WIDTH = 600;
const PROBE_TIMEOUT_MS = 2500;
/** Bounded so a huge catalog can never grow this cache without limit. */
const CACHE_LIMIT = 512;

type DimResult = { width: number; height: number } | null;

const dimCache = new Map<string, DimResult>();

async function fetchWithTimeout(url: string): Promise<ArrayBuffer> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), PROBE_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.arrayBuffer();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Resolve the card-safe og:image (+ dimensions when known) for a post cover.
 * Returns the cover URL only if sharp confirms width >= 600px; otherwise the
 * branded /images/og-cover.jpg fallback. Emits width/height when known so
 * cards render without an extra fetch.
 */
export async function resolveOgImage(
  imageUrlKey: string | null | undefined,
): Promise<{ url: string; width?: number; height?: number }> {
  // Branded fallback cover (verified 1200x630) — dims declared so cards
  // render without an extra fetch.
  const fallback = {
    url: "https://everest-electronics.zeabur.app/images/og-cover.jpg",
    width: 1200,
    height: 630,
  };
  if (!imageUrlKey) return fallback;

  const url = buildAssetUrl(imageUrlKey);
  let cached = dimCache.get(url);
  if (cached === undefined) {
    try {
      const buf = Buffer.from(await fetchWithTimeout(url));
      const meta = await sharp(buf).metadata();
      cached =
        meta.width && meta.height
          ? { width: meta.width, height: meta.height }
          : null;
    } catch {
      cached = null;
    }
    if (dimCache.size >= CACHE_LIMIT) dimCache.clear();
    dimCache.set(url, cached);
  }

  if (!cached || cached.width < MIN_CARD_WIDTH) return fallback;
  return { url, ...cached };
}
