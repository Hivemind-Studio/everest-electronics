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

/* ------------------------- award card components -------------------------- */
/* Per Figma 162:4970: V = 286x429 typographic card (title 32/700 #1C1C1C,
   desc 20/400 #B3B3B3, "Learn More ↗" bottom-left); H = 511x286 photo card
   offset down 72px with year CTA. Paddings 16. */

type Award = Awaited<ReturnType<typeof import("@/lib/data").getAwards>>[number];

function AwardVCard({ award: a }: { award: Award }) {
  return (
    <div className="group flex aspect-[286/429] flex-col justify-between bg-[#fafafa] p-4">
      <div>
        <h3 className="font-display text-[clamp(1.5rem,2.2vw,2rem)] font-bold leading-tight text-[#1c1c1c]">
          {a.title}
        </h3>
        <p className="mt-1 text-base leading-snug text-[#b3b3b3]">{a.detail}</p>
      </div>
      <div className="flex items-center gap-1 text-base text-[#1c1c1c]">
        Learn More
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function AwardHCard({ award: a }: { award: Award }) {
  return (
    <div className="group relative aspect-[511/286] overflow-hidden bg-[#fafafa] md:mt-[72px]">
      {a.imageUrl && (
        <>
          <Image
            src={buildAssetUrl(a.imageUrl)}
            alt={a.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </>
      )}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div>
          <h3 className="font-display text-[clamp(1.5rem,2.2vw,2rem)] font-bold leading-tight text-white">
            {a.title}
          </h3>
          {!a.imageUrl && (
            <p className="mt-1 text-base leading-snug text-[#b3b3b3]">{a.detail}</p>
          )}
        </div>
        <div className="flex items-center gap-1 self-end text-base font-medium text-white">
          {a.year}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

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
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <h2 className="max-w-[405px] font-display text-[clamp(2.5rem,4.45vw,4rem)] font-semibold leading-[1.22] text-black">
                Penghargaan<br />Kami
              </h2>
              <p className="max-w-[240px] text-base leading-[1.25] text-[#2b2b2b] md:text-left">
                Melayani dengan hati,
                <br />
                bekerja dengan presisi.
              </p>
            </div>
            <hr className="mt-8 border-t border-[#d4d4d4]" />

            {/* Rows per Figma 162:4970 — [V, H(photo), V], H offset down 72px */}
            <div className="mt-12 space-y-[71px]">
              {[0, 1, 2].map((row) => {
                const rowAwards = awards.slice(row * 3, row * 3 + 3);
                if (rowAwards.length === 0) return null;
                const [v1, hCard, v2] = rowAwards;
                return (
                  <div key={row} className="grid items-start gap-6 md:grid-cols-[286fr_511fr_286fr]">
                    {/* V card (left) */}
                    {v1 && <AwardVCard award={v1} />}
                    {/* H card (middle — carries the photo, offset down 72px) */}
                    {hCard ? <AwardHCard award={hCard} /> : <div aria-hidden className="hidden md:block" />}
                    {/* V card (right) */}
                    {v2 ? <AwardVCard award={v2} /> : <div aria-hidden className="hidden md:block" />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ 3. OFFICIAL DISTRIBUTORS (aqua) ============ */}
        <section className="bg-[#e8fbf8] py-24">
          <div className="container-everest grid gap-12 lg:grid-cols-[359px_1fr] lg:items-start">
            <h2 className="font-display text-[42px] font-semibold leading-[1.22] text-[#2b2b2b]">
              Official Distributor Of&nbsp;Top&nbsp;Brands
            </h2>
            <div className="grid grid-cols-4 gap-x-12 gap-y-10 justify-items-center">
              {DISTRIBUTOR_LOGOS.map((logo) => (
                <Image
                  key={logo}
                  src={brandUrl(logo)}
                  alt={logo}
                  width={118}
                  height={44}
                  className="h-auto w-auto max-w-[118px] object-contain opacity-90"
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