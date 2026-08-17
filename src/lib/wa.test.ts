import { describe, it, expect } from "vitest";
import {
  waNumber,
  waLink,
  defaultWaMessage,
  serviceWaMessage,
  consultationWaMessage,
  promoWaMessage,
} from "@/lib/wa";

describe("waNumber", () => {
  it("strips non-digits but keeps country code", () => {
    expect(waNumber("+62 877-3201-8235")).toBe("6287732018235");
    expect(waNumber("021-7329480")).toBe("0217329480");
    expect(waNumber("6287732018235")).toBe("6287732018235");
  });
});

describe("waLink", () => {
  it("builds a wa.me link without message", () => {
    expect(waLink("6287732018235")).toBe("https://wa.me/6287732018235");
  });

  it("encodes the message query param", () => {
    const link = waLink("6287732018235", "Halo Everest, saya ingin bertanya.");
    expect(link).toBe(
      "https://wa.me/6287732018235?text=Halo%20Everest%2C%20saya%20ingin%20bertanya.",
    );
  });

  it("normalizes a formatted number in the link", () => {
    expect(waLink("+62 877-3201-8235")).toBe("https://wa.me/6287732018235");
  });
});

describe("message builders", () => {
  it("default message references the brand", () => {
    expect(defaultWaMessage("Everest Electronics")).toContain("Everest Electronics");
  });

  it("service message includes the service title", () => {
    const m = serviceWaMessage("Everest", "Clean & Service");
    expect(m).toContain("Clean & Service");
  });

  it("consultation and promo messages are present", () => {
    expect(consultationWaMessage("Everest")).toContain("konsultasi");
    expect(promoWaMessage("Everest")).toContain("promo");
  });
});