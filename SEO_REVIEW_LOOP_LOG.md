# SEO Review Loop Log — everest-electronics

Started: 2026-08-22. Max 5 iterations or NO_MORE_FINDINGS.
Requirements: see SEO_REVIEW_REQUIREMENTS.md (hard rule: no UI changes, no
functional regressions).

## Iteration 1 — Reviewers: technical, structured-data, content-semantics (+ blog specialist pending)

### Accepted → engineer
| ID | Sev | Area | What (short) | Fix |
|----|-----|------|--------------|-----|
| T-F01 | HIGH | 404 | stock Next 404, no chrome/home link, dup homepage title | branded src/app/not-found.tsx, keeps 404+noindex |
| T-F02 | MED | sitemap | /tentang /terms /privacy missing | added, yearly p0.3 |
| T-F03 | MED | sitemap | lastmod=new Date() always-now | truthful: max(post.updatedAt) |
| T-F04 | LOW | canonical | ?page=N unconditional -> /blog | page-aware generateMetadata |
| T-F05 | LOW | caching | /images + favicon max-age=0 | next.config headers() (verify metadata routes honor it) |
| T-F06/B-F07b | NIT | meta | no theme-color | viewport export, brand navy #182a3a |
| S-F01 | HIGH | LocalBusiness | no address/image/sameAs/extra contactPoints | enrich from Branch+settings already on page |
| S-F02 | HIGH | og:image | 3/4 post covers 264x176 (<600px) unusable for cards | code guardrail: cached sharp dim-check, fallback og-cover, emit width/height |
| S-F03 | MED | schemas | no Organization/WebSite sitewide, no BreadcrumbList on posts | layout JSON-LD + per-post breadcrumb |
| S-F04 | MED | OG merge | blog routes drop siteName/locale; /blog twitter card generic; terms/privacy/tentang og:url=home | carry fields explicitly, per-route og:url |
| S-F05 | MED | LocalBusiness validity | `founded` invalid prop; phone not E.164 | foundingDate + ContactPoint array |
| S-F06 | LOW | Article | publisher.logo = banner, no dims | apple-icon.png 180x180 + width/height |
| S-F07a | LOW | meta | no article:modified_time | openGraph.modifiedTime from updatedAt |
| S-F08 | NIT | sameAs | placeholder socials would pollute sameAs | filter exact bare-domain defaults |
| C-F01 | HIGH | descriptions | meta desc contradicts article topic on 3/4 posts (raw excerpt) | derive first ~155ch of content, fallback excerpt |
| C-F02+F11 | MED | anchors | footer /#retail x4 + /#distributors targets don't exist | add id="retail"/id="distributors" to home sections (attr-only) |
| C-F03 | MED | alt text | img4/img5/img6 meaningless; lowercase keys | {key,label} pairs, proper names (verify Reiwa claim) |
| C-F07 | LOW | titles | post titles 67-72ch truncated in SERP | meta title capped independently of visible H1 |
| C-F08 | LOW | headings | footer h4 skips levels | h4->p same classes + screenshot-diff verify |
| C-F09b | LOW | rel | noopener vs noopener noreferrer inconsistency | standardize external CTAs |
| B-F01* | HIGH | pagination | clamp-before-query + notFound for out-of-range (LATE ADDITION) | see blog addenda below |
| B-F04* | MED | slugs | updatePost keeps prev.slug unless explicit (LATE ADDITION) | see blog addenda below |
| B-F06* | LOW | dates | <time datetime> wrapper, identical text/classes (LATE ADDITION) | see blog addenda below |

### Escalated to owner (visible/content — NOT auto-fixed)
| ID | Sev | Item | Needed from owner |
|----|-----|------|-------------------|
| C-F04 | MED | placeholder headings: "Quote Dari Founder or Owner" (/tentang), "Promotion Banner" (/blog carousel), "Find More" (posts) | approve real copy (founder quote, campaign title, "Artikel Lainnya"?) |
| C-F06 | MED | article bodies 61-91 words — thin content | write/expand real articles via admin CMS |
| S-F02a | HIGH | 3/4 post covers 264x176 — social cards broken | re-upload covers >=1200px wide via admin |
| C-F09a | LOW | footer social links are bare platform homepages | set real profile URLs in admin Settings |

### Overruled / deferred
| ID | Item | Grounds |
|----|------|---------|
| T-F07 | 302 vs 301 + HSTS | platform-edge behavior; .app TLD is HSTS-preloaded; app-level hacks risk chains — accept |
| C-F05 | h2-before-h1 on /blog carousel | rides on C-F04 copy decision; DOM move risks visuals — defer |
| C-F10 | terms/privacy orphan-thin | accepted state for legal pages |

