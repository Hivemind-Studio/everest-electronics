/* Navigation feel probe: verifies client-side transitions keep the shell mounted. */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const results = [];
  const nav = async (from, clickSelector, toPath) => {
    await page.goto(`http://localhost:3111${from}`, { waitUntil: "networkidle" });
    // tag the CURRENT header DOM node so we can detect a full remount
    await page.evaluate(() => {
      document.querySelector("header")?.setAttribute("data-probe", "marked");
    });
    const t0 = Date.now();
    await page.click(clickSelector);
    await page.waitForURL(`**${toPath}**`, { timeout: 20000 });
    // wait for the new page's main content to paint
    await page.waitForLoadState("networkidle");
    const ms = Date.now() - t0;
    const stillMounted = await page.evaluate(
      () => document.querySelector("header")?.getAttribute("data-probe") === "marked"
    );
    const headerCount = await page.evaluate(() => document.querySelectorAll("header").length);
    results.push({
      nav: `${from} -> ${toPath}`,
      ms,
      shellPersisted: stillMounted,
      headerCount,
    });
  };

  await nav("/", 'nav[aria-label="Utama"] >> text=Blogs', "/blog");
  await nav("/blog", 'nav[aria-label="Utama"] >> text=Tentang Kami', "/tentang");
  await nav("/tentang", 'nav[aria-label="Utama"] >> text=Blogs', "/blog");

  console.log(JSON.stringify(results, null, 2));

  // also verify hash-anchor links from another page still work
  await page.goto("http://localhost:3111/blog", { waitUntil: "networkidle" });
  await page.click('footer a[href="/terms"]');
  await page.waitForURL("**/terms**", { timeout: 20000 });
  console.log("footer legal link nav OK:", page.url());

  await browser.close();
})().catch((e) => {
  console.error("PROBE FAILED:", e.message);
  process.exit(1);
});
