"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { deleteFile } from "@/lib/storage";

export async function updateSettings(formData: FormData) {
  await requireAuth();
  const g = (k: string) => String(formData.get(k) || "").trim();
  const opt = (k: string) => g(k) || null;
  const prev = await prisma.globalSettings.findUnique({ where: { id: 1 } });
  const newHero = opt("heroImageUrl");
  const newPromo = opt("promoImageUrl");
  const newPromos = String(formData.get("promoImages") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  await prisma.globalSettings.upsert({
    where: { id: 1 },
    update: {
      brandName: g("brandName"),
      whatsappNumber: g("whatsappNumber"),
      marketingRetail: g("marketingRetail"),
      marketingBusiness: g("marketingBusiness"),
      whatsappDisplay: g("whatsappDisplay"),
      phoneDisplay: g("phoneDisplay"),
      emailMarketing: g("emailMarketing"),
      emailProject: g("emailProject"),
      instagramUrl: g("instagramUrl"),
      facebookUrl: g("facebookUrl"),
      youtubeUrl: g("youtubeUrl"),
      linkedinUrl: g("linkedinUrl"),
      tiktokUrl: g("tiktokUrl"),
      estYear: g("estYear"),
      heroEyebrow: g("heroEyebrow"),
      heroTitle: g("heroTitle"),
      heroTagline: g("heroTagline"),
      copyright: g("copyright"),
      heroImageUrl: opt("heroImageUrl"),
      promoImageUrl: opt("promoImageUrl"),
      promoImages: newPromos,
      projectsUrl: g("projectsUrl"),
    },
    create: {
      id: 1,
      brandName: g("brandName"),
      whatsappNumber: g("whatsappNumber"),
      marketingRetail: g("marketingRetail"),
      marketingBusiness: g("marketingBusiness"),
      whatsappDisplay: g("whatsappDisplay"),
      phoneDisplay: g("phoneDisplay"),
      emailMarketing: g("emailMarketing"),
      emailProject: g("emailProject"),
      instagramUrl: g("instagramUrl"),
      facebookUrl: g("facebookUrl"),
      youtubeUrl: g("youtubeUrl"),
      linkedinUrl: g("linkedinUrl"),
      tiktokUrl: g("tiktokUrl"),
      estYear: g("estYear"),
      heroEyebrow: g("heroEyebrow"),
      heroTitle: g("heroTitle"),
      heroTagline: g("heroTagline"),
      copyright: g("copyright"),
      heroImageUrl: opt("heroImageUrl"),
      promoImageUrl: opt("promoImageUrl"),
      promoImages: newPromos,
      projectsUrl: g("projectsUrl"),
    },
  });
  // best-effort cleanup of replaced banner keys
  if (prev?.heroImageUrl && prev.heroImageUrl !== newHero) {
    try { await deleteFile(prev.heroImageUrl); } catch {}
  }
  if (prev?.promoImageUrl && prev.promoImageUrl !== newPromo) {
    try { await deleteFile(prev.promoImageUrl); } catch {}
  }
  revalidatePath("/");
  revalidatePath("/admin/settings");
}