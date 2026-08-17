"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { deleteFile } from "@/lib/storage";

export async function updateAward(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const detail = String(formData.get("detail") || "").trim();
  const year = String(formData.get("year") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const prev = await prisma.award.findUnique({ where: { id } });
  await prisma.award.update({ where: { id }, data: { title, detail, year, imageUrl } });
  if (prev?.imageUrl && prev.imageUrl !== imageUrl) {
    try { await deleteFile(prev.imageUrl); } catch {}
  }
  revalidatePath("/");
  revalidatePath("/admin/awards");
}

export async function createAward(formData: FormData) {
  await requireAuth();
  const title = String(formData.get("title") || "").trim();
  const detail = String(formData.get("detail") || "").trim();
  const year = String(formData.get("year") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  await prisma.award.create({ data: { title, detail, year, imageUrl, sortOrder: 0 } });
  revalidatePath("/");
  revalidatePath("/admin/awards");
}

export async function deleteAward(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") || "");
  const prev = await prisma.award.findUnique({ where: { id } });
  await prisma.award.delete({ where: { id } });
  if (prev?.imageUrl) {
    try { await deleteFile(prev.imageUrl); } catch {}
  }
  revalidatePath("/");
  revalidatePath("/admin/awards");
}