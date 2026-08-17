/**
 * Seed site assets to the CDN under the everest-electronics prefix,
 * then seed the database with site content.
 * Run: npm run seed
 */
import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { saveFile } from "../src/lib/storage";
import { prisma } from "../src/lib/db";

async function uploadAssets(): Promise<Record<string, string>> {
  const dir = join(process.cwd(), "scripts", "assets");
  const results: Record<string, string> = {};
  for (const f of readdirSync(dir)) {
    const name = f.replace(/\.png$/, "");
    const buffer = readFileSync(join(dir, f));
    const saved = await saveFile({ originalName: `${name}.png`, buffer, mime: "image/png" });
    results[name] = saved.key;
    console.log(`  uploaded ${name} -> ${saved.key}`);
  }
  return results;
}

async function main() {
  console.log("Uploading assets to CDN...");
  const a = await uploadAssets();

  console.log("Seeding database...");
  await prisma.globalSettings.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  // Blog posts (from design copy)
  const posts = [
    {
      title: "Everest Resmi Menjadi Partner Platinum Daikin",
      slug: "partner-platinum-daikin",
      titleEn: "Everest Becomes an Official Daikin Platinum Partner",
      excerpt:
        "Bagaimana filter udara berteknologi HEPA mengurangi bakteri dan debu secara drastis.",
      excerptEn:
        "How HEPA air filters drastically reduce bacteria and dust.",
      content:
        "Everest Electronics dengan bangga mengumumkan kemitraan sebagai Partner Platinum resmi Daikin Indonesia. Pencapaian ini merupakan buah dari komitmen kami terhadap kualitas layanan yang konsisten sepanjang lebih dari dua dekade.\n\nSebagai Partner Platinum, kami memperoleh akses prioritas terhadap unit terbaru, suku cadang asli, serta pelatihan teknis berkelanjutan dari Daikin. Hal ini memungkinkan tim engineering kami memberikan solusi pendingin udara terbaik dengan standar internasional.\n\nKami berterima kasih kepada seluruh pelanggan dan mitra yang telah mempercayai Everest Electronics. Pencapaian ini memacu kami untuk terus meningkatkan layanan purna jual terbaik di industri tata udara Indonesia.",
      imageKey: a.blog1 || null,
      published: true,
    },
    {
      title: "Mengenal Sistem AC Central VRV & VRF untuk Bisnis",
      slug: "mengenal-sistem-ac-central-vrv-vrf",
      titleEn: "Understanding Central AC VRV & VRF Systems for Business",
      excerpt:
        "Kenapa sistem pendingin udara terpusat jauh lebih efisien untuk ruang kantor luas Anda.",
      excerptEn:
        "Why centralized air conditioning is far more efficient for your large office spaces.",
      content:
        "Sistem VRV (Variable Refrigerant Volume) dan VRF (Variable Refrigerant Flow) adalah teknologi AC central yang semakin populer untuk gedung perkantoran, mall, dan fasilitas komersial bertingkat.\n\nKeunggulan utama sistem ini terletak pada efisiensi energi: kompresor inverter menyesuaikan kapasitas secara otomatis berdasarkan beban ruangan, sehingga menghemat listrik hingga 30% dibanding sistem konvensional.\n\nTim engineering Everest siap merancang, memasang, dan merawat sistem VRV/VRF yang sesuai dengan kebutuhan bangunan Anda. Konsultasikan kebutuhan Anda bersama kami hari ini.",
      imageKey: a.blog2 || null,
      published: true,
    },
    {
      title: "Pentingnya Menjaga Kualitas Udara di Masa Transisi",
      slug: "pentingnya-menjaga-kualitas-udara",
      titleEn: "The Importance of Maintaining Air Quality in Transition Seasons",
      excerpt:
        "Komitmen kami untuk selalu memberikan layanan purna jual terbaik standard internasional.",
      excerptEn:
        "Our commitment to always delivering best-in-class international-standard after-sales service.",
      content:
        "Perubahan musim sering kali membawa fluktuasi kualitas udara yang berdampak pada kesehatan keluarga dan produktivitas kerja. Menjaga sirkulasi udara yang bersih di dalam ruangan menjadi semakin penting.\n\nRutin membersihkan filter AC, memastikan ventilasi yang baik, dan melakukan perawatan berkala merupakan langkah sederhana namun efektif. Everest menyediakan layanan Clean & Service yang menjamin udara ruangan Anda tetap segar dan sehat sepanjang tahun.",
      imageKey: a.blog3 || null,
      published: true,
    },
    {
      title: "Tips Merawat AC Agar Tetap Dingin & Hemat Listrik",
      slug: "tips-merawat-ac-hemat-listrik",
      titleEn: "Tips for Keeping Your AC Cool & Energy Efficient",
      excerpt:
        "Pelajari cara mudah melakukan pengecekan filter mandiri di rumah Anda secara berkala.",
      excerptEn:
        "Learn simple ways to do periodic self-checks of your home AC filter.",
      content:
        "Perawatan AC yang rutin tidak hanya menjaga kenyamanan, tetapi juga menghemat pengeluaran listrik bulanan Anda.\n\nBeberapa tips sederhana:\n\n1. Bersihkan filter AC setiap 2-4 minggu sekali untuk menjaga aliran udara.\n2. Atur suhu pada 24-25 derajat Celcius untuk efisiensi optimal.\n3. Hindari menutup unit outdoor agar sirkulasi panas lancar.\n4. Lakukan cuci AC profesional minimal 2-3 bulan sekali.\n\nUntuk hasil terbaik, percayakan perawatan rutin Anda pada tim profesional Everest Electronics.",
      imageKey: a.blog4 || null,
      published: true,
    },
  ];
  for (const p of posts) {
    const { imageKey, ...rest } = p;
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: { ...rest, imageUrl: imageKey },
      create: { ...rest, imageUrl: imageKey },
    });
  }

  // Services (from design copy)
  const services = [
    {
      title: "Jual & Unit Baru",
      tagline:
        "Official distributor untuk brand AC ternama dunia dengan garansi resmi prima.",
      sortOrder: 0,
    },
    {
      title: "Clean & Service",
      tagline:
        "Perawatan berkala, cuci AC, isi freon, dan optimasi efisiensi kompresor.",
      sortOrder: 1,
    },
    {
      title: "Tukar Tambah",
      tagline:
        "Upgrade sistem AC lama Anda dengan unit baru yang ramah lingkungan dan hemat listrik.",
      sortOrder: 2,
    },
    {
      title: "Corporate HVAC",
      tagline:
        "Instalasi skala industri, sistem ducting, VRV/VRF untuk gedung dan mall bertingkat.",
      sortOrder: 3,
    },
  ];
  for (const [i, s] of services.entries()) {
    const existing = await prisma.service.findFirst({ where: { title: s.title } });
    if (existing) await prisma.service.update({ where: { id: existing.id }, data: s });
    else await prisma.service.create({ data: s });
  }

  // Awards (from design copy)
  const awards: {
    title: string;
    detail: string;
    year: string;
    sortOrder: number;
    imageUrl: string | null;
  }[] = [
    {
      title: "Daikin Platinum Partner",
      detail: "Awarded by Panasonic Indonesia",
      year: "2024",
      sortOrder: 0,
      imageUrl: a.award1 || null,
    },
    {
      title: "Outstanding AC Contractor",
      detail: "Kategori Layanan & Penjualan Terbaik",
      year: "2025",
      sortOrder: 1,
      imageUrl: a.award2 || null,
    },
    {
      title: "Gree Golden Dealer",
      detail: "Volume Penjualan VRF Terbesar Nasional",
      year: "2025",
      sortOrder: 2,
      imageUrl: a.award1 || null,
    },
  ];
  for (const [i, aw] of awards.entries()) {
    const existing = await prisma.award.findFirst({ where: { title: aw.title } });
    if (existing) await prisma.award.update({ where: { id: existing.id }, data: aw });
    else await prisma.award.create({ data: aw });
  }

  // Branches
  const branches = [
    {
      name: "Ciledug (Kantor Pusat)",
      address:
        "Jl. KH. Hasyim Ashari No.143 - 144, RT.007/RW.002, Sudimara Pinang, Kec. Pinang, Kota Tangerang, Banten 15145",
      label: "TELEPON",
      phone: "021-7329480 / 7344130",
      mapUrl: "https://maps.google.com/?q=Everest+Electronics+Ciledug",
      isMain: true,
      sortOrder: 0,
    },
    {
      name: "Gading Serpong",
      address:
        "Ruko Glaze 1 Blok B No. 19, Gading Serpong, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15810",
      label: "WHATSAPP SERVICES",
      phone: "+62 877-3201-8235",
      mapUrl: "https://maps.google.com/?q=Everest+Electronics+Gading+Serpong",
      isMain: false,
      sortOrder: 1,
    },
  ];
  for (const [i, b] of branches.entries()) {
    const existing = await prisma.branch.findFirst({ where: { name: b.name } });
    if (existing) await prisma.branch.update({ where: { id: existing.id }, data: b });
    else await prisma.branch.create({ data: b });
  }

  console.log("\nSeed complete.");
  console.log("Global settings id=1 present.");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});