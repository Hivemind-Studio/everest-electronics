import { test, expect } from "@playwright/test";

const ADMIN_PASSWORD =
  process.env.E2E_ADMIN_PASSWORD || "zV5FiY9UGexN0Tvf34tI7Ac1mhX682au";

/* =========================================================================
 * 1. HOME — Final design sections
 * =======================================================================*/
test.describe("Home page — Final design sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders Hero section with HTML title + CTAs + est line", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1, name: "Your One Stop AC Solution" });
    await expect(h1).toBeVisible();
    await expect(page.getByRole("link", { name: /Lihat Layanan/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Kenali Kami/ })).toBeVisible();
    await expect(page.getByText("EST. 1998 — INDONESIA")).toBeVisible();
  });

  test("renders Layanan Kami section with 3 service cards", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Layanan Kami/ })).toBeVisible();
    for (const s of ["Beli AC", "Cleaning & Service", "Tukar Tambah"]) {
      await expect(page.getByRole("heading", { name: s }).first()).toBeVisible();
    }
  });

  test("renders Official Distributor Of Top Brands aqua band with logos", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Official Distri/ })).toBeVisible();
    // distributor logos present in the aqua section
    const band = page.locator("section.bg-\\[\\#e8fbf8\\]").first();
    await expect(band.locator("img").first()).toBeVisible();
  });

  test("renders Untuk Bisnis section with 4 offers", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Untuk Bisnis/ })).toBeVisible();
    for (const o of ["VRV / VRF System", "Chiller AC System", "Ducting AC System", "Ventilation System"]) {
      await expect(page.getByRole("heading", { name: o })).toBeVisible();
    }
  });

  test("renders Dipercaya oleh 500+ Mitra Ternama partner band", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /500\+ Mitra Ternama/ })).toBeVisible();
    await expect(page.getByText("Sinarmas Land")).toBeVisible();
  });

  test("renders Temukan Kami section with branch cards + contact", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Temukan Kami/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Ciledug/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Gading Serpong/ })).toBeVisible();
    // contact sidebar present
    await expect(page.getByText("Corporate Inquiries")).toBeVisible();
  });

  test("renders Footer with columns + WhatsApp contact", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("contentinfo").getByText("Layanan", { exact: true })).toBeVisible();
    await expect(page.getByRole("contentinfo").getByText("Bisnis & VRF")).toBeVisible();
    await expect(page.getByRole("contentinfo").getByText("Perusahaan")).toBeVisible();
    await expect(page.getByText(/Copyright © 2026/)).toBeVisible();
    // legal links restored to the bottom bar
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Syarat & Ketentuan" })).toHaveAttribute("href", /\/terms$/);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Kebijakan Privasi" })).toHaveAttribute("href", /\/privacy$/);
  });
});

/* =========================================================================
 * 2. ABOUT — Visi/Misi + Penghargaan
 * =======================================================================*/
test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tentang");
  });

  test("renders Visi + Misi + founder quote", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Visi" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Misi" })).toBeVisible();
    await expect(page.getByText("Kualitas Layanan yang Konsisten")).toBeVisible();
  });

  test("renders Penghargaan Kami section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Penghargaan/ })).toBeVisible();
    await expect(page.getByText("Daikin Platinum Partner")).toBeVisible();
  });
});

/* =========================================================================
 * 3. WHATSAPP CTA links
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

  test("service card links to WhatsApp with message", async ({ page }) => {
    await page.goto("/");
    const card = page.getByRole("link", { name: /Beli AC/ });
    const href = await card.getAttribute("href");
    expect(href).toContain("wa.me/6287732018235");
  });

  test("Temukan section shows Buka di Peta + contact + map", async ({ page }) => {
    await page.goto("/");
    // Buka di Peta links to the branch map location
    const mapLink = page.getByRole("link", { name: /Buka di Peta/ }).first();
    await expect(mapLink).toBeVisible();
    const href = await mapLink.getAttribute("href");
    expect(href).toContain("google.com/maps");
    // contact panel present
    await expect(page.getByText("Cleaning & Service Hotline")).toBeVisible();
    // real Google Maps embed present
    await expect(page.locator("iframe[src*='google.com/maps']").first()).toBeVisible();
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

  test("blog detail page renders title + Find More + Temukan Kami", async ({ page }) => {
    await page.goto("/blog/partner-platinum-daikin");
    await expect(
      page.getByRole("heading", { name: /Everest Resmi Menjadi Partner Platinum Daikin/ }),
    ).toBeVisible();
    await expect(page.getByText(/dengan bangga mengumumkan/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Find More" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Temukan Kami/ })).toBeVisible();
  });

  test("unknown slug returns 404 page", async ({ page }) => {
    const resp = await page.goto("/blog/does-not-exist-xyz");
    expect(resp?.status()).toBe(404);
  });
});

/* =========================================================================
 * 5. NAVIGATION
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

  test("Layanan anchor scrolls to Layanan Kami section", async ({ page }) => {
    await page.goto("/#layanan");
    await expect(page.getByRole("heading", { name: /Layanan Kami/ })).toBeVisible();
  });
});

/* =========================================================================
 * 6. ADMIN
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
 * 7. DESIGN-SYSTEM compliance (Final design)
 * =======================================================================*/
test.describe("Figma design system compliance", () => {
  test("hero title is a real HTML <h1> element", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1, name: "Your One Stop AC Solution" });
    await expect(h1).toBeVisible();
    const isHtml = await h1.evaluate((el) => el.tagName === "H1");
    expect(isHtml).toBe(true);
  });

  test("hero uses dark ink text on the light background", async ({ page }) => {
    await page.goto("/");
    const title = page.getByRole("heading", { level: 1, name: "Your One Stop AC Solution" });
    const color = await title.evaluate((el) => getComputedStyle(el).color);
    // Instrument Sans ink #1c1c1c => rgb(28, 28, 28)
    expect(color).toMatch(/rgb\(28, ?28, ?28\)/);
  });

  test("distributor logos are brand images in the aqua band (from CDN)", async ({ page }) => {
    await page.goto("/");
    const band = page.locator("section.bg-\\[\\#e8fbf8\\]").first();
    const logos = band.locator("img");
    await expect(logos.first()).toBeVisible();
    const src = await logos.first().getAttribute("src");
    // served from the CDN (everest-electronics prefix) — Figma asset, not local
    expect(src).toContain("cdn.denovamind.com");
    expect(src).toContain("everest-electronics");
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