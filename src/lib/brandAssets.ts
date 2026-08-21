import { buildAssetUrl } from "@/lib/storage/url";

/**
 * Figma-exported brand assets, hosted on the R2 CDN under the
 * everest-electronics prefix. Keys returned by the upload-assets script.
 * Using the CDN (buildAssetUrl) guarantees these are the EXACT Figma assets
 * and served from cdn.denovamind.com, never a local substitute.
 */
export const BRAND_ASSETS: Record<string, string> = {
  logo: "2026-08/everest-logo-31bd5636.webp",
  heroWave: "2026-08/hero-bg-wave-b66e332f.webp",
  aboutHeroBg: "2026-08/about-hero-bg-ce2a95f4.webp",
  aboutHeroLogo: "2026-08/about-hero-logo-73cdec1b.webp",
  aboutHeroAccentA: "2026-08/about-hero-accent-a-693e3a1c.webp",
  aboutHeroAccentB: "2026-08/about-hero-accent-b-6f1a37c5.webp",
  samsung: "2026-08/samsung-9e6f77f1.webp",
  img4: "2026-08/img4-2d45af41.webp",
  aqua: "2026-08/aqua-f927b99a.webp",
  polytron: "2026-08/polytron-3457e3b0.webp",
  midea: "2026-08/midea-1cc39fb7.webp",
  mitsubishi: "2026-08/mitsubishi-1b1c283d.webp",
  changhong: "2026-08/changhong-0995f292.webp",
  lg: "2026-08/lg-fcf84e36.webp",
  hisense: "2026-08/hisense-1529eb45.webp",
  panasonic: "2026-08/panasonic-e3b3dd2c.webp",
  sharp: "2026-08/sharp-c40c02b2.webp",
  gree: "2026-08/gree-48e61152.webp",
  daikin: "2026-08/daikin-33f8eaaa.webp",
  img5: "2026-08/img5-3220c859.webp",
  img6: "2026-08/img6-14656ce5.webp",
};

export function brandUrl(id: string): string {
  return buildAssetUrl(BRAND_ASSETS[id] || "");
}