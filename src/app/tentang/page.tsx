import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getAwards, getBranches } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tentang Kami | Everest Electronics",
  description:
    "Visi kami adalah menjadi rekanan utama dalam penjualan dan layanan purna jual sistem pendingin udara seluruh Indonesia.",
  alternates: { canonical: "/tentang" },
};

const MISSIONS = [
  {
    title: "Kualitas Layanan yang Konsisten",
    desc:
      "Menyediakan layanan dengan standard dan kualitas tinggi yang konsisten untuk memastikan kepuasan pelanggan yang bekelanjutan.",
  },
  {
    title: "Inovasi dalam Layanan",
    desc:
      "Mengadopsi teknologi terbaru dan metode inovatif dalam setiap aspek layanan untuk meningkatkan efektivitas dan efisiensi.",
  },
  {
    title: "Peningkatan Keterampilan dan Pengetahuan",
    desc:
      "Melakukan pelatihan dan pengembangan terus-menerus bagi tim kami untuk memastikan bahwa mereka memiliki keterampilan dan pengetahuan terbaru dalam industri.",
  },
];

export default async function AboutPage() {
  const [settings, awards, branches] = await Promise.all([getSettings(), getAwards(), getBranches()]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header brandName={settings.brandName} projectsUrl={settings.projectsUrl} />
      <main className="flex-1">
        {/* ============ 1. VISI / MISI ============ */}
        <section className="bg-[#fafafa] pt-32 pb-24">
          <div className="container-everest">
            <p className="eyebrow">Tentang Kami</p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-ink">
              Misi
            </h1>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {/* Visi column */}
              <div>
                <h2 className="font-display text-2xl font-bold text-ink">Visi</h2>
                <p className="mt-5 font-display text-lg leading-relaxed text-ink-soft">
                  Visi kami adalah menjadi rekanan utama dalam penjualan dan layanan
                  purna jual sistem pendingin udara seluruh Indonesia
                </p>
              </div>
              {/* Misi list */}
              <div className="space-y-8">
                {MISSIONS.map((m, i) => (
                  <div key={m.title}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-xl font-bold text-navy">0{i + 1}</span>
                      <h3 className="font-display text-xl font-bold text-ink">{m.title}</h3>
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-graphite">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2. AWARDS ============ */}
        <section id="penghargaan" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <p className="eyebrow">Our Pride</p>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-ink">
              Award
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-graphite">
              Menyediakan layanan dengan standard and kualitas tinggi yang konsistent
              untuk memastikan kepuasan pelanggan yang bekelanjutan.
            </p>

            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {awards.map((a) => (
                <div key={a.id} className="group overflow-hidden rounded-lg bg-[#1c1c1c]">
                  {a.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={buildAssetUrl(a.imageUrl)}
                        alt={a.title}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-7">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-2xl font-bold text-[#fafafa]">{a.title}</h3>
                      <span className="shrink-0 text-sm font-semibold text-[#c5a880]">{a.year}</span>
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-[#d4d4d4]">{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} branches={branches} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}