import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getPublishedPostsPage } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Berita & Blog | Everest Electronics",
  description:
    "Informasi edukatif seputar teknologi pendingin ruangan terbaru, tips perawatan mandiri, dan update proyek Everest.",
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

  const [settings, { items: posts, totalPages, total }] = await Promise.all([
    getSettings(),
    getPublishedPostsPage(page, PAGE_SIZE),
  ]);

  const current = Math.min(page, totalPages);

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
      <Header brandName={settings.brandName} />
      <main className="flex-1">
        <section className="bg-paper py-20">
          <div className="container-everest">
            <p className="eyebrow">Insights &amp; Updates</p>
            <h1 className="section-heading mt-3">Berita &amp; Blog</h1>
            <p className="mt-4 max-w-2xl text-lg text-graphite">
              Menyediakan informasi edukatif seputar teknologi pendingin ruangan terbaru,
              tips perawatan mandiri, dan update proyek Everest.
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                    <h2 className="mt-3 font-display text-lg font-bold leading-snug text-ink group-hover:text-navy">
                      {p.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm text-graphite">{p.excerpt}</p>
                    <span className="link-arrow mt-5 text-sm">
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
          </div>
        </section>
      </main>
      <Footer settings={settings} branches={[]} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}