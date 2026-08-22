"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { deleteFile } from "@/lib/storage";

/** Ensure a slug is unique by appending a numeric suffix on collision. */
async function uniqueSlug(base: string): Promise<string> {
  const slug = slugify(base) || `post-${Date.now()}`;
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (!existing) return slug;
  let i = 2;
  for (;;) {
    const candidate = `${slug}-${i}`;
    const taken = await prisma.blogPost.findUnique({ where: { slug: candidate } });
    if (!taken) return candidate;
    i++;
  }
}

export async function createPost(formData: FormData) {
  await requireAuth();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "");
  const published = formData.get("published") === "on";
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const slug = await uniqueSlug(title);

  await prisma.blogPost.create({
    data: { title, slug, excerpt, content, published, imageUrl },
  });
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updatePost(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "");
  const published = formData.get("published") === "on";
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;

  const prev = await prisma.blogPost.findUnique({ where: { id } });
  // URL stability: keep the published slug; editing a title never rewrites
  // the URL of a live post. uniqueSlug only runs at create time.
  const slug = prev?.slug ?? (await uniqueSlug(title));

  await prisma.blogPost.update({
    where: { id },
    data: { title, slug, excerpt, content, published, imageUrl },
  });
  if (prev?.imageUrl && prev.imageUrl !== imageUrl) {
    try { await deleteFile(prev.imageUrl); } catch {}
  }
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") || "");
  const prev = await prisma.blogPost.findUnique({ where: { id } });
  await prisma.blogPost.delete({ where: { id } });
  if (prev?.imageUrl) {
    try { await deleteFile(prev.imageUrl); } catch {}
  }
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}