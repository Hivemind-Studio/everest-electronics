import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getAwards, getBranches } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";
import { brandUrl } from "@/lib/brandAssets";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tentang Kami | Everest Electronics",
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
  const [settings, awards, branches] = await Promise.all([
    getSettings(),
    getAwards(),
    getBranches(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header brandName={settings.brandName} projectsUrl={settings.projectsUrl} />
      <main className="flex-1">
        {/* ============ 0. ABOUT HERO (About Us, 161-3907) ============ */}
        <section className="relative flex min-h-[1024px] items-center justify-center overflow-hidden bg-[#fafafa]">
          {/* background photo (full vibrancy per Figma opacity=1) */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={brandUrl("aboutHeroBg")}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          {/* corner accents */}
          <div className="absolute left-[-40px] top-[120px] hidden h-[200px] w-[300px] overflow-hidden rounded-xl md:block opacity-80" aria-hidden="true">
            <Image src={brandUrl("aboutHeroAccentA")} alt="" fill className="object-cover" sizes="300px" />
          </div>
          <div className="absolute bottom-[140px] right-[-40px] hidden h-[200px] w-[300px] overflow-hidden rounded-xl md:block opacity-80" aria-hidden="true">
            <Image src={brandUrl("aboutHeroAccentB")} alt="" fill className="object-cover" sizes="300px" />
          </div>
          {/* center logo */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <Image
              src={brandUrl("aboutHeroLogo")}
              alt="Everest Electronics"
              width={362}
              height={362}
              className="h-[220px] w-[220px] object-contain md:h-[362px] md:w-[362px]"
            />
          </div>
        </section>

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

        {/* ============ 4. PARTNER PARADE (dark) ============ */}
        <section className="bg-[#1c1c1c] py-24">
          <div className="container-everest grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.6rem)] font-bold text-[#fafafa]">
                Dipercaya oleh{" "}
                <span className="text-[#1E4394]">500</span>
                <span className="text-[#E71C29]">+</span>{" "}
                Mitra Ternama
              </h2>
              <p className="mt-4 max-w-md text-base text-[#94a3b8]">
                Provide reliable institutional-grade security across Indonesia&apos;s
                main developers and corporate infrastructures.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {PARTNERS.map((p) => (
                <span key={p} className="font-display text-lg font-bold uppercase tracking-wide text-[#64748b]">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 5. TEMUKAN KAMI ============ */}
        <section id="lokasi" className="min-h-[1024px] bg-[#fafafa] pt-[104px]">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1.1] text-[#000]">
              Temukan&nbsp;Kami
            </h2>
            <div className="mt-14 grid gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                {branches.map((b, bi) => (
                  <div
                    key={b.id}
                    className="rounded-xl border border-line-soft bg-white p-8"
                  >
                    <h3 className="font-display text-[32px] font-bold leading-tight text-[#1c1c1c]">{b.name}</h3>
                    <p className="mt-3 text-xl leading-relaxed text-[#b3b3b3]">{b.address}</p>
                    <p className="mt-2 text-sm text-[#94a3b8]">{b.label}: {b.phone}</p>
                    {b.mapUrl && (
                      <a
                        href={b.mapUrl}
                        target="_blank"
                        rel="noopener"
                        className="mt-4 inline-flex items-center gap-2 text-xl font-normal text-[#1c1c1c]"
                      >
                        Buka di Peta
                      </a>
                    )}
                  </div>
                ))}
              </div>
              {/* Hubungi kami sidebar */}
              <div className="rounded-xl bg-[#fafafa] p-9">
                <h3 className="font-display text-xl font-bold text-ink">Hubungi kami</h3>
                <div className="mt-6 space-y-5">
                  {[
                    { k: "Cleaning & Service Hotline", v: settings.phoneDisplay },
                    { k: "Corporate Inquiries", v: settings.emailMarketing },
                    { k: "Official Web domain", v: "www.aceverestserpong.com" },
                  ].map((c) => (
                    <div key={c.k}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate">{c.k}</p>
                      <p className="mt-1 text-sm font-medium text-navydeep">{c.v}</p>
                    </div>
                  ))}
                </div>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-navy-deep"
                >
                  Hubungi Tim Anda
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} branches={branches} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}