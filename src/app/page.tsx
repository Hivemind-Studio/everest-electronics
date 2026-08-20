import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getPublishedPosts, getBranches } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";
import { waLink, consultationWaMessage } from "@/lib/wa";

const DISTRIBUTOR_LOGOS = [
  "samsung", "img4", "aqua", "polytron", "midea", "mitsubishi",
  "changhong", "lg", "hisense", "panasonic", "sharp", "gree", "daikin", "img5", "img6",
];

const PARTNERS = [
  "Sinarmas Land", "Paramount", "BCA", "Lippo Group",
  "Gajah Tunggal", "Imperial", "Goldland", "Grage Group",
];

const STATS = [
  ["500", "Mitra"],
  ["14", "Top Brand"],
  ["50", "Penghargaan"],
];

const SERVICES = [
  {
    title: "Beli AC",
    desc: "Unit AC pilihan dari brand terpercaya.",
  },
  {
    title: "Cleaning & Service",
    desc: "Perawatan menyeluruh oleh teknisi berpengalaman.",
  },
  {
    title: "Tukar Tambah",
    desc: "Ganti unit lama dengan solusi yang lebih tepat untuk kebutuhan.",
  },
];

const BUSINESS_OFFERS = [
  {
    title: "VRV / VRF System",
    desc:
      "Sistem AC multi-split terpusat untuk gedung bertingkat, hemat energi dengan kontrol individual per ruangan.",
  },
  {
    title: "Chiller AC System",
    desc:
      "Solusi pendinginan skala besar untuk mall, hotel, rumah sakit dan pabrik dengan efisiensi tinggi.",
  },
  {
    title: "Ducting AC System",
    desc:
      "Sistem distribusi udara melalui saluran ducting untuk ruangan luas dengan tampilan estetis.",
  },
  {
    title: "Ventilation System",
    desc:
      "Sistem ventilasi udara untuk sirkulasi optimal, menjaga kualitas udara dan mengurangi kelembapan.",
  },
];

