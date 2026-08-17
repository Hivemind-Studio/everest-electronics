"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

export async function updateSettings(formData: FormData) {
  const g = (k: string) => String(formData.get(k) || "").trim();
  await prisma.globalSettings.upsert({
    where: { id: 1 },
    update: {
      brandName: g("brandName"),
      whatsappNumber: g("whatsappNumber"),
      whatsappDisplay: g("whatsappDisplay"),
      phoneDisplay: g("phoneDisplay"),
      emailMarketing: g("emailMarketing"),
      emailProject: g("emailProject"),
      instagramUrl: g("instagramUrl"),
      facebookUrl: g("facebookUrl"),
      youtubeUrl: g("youtubeUrl"),
      linkedinUrl: g("linkedinUrl"),
      estYear: g("estYear"),
      heroEyebrow: g("heroEyebrow"),
      heroTitle: g("heroTitle"),
      heroTagline: g("heroTagline"),
      copyright: g("copyright"),
    },
    create: {
      id: 1,
      brandName: g("brandName"),
      whatsappNumber: g("whatsappNumber"),
      whatsappDisplay: g("whatsappDisplay"),
      phoneDisplay: g("phoneDisplay"),
      emailMarketing: g("emailMarketing"),
      emailProject: g("emailProject"),
      instagramUrl: g("instagramUrl"),
      facebookUrl: g("facebookUrl"),
      youtubeUrl: g("youtubeUrl"),
      linkedinUrl: g("linkedinUrl"),
      estYear: g("estYear"),
      heroEyebrow: g("heroEyebrow"),
      heroTitle: g("heroTitle"),
      heroTagline: g("heroTagline"),
      copyright: g("copyright"),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/settings");
}