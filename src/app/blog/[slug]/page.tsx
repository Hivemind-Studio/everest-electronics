import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getPostBySlug, getBranches } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";

export const dynamic = "force-dynamic";

const SITE_URL = "https://everest-electronic.zeabur.app";

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
  const [settings, post, branches] = await Promise.all([
    getSettings(),
    getPostBySlug(slug),
    getBranches(),
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
      </main>
      <Footer settings={settings} branches={branches} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}