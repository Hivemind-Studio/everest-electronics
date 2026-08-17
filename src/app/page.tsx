import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import {
  getSettings,
  getServices,
  getAwards,
  getPublishedPosts,
  getBranches,
} from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";
import {
  waLink,
  serviceWaMessage,
  consultationWaMessage,
  promoWaMessage,
  defaultWaMessage,
} from "@/lib/wa";

const CLIENT_BRANDS = [
  "Daikin", "Panasonic", "Gree", "Samsung", "Sharp", "LG",
  "Midea", "Polytron", "Toshiba", "Aqua", "Mitsubishi", "Hisense",
  "Changhong",
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, services, awards, posts, branches] = await Promise.all([
    getSettings(),
    getServices(),
    getAwards(),
    getPublishedPosts(4),
    getBranches(),
  ]);

  const heroImg = buildAssetUrl("2026-08/hero-90218d0e.webp");
  const hvacImg = buildAssetUrl("2026-08/hvac-fa6b68c7.webp");
  const promoImg = buildAssetUrl("2026-08/promo-de24e8ab.webp");

  const wa = settings.whatsappNumber;

  return (
    <div className="flex min-h-screen flex-col">
      <Header brandName={settings.brandName} />

      <main className="flex-1">
        {/* ============ 1. HERO ============ */}
        <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-navy-deep">
          <div className="absolute inset-0">
            <Image
              src={heroImg}
              alt=""
              fill
              priority
              className="object-cover opacity-60"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/60 to-transparent" />
          </div>

          <div className="container-everest relative z-10 py-24">
            <p className="font-display text-sm font-bold uppercase tracking-[0.4em] text-gold">
              {settings.estYear} — Indonesia
            </p>
            <h1 className="mt-4 font-display text-[clamp(3rem,9vw,6rem)] font-bold leading-[0.95] tracking-tight text-white">
              {settings.heroEyebrow}
              <span className="block text-gold">{settings.heroTitle}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              {settings.heroTagline}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={waLink(wa, defaultWaMessage(settings.brandName))} target="_blank" rel="noopener" className="btn-navy px-7 py-3.5 text-sm">
                Hubungi Kami
              </a>
              <a href="#layanan" className="btn-outline bg-white/5 px-7 py-3.5 text-sm text-white border-white/25 hover:border-white">
                Jelajahi Layanan
              </a>
            </div>
          </div>
        </section>

        {/* ============ 2. ABOUT VISI MISI ============ */}
        <section id="tentang" className="bg-paper py-24">
          <div className="container-everest grid gap-16 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Tentang Kami</p>
              <h2 className="section-heading mt-3">Our Vision</h2>
              <p className="mt-8 max-w-lg font-display text-2xl font-medium leading-snug text-ink-soft">
                &ldquo;Visi kami adalah menjadi rekanan utama dalam penjualan dan layanan
                purna jual sistem pendingin udara seluruh Indonesia.&rdquo;
              </p>
              <div className="relative mt-10 aspect-[560/340] overflow-hidden rounded-lg">
                <Image src={hvacImg} alt="Sistem HVAC gedung" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
            </div>

            <div>
              <p className="eyebrow">Visi &amp; Misi</p>
              <h2 className="section-heading mt-3">Our Mission</h2>
              <div className="mt-10 space-y-8">
                {[
                  ["01", "Kualitas Layanan yang Konsisten", "Menyediakan layanan dengan standard dan kualitas tinggi yang konsisten untuk memastikan kepuasan pelanggan yang bekelanjutan."],
                  ["02", "Inovasi dalam Layanan", "Mengadopsi teknologi terbaru dan metode inovatif dalam setiap aspek layanan untuk meningkatkan efektivitas dan efisiensi operasional."],
                  ["03", "Peningkatan Keterampilan & Pengetahuan", "Melakukan pelatihan dan pengembangan terus-menerus bagi tim kami untuk memastikan keahlian teknis terdepan di industri tata udara."],
                ].map(([num, title, desc]) => (
                  <div key={num} className="flex gap-6 border-b border-line-soft pb-8">
                    <span className="font-display text-2xl font-bold text-gold">{num}</span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-graphite">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3. SERVICES ============ */}
        <section id="layanan" className="bg-white py-24">
          <div className="container-everest">
            <p className="eyebrow">What We Do</p>
            <h2 className="section-heading mt-3">Our Professional Services</h2>
            <p className="mt-4 max-w-2xl text-lg text-graphite">
              End-to-end climate solutions from corporate installation setups to
              periodic home ventilation maintenance.
            </p>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={waLink(wa, serviceWaMessage(settings.brandName, s.title))}
                  target="_blank"
                  rel="noopener"
                  className="group flex flex-col justify-between rounded-lg border border-line-soft bg-paper p-8 transition-all hover:border-navy hover:shadow-lg"
                >
                  <div>
                    <div className="mb-6 h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e4394" strokeWidth="2">
                        <path d="M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-graphite">{s.tagline}</p>
                  </div>
                  <span className="link-arrow mt-8 text-sm">
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. AWARDS ============ */}
        <section id="penghargaan" className="bg-navy-deep py-24">
          <div className="container-everest">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow text-gold">Our Pride</p>
                <h2 className="section-heading mt-3 text-white">Industry Awards</h2>
              </div>
              <p className="max-w-sm text-base text-white/70">
                Menyediakan layanan dengan standard dan kualitas tinggi yang konsisten
                untuk memastikan kepuasan pelanggan yang bekelanjutan di seluruh Indonesia.
              </p>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {awards.map((a, i) => (
                <div
                  key={a.id}
                  className={
                    "group overflow-hidden rounded-lg " +
                    (i === 1 ? "md:translate-y-8" : "")
                  }
                >
                  {a.imageUrl && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={buildAssetUrl(a.imageUrl)}
                        alt={a.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="bg-white p-8">
                    <span className="font-display text-sm font-bold text-gold">{a.year}</span>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink">{a.title}</h3>
                    <p className="mt-2 text-sm text-graphite">{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 5. CLIENTS ============ */}
        <section className="bg-paper py-24">
          <div className="container-everest text-center">
            <p className="eyebrow">Dipercaya Oleh</p>
            <h2 className="section-heading mt-3">500+ Mitra &amp; Official Distributors</h2>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {CLIENT_BRANDS.map((b) => (
                <span key={b} className="font-display text-xl font-bold uppercase tracking-wide text-mist transition-colors hover:text-ink">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 6. BLOG ============ */}
        <section id="blog" className="bg-white py-24">
          <div className="container-everest">
            {/* Promo banner */}
            <div className="relative mb-20 overflow-hidden rounded-lg bg-navy text-white">
              <div className="absolute inset-0 opacity-30">
                <Image src={promoImg} alt="" fill className="object-cover" sizes="100vw" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
              <div className="relative z-10 flex flex-col gap-6 p-10 md:flex-row md:items-center md:justify-between md:p-14">
                <div className="max-w-xl">
                  <p className="eyebrow text-gold">Featured Promo</p>
                  <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                    Promo Clean &amp; Service Menyambut Ramadhan
                  </h3>
                  <p className="mt-3 text-white/80">
                    Nikmati diskon paket cuci AC dan perawatan berkala untuk kenyamanan
                    rumah ibadah dan keluarga Anda. Hubungi kami hari ini.
                  </p>
                </div>
                <a href={waLink(wa, promoWaMessage(settings.brandName))} target="_blank" rel="noopener" className="btn-gold shrink-0">
                  Claim Promo Now
                </a>
              </div>
            </div>

            <p className="eyebrow">Insights &amp; Updates</p>
            <h2 className="section-heading mt-3">Berita &amp; Blog</h2>
            <p className="mt-4 max-w-2xl text-lg text-graphite">
              Menyediakan informasi edukatif seputar teknologi pendingin ruangan terbaru,
              tips perawatan mandiri, dan update proyek Everest.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-lg border border-line-soft bg-paper transition-all hover:border-navy hover:shadow-lg">
                  {p.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={buildAssetUrl(p.imageUrl)}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:768px) 100vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-base font-bold leading-snug text-ink group-hover:text-navy">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-graphite">{p.excerpt}</p>
                    <span className="link-arrow mt-4 text-sm">
                      Read
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/blog" className="btn-outline px-7 py-3 text-sm">
                Lihat Semua Artikel
              </Link>
            </div>
          </div>
        </section>

        {/* ============ 7. FIND US ============ */}
        <section id="lokasi" className="bg-paper py-24">
          <div className="container-everest">
            <p className="eyebrow">Contact &amp; Locations</p>
            <h2 className="section-heading mt-3">Find Everest Near You</h2>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {branches.map((b) => (
                <div key={b.id} className="rounded-lg border border-line-soft bg-white p-10">
                  <h3 className="font-display text-xl font-bold text-ink">{b.name}</h3>
                  <p className="mt-4 text-base leading-relaxed text-graphite">{b.address}</p>
                  <div className="mt-8 border-t border-line-soft pt-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-mist">{b.label}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-navy">{b.phone}</p>
                  </div>
                  {b.mapUrl && (
                    <a href={b.mapUrl} target="_blank" rel="noopener" className="link-arrow mt-6 text-sm">
                      Buka Peta &amp; Navigasi
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Consultation banner */}
            <div className="mt-14 flex flex-col items-start justify-between gap-8 rounded-lg bg-navy p-10 md:flex-row md:items-center md:p-14">
              <div className="max-w-xl">
                <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Butuh Konsultasi AC Skala Bisnis / Rumah Tangga?
                </h3>
                <p className="mt-3 text-white/80">
                  Tim engineering berpengalaman kami siap merancang sistem pendingin udara
                  terbaik yang efisien, hemat listrik, dan rapi secara estetika.
                </p>
              </div>
              <a href={waLink(wa, consultationWaMessage(settings.brandName))} target="_blank" rel="noopener" className="btn-gold shrink-0">
                Hubungi Tim Ahli Kami
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} branches={branches} />
      <FloatingWhatsApp number={wa} brandName={settings.brandName} />
    </div>
  );
}