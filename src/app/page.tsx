import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getPublishedPosts, getBranches } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";
import { waLink, consultationWaMessage } from "@/lib/wa";
import { brandUrl } from "@/lib/brandAssets";

const DISTRIBUTOR_LOGOS = [
  "samsung", "img4", "aqua", "polytron", "midea", "mitsubishi",
  "changhong", "lg", "hisense", "panasonic", "sharp", "gree", "daikin", "img5", "img6",
];

const PARTNERS = [
  "Sinarmas Land", "Paramount", "BCA", "Lippo Group",
  "Gajah Tunggal", "Imperial", "Goldland", "Grage Group",
];

const STATS = [
  ["500 +", "Mitra"],
  ["14 +", "Top Brand"],
  ["50 +", "Penghargaan"],
];

const SERVICES = [
  { title: "Beli AC", desc: "Unit AC pilihan dari brand terpercaya." },
  { title: "Cleaning & Service", desc: "Perawatan menyeluruh oleh teknisi berpengalaman." },
  { title: "Tukar Tambah", desc: "Ganti unit lama dengan solusi yang lebih tepat untuk kebutuhan." },
];

const BUSINESS_OFFERS = [
  {
    title: "VRV / VRF System",
    desc: "Sistem AC multi-split terpusat untuk gedung bertingkat, hemat energi dengan kontrol individual per ruangan.",
  },
  {
    title: "Chiller AC System",
    desc: "Solusi pendinginan skala besar untuk mall, hotel, rumah sakit dan pabrik dengan efisiensi tinggi.",
  },
  {
    title: "Ducting AC System",
    desc: "Sistem distribusi udara melalui saluran ducting untuk ruangan luas dengan tampilan estetis.",
  },
  {
    title: "Ventilation System",
    desc: "Sistem ventilasi udara untuk sirkulasi optimal, menjaga kualitas udara dan mengurangi kelembapan.",
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
        {/* ============ 1. HERO (0-1024) ============ */}
        <section className="relative flex min-h-[1024px] items-center overflow-hidden bg-[#fafafa]">
          {/* Exact Figma hero background image (user-provided, from node 138-2621) */}
          <Image
            src={brandUrl("heroWave")}
            alt=""
            fill
            priority
            aria-hidden="true"
            className="pointer-events-none object-cover"
            sizes="100vw"
          />
          <div className="container-everest relative z-10 py-28">
            <h1 className="font-display max-w-[864px] text-[clamp(3rem,8.3vw,7.5rem)] font-semibold leading-[1.04] tracking-[-0.01em] text-[#1c1c1c]">
              Your{" "}
              <span className="text-[#E71C29]">One</span>{" "}
              Stop{" "}
              <span className="text-[#1E4394]">AC&nbsp;Solution</span>
            </h1>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#layanan"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-[15px] font-medium text-[#fafafa] transition-colors hover:bg-navy-deep"
              >
                Lihat Layanan
              </a>
              <a
                href="#bisnis"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-[15px] font-medium text-[#1c1c1c] transition-colors hover:border-navy"
              >
                Kenali Kami
              </a>
            </div>
          </div>
          {/* subtitle bottom-right */}
          <div className="container-everest absolute bottom-8 left-0 right-0 z-10 flex justify-end">
            <div className="max-w-[360px] text-right text-[#2b2b2b]">
              <p className="text-base leading-[1.22]">
                EST. {settings.estYear} — INDONESIA
              </p>
              <p className="mt-1 text-base leading-[1.3]">
                Partner utama untuk penjualan, perawatan, dan instalasi sistem
                pendingin udara di Jabodetabek dan seluruh Indonesia.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 2. ABOUT (138:2502, 1024-1536): left 400/32 #1c1c1c + right 600/42 #2b2b2b + divider + stats ============ */}
        <section className="min-h-[512px] bg-[#fafafa] pt-[93px]">
          <div className="container-everest grid gap-10 lg:grid-cols-[352px_649px] lg:justify-between lg:items-start">
            <h2 className="font-display text-[32px] font-normal leading-[1.22] text-[#1c1c1c]">
              Melayani dengan{" "}
              <span className="text-[#E71C29] font-semibold">hati</span>,<br />bekerja dengan{" "}
              <span className="text-[#1E4394] font-semibold">presisi</span>.
            </h2>
            <div>
              <p className="font-display text-[clamp(1.75rem,2.9vw,2.6rem)] font-semibold leading-[1.2] text-[#2b2b2b]">
                Sejak {settings.estYear}, kami hadir sebagai rekanan utama dalam
                penjualan dan layanan purna jual sistem pendingin udara.
              </p>
              <hr className="mt-6 border-t border-[#e5e5e5]" />
              <div className="mt-6 grid grid-cols-3 gap-8">
                {STATS.map(([n, l]) => (
                  <div key={l} className="text-center">
                    <p className="font-display text-[32px] font-bold text-[#1c1c1c]">{n}</p>
                    <p className="mt-1 text-xl text-[#b3b3b3]">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3. OFFICIAL DISTRIBUTORS (aqua, 1536-2048) ============ */}
        <section className="min-h-[512px] bg-[#e8fbf8] pt-[63px]">
          <div className="container-everest grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
            <h2 className="font-display text-[clamp(1.6rem,2.9vw,2.6rem)] font-semibold leading-tight text-[#2b2b2b]">
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

        {/* ============ 4. LAYANAN (2048-3072) ============ */}
        <section id="layanan" className="min-h-[1024px] bg-[#fafafa] pt-[188px]">
          <div className="container-everest">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1.1] text-[#000]">
                Layanan&nbsp;Kami
              </h2>
              <p className="max-w-[232px] text-right text-base text-[#2b2b2b]">
                Layanan end-to-end untuk kebutuhan AC di rumah, apartemen, ruko, dan ruang personal Anda.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {SERVICES.map((s) => (
                <a
                  key={s.title}
                  href={waLink(wa, `Halo ${settings.brandName}, saya tertarik dengan layanan *${s.title}*`)}
                  target="_blank"
                  rel="noopener"
                  className="group flex flex-col justify-between rounded-xl border border-line-soft bg-white p-8 transition-colors hover:border-navy"
                >
                  <h3 className="font-display text-[32px] font-bold leading-tight text-[#1c1c1c]">
                    {s.title}
                  </h3>
                  <div className="mt-6">
                    <p className="text-xl leading-relaxed text-[#b3b3b3]">{s.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-xl text-[#1c1c1c]">
                      Hubungi Kami
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 5. UNTUK BISNIS (138:2239, 3072-4096) dark navy, divider, 2x2 horizontal cards ============ */}
        <section id="bisnis" className="min-h-[1024px] bg-[#182a3a] pt-[100px]">
          <div className="container-everest">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1.1] text-[#fafafa]">
                Untuk&nbsp;Bisnis
              </h2>
              <p className="max-w-[232px] text-right text-base leading-snug text-[#fafafa]">
                Solusi tata udara yang dirancang untuk performa, efisiensi, dan masa pakai jangka panjang.
              </p>
            </div>
            <hr className="mt-5 border-t border-white/10" />
            <div className="mt-8 grid gap-x-[35px] gap-y-9 lg:grid-cols-2">
              {BUSINESS_OFFERS.map((o) => (
                <a
                  key={o.title}
                  href={waLink(wa, `Halo ${settings.brandName}, saya tertarik dengan layanan *${o.title}*`)}
                  target="_blank"
                  rel="noopener"
                  className="group flex flex-col justify-between rounded-xl bg-white/5 px-6 py-8 transition-colors hover:border hover:border-[#56d2ff]"
                >
                  <div>
                    <h3 className="font-display text-[32px] font-bold leading-tight text-[#fafafa]">
                      {o.title}
                    </h3>
                    <p className="mt-3 text-xl leading-relaxed text-[#b3b3b3]">{o.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-xl text-[#fafafa]">
                    Hubungi Kami
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 6. PARTNER PARADE (138:2623, 4096-4608) ============ */}
        <section className="flex min-h-[512px] items-center bg-[#1c1c1c] py-0">
          <div className="container-everest w-full grid gap-6 lg:grid-cols-1">
            <div className="mx-auto max-w-[816px] text-center">
              <h2 className="font-display text-[32px] font-bold text-[#fafafa]">
                Dipercaya oleh 500+ Mitra Ternama
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

        {/* ============ 7. BLOG (Berita & Blog, 4608-5632) ============ */}
        <section id="blog" className="min-h-[1024px] bg-[#fafafa] pt-[122px]">
          <div className="container-everest">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1.1] text-[#000]">
                Berita&nbsp;&amp;&nbsp;Blog
              </h2>
              <p className="max-w-[232px] text-right text-base text-[#2b2b2b]">
                Layanan end-to-end untuk kebutuhan AC di rumah, apartemen, ruko, dan ruang personal Anda.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-xl border border-line-soft bg-white transition-colors hover:border-navy">
                  {p.imageUrl && (
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image src={buildAssetUrl(p.imageUrl)} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 25vw" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-[#1c1c1c]">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-[#b3b3b3]">{p.excerpt}</p>
                    <span className="mt-4 inline-block text-sm font-medium text-[#1c1c1c]">Read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 8. TEMUKAN KAMI (5632-6656) ============ */}
        <section id="lokasi" className="min-h-[1024px] bg-[#fafafa] pt-[104px]">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1.1] text-[#000]">
              Temukan&nbsp;Kami
            </h2>
            <div className="mt-14 grid gap-12 lg:grid-cols-[560px_1fr] lg:justify-between">
              {/* Branch cards — LIGHT bg with dark text per design */}
              <div className="space-y-6">
                {branches.map((b, bi) => (
                  <div key={b.id} className="rounded-xl border border-line-soft bg-white p-8">
                    <h3 className="font-display text-[32px] font-bold leading-tight text-[#1c1c1c]">
                      {b.name}
                    </h3>
                    <p className="mt-3 text-xl leading-relaxed text-[#b3b3b3]">{b.address}</p>
                    <p className="mt-2 text-sm text-[#94a3b8]">{b.label}: {b.phone}</p>
                    {b.mapUrl && (
                      <a href={b.mapUrl} target="_blank" rel="noopener" className="mt-4 inline-flex items-center gap-2 text-xl font-normal text-[#1c1c1c]">
                        Buka di Peta
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact / inquiries panel (design x778) */}
              <div className="rounded-xl bg-white p-9">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-[#94a3b8]">Cleaning &amp; Service Hotline</p>
                    <p className="mt-1 text-lg font-bold text-[#131625]">{settings.phoneDisplay}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#94a3b8]">Corporate Inquiries</p>
                    <p className="mt-1 text-base text-[#131625]">{settings.emailMarketing}</p>
                    <p className="text-base text-[#131625]">{settings.emailProject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#94a3b8]">Official Web domain</p>
                    <p className="mt-1 text-base font-medium text-[#131625]">www.aceverestserpong.com</p>
                  </div>
                  <a
                    href={waLink(wa, consultationWaMessage(settings.brandName))}
                    target="_blank"
                    rel="noopener"
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-medium text-[#fafafa] transition-colors hover:bg-navy-deep"
                  >
                    Hubungi Tim Anda
                  </a>
                </div>
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