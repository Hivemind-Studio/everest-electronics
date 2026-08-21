import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getPublishedPostsPage, getBranches } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";
import { waLink, promoWaMessage, consultationWaMessage } from "@/lib/wa";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Berita & Blog | Everest Electronics",
  description:
    "Informasi edukatif seputar teknologi pendingin ruangan terbaru, tips perawatan mandiri, dan update proyek Everest.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "https://everest-electronics.zeabur.app/blog",
    title: "Berita & Blog | Everest Electronics",
    description:
      "Informasi edukatif seputar teknologi pendingin ruangan terbaru, tips perawatan mandiri, dan update proyek Everest.",
    images: [
      {
        url: "https://everest-electronics.zeabur.app/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Everest Electronics — Blog",
      },
    ],
  },
};

const PAGE_SIZE = 5;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const raw = Number(sp.page);
  const page = Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1;

  const [settings, { items: posts, totalPages, total }, branches] = await Promise.all([
    getSettings(),
    getPublishedPostsPage(page, PAGE_SIZE),
    getBranches(),
  ]);

  // Clamp to a valid page BEFORE querying so out-of-range ?page=N never
  // launches a skip beyond the last page (empty-state bug).
  const current = Math.max(1, Math.min(page, totalPages));

  const promoImg = buildAssetUrl(
    settings.promoImageUrl || "2026-08/promo-banner-51f95376.webp",
  );
  const wa = settings.whatsappNumber;

  // Build pagination page numbers (1 … window … last)
  const pages: number[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - current) <= 1) pages.push(p);
  }
  const pageSet = new Set(pages);
  const pageNumbers: (number | "...")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (pageSet.has(p)) pageNumbers.push(p);
    else if (p === 2 || p === totalPages - 1) pageNumbers.push("...");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header brandName={settings.brandName} projectsUrl={settings.projectsUrl} />
      <main className="flex-1">
        <section className="bg-paper pt-32 pb-20">
          <div className="container-everest">
            {/* Promotion Banner — bg image + HTML heading per design */}
            <div className="relative mb-20 overflow-hidden rounded-lg bg-[#1e4394]">
              <div className="absolute inset-0" aria-hidden="true">
                <Image src={promoImg} alt="" fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-[#1e4394]/70" />
              </div>
              <div className="relative z-10 flex min-h-[380px] flex-col items-center justify-center gap-6 p-10 md:p-16 text-center">
                <p className="eyebrow text-[#c5a880]">Featured Promo</p>
                <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-[#fafafa]">
                  Promotion Banner
                </h2>
                <a
                  href={waLink(wa, promoWaMessage(settings.brandName))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-[#fafafa] px-7 py-3.5 text-sm font-medium text-[#1c1c1c] transition-colors hover:bg-[#c5a880] hover:text-white"
                >
                  Claim Promo Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>

            <p className="eyebrow">Insights &amp; Updates</p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] text-[#000]">
              Berita &amp; Blog
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-graphite">
              Menyediakan informasi edukatif seputar teknologi pendingin ruangan terbaru,
              tips perawatan mandiri, dan update proyek Everest.
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-lg border border-line-soft bg-white transition-all hover:border-navy hover:shadow-lg">
                  {p.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={buildAssetUrl(p.imageUrl)}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-mist">
                    {new Date(p.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="mt-3 font-display text-[20px] font-bold leading-snug text-[#1c1c1c] group-hover:text-navy">
                    {p.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 text-base text-[#b3b3b3]">{p.excerpt}</p>
                  <span className="link-arrow mt-5 text-base font-normal text-[#1c1c1c]">
                    Read
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                </Link>
              ))}
            </div>

            {posts.length === 0 && (
              <p className="mt-14 text-center text-graphite">Belum ada artikel.</p>
            )}

            {/* Pagination — default 5 per page */}
            {totalPages > 1 && (
              <nav className="mt-14 flex flex-wrap items-center justify-center gap-2" aria-label="Paginasi">
                {current > 1 && (
                  <Link
                    href={`/blog?page=${current - 1}`}
                    className="rounded-lg border border-line-soft px-4 py-2 text-sm text-graphite transition-colors hover:border-navy hover:text-navy"
                  >
                    Previous
                  </Link>
                )}
                {pageNumbers.map((p, idx) =>
                  p === "..." ? (
                    <span key={`e-${idx}`} className="px-2 text-sm text-mist">…</span>
                  ) : (
                    <Link
                      key={p}
                      href={`/blog?page=${p}`}
                      aria-current={p === current ? "page" : undefined}
                      className={
                        "rounded-lg px-4 py-2 text-sm transition-colors " +
                        (p === current
                          ? "bg-navy text-white"
                          : "border border-line-soft text-graphite hover:border-navy hover:text-navy")
                      }
                    >
                      {p}
                    </Link>
                  ),
                )}
                {current < totalPages && (
                  <Link
                    href={`/blog?page=${current + 1}`}
                    className="rounded-lg border border-line-soft px-4 py-2 text-sm text-graphite transition-colors hover:border-navy hover:text-navy"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
            {totalPages <= 1 && posts.length > 0 && (
              <p className="mt-10 text-center text-sm text-graphite">
                Menampilkan {posts.length} artikel
              </p>
            )}

            {/* ============ TEMUKAN KAMI ============ */}
            <section id="lokasi" className="mt-20">
              <h2 className="font-display text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1.1] text-[#000]">
                Temukan&nbsp;Kami
              </h2>
              <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:justify-center">
                <div className="space-y-6">
                  {branches.map((b) => (
                    <div key={b.id} className="rounded-xl border border-line-soft bg-white p-8">
                      <h3 className="font-display text-[32px] font-bold leading-tight text-[#1c1c1c]">{b.name}</h3>
                      <p className="mt-3 text-xl leading-relaxed text-[#b3b3b3]">{b.address}</p>
                      <p className="mt-2 text-sm text-[#94a3b8]">{b.label}: {b.phone}</p>
                      {b.mapUrl && (
                        <a href={b.mapUrl} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 text-xl font-normal text-[#1c1c1c]">
                          Buka di Peta
                        </a>
                      )}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-[#fafafa] p-9">
                  <h3 className="font-display text-xl font-bold text-ink">Hubungi kami</h3>
                  <div className="mt-6 space-y-5">
                    {[
                      { k: "Cleaning & Service Hotline", v: settings.phoneDisplay },
                      { k: "Corporate Inquiries", v: settings.emailMarketing },
                      { k: "Official Web domain", v: "www.aceverestserpong.com" },
                    ].map((c) => (
                      <div key={c.k}>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate">{c.k}</p>
                        <p className="mt-1 text-sm font-medium text-navydeep">{c.v}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href={waLink(wa, consultationWaMessage(settings.brandName))}
                    target="_blank"
                    rel="noopener"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-navy-deep"
                  >
                    Hubungi Tim Anda
                  </a>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer settings={settings} branches={branches} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}