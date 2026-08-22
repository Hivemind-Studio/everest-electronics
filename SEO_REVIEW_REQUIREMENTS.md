# SEO Review Loop — Requirements (2026-08-22)

## Goal
Iterative SEO improvement of the everest-electronics site, driven by expert
SEO reviewer agents whose findings are then implemented by an engineer agent.
Loop until reviewers report NO_MORE_FINDINGS or 5 iterations max.

## Hard constraints (VIOLATION = finding is invalid)
1. **No visible UI changes.** Zero pixel/layout/color/typography/copy shifts on
   any page. The current design matches Figma node-by-node; that fidelity is
   sacred. Fixes must be invisible to users (meta tags, structured data,
   attributes, server headers/redirects, sitemap/robots entries, alt text on
   decorative images where appropriate, etc.).
2. **No functional regressions.** All routes keep returning 200; nav anchors
   (#layanan/#bisnis/#lokasi) keep working; WhatsApp CTAs keep opening with
   formatted messages; admin CMS keeps working; forms keep submitting.
3. **Stack facts:** Next.js 16 App Router (Turbopack), route group
   `src/app/(site)/` with a shared layout, Prisma 7 + Postgres, R2 CDN assets
   (`cdn.denovamind.com`), deployed at https://everest-electronics.zeabur.app.

## Already implemented (do NOT re-report)
- robots.txt (disallow /admin, +sitemap ref), dynamic sitemap.xml incl. posts
- Per-page canonicals, unique titles via layout template `%s | Everest Electronics`
- OG/Twitter cards sitewide + per-article (article type, publishedTime, images)
- LocalBusiness JSON-LD on home; Article JSON-LD on blog posts
- Meta descriptions on every static page; sr-only h1 on /tentang
- Single h1 per page elsewhere; alt text on content images

## Blog article SEO (explicit user requirement — ALL reviewers must examine)
The blog articles (/blog index + /blog/[slug]) must be SEO-optimized as
content assets, including:
- Article page semantics: h1 = post title, content paragraph structure,
  whether in-article subheadings are possible (content is stored as plain
  text split on blank lines — assess impact + invisible-safe improvements)
- Per-post metadata quality: title/description lengths vs truncation limits
- BreadcrumbList opportunity (Beranda > Berita & Blog > Post Title)
- Related-posts internal linking (getPublishedPosts(3) exists — check anchor
  quality + whether it helps crawl depth)
- Index listing: pagination canonicals, excerpt quality as meta fallback
- Content-rendered images: alt text, sizing attributes, lazy loading
- Author/date signals visible to crawlers (publishedTime exists; byline?)

## Review scope (what TO examine)
- Technical SEO: response headers, caching, redirects (www/non-www, trailing
  slash), status codes, hreflang need, pagination handling (?page=N canonicals
  & rel behavior), 404 page SEO, favicon/icon metadata completeness
- Structured data validity: JSON-LD parses? right schema types? missing
  properties Google rewards (openingHours, geo, aggregateRating if real data
  exists, breadcrumbList on blog posts, WebSite/SearchAction)?
- Content semantics: heading hierarchy beyond h1, image alt quality, link
  quality (nofollow/target for external links), internal linking depth
- Metadata: OG image dimensions/size, twitter:label/value extras, title length,
  description lengths, viewport/theme-color, canonical edge cases
  (/blog?page=2 currently -> /blog)
- Sitemap hygiene: lastModified accuracy, missing routes, changefreq realism
- Performance-adjacent SEO: render-blocking, image sizing attributes, font
  loading, CLS risks that Google's CRuX would see

## Finding format (reviewers MUST use exactly)
```
## F-<nn> — <SEVERITY: BLOCKER|HIGH|MEDIUM|LOW|NIT>
- **What:** <concrete issue, file/route reference>
- **Why:** <SEO impact reasoning>
- **Suggestion:** <what should change>
- **Recommendation:** <concrete implementation, respecting the no-UI-change rule>
```
End the report with `VERDICT: FINDINGS` or `VERDICT: NO_MORE_FINDINGS`.

## Engineer duties
- Implement accepted findings ONLY. May challenge findings with grounds:
  "would change UI", "breaks functionality", "factually wrong about code",
  "no real SEO benefit". Challenges get adjudicated before being dropped.
- Verify each fix: tsc clean, unit tests pass, dev-render check, and confirm
  zero visual diff intent (no className changes affecting appearance).
