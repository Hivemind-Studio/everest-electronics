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
  test("renders Hero section with HTML title + tagline + scroll CTA", async ({ page }) => {
      await page.goto("/");
      const h1 = page.getByRole("heading", { level: 1, name: "EVEREST" });
      await expect(h1).toBeVisible();
      await expect(page.getByRole("link", { name: /Explore Our System/ })).toBeVisible();
      await expect(page.getByText("EST. 1998 — INDONESIA")).toBeVisible();
    });

  test("renders Visi Misi (About) section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Our Vision" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Our Mission" })).toBeVisible();
    await expect(page.getByText("01", { exact: true })).toBeVisible();
    await expect(page.getByText("03", { exact: true })).toBeVisible();
    await expect(page.getByText("Kualitas Layanan yang Konsisten")).toBeVisible();
  });

  test("renders all 4 Services cards", async ({ page }) => {
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

  test("renders Awards section", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Industry Awards" })).toBeVisible();
    await expect(page.getByText("Daikin Platinum Partner")).toBeVisible();
    await expect(page.getByText("2024")).toBeVisible();
  });

  test("renders Clients section with brand list", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /500\+ Mitra/ })).toBeVisible();
    await expect(page.getByText("Daikin", { exact: true })).toBeVisible();
    await expect(page.getByText("Panasonic", { exact: true })).toBeVisible();
    await expect(page.getByText("Samsung", { exact: true })).toBeVisible();
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
    await expect(page.getByRole("heading", { name: /Ciledug/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Gading Serpong/ })).toBeVisible();
    await expect(page.getByText(/021-7329480/).first()).toBeVisible();
    await expect(page.getByText(/\+62 877-3201-8235/).first()).toBeVisible();
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

    // CLEANUP: delete the just-created post so it never pollutes production.
    // We need its id. Look it up from the list row, then delete via the admin UI.
    const row = page.getByRole("row").filter({ hasText: title });
    await expect(row).toBeVisible();
    await row.getByRole("button", { name: "Hapus" }).click();
    // confirm it's gone from the list
    await expect(page.getByRole("row").filter({ hasText: title })).toHaveCount(0);
  });
});

/* =========================================================================
 * 5. DESIGN-SYSTEM compliance (colors per Figma 85-538)
 * =======================================================================*/
test.describe("Figma design system compliance (85-538)", () => {
  test("hero title is a real HTML <h1> element", async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1, name: "EVEREST" });
    await expect(h1).toBeVisible();
    // the h1 is a genuine HTML element (not baked into an image)
    const isHtml = await h1.evaluate((el) => el.tagName === "H1");
    expect(isHtml).toBe(true);
  });

  test("hero background is a separate <img>/<Image> component", async ({ page }) => {
    await page.goto("/");
    // the hero background image exists as a distinct element in the DOM
    const heroSection = page.locator("section").first();
    const bgImg = heroSection.locator("img").first();
    await expect(bgImg).toBeVisible();
    const src = await bgImg.getAttribute("src");
    expect(src).toContain("hero-bg-clean");
  });

  test("hero text uses design colors (gold subtitle, light title)", async ({ page }) => {
    await page.goto("/");
    const title = page.getByRole("heading", { level: 1, name: "EVEREST" });
    const color = await title.evaluate((el) => getComputedStyle(el).color);
    expect(color).toMatch(/rgb\(250, ?250, ?250\)/); // #fafafa

    const subtitle = page.getByText("Electronics & Climate Systems");
    const scolor = await subtitle.evaluate((el) => getComputedStyle(el).color);
    expect(scolor).toMatch(/rgb\(197, ?168, ?128\)/); // #c5a880 gold
  });

  test("services section has dark background (design #1c1c1c)", async ({ page }) => {
    await page.goto("/");
    const servicesHeading = page.getByRole("heading", { name: "Our Professional Services" });
    const section = servicesHeading.locator("xpath=ancestor::section[1]");
    const bg = await section.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).toMatch(/rgb\(28, ?28, ?28\)/); // #1c1c1c
  });

  test("brand copywriting matches Figma exactly", async ({ page }) => {
    await page.goto("/");
    // key copy strings from the 85-538 design
    await expect(page.getByText("EST. 1998 — INDONESIA")).toBeVisible();
    await expect(page.getByText("Pioneering premium air conditioning")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Our Vision" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Industry Awards" })).toBeVisible();
    await expect(page.getByText("500+ Mitra & Official Distributors")).toBeVisible();
    await expect(page.getByText("Find Everest Near You")).toBeVisible();
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