/* Nav feel probe: click -> URL commit -> new content paint, + shell-remount detection.
   Measures BEFORE (old prod) and AFTER (new deploy) for comparison. */
const { chromium } = require("playwright");

const BASE = process.env.PROBE_BASE_URL || "https://everest-electronics.zeabur.app";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const results = [];
  const nav = async (from, href, marker) => {
    await page.goto(`${BASE}${from}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForSelector("header nav", { timeout: 30000 });
    // let React finish hydrating so the click goes through the app router
    // (clicking earlier falls back to a full browser navigation - probe artifact)
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.evaluate(() => document.querySelector("header")?.setAttribute("data-probe", "marked"));
    const t0 = Date.now();
    await page.click(`nav[aria-label="Utama"] a[href="${href}"]`, { timeout: 30000 });
    let urlMs = null;
    try {
      await page.waitForURL((u) => u.pathname === href, { timeout: 25000 });
      urlMs = Date.now() - t0;
    } catch { /* anchor/same-path case */ }
    await page.waitForSelector(marker, { timeout: 30000 });
    results.push({
      nav: `${from} -> ${href}`,
      urlCommitMs: urlMs,
      contentMs: Date.now() - t0,
      shellPersisted: await page.evaluate(
        () => document.querySelector("header")?.getAttribute("data-probe") === "marked"
      ),
    });
  };

  await nav("/", "/blog", 'h1:has-text("Berita")');
  await nav("/blog", "/tentang", 'h3:has-text("Visi")');
  await nav("/tentang", "/blog", 'h1:has-text("Berita")');
  await nav("/", "/tentang", 'h3:has-text("Visi")');

  console.log(`=== ${BASE} ===`);
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})().catch((e) => {
  console.error("PROBE FAILED:", e.message);
  process.exit(1);
});
