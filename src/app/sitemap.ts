import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const SITE_URL = "https://everest-electronics.zeabur.app";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost
    .findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
    .catch(() => []);

  // T-F03: truthful lastModified — max post updatedAt (defensible proxy for
  // home/blog freshness), never new Date() which is always-now noise.
  const latestPost = posts.reduce<Date | null>(
    (acc, p) => (!acc || p.updatedAt > acc ? p.updatedAt : acc),
    null,
  );
  const contentLastMod = latestPost ?? new Date("2026-08-17");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/tentang`, lastModified: contentLastMod, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: contentLastMod, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: contentLastMod, changeFrequency: "yearly", priority: 0.3 },
  ];

  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: contentLastMod, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: contentLastMod, changeFrequency: "daily", priority: 0.9 },
    ...staticRoutes,
  ];

  for (const p of posts) {
    routes.push({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return routes;
}