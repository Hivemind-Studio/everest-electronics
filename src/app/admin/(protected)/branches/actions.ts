"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function updateBranch(formData: FormData) {
  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const label = String(formData.get("label") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const mapUrl = String(formData.get("mapUrl") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  await prisma.branch.update({
    where: { id },
    data: { name, address, label, phone, mapUrl: mapUrl || null, imageUrl },
  });
  revalidatePath("/");
  revalidatePath("/admin/branches");
}

export async function createBranch(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const label = String(formData.get("label") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim() || null;
  await prisma.branch.create({
    data: { name, address, label, phone, imageUrl, sortOrder: 0 },
  });
  revalidatePath("/");
  revalidatePath("/admin/branches");
}

export async function deleteBranch(formData: FormData) {
  const id = String(formData.get("id") || "");
  await prisma.branch.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/branches");
}