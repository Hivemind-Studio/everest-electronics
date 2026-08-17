"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "");
  const published = formData.get("published") === "on";
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const slug = slugify(title) || `post-${Date.now()}`;

  await prisma.blogPost.create({
    data: { title, slug, excerpt, content, published, imageUrl },
  });
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updatePost(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "");
  const published = formData.get("published") === "on";
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const slug = slugify(title) || `post-${Date.now()}`;

  await prisma.blogPost.update({
    where: { id },
    data: { title, slug, excerpt, content, published, imageUrl },
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id") || "");
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/");
  redirect("/admin/blog");
}