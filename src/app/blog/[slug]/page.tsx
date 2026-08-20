import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getPostBySlug, getBranches, getPublishedPosts } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";

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
                    <h1 className="section-heading mt-3">{post.title}</h1>

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
                      <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-ink">
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
                                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink group-hover:text-navy">
                                  {mp.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm text-graphite">{mp.excerpt}</p>
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
                    </div>
                  </section>
                )}
      </main>
      <Footer settings={settings} branches={branches} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}