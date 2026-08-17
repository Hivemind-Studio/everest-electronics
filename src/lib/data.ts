import { prisma } from "./db";
import type { GlobalSettings, Service, Award, BlogPost, Branch } from "@/generated/prisma/client";

export type SiteSettings = GlobalSettings;
export type ServiceItem = Service;
export type AwardItem = Award;
export type BlogItem = BlogPost;
export type BranchItem = Branch;

/** Fetch the singleton global settings. */
export async function getSettings(): Promise<SiteSettings> {
  return prisma.globalSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });
}

/** Fetch published blog posts, newest first, with pagination. */
export async function getPublishedPosts(limit?: number): Promise<BlogItem[]> {
  return prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getPublishedPostsPage(
  page: number,
  pageSize = 5,
): Promise<{ items: BlogItem[]; total: number; totalPages: number; page: number }> {
  const where = { published: true };
  const [items, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.blogPost.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return { items, total, totalPages, page };
}

export async function getPostBySlug(slug: string): Promise<BlogItem | null> {
  return prisma.blogPost.findFirst({ where: { slug, published: true } });
}

export async function getServices(): Promise<ServiceItem[]> {
  return prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAwards(): Promise<AwardItem[]> {
  return prisma.award.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getBranches(): Promise<BranchItem[]> {
  return prisma.branch.findMany({ orderBy: { sortOrder: "asc" } });
}