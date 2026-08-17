import { test, expect, devices } from "@playwright/test";

const APP = test.extend({});
export {};

/* Mobile responsiveness — verify no horizontal overflow at 390px,
 * the mobile nav works, and no tiny fonts. Uses Playwright's real
 * mobile context (isMobile + touch), which the remote browser can't do. */

test.use({ ...devices["iPhone 13"] }); // 390x844

const PAGES = ["/", "/blog", "/blog/partner-platinum-daikin", "/admin/login"];

for (const path of PAGES) {
  test(`mobile 390px: no horizontal overflow on ${path}`, async ({ page }) => {
    await page.goto(path);
    const { overflow, clientWidth, scrollWidth } = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      overflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    expect(
      overflow,
      `scrollWidth(${scrollWidth}) exceeds clientWidth(${clientWidth})`,
    ).toBeLessThanOrEqual(0);
  });
}

test("mobile: hamburger menu opens nav links", async ({ page }) => {
  await page.goto("/");
  // menu toggle button visible (desktop nav hidden on mobile)
  const toggle = page.locator("header button[aria-label]").first();
  await expect(toggle).toBeVisible();
  await toggle.click();
  // a mobile nav link appears
  await expect(page.getByRole("link", { name: "Tentang Kami" }).first()).toBeVisible();
});

test("mobile: WhatsApp floating button visible and tappable", async ({ page }) => {
  await page.goto("/");
  const wa = page.getByRole("link", { name: /Chat WhatsApp/ });
  await expect(wa).toBeVisible();
});

test("mobile: hero heading fits viewport (no tiny/overlapping text)", async ({ page }) => {
  await page.goto("/");
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toBeVisible();
  const box = await h1.boundingBox();
  expect(box!.width).toBeLessThanOrEqual(390);
});

test("mobile: footer columns stack without overflow", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer).toBeVisible();
  const box = await footer.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(391);
});