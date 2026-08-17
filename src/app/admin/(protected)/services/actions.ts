"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { deleteFile } from "@/lib/storage";

export async function updateService(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const prev = await prisma.service.findUnique({ where: { id } });
  await prisma.service.update({ where: { id }, data: { title, tagline, imageUrl } });
  if (prev?.imageUrl && prev.imageUrl !== imageUrl) {
    try { await deleteFile(prev.imageUrl); } catch {}
  }
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function createService(formData: FormData) {
  await requireAuth();
  const title = String(formData.get("title") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const sortOrder = Number(formData.get("sortOrder") || 0);
  await prisma.service.create({ data: { title, tagline, imageUrl, sortOrder } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteService(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") || "");
  const prev = await prisma.service.findUnique({ where: { id } });
  await prisma.service.delete({ where: { id } });
  if (prev?.imageUrl) {
    try { await deleteFile(prev.imageUrl); } catch {}
  }
  revalidatePath("/");
  revalidatePath("/admin/services");
}