import Image from "next/image";
import { TemukanKami } from "@/components/TemukanKami";
import { AboutHeroParallax } from "@/components/AboutHeroParallax";
import { getAwards, getBranches } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";
import { brandUrl } from "@/lib/brandAssets";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tentang Kami",
  description:
    "Visi kami adalah menjadi rekanan utama dalam penjualan dan layanan purna jual sistem pendingin udara seluruh Indonesia.",
  alternates: { canonical: "/tentang" },
};

/* ------------------------------- constants ------------------------------- */

const DISTRIBUTOR_LOGOS = [
  "samsung", "img4", "aqua", "polytron", "midea", "mitsubishi",
  "changhong", "lg", "hisense", "panasonic", "sharp", "gree", "daikin", "img5", "img6",
];

const PARTNERS = [
  "Sinarmas Land", "Paramount", "BCA", "Lippo Group",
  "Gajah Tunggal", "Imperial", "Goldland", "Grage Group",
];

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

/** V/H/V masonry aspect per award index. */
const MASONRY_ASPECTS = [
  "aspect-[3/4]", // V — vertical (tall)
  "aspect-[16/10]", // H — horizontal (wide)
  "aspect-[3/4]", // V — vertical (tall)
];

/* --------------------------------- page ---------------------------------- */

export default async function AboutPage() {
  const [awards, branches] = await Promise.all([
    getAwards(),
    getBranches(),
  ]);

  return (
    <>
        {/* ============ 0. ABOUT HERO (About Us, 161-3907) — parallax ============ */}
        <h1 className="sr-only">Tentang Kami — Everest Electronics</h1>
        <AboutHeroParallax />

        {/* ============ 1. VISI / MISI (162:5108) ============ */}
        <section className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <div className="grid gap-16 lg:grid-cols-[195px_1fr] lg:items-start lg:justify-between lg:pr-8">
              {/* founder / owner quote (left) */}
              <h2 className="font-display text-[32px] font-bold leading-[1.22] text-[#1c1c1c]">
                “Quote<br />Dari Founder or Owner”
              </h2>

              {/* Visi + Misi (right, 841px) */}
              <div>
                {/* Visi */}
                <div className="max-w-[264px]">
                  <h3 className="font-display text-[32px] font-bold text-[#2b2b2b]">Visi</h3>
                  <p className="mt-5 text-xl leading-relaxed text-[#2b2b2b]">
                    Visi kami adalah menjadi rekanan utama dalam penjualan dan layanan
                    purna jual sistem pendingin udara seluruh Indonesia
                  </p>
                </div>

                {/* divider */}
                <hr className="mt-8 border-t border-[#e5e5e5]" />

                {/* Misi */}
                <div className="mt-8">
                  <h3 className="font-display text-[32px] font-bold text-[#2b2b2b]">Misi</h3>
                  <div className="mt-6 grid gap-10 md:grid-cols-3">
                    {MISSIONS.map((m) => (
                      <div key={m.title} className="max-w-[264px]">
                        <h4 className="text-xl leading-relaxed text-[#2b2b2b]">{m.title}</h4>
                        <p className="mt-3 text-base leading-relaxed text-[#2b2b2b]">{m.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 2. PENGHARGAAN KAMI ============ */}
        <section id="penghargaan" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <p className="eyebrow">Our Pride</p>
            <h2
              aria-label="Penghargaan Kami"
              className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] text-[#000]"
            >
              Penghargaan&nbsp;Kami
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-graphite">
              Menyediakan layanan dengan standar dan kualitas tinggi yang konsisten
              untuk memastikan kepuasan pelanggan yang berkelanjutan.
            </p>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {awards.map((a, i) =>
                a.imageUrl ? (
                  <div
                    key={a.id}
                    className={`group overflow-hidden rounded-xl bg-[#1c1c1c] ${MASONRY_ASPECTS[i % MASONRY_ASPECTS.length]}`}
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <Image
                        src={buildAssetUrl(a.imageUrl)}
                        alt={a.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1c]/90 via-[#1c1c1c]/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-7">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-display text-2xl font-bold text-[#fafafa]">{a.title}</h3>
                          <span className="shrink-0 text-sm font-semibold text-[#c5a880]">{a.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={a.id}
                    className={`group overflow-hidden rounded-xl ${MASONRY_ASPECTS[i % MASONRY_ASPECTS.length]} bg-white flex flex-col`}
                  >
                    <div className="flex items-center justify-between gap-3 px-7 pt-7">
                      <h3 className="font-display text-2xl font-bold text-ink">{a.title}</h3>
                      <span className="shrink-0 text-sm font-semibold text-navy">{a.year}</span>
                    </div>
                    <p className="mt-3 flex-1 px-7 pb-7 text-base leading-relaxed text-graphite">{a.detail}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ============ 3. OFFICIAL DISTRIBUTORS (aqua) ============ */}
        <section className="bg-[#e8fbf8] py-24">
          <div className="container-everest grid gap-12 lg:grid-cols-2 lg:items-center">
            <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.6rem)] font-semibold leading-tight text-ink-soft">
              Official&nbsp;Distributor&nbsp;Of Top Brands
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
              {DISTRIBUTOR_LOGOS.map((logo) => (
                <Image
                  key={logo}
                  src={brandUrl(logo)}
                  alt={logo}
                  width={118}
                  height={44}
                  className="max-h-9 w-auto object-contain opacity-90"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. PARTNER PARADE (same layout as landing 138:2623/162:5085) ============ */}
        <section className="flex min-h-[512px] items-center bg-[#1c1c1c] py-0">
          <div className="container-everest w-full grid gap-6 lg:grid-cols-1">
            <div className="mx-auto max-w-[816px] text-center">
              <h2 className="font-display text-[32px] font-bold text-[#fafafa]">
                Dipercaya oleh{" "}
                <span className="text-[#1E4394]">500</span>
                <span className="text-[#E71C29]">+</span>{" "}
                Mitra Ternama
              </h2>
              <p className="mt-2 text-base leading-relaxed text-[#94a3b8]">
                Providing reliable institutional-grade comfort across Indonesia&apos;s major developers and corporate infrastructures.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {PARTNERS.map((p) => (
                <span key={p} className="font-display text-lg font-bold uppercase tracking-wide text-[#64748b]">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 5. TEMUKAN KAMI (161:4009) - shared component ============ */}
        <TemukanKami branches={branches} />
    </>
  );
}