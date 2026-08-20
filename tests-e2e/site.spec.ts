import { test, expect } from "@playwright/test";

const ADMIN_PASSWORD =
  process.env.E2E_ADMIN_PASSWORD || "zV5FiY9UGexN0Tvf34tI7Ac1mhX682au";

/* =========================================================================
 * 1. PUBLIC PAGES — new Figma design sections on home + tentang
 * =======================================================================*/
test.describe("Home page — Figma design sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders Hero section with HTML title + tagline + scroll CTA", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1, name: "EVEREST" });
    await expect(h1).toBeVisible();
    await expect(page.getByText("Electronics", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: /Explore Our System/ })).toBeVisible();
    await expect(page.getByText("EST. 1998 — INDONESIA")).toBeVisible();
  });

  test("renders Retail (Services) section with 4 cards", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Services" })).toBeVisible();
    for (const s of [
      "Jual & Unit Baru",
      "Clean & Service",
      "Tukar Tambah",
      "Corporate HVAC",
    ]) {
      await expect(page.getByRole("heading", { name: s }).first()).toBeVisible();
    }
    await expect(page.getByRole("link", { name: /Learn More/ }).first()).toBeVisible();
  });

  test("renders Official Distributors logo grid", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Official Distributors" })).toBeVisible();
    for (const b of ["Daikin", "Panasonic", "Gree", "Samsung", "LG"])
      await expect(page.getByText(b, { exact: true }).first()).toBeVisible();
  });

  test("renders For Business section with 4 offers", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "For Business" })).toBeVisible();
    for (const o of ["VRV / VRF System", "Chiller AC System", "Ducting AC System", "Ventilation System"]) {
      await expect(page.getByRole("heading", { name: o })).toBeVisible();
    }
  });

  test("renders Clients section with brand list", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /500\+ Mitra/ })).toBeVisible();
    await expect(page.getByText("Daikin", { exact: true })).toBeVisible();
    await expect(page.getByText("Panasonic", { exact: true })).toBeVisible();
  });

  test("renders Find Us section with both branch cards + Hubungi Kami", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Find Us" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Ciledug/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Gading Serpong/ })).toBeVisible();
    await expect(page.getByText(/021-7329480/).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hubungi Kami" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Hubungi Tim Ahli Kami/ }),
    ).toBeVisible();
  });

  test("renders Footer with columns + WhatsApp contact", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("contentinfo").getByText("Layanan", { exact: true })).toBeVisible();
    await expect(page.getByRole("contentinfo").getByText("Bisnis & VRF")).toBeVisible();
    await expect(page.getByRole("contentinfo").getByText("Perusahaan")).toBeVisible();
    await expect(page.getByText(/Copyright © 2026/)).toBeVisible();
  });
});

/* =========================================================================
 * 2. ABOUT page — Visi/Misi + Awards (moved off the landing)
 * =======================================================================*/
test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tentang");
  });

  test("renders Visi + Misi content", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Misi" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Visi" })).toBeVisible();
    await expect(page.getByText("Kualitas Layanan yang Konsisten")).toBeVisible();
  });

  test("renders Awards section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Award" })).toBeVisible();
    await expect(page.getByText("Daikin Platinum Partner")).toBeVisible();
  });
});

/* =========================================================================
 * 3. WHATSAPP CTA links (primary conversion)
 * =======================================================================*/
test.describe("WhatsApp CTAs", () => {
  test("floating WhatsApp button links to wa.me with message", async ({ page }) => {
    await page.goto("/");
    const wa = page.getByRole("link", { name: /Chat WhatsApp/ });
    await expect(wa).toBeVisible();
    const href = await wa.getAttribute("href");
    expect(href).toContain("wa.me/6287732018235");
    expect(href).toContain("text=");
  });

  test("service cards deep-link to WhatsApp with service message", async ({ page }) => {
    await page.goto("/");
    const card = page.getByRole("link", { name: /Clean & Service.*Learn More/ });
    const href = await card.getAttribute("href");
    expect(href).toContain("wa.me/6287732018235");
  });

  test("consultation banner links to WhatsApp", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /Hubungi Tim Ahli Kami/ });
    await expect(cta).toBeVisible();
    expect(await cta.getAttribute("href")).toContain("wa.me");
  });
});