### Blog specialist addenda (iteration 1, late report)
| ID | Sev | Area | What (short) | Disposition | Fix |
|----|-----|------|--------------|-------------|-----|
| B-F01 | HIGH | pagination | clamp-after-query: ?page=2 returns 200 EMPTY grid (comment-vs-code bug) + canonicals to /blog while empty | ACCEPTED (added to engineer work order) | clamp before query; notFound()/redirect for out-of-range |
| B-F02 | HIGH | excerpts | 2 posts' excerpts describe wrong topic; propagate to meta/OG/JSON-LD; all 4 too short (84-88ch) | DATA FIX ESCALATED to owner (admin edit); code fallback covered by C-F01 | owner rewrites excerpts via /admin/blog |
| B-F03 | MED | breadcrumbs | no BreadcrumbList on posts | DUPLICATE of S-F03 | closed |
| B-F04 | MED | slugs | updatePost always re-slugs from title -> silent URL change on title edit, no redirects | ACCEPTED (added) | keep prev.slug unless explicit; redirect pair if changed |
| B-F05 | MED | thin content | 61-91 words, flat paragraphs, no subheading support | DUP of C-F06 (escalated) + renderer '## '->h2 flagged for approval | deferred to owner |
| B-F06 | LOW | dates | plain <p> date, no <time datetime> | ACCEPTED (added) | wrap in <time> identical text/classes |
| B-F07 | LOW | related posts | fetches newest 3 not excluding self -> only 2 cards on 3 of 4 posts | DEFERRED to owner (adds a visible 3rd card = UI change) | owner decides; query-exclusion ready |
| B-F08 | LOW | titles | post titles 67-72ch | DUPLICATE of C-F07 | closed |
| B-F09 | NIT | og:image dims | no width/height on post og:image/JSON-LD image | MERGED into S-F02 implementation | dims emitted when known |

## Iteration 1 — Engineer phase COMPLETE (verified by orchestrator)

Engineer applied 19/19 with zero challenges; ran out of iterations partway —
orchestrator finished the remaining 8 items directly:
- id="retail" on home Layanan section (C-F02 complete)
- /tentang DISTRIBUTOR_LOGOS -> {key,label}[] (C-F03 complete)
- Footer h4->p same classes (C-F08) — computed-style probe: P tag,
  18px/700/22px line-height, identical color/font/margins = zero visual delta
- rel="noopener noreferrer" standardized x8 across 5 files (C-F09b)
- Organization + WebSite JSON-LD in (site)/layout.tsx, sameAs filtered (S-F03)
- per-route og:url for terms/privacy/tentang (S-F04)
- removed unused BRAND_ASSETS import
- imageMeta fallback now emits known 1200x630 dims

### Verification evidence (dev, Playwright-measured)
- 404: status 404, branded header/footer/home-link, robots noindex, unique title
- JSON-LD types on home: Organization, WebSite, LocalBusiness (all parse)
- Anchor targets: #retail + #distributors exist; footer links resolve
- Alt text: Samsung/Reiwa/Aqua/... proper names live
- Post page: meta desc derived from content (153ch, topic-correct),
  BreadcrumbList present, article:modified_time present, og:image falls back
  to cover WITH width=1200 height=630 (undersized CDN art rejected), <time>
  element present
- /blog?page=99 -> 404; /blog -> 200
- theme-color #182a3a; terms og:url matches canonical
- tsc clean; 24/24 vitest (15 existing + 9 new seo tests); lint 0 errors

## Owner decisions still open (visible/content changes)
1. C-F04 placeholder headings ("Quote Dari Founder or Owner", "Promotion
   Banner", "Find More") — approve replacement copy
2. C-F06/B-F05 thin articles (61-91 words) — expand via admin CMS; optional
   '## '->h2 renderer support needs approval
3. S-F02a undersized post covers (3 of 4 at 264x176) — re-upload >=1200px
4. B-F02 wrong-topic excerpts (2 posts) + short descriptions (all 4) — rewrite
   via /admin/blog (~120-155 chars)
5. C-F09a bare social homepage links — set real profile URLs in Settings
6. B-F07 related-posts shows 2 cards not 3 — approve the query fix that adds
   a visible third card

## Iteration 2
Deploy iteration 1, then re-dispatch reviewers with this log. Reviewers must
not re-report fixed items or owner-decision items.
