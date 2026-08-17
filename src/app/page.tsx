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

  // Clean hero background (photo only — title is real HTML, never baked in)
  const heroImg = buildAssetUrl("2026-08/hero-bg-clean-a2f25c20.webp");
  const hvacImg = buildAssetUrl("2026-08/hvac-fa6b68c7.webp");
  const promoImg = buildAssetUrl("2026-08/promo-banner-51f95376.webp");

  const wa = settings.whatsappNumber;

  return (
    <div className="flex min-h-screen flex-col">
      <Header brandName={settings.brandName} />

      <main className="flex-1">
        {/* ============ 1. HERO (background image + HTML title) ============ */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0f111a]">
          {/* Hero image is a SEPARATE component/background */}
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={heroImg}
              alt=""
              fill
              priority
              className="object-cover opacity-100"
              sizes="100vw"
            />
            {/* 50% dark navy overlay per design (#0f111a @ 0.5) */}
            <div className="absolute inset-0 bg-[#0f111a]/50" />
            {/* left-edge subtle gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f111a]/70 via-transparent to-transparent" />
            {/* top dark band so the transparent navbar's white text stays readable over light hero-top */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0f111a]/80 to-transparent" />
          </div>

          <div className="container-everest relative z-10 py-32 text-center">
            <h1 className="font-display text-[clamp(3.5rem,10vw,6rem)] font-bold leading-[0.95] tracking-[0.06em] text-[#fafafa]">
              EVEREST
            </h1>
            <p className="mx-auto mt-4 font-display text-[clamp(1.5rem,4vw,2.25rem)] font-normal tracking-[0.22em] text-[#c5a880]">
              Electronics &amp; Climate Systems
            </p>
            <p className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-[#d4d4d4]">
              Pioneering premium air conditioning and professional electronic
              integration across Indonesia with master craftsmanship.
            </p>
          </div>

          {/* Hero footer info — bottom of hero, separate elements */}
          <div className="container-everest absolute bottom-10 left-0 right-0 z-10 flex items-center justify-between">
            <p className="text-sm tracking-wide text-[#b3b3b3]">EST. 1998 — INDONESIA</p>
            <a
              href="#layanan"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] font-medium text-[#c5a880]"
            >
              Explore Our System
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        {/* ============ 2. ABOUT VISI MISI (bg #fafafa) ============ */}
        <section id="tentang" className="bg-[#fafafa] py-24">
          <div className="container-everest grid gap-16 lg:grid-cols-2 lg:gap-0">
            {/* Visi Column */}
            <div className="lg:pt-0">
              <div>
                <p className="eyebrow">Tentang Kami</p>
                <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-ink">
                  Our Vision
                </h2>
              </div>
              <p className="mt-8 max-w-lg font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-snug text-[#2b2b2b]">
                &ldquo;Visi kami adalah menjadi rekanan utama dalam penjualan dan layanan
                purna jual sistem pendingin udara seluruh Indonesia.&rdquo;
              </p>
              <div className="relative mt-8 aspect-[560/340] overflow-hidden rounded-lg">
                <Image src={hvacImg} alt="Sistem HVAC gedung" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
            </div>

            {/* Misi Column */}
            <div className="lg:pt-[72px]">
              <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-ink">
                Our Mission
              </h2>
              <div className="mt-8 space-y-8">
                {[
                  ["01", "Kualitas Layanan yang Konsisten", "Menyediakan layanan dengan standard dan kualitas tinggi yang konsisten untuk memastikan kepuasan pelanggan yang bekelanjutan."],
                  ["02", "Inovasi dalam Layanan", "Mengadopsi teknologi terbaru dan metode inovatif dalam setiap aspek layanan untuk meningkatkan efektivitas dan efisiensi operasional."],
                  ["03", "Peningkatan Keterampilan & Pengetahuan", "Melakukan pelatihan dan pengembangan terus-menerus bagi tim kami untuk memastikan keahlian teknis terdepan di industri tata udara."],
                ].map(([num, title, desc]) => (
                  <div key={num}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-xl font-bold text-[#1e4394]">{num}</span>
                      <h3 className="font-display text-[1.35rem] font-bold text-ink">
                        {title}
                      </h3>
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-[#757575]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ 3. SERVICES (bg #1c1c1c dark) ============ */}
        <section id="layanan" className="bg-[#1c1c1c] py-24">
          <div className="container-everest">
            <p className="eyebrow text-[#c5a880]">What We Do</p>
            <h2 className="section-heading mt-3 text-[#fafafa]">Our Professional Services</h2>
            <p className="mt-4 max-w-2xl text-lg text-[#b3b3b3]">
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
                  className="group flex flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-8 transition-colors hover:border-[#c5a880]"
                >
                  <div>
                    <div className="mb-6 h-10 w-10 rounded-full bg-[#c5a880]/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c5a880" strokeWidth="2">
                        <path d="M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#fafafa]">{s.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#b3b3b3]">{s.tagline}</p>
                  </div>
                  <span className="link-arrow mt-8 text-sm text-[#c5a880]">
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

        {/* ============ 4. AWARDS (bg #fafafa) — full-bleed image cards V/H/V ============ */}
        <section id="penghargaan" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Our Pride</p>
                <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-ink">
                  Industry Awards
                </h2>
              </div>
              <p className="max-w-[400px] text-base leading-relaxed text-[#757575]">
                Menyediakan layanan dengan standard dan kualitas tinggi yang konsisten
                untuk memastikan kepuasan pelanggan yang bekelanjutan di seluruh Indonesia.
              </p>
            </div>

            {/* Awards row — V / H / V cards, top-aligned baseline. Horizontally scrollable on mobile */}
            <div className="mt-14 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-[264px_429px_264px] lg:justify-center lg:overflow-visible lg:pb-0 lg:gap-6">
              {awards.map((a, i) => {
                const isMiddle = i === 1;
                const img = buildAssetUrl(a.imageUrl || "2026-08/award1-3103bb8b.webp");
                return (
                  <div
                    key={a.id}
                    className={
                      "group relative shrink-0 snap-start overflow-hidden rounded-lg " +
                      (isMiddle
                        ? "aspect-[429/264] w-[300px] sm:w-[380px] lg:w-auto lg:aspect-[429/264]"
                        : "aspect-[264/429] w-[220px] sm:w-[264px] lg:w-auto lg:aspect-[264/429]")
                    }
                  >
                    <Image
                      src={img}
                      alt={a.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes={
                        isMiddle
                          ? "(max-width:768px) 100vw, 429px"
                          : "(max-width:768px) 100vw, 264px"
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-xl font-bold text-[#fafafa]">
                          {a.title}
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fafafa" strokeWidth="2" className="shrink-0">
                          <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="mt-1 text-base leading-snug text-[#d4d4d4]">{a.detail}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-sm font-medium text-[#fafafa]">{a.year}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ 5. CLIENTS (bg #fafafa) ============ */}
        <section className="bg-[#fafafa] py-24">
          <div className="container-everest text-center">
            <p className="eyebrow">Dipercaya Oleh</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,2.75rem)] font-bold text-ink">
              500+ Mitra &amp; Official Distributors
            </h2>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {CLIENT_BRANDS.map((b) => (
                <span key={b} className="font-display text-xl font-bold uppercase tracking-wide text-mist transition-colors hover:text-ink">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 6. BLOG (bg #fafafa) ============ */}
        <section id="blog" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <div className="relative mb-20 overflow-hidden rounded-lg">
              {/* Promo image as a SEPARATE background component — text is HTML on top */}
              <div className="absolute inset-0" aria-hidden="true">
                <Image
                  src={promoImg}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              </div>
              <div className="relative z-10 flex min-h-[400px] flex-col justify-center gap-6 p-10 md:p-16">
                <div className="max-w-[520px]">
                  <p className="font-display text-base font-bold text-[#c5a880]">Featured Promo</p>
                  <h3 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight text-[#fafafa]">
                    Promo Clean &amp; Service Menyambut Ramadhan
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-[#d4d4d4]">
                    Nikmati diskon paket cuci AC dan perawatan berkala untuk kenyamanan
                    rumah ibadah dan keluarga Anda. Hubungi kami hari ini.
                  </p>
                </div>
                <a
                  href={waLink(wa, promoWaMessage(settings.brandName))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fafafa] px-6 py-3 text-sm font-medium text-[#1c1c1c] transition-colors hover:bg-[#c5a880] hover:text-white"
                >
                  Claim Promo Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                <Link key={p.id} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-lg border border-[#d9d9d9] bg-white transition-colors hover:border-[#1e4394]">
                  {p.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={buildAssetUrl(p.imageUrl)} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 25vw" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-[#1e4394]">{p.title}</h3>
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

        {/* ============ 7. FIND US (bg #fafafa) ============ */}
        <section id="lokasi" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <p className="eyebrow">Contact &amp; Locations</p>
            <h2 className="section-heading mt-3">Find Everest Near You</h2>

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {branches.map((b, bi) => (
                <div
                  key={b.id}
                  className={
                    "rounded-lg p-10 " +
                    (bi % 2 === 0 ? "bg-[#1c1c1c]" : "bg-[#2b2b2b]")
                  }
                >
                  <h3 className="font-display text-xl font-bold text-[#fafafa]">{b.name}</h3>
                  <p className="mt-4 text-base leading-relaxed text-[#b3b3b3]">{b.address}</p>
                  <div className="mt-8">
                    <p className="text-sm text-[#c5a880]">{b.label}</p>
                    <p className="mt-1 font-display text-xl font-semibold text-[#fafafa]">{b.phone}</p>
                  </div>
                  {b.mapUrl && (
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noopener"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#c5a880]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                      Buka Peta &amp; Navigasi
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col items-start justify-between gap-8 rounded-lg bg-[#1e4394] p-10 md:flex-row md:items-center md:p-14">
              <div className="max-w-xl">
                <h3 className="font-display text-2xl font-bold text-[#fafafa] md:text-3xl">
                  Butuh Konsultasi AC Skala Bisnis / Rumah Tangga?
                </h3>
                <p className="mt-3 text-[#d4d4d4]">
                  Tim engineering berpengalaman kami siap merancang sistem pendingin udara
                  terbaik yang efisien, hemat listrik, dan rapi secara estetika.
                </p>
              </div>
              <a
                href={waLink(wa, consultationWaMessage(settings.brandName))}
                target="_blank"
                rel="noopener"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#fafafa] px-7 py-3.5 text-sm font-medium text-[#1c1c1c] transition-colors hover:bg-[#c5a880] hover:text-white"
              >
                Hubungi Tim Ahli Kami
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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