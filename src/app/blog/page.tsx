import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getPublishedPosts } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Berita & Blog | Everest Electronics",
  description:
    "Informasi edukatif seputar teknologi pendingin ruangan terbaru, tips perawatan mandiri, dan update proyek Everest.",
};

export default async function BlogIndexPage() {
  const [settings, posts] = await Promise.all([getSettings(), getPublishedPosts(100)]);

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
          </div>
        </section>
      </main>
      <Footer settings={settings} branches={[]} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}