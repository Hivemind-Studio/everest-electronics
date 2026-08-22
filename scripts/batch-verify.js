/* Batch verification of the 13 UI fixes on the dev server. */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const B = "http://localhost:3111";
  const out = {};

  // 1+2: navbar logo-only + Project CTA
  await page.goto(`${B}/`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("header");
  out.navLogoOnly = await page.evaluate(() => {
    const link = document.querySelector('header a[href="/"]');
    const hasText = link && link.textContent.trim().length > 0;
    return { hasBrandText: !!hasText, ariaLabel: link?.getAttribute("aria-label") };
  });
  out.ctaText = await page.evaluate(() => {
    const links = [...document.querySelectorAll('header a')];
    const cta = links.reverse().find((a) => a.textContent.trim() === "Project");
    return cta?.textContent.trim();
  });

  // 4: hero subtitle on first screen (no scroll)
  out.hero = await page.evaluate(() => {
    const sub = [...document.querySelectorAll("p")].find((p) => p.textContent.includes("EST."));
    if (!sub) return null;
    const r = sub.getBoundingClientRect();
    return { subtitleTop: Math.round(r.top), subtitleBottom: Math.round(r.bottom), viewportH: innerHeight, onFirstScreen: r.bottom <= innerHeight && r.top >= 0 };
  });

  // 5: distributor grid 3 cols
  out.dist = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('section img[alt="samsung"], section img[alt="aqua"]')];
    if (imgs.length === 0) return null;
    const s = imgs.find((i) => i.alt === "samsung").getBoundingClientRect();
    const a = imgs.find((i) => i.alt === "aqua").getBoundingClientRect();
    return { sameRowAsSamsung: Math.abs(s.top - a.top) < 5, samsungX: Math.round(s.x), aquaX: Math.round(a.x) };
  });

  // 6-10: titles two rows
  const twoRow = async (text) => page.evaluate((t) => {
    const h2 = [...document.querySelectorAll("h2")].find((h) => h.textContent.replace(/\s+/g, " ").trim().toLowerCase().includes(t));
    if (!h2) return null;
    const r = h2.getBoundingClientRect();
    const lh = parseFloat(getComputedStyle(h2).lineHeight) || parseFloat(getComputedStyle(h2).fontSize) * 1.2;
    return { rows: Math.round(r.height / lh), height: Math.round(r.height) };
  }, text);
  out.titles = {
    layanan: await twoRow("layanan"),
    bisnis: await twoRow("untuk"),
    berita: await twoRow("berita"),
    temukan: await twoRow("temukan"),
  };

  // 8: layanan card height
  out.layananCard = await page.evaluate(() => {
    const card = document.querySelector('#layanan a[href*="wa.me"], #layanan a[href*="wa.link"], #layanan a[target="_blank"]');
    return card ? { h: Math.round(card.getBoundingClientRect().height) } : null;
  });

  // 13: awards rows on /tentang
  await page.goto(`${B}/tentang`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#penghargaan");
  out.awards = await page.evaluate(() => {
    const sec = document.querySelector("#penghargaan");
    const title = [...sec.querySelectorAll("h2")][0];
    const grid = sec.querySelector(".space-y-\\[71px\\]");
    const rows = grid ? grid.children.length : 0;
    const vCard = grid?.querySelector(".aspect-\\[286\\/429\\]");
    const hCard = grid?.querySelector(".aspect-\\[511\\/286\\]");
    return {
      titleText: title?.textContent.trim().slice(0, 30),
      titleWraps2: title ? title.getBoundingClientRect().height > 100 : false,
      rows,
      hasV: !!vCard,
      hasH: !!hCard,
      hOffset: hCard ? Math.round(hCard.getBoundingClientRect().top - (grid.querySelector(".aspect-\\[286\\/429\\]")?.getBoundingClientRect().top ?? 0)) : null,
    };
  });

  // 12: tentang hero height
  out.tentangHero = await page.evaluate(() => {
    const sec = document.querySelector("section");
    return { h: Math.round(sec.getBoundingClientRect().height), viewport: innerHeight };
  });

  // 11: scroll reset — scroll home to bottom, click Blogs, check scrollY
  await page.goto(`${B}/`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("header");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);
  await page.click('nav[aria-label="Utama"] a[href="/blog"]');
  await page.waitForURL("**/blog");
  await page.waitForTimeout(1500);
  out.scrollReset = await page.evaluate(() => ({ scrollY: Math.round(window.scrollY) }));

  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error("PROBE FAILED:", e.message); process.exit(1); });
