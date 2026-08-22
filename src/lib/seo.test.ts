import { describe, expect, it } from "vitest";
import {
  deriveDescription,
  filterSameAs,
  toE164ish,
  truncateTitle,
  BARE_SOCIAL_DEFAULTS,
} from "./seo";

describe("filterSameAs (S-F08)", () => {
  it("drops exact bare-domain defaults and empties", () => {
    const out = filterSameAs([
      "https://instagram.com",
      " https://facebook.com ",
      "",
      null,
      undefined,
      "https://instagram.com/everestelectronic",
    ]);
    expect(out).toEqual(["https://instagram.com/everestelectronic"]);
  });

  it("keeps every value when none match the bare defaults", () => {
    const vals = ["https://instagram.com/everest", "https://youtube.com/@everest"];
    expect(filterSameAs(vals)).toEqual(vals);
    expect(BARE_SOCIAL_DEFAULTS.length).toBe(5);
  });
});

describe("truncateTitle (C-F07)", () => {
  it("returns short titles untouched", () => {
    expect(truncateTitle("Cara merawat AC")).toBe("Cara merawat AC");
  });

  it("cuts at a word boundary under the cap", () => {
    const t = truncateTitle("Tips Memilih AC Inverter yang Efisien untuk Rumah Minimalis Modern", 55);
    expect(t.length).toBeLessThanOrEqual(55);
    expect(t).toBe("Tips Memilih AC Inverter yang Efisien untuk Rumah");
    expect(t.endsWith("Minimalis")).toBe(false);
  });

  it("hard-slices a single token longer than the cap", () => {
    const long = "A".repeat(80);
    expect(truncateTitle(long, 55)).toHaveLength(55);
  });
});

describe("toE164ish (S-F05)", () => {
  it("normalizes landline, whatsapp and already-prefixed numbers", () => {
    expect(toE164ish("021-7329480 / 7344130")).toBeNull(); // dual number — unusable
    expect(toE164ish("021-7329480")).toBe("+62217329480");
    expect(toE164ish("6287732018235")).toBe("+6287732018235");
    expect(toE164ish("+62 877-3201-8235")).toBe("+6287732018235");
    expect(toE164ish("87732018235")).toBe("+6287732018235");
    expect(toE164ish("bukan nomor")).toBeNull();
  });
});

describe("deriveDescription (C-F01)", () => {
  it("uses the article body first, newlines collapsed", () => {
    const d = deriveDescription(
      "AC Anda bocor?\n\nJangan panik. Berikut langkah pertama yang wajib Anda lakukan sebelum menghubungi teknisi.",
      "excerpt",
    );
    expect(d).toBe("AC Anda bocor? Jangan panik. Berikut langkah pertama yang wajib Anda lakukan sebelum menghubungi teknisi.");
  });

  it("truncates to <=155 chars at a word boundary", () => {
    const body = ("kata ".repeat(60)).trim();
    const d = deriveDescription(body, "x");
    expect(d.length).toBeLessThanOrEqual(155);
    expect(d.endsWith("kata")).toBe(true);
  });

  it("falls back to the excerpt for empty content", () => {
    expect(deriveDescription("", "Ringkasan artikel.")).toBe("Ringkasan artikel.");
  });
});
