/* Verify iteration-1 SEO fixes on dev: zero visual delta + new meta present. */
const { chromium } = require("playwright");
const B = "http://localhost:3111";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const out = {};

  // C-F08: footer column title computed style (p now, was h4)
  await page.goto(`${B}/`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("footer");
  out.footerTitleStyle = await page.evaluate(() => {
    const el = [...document.querySelectorAll("footer p")].find((p) => p.textContent.trim() === "Layanan");
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      color: cs.color,
      fontFamily: cs.fontFamily.slice(0, 40),
      marginTop: cs.marginTop,
      marginBottom: cs.marginBottom,
    };
  });

  // T-F01: branded 404
  const r404 = await page.goto(`${B}/this-page-does-not-exist`, { waitUntil: "domcontentloaded" });
  out.notFound = {
    status: r404.status(),
    hasHeader: !!(await page.$("header")),
    hasFooter: !!(await page.$("footer")),
    heading: await page.evaluate(() => document.querySelector("h1")?.textContent?.trim()),
    homeLink: !!(await page.$('a[href="/"]')),
    robots: await page.evaluate(() => document.querySelector('meta[name="robots"]')?.content),
    title: await page.title(),
  };

  // S-F03: Organization + WebSite JSON-LD sitewide
  await page.goto(`${B}/`, { waitUntil: "domcontentloaded" });
  out.jsonLdTypes = await page.evaluate(() =>
    [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((s) => { try { return JSON.parse(s.textContent)["@type"]; } catch { return "PARSE_ERROR"; } })
  );

  // C-F02: anchor targets exist
  out.anchorTargets = await page.evaluate(() => ({
    retail: !!document.getElementById("retail"),
    distributors: !!document.getElementById("distributors"),
    layananGone: !document.getElementById("layanan"),
  }));

  // C-F03: alt text
  out.alts = await page.evaluate(() =>
    [...document.querySelectorAll('section img')].slice(0, 20).map((i) => i.alt).filter(Boolean)
  );

  // Blog post checks: breadcrumb, derived description, time element, capped title, og dims
  await page.goto(`${B}/blog/partner-platinum-daikin`, { waitUntil: "domcontentloaded" });
  out.postMeta = await page.evaluate(() => {
    const desc = document.querySelector('meta[name="description"]')?.content;
    const og = [...document.querySelectorAll('meta[property="og:image"]')].map((m) => m.content)[0];
    const ogW = document.querySelector('meta[property="og:image:width"]')?.content;
    return {
      title: document.title,
      titleLen: document.title.length,
      desc,
      descLen: desc?.length,
      descStartsWithHaloOrContent: desc ? !desc.includes("HEPA") : null,
      breadcrumbInLd: [...document.querySelectorAll('script[type="application/ld+json"]')]
        .some((s) => s.textContent.includes("BreadcrumbList")),
      articleModified: document.querySelector('meta[property="article:modified_time"]')?.content ?? null,
      ogImageWidth: ogW ?? null,
      ogImageIsCover: og?.includes("og-cover") ?? null,
      timeElement: !!document.querySelector("time[datetime]"),
    };
  });

  // B-F01: pagination 404 for out-of-range
  const r2 = await page.goto(`${B}/blog?page=99`, { waitUntil: "domcontentloaded" });
  out.pagination404 = { status: r2.status() };
  const r1 = await page.goto(`${B}/blog`, { waitUntil: "domcontentloaded" });
  out.blogPage1 = { status: r1.status() };

  // T-F06 theme-color + S-F04 og:url on terms
  out.themeColor = await page.evaluate(() =>
    document.querySelector('meta[name="theme-color"]')?.content ?? null);
  await page.goto(`${B}/terms`, { waitUntil: "domcontentloaded" });
  out.termsOgUrl = await page.evaluate(() =>
    document.querySelector('meta[property="og:url"]')?.content ?? null);

  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => { console.error("PROBE FAILED:", e.message); process.exit(1); });
