import { describe, it, expect } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Everest Resmi Jadi Partner")).toBe("everest-resmi-jadi-partner");
  });

  it("strips non-alphanumeric chars (except hyphen)", () => {
    expect(slugify("AC Central VRV & VRF!")).toBe("ac-central-vrv-vrf");
  });

  it("collapses multiple spaces/underscores/dashes", () => {
    expect(slugify("Tips  Merawat   AC")).toBe("tips-merawat-ac");
    expect(slugify("A---B___C")).toBe("a-b-c");
  });

  it("handles Indonesian text", () => {
    expect(slugify("Menjaga Kualitas Udara di Masa Transisi")).toBe(
      "menjaga-kualitas-udara-di-masa-transisi",
    );
  });

  it("returns empty for empty input", () => {
    expect(slugify("")).toBe("");
    expect(slugify("   ")).toBe("");
  });
});