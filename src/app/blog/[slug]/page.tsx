import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getPostBySlug, getBranches, getPublishedPosts } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";
import { waLink, consultationWaMessage } from "@/lib/wa";

export const dynamic = "force-dynamic";

const SITE_URL = "https://everest-electronics.zeabur.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan | Everest Electronics" };
  const title = `${post.title} | Everest Electronics`;
  const description = post.excerpt;
  const ogImage = post.imageUrl
    ? buildAssetUrl(post.imageUrl)
    : `${SITE_URL}/images/og-cover.jpg`;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      title,
      description,
      images: [{ url: ogImage, alt: post.title }],
      publishedTime: post.createdAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [settings, post, branches, morePosts] = await Promise.all([
    getSettings(),
    getPostBySlug(slug),
    getBranches(),
    getPublishedPosts(3),
  ]);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n+/).filter(Boolean);

  return (
    <div className="flex min-h-screen flex-col">
      <Header brandName={settings.brandName} projectsUrl={settings.projectsUrl} />
      <main className="flex-1">
        <article className="bg-paper pt-32 pb-20">
                  <div className="container-everest max-w-3xl">
                    <Link href="/blog" className="link-arrow text-sm">
                      ← Kembali ke Blog
                    </Link>
                    <p className="mt-8 text-xs font-bold uppercase tracking-widest text-mist">
                      {new Date(post.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h1 className="mt-3 font-display text-[clamp(2.75rem,5vw,4.5rem)] font-bold leading-[1.05] text-[#000]">{post.title}</h1>

                    {post.imageUrl && (
                      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg">
                        <Image
                          src={buildAssetUrl(post.imageUrl)}
                          alt={post.title}
                          fill
                          priority
                          className="object-cover"
                          sizes="(max-width:768px) 100vw, 768px"
                        />
                      </div>
                    )}

                    <div className="mt-10 space-y-5">
                      {paragraphs.map((para, i) => (
                        <p key={i} className="text-base leading-relaxed text-ink-soft">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>

                {/* ============ FIND MORE section ============ */}
                {morePosts.length > 0 && (
                  <section className="bg-paper pb-24">
                    <div className="container-everest">
                      <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-[#000000]">
                        Find More
                      </h2>
                      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {morePosts
                          .filter((mp) => mp.slug !== post.slug)
                          .map((mp) => (
                            <Link key={mp.id} href={`/blog/${mp.slug}`} className="group overflow-hidden rounded-lg border border-line-soft bg-white transition-all hover:border-navy hover:shadow-lg">
                              {mp.imageUrl && (
                                <div className="relative aspect-[16/10] overflow-hidden">
                                  <Image
                                    src={buildAssetUrl(mp.imageUrl)}
                                    alt={mp.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width:768px) 100vw, 33vw"
                                  />
                                </div>
                              )}
                              <div className="p-7">
                                <h3 className="mt-2 font-display text-[20px] font-bold leading-snug text-[#1c1c1c] group-hover:text-navy">
                                  {mp.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-base text-[#b3b3b3]">{mp.excerpt}</p>
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
                    </div>
                  </section>
                )}

                {/* ============ TEMUKAN KAMI ============ */}
                <section id="lokasi" className="bg-[#fafafa] py-24">
                  <div className="container-everest">
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
                          href={waLink(settings.whatsappNumber, consultationWaMessage(settings.brandName))}
                          target="_blank"
                          rel="noopener"
                          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-navy-deep"
                        >
                          Hubungi Tim Anda
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
      </main>
      <Footer settings={settings} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}