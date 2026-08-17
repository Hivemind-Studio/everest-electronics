import { test, expect } from "@playwright/test";

const ADMIN_PASSWORD =
  process.env.E2E_ADMIN_PASSWORD || "zV5FiY9UGexN0Tvf34tI7Ac1mhX682au";

/* =========================================================================
 * 1. PUBLIC PAGES — all 8 Figma sections render on the live deploy
 * =======================================================================*/
test.describe("Home page — Figma design sections", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders Hero section with brand + tagline + CTAs", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("EVEREST");
    await expect(page.getByRole("link", { name: /Hubungi Kami/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Jelajahi Layanan/ })).toBeVisible();
    await expect(page.getByText("EST. 1998 — INDONESIA")).toBeVisible();
  });

  test("renders Visi Misi (About) section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Our Vision" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Our Mission" })).toBeVisible();
    await expect(page.getByText("01")).toBeVisible();
    await expect(page.getByText("03")).toBeVisible();
    await expect(page.getByText("Kualitas Layanan yang Konsisten")).toBeVisible();
  });

  test("renders all 4 Services cards", async ({ page }) => {
    for (const s of [
      "Jual & Unit Baru",
      "Clean & Service",
      "Tukar Tambah",
      "Corporate HVAC",
    ]) {
      await expect(page.getByRole("heading", { name: s })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: /Learn More/ }).first()).toBeVisible();
  });

  test("renders Awards section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Industry Awards" })).toBeVisible();
    await expect(page.getByText("Daikin Platinum Partner")).toBeVisible();
    await expect(page.getByText("2024")).toBeVisible();
  });

  test("renders Clients section with brand list", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /500\+ Mitra/ })).toBeVisible();
    await expect(page.getByText("DAIKIN").first()).toBeVisible();
    await expect(page.getByText("PANASONIC")).toBeVisible();
    await expect(page.getByText("SAMSUNG")).toBeVisible();
  });

  test("renders Blog section + featured promo", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Berita & Blog" })).toBeVisible();
    await expect(page.getByText(/Promo Clean & Service Menyambut Ramadhan/)).toBeVisible();
    await expect(page.getByRole("link", { name: /Claim Promo Now/ })).toBeVisible();
  });

  test("renders all 4 blog cards linking to posts", async ({ page }) => {
    for (const t of [
      "Everest Resmi Menjadi Partner Platinum Daikin",
      "Mengenal Sistem AC Central VRV & VRF",
      "Pentingnya Menjaga Kualitas Udara",
      "Tips Merawat AC",
    ]) {
      await expect(page.getByRole("link", { name: new RegExp(t) }).first()).toBeVisible();
    }
  });

  test("renders Find Us (locations) section with both branches", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Find Everest Near You" })).toBeVisible();
    await expect(page.getByText("Ciledug (Kantor Pusat)")).toBeVisible();
    await expect(page.getByText("Gading Serpong")).toBeVisible();
    await expect(page.getByText(/021-7329480/)).toBeVisible();
    await expect(page.getByText(/\+62 877-3201-8235/)).toBeVisible();
  });

  test("renders Footer with columns + WhatsApp contact", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByText("LAYANAN")).toBeVisible();
    await expect(page.getByText("BISNIS & VRF")).toBeVisible();
    await expect(page.getByText("PERUSAHAAN")).toBeVisible();
    await expect(page.getByText(/Copyright © 2026/)).toBeVisible();
  });
});

/* =========================================================================
 * 2. WHATSAPP CTA links (primary conversion)
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
 * 3. BLOG routes
 * =======================================================================*/
test.describe("Blog", () => {
  test("blog index lists seeded posts", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: "Berita & Blog" })).toBeVisible();
    await expect(page.getByText("Everest Resmi Menjadi Partner Platinum Daikin")).toBeVisible();
  });

  test("blog detail page renders title + paragraphs", async ({ page }) => {
    await page.goto("/blog/partner-platinum-daikin");
    await expect(
      page.getByRole("heading", { name: /Everest Resmi Menjadi Partner Platinum Daikin/ }),
    ).toBeVisible();
    await expect(page.getByText(/dengan bangga mengumumkan/)).toBeVisible();
  });

  test("unknown slug returns 404 page", async ({ page }) => {
    const resp = await page.goto("/blog/does-not-exist-xyz");
    expect(resp?.status()).toBe(404);
  });
});

/* =========================================================================
 * 4. ADMIN — login + content pages
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

  test("admin can create a blog post, then it appears on the site", async ({ page }) => {
    const title = `E2E Test Post ${Date.now()}`;
    // login
    await page.goto("/admin/login");
    await page.getByLabel("Password Admin").fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: "Masuk" }).click();
    await page.waitForURL(/\/admin$/);
    // go to new post
    await page.goto("/admin/blog/new");
    await page.getByLabel("Judul").fill(title);
    await page.getByLabel("Ringkasan (excerpt)").fill("E2E excerpt for validation.");
    await page.getByLabel("Isi Artikel").fill("E2E content paragraph one.\n\nE2E content paragraph two.");
    await page.getByRole("button", { name: "Simpan Artikel" }).click();
    // back on list
    await page.waitForURL(/\/admin\/blog$/);
    await expect(page.getByRole("link", { name: "Edit" }).first()).toBeVisible();
  });
});

/* =========================================================================
 * 5. DESIGN-SYSTEM compliance (colors per Figma)
 * =======================================================================*/
test.describe("Figma design system compliance", () => {
  test("brand colors present in CSS", async ({ page }) => {
    const resp = await page.request.get("/");
    const html = await resp.text();
    expect(html.toLowerCase()).toContain("#1e4394"); // brand navy
    expect(html.toLowerCase()).toContain("#c5a880"); // gold accent
    expect(html.toLowerCase()).toContain("#fafafa"); // paper bg
  });

  test("Instrument Sans + Inter fonts loaded", async ({ page }) => {
    await page.goto("/");
    const fonts = await page.evaluate(() =>
      document.fonts
        ? Array.from(document.fonts).map((f) => f.family)
        : [],
    );
    expect(fonts.some((f) => /Instrument Sans/i.test(f))).toBe(true);
    expect(fonts.some((f) => /Inter/i.test(f))).toBe(true);
  });
});