export const dynamic = "force-dynamic";

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [settings, posts, branches] = await Promise.all([
    getSettings(),
    getPublishedPosts(4),
    getBranches(),
  ]);

  const heroImg = buildAssetUrl(
    settings.heroImageUrl || "2026-08/hero-bg-clean-a2f25c20.webp",
  );
  const wa = settings.whatsappNumber;

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: settings.brandName,
            telephone: settings.phoneDisplay,
            founded: settings.estYear,
            url: "https://everest-electronics.zeabur.app",
            areaServed: "Indonesia",
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: `+${settings.whatsappNumber}`,
                contactType: "sales",
                availableLanguage: ["id", "en"],
              },
            ],
          }),
        }}
      />
      <Header brandName={settings.brandName} projectsUrl={settings.projectsUrl} />

      <main className="flex-1">
        {/* ============ 1. HERO ============ */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#fafafa] pt-40">
          <div className="absolute -right-40 top-10 h-[700px] w-[800px] rounded-full bg-[#56d2ff]/20 blur-3xl" aria-hidden />
          <div className="container-everest relative z-10 py-24">
            <h1 className="font-display max-w-[860px] text-[clamp(3rem,8.5vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.01em] text-ink">
              Your One Stop AC Solution
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#layanan"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-navy-deep"
              >
                Lihat Layanan
              </a>
              <a
                href="#bisnis"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-navy"
              >
                Kenali Kami
              </a>
            </div>
          </div>
          <div className="container-everest absolute bottom-10 left-0 right-0 z-10">
            <p className="font-display text-sm text-ink-soft">
              EST. {settings.estYear} — INDONESIA
            </p>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-soft">
              Partner utama untuk penjualan, perawatan, dan instalasi sistem
              pendingin udara di Jabodetabek dan seluruh Indonesia.
            </p>
          </div>
        </section>

        {/* ============ 2. ABOUT + STATS ============ */}
        <section className="bg-[#fafafa] py-24">
          <div className="container-everest grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium leading-snug text-ink">
                Melayani dengan hati,<br />bekerja dengan presisi.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                Sejak {settings.estYear}, kami hadir sebagai rekanan utama dalam penjualan
                dan layanan purna jual sistem pendingin udara.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-8">
                {STATS.map(([n, l]) => (
                  <div key={l} className="text-center">
                    <p className="font-display text-3xl font-bold text-ink">{n} +</p>
                    <p className="mt-1 text-sm text-mist">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={buildAssetUrl("2026-08/hvac-fa6b68c7.webp")} alt="Sistem HVAC" fill className="object-cover" sizes="(max-width:768px) 100vw, 560px" />
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
                  src={`/brand/${logo}.png`}
                  alt={logo}
                  width={118}
                  height={44}
                  className="max-h-9 w-auto object-contain opacity-80"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. LAYANAN ============ */}
        <section id="layanan" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] text-ink">
              Layanan&nbsp;Kami
            </h2>
            <p className="mt-4 max-w-xl text-base text-ink-soft">
              Layanan end-to-end untuk kebutuhan AC di rumah, apartemen, ruko,
              dan ruang personal Anda.
            </p>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {SERVICES.map((s) => (
                <a
                  key={s.title}
                  href={waLink(wa, `Halo ${settings.brandName}, saya tertarik dengan layanan *${s.title}*`)}
                  target="_blank"
                  rel="noopener"
                  className="group flex flex-col justify-between rounded-xl border border-line-soft bg-white p-8 transition-colors hover:border-navy"
                >
                  <h3 className="font-display text-2xl font-bold leading-tight text-ink">{s.title}</h3>
                  <div className="mt-4">
                    <p className="text-base leading-relaxed text-mist">{s.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-ink">
                      Hubungi Kami
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 5. UNTUK BISNIS (dark navy) ============ */}
        <section id="bisnis" className="bg-[#182a3a] py-24">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] text-[#fafafa]">
              Untuk&nbsp;Bisnis
            </h2>
            <p className="mt-4 max-w-xl text-base text-[#b3b3b3]">
              Solusi tata udara yang dirancang untuk performa, efisiensi, dan masa pakai jangka panjang.
            </p>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {BUSINESS_OFFERS.map((o) => (
                <a
                  key={o.title}
                  href={waLink(wa, `Halo ${settings.brandName}, saya tertarik dengan layanan *${o.title}*`)}
                  target="_blank"
                  rel="noopener"
                  className="group rounded-xl border border-white/10 bg-white/5 p-9 transition-colors hover:border-[#56d2ff]"
                >
                  <h3 className="font-display text-2xl font-bold text-[#fafafa]">{o.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[#b3b3b3]">{o.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#fafafa]">
                    Hubungi Kami
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 6. PARTNER PARADE (dark) ============ */}
        <section className="bg-[#1c1c1c] py-24">
          <div className="container-everest grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.6rem)] font-bold text-[#fafafa]">
                Dipercaya oleh 500+ Mitra Ternama
              </h2>
              <p className="mt-4 max-w-md text-base text-[#94a3b8]">
                Providing reliable institutional-grade comfort across Indonesia&apos;s
                major developers and corporate infrastructures.
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

        {/* ============ 7. BLOG ============ */}
        <section id="blog" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] text-ink">
              Berita &amp;<br />Blog
            </h2>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-xl border border-line-soft bg-white transition-colors hover:border-navy">
                  {p.imageUrl && (
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image src={buildAssetUrl(p.imageUrl)} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 25vw" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-navy">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-mist">{p.excerpt}</p>
                    <span className="link-arrow mt-4 text-sm">Read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 8. TEMUKAN KAMI ============ */}
        <section id="lokasi" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] text-ink">
              Temukan&nbsp;Kami
            </h2>
            <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:justify-center">
              <div className="space-y-6">
                {branches.map((b, bi) => (
                  <div key={b.id} className={"rounded-xl p-8 " + (bi % 2 === 0 ? "bg-[#1c1c1c]" : "bg-[#2b2b2b]")}>
                    <h3 className="font-display text-2xl font-bold text-[#fafafa]">{b.name}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#b3b3b3]">{b.address}</p>
                    <p className="mt-3 text-sm text-[#c5a880]">{b.label}: {b.phone}</p>
                    {b.mapUrl && (
                      <a href={b.mapUrl} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#fafafa]">
                        Buka di Peta
                      </a>
                    )}
                  </div>
                ))}
              </div>
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
                  href={waLink(wa, consultationWaMessage(settings.brandName))}
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
      <FloatingWhatsApp number={wa} brandName={settings.brandName} />
    </div>
  );
}