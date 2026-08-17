# Everest Electronics — Review Target & Requirements

## What this is
A public-facing Next.js 16 (App Router, TypeScript, Tailwind v4) company site for an
air-conditioning & climate-systems business (Everest Electronics), built faithfully from
a Figma design. Primary conversion = WhatsApp. Includes a password-protected admin CMS,
Cloudflare R2 CDN image storage, and a blog with pagination.

## Live URL (deployed on Zeabur)
- `https://everest-electronic.zeabur.app`
- Admin: `/admin` (password-protected cookie session)

## Requirements to review against

1. **RESPONSIVE**: desktop (1440) + mobile (390px) — NO horizontal overflow on any page
   (/, /blog, /blog/[slug], /admin/login).
2. **DESIGN FIDELITY** to Figma `85-538` (everest-desktop-website single-scroll) — 8 sections:
   Hero (HTML `<h1>` title over a SEPARATE clean bg <img>), About/Visi-Misi, Services,
   Our Pride (awards: full-bleed V/H/V image cards, top-aligned), Clients, Blog (cards +
   server-side pagination default 5), Find Us (dark #1c1c1c/#2b2b2b cards + navy #1e4394
   consultation banner), Footer. Exact palette #1e4394 navy, #c5a880 gold, #fafafa,
   #d4d4d4, #1c1c1c; fonts Instrument Sans + Inter. Transparent navbar over dark hero at
   top -> solid #fafaf9 after scrolling.
3. **ENGINEERING/Next 16**: App Router conventions (params/searchParams Promises,
   force-dynamic on DB pages), Prisma 7 + Postgres adapter, server actions with file-level
   "use server", storage facade to R2 (static imports, sharp external), NO client-bundle
   leaks of pg/sharp/fs, build output standalone.
4. **SEO**: metadata (+ OG/Twitter), semantic HTML, robots.txt, sitemap.xml, viewport.
5. **CONVERSION**: WhatsApp CTAs (floating, service, promo, consultation) -> wa.me links.

## Repo / code to review (local, branch main, committed)
`/opt/data/everest-electronics`
Key files: `src/app/**`, `src/components/`, `src/lib/`, `prisma/schema.prisma`,
`next.config.ts`, `Dockerfile`, `zeabur.yaml`.

## Reviewer output format (EVERY finding)
```
## F-<nn> — <SEVERITY>
- **Area:** <routes|components|auth|storage|seo|build|data|naming>
- **What:** <concrete issue, file/route>
- **Why:** <reasoning tied to a requirement>
- **Suggestion:** <what should change>
- **Recommendation:** <concrete fix>
```
Severity: BLOCKER | HIGH | MEDIUM | LOW | NIT
End with `VERDICT: FINDINGS` or `VERDICT: NO_MORE_FINDINGS`.
Be concrete & actionable. Review ONLY against the above requirements.