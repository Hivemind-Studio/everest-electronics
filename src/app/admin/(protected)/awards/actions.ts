"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function updateAward(formData: FormData) {
  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  const detail = String(formData.get("detail") || "").trim();
  const year = String(formData.get("year") || "").trim();
  await prisma.award.update({ where: { id }, data: { title, detail, year } });
  revalidatePath("/");
  revalidatePath("/admin/awards");
}

export async function createAward(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const detail = String(formData.get("detail") || "").trim();
  const year = String(formData.get("year") || "").trim();
  await prisma.award.create({ data: { title, detail, year, sortOrder: 0 } });
  revalidatePath("/");
  revalidatePath("/admin/awards");
}

export async function deleteAward(formData: FormData) {
  const id = String(formData.get("id") || "");
  await prisma.award.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/awards");
}