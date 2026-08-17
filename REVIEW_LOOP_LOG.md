# Review Loop Log — Everest Electronics (Iteration 1)

## Findings (deduplicated across 3 senior engineers)

| ID | Sev | Area | What | Disposition |
|----|-----|------|------|-------------|
| F-01 | HIGH | security | `.zeabur-token` tracked in git (credential leak) | ACCEPT — untrack + gitignore |
| F-02 | HIGH | auth | No mutating server action calls requireAuth() (only layout guard) | ACCEPT — add guard to each actions.ts |
| F-03 | MEDIUM | storage | upload route validates ext only, sizes after buffering | ACCEPT — magic-byte check + pre-buffer size cap |
| F-04 | HIGH | seo | robots.txt + sitemap.xml missing (404) | ACCEPT — add robots.ts + sitemap.ts |
| F-05 | MEDIUM | seo | no OG/Twitter metadata anywhere | ACCEPT — add openGraph/twitter to layout + per-post |
| F-06 | MEDIUM | data | blog slug uniqueness not handled (500 on collision) | ACCEPT — suffix on collision |
| F-07 | LOW | components | blog pages pass branches=[] to Footer (WA strip missing) | ACCEPT — pass real branches / fetch in Footer |
| F-08 | LOW | data | /blog?page=999 renders empty neither clamped before query | ACCEPT — clamp before query |
| F-09 | LOW | data | heroTitle/eyebrow/tagline editable but not consumed (no-op) | ACCEPT — use settings in hero |
| F-10 | NIT | data | createBranch omits mapUrl | ACCEPT — add field |
| F-11 | NIT | storage | delete actions leave orphaned R2 objects | ACCEPT — deleteFile on remove |
| F-12 | NIT | build | Dockerfile `npm install ||` un-reproducible | ACCEPT — switch to npm ci |
| F-13 | MEDIUM | components | nav "Project" button hardcodes cdn.denovamind.com (dead) | ACCEPT — configurable projectsUrl setting |

## Deduped / merged (not separate items)
- OG/Twitter: E1-F05 = E2-F03 = E3-F03 → F-05
- robots+sitemap: E1-F04 = E3-F01/F02 → F-04
- pagination clamp: E1-F08 = E2-F02 → F-08
- duplicate nav anchors (Retail/Bisnis→#layanan, Kontak/Temukan→#lokasi): E2-F05 = E3-F06 → LOW/NIT — **CHALLENGE**: labels are intentional per Figma 6-item set; same-section anchors are design-inherited. Keep labels; add distinct sub-anchor targets where a section truly has distinct subsections (services: Retail vs Bisnis are the same 4 cards; contact vs map same block). Deferred — no functional harm.
- Footer Terms/Privacy href="#" + "Mitra"→/#blog: E2-F04 → NIT ACCEPT (point to real routes/section); will implement /terms /privacy stubs.

## Pending (deferred / blocked)
- Rewriting git history (filter-repo) for `.zeabur-token` — needs force-push of main; NOT auto-executed (destructive). Will untrack (git rm --cached) + gitignore, and NOTE rotation is required. Token already rotated perception: user should rotate in Zeabur console regardless.