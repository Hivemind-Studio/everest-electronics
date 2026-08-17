"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { deleteFile } from "@/lib/storage";

export async function updateBranch(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const label = String(formData.get("label") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const mapUrl = String(formData.get("mapUrl") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  const prev = await prisma.branch.findUnique({ where: { id } });
  await prisma.branch.update({
    where: { id },
    data: { name, address, label, phone, mapUrl: mapUrl || null, imageUrl },
  });
  if (prev?.imageUrl && prev.imageUrl !== imageUrl) {
    try { await deleteFile(prev.imageUrl); } catch {}
  }
  revalidatePath("/");
  revalidatePath("/admin/branches");
}

export async function createBranch(formData: FormData) {
  await requireAuth();
  const name = String(formData.get("name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const label = String(formData.get("label") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const mapUrl = String(formData.get("mapUrl") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  await prisma.branch.create({
    data: { name, address, label, phone, mapUrl: mapUrl || null, imageUrl, sortOrder: 0 },
  });
  revalidatePath("/");
  revalidatePath("/admin/branches");
}

export async function deleteBranch(formData: FormData) {
  await requireAuth();
  const id = String(formData.get("id") || "");
  const prev = await prisma.branch.findUnique({ where: { id } });
  await prisma.branch.delete({ where: { id } });
  if (prev?.imageUrl) {
    try { await deleteFile(prev.imageUrl); } catch {}
  }
  revalidatePath("/");
  revalidatePath("/admin/branches");
}