/* =========================================================================
 * 4. BLOG routes
 * =======================================================================*/
test.describe("Blog", () => {
  test("blog index lists seeded posts + Promotion Banner", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: "Berita & Blog" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Promotion Banner" })).toBeVisible();
    await expect(page.getByText("Everest Resmi Menjadi Partner Platinum Daikin")).toBeVisible();
  });

  test("blog detail page renders title + Find More", async ({ page }) => {
    await page.goto("/blog/partner-platinum-daikin");
    await expect(
      page.getByRole("heading", { name: /Everest Resmi Menjadi Partner Platinum Daikin/ }),
    ).toBeVisible();
    await expect(page.getByText(/dengan bangga mengumumkan/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Find More" })).toBeVisible();
  });

  test("unknown slug returns 404 page", async ({ page }) => {
    const resp = await page.goto("/blog/does-not-exist-xyz");
    expect(resp?.status()).toBe(404);
  });
});

/* =========================================================================
 * 5. NAVIGATION — routes + in-page anchors
 * =======================================================================*/
test.describe("Navigation", () => {
  test("nav Tentang Kami routes to /tentang", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Tentang Kami" }).first().click();
    await page.waitForURL(/\/tentang/);
  });

  test("nav Blogs routes to /blog", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Blogs" }).first().click();
    await page.waitForURL(/\/blog/);
  });

  test("Retail anchor scrolls to Services section", async ({ page }) => {
    await page.goto("/#retail");
    await expect(page.getByRole("heading", { name: "Services" })).toBeVisible();
  });
});

/* =========================================================================
 * 6. ADMIN — login + content pages
 * =======================================================================*/
test.describe("Admin", () => {
  test("unauthenticated /admin redirects to login", async ({ page }) => {
    await page.goto("/admin");
    await page.waitForURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: "Everest Electronics" })).toBeVisible();
  });

  test("login with wrong password shows error", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Password Admin").fill("wrong-password");
    await page.getByRole("button", { name: "Masuk" }).click();
    await expect(page.getByText(/Password salah/)).toBeVisible();
  });

  test("login with correct password reaches dashboard", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Password Admin").fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: "Masuk" }).click();
    await page.waitForURL(/\/admin$/);
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  });
});

/* =========================================================================
 * 7. DESIGN-SYSTEM compliance (new Figma design)
 * =======================================================================*/
test.describe("Figma design system compliance", () => {
  test("hero title is a real HTML <h1> element", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1, name: "EVEREST" });
    await expect(h1).toBeVisible();
    const isHtml = await h1.evaluate((el) => el.tagName === "H1");
    expect(isHtml).toBe(true);
  });

  test("hero background is a separate <img>/<Image> component", async ({ page }) => {
    await page.goto("/");
    const heroSection = page.locator("section").first();
    const bgImg = heroSection.locator("img").first();
    await expect(bgImg).toBeVisible();
    const src = await bgImg.getAttribute("src");
    expect(src).toContain("hero-bg-clean");
  });

  test("hero title uses design light color #fafafa", async ({ page }) => {
    await page.goto("/");
    const title = page.getByRole("heading", { level: 1, name: "EVEREST" });
    const color = await title.evaluate((el) => getComputedStyle(el).color);
    expect(color).toMatch(/rgb\(250, ?250, ?250\)/); // #fafafa
  });

  test("Official Distributors section shows brand logo images", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#distributors");
    const logos = section.locator("img");
    await expect(logos.first()).toBeVisible();
    const src = await logos.first().getAttribute("src");
    // next/image optimizes the logo — the original path is URL-encoded in the query
    expect(src).toContain("brand%2Fsamsung");
    expect(src).toContain("brand");
  });

  test("Instrument Sans + Inter fonts loaded", async ({ page }) => {
    await page.goto("/");
    const fonts = await page.evaluate(() =>
      document.fonts ? Array.from(document.fonts).map((f) => f.family) : [],
    );
    expect(fonts.some((f) => /Instrument Sans/i.test(f))).toBe(true);
    expect(fonts.some((f) => /Inter/i.test(f))).toBe(true);
  });
});