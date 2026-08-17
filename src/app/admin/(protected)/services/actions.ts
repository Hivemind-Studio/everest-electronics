"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function updateService(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  await prisma.service.update({ where: { id }, data: { title, tagline } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function createService(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const sortOrder = Number(formData.get("sortOrder") || 0);
  await prisma.service.create({ data: { title, tagline, sortOrder } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteService(formData: FormData) {
  const id = String(formData.get("id") || "");
  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}