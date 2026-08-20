import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getServices, getBranches } from "@/lib/data";
import { buildAssetUrl } from "@/lib/storage/url";
import { waLink, serviceWaMessage, consultationWaMessage } from "@/lib/wa";

const CLIENT_BRANDS = [
  "Daikin", "Panasonic", "Gree", "Samsung", "Sharp", "LG",
  "Midea", "Polytron", "Toshiba", "Aqua", "Mitsubishi", "Hisense",
  "Changhong",
];

const DISTRIBUTOR_LOGOS = [
  { name: "samsung" }, { name: "toshiba" }, { name: "aqua" },
  { name: "polytron" }, { name: "midea" }, { name: "mitsubishi" },
  { name: "changhong" }, { name: "lg" }, { name: "hisense" },
  { name: "panasonic" }, { name: "sharp" }, { name: "gree" }, { name: "daikin" },
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
  const [settings, services, branches] = await Promise.all([
    getSettings(),
    getServices(),
    getBranches(),
  ]);

  // Clean hero background (photo only — title is real HTML, never baked in)
  const heroImg = buildAssetUrl(
    settings.heroImageUrl || "2026-08/hero-bg-clean-a2f25c20.webp",
  );
  const wa = settings.whatsappNumber;

  return (
    <div className="flex min-h-screen flex-col">
      {/* LocalBusiness / HVAC structured data for rich results */}
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
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0f111a]">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={heroImg}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* 50% dark navy overlay per design (#0f111a @ 0.5) */}
            <div className="absolute inset-0 bg-[#0f111a]/50" />
            {/* left-edge subtle gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f111a]/70 via-transparent to-transparent" />
            {/* top dark band so the transparent navbar's white text stays readable */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0f111a]/80 to-transparent" />
          </div>

          <div className="container-everest relative z-10 py-32 text-center">
            <h1 className="font-display text-[clamp(3.5rem,10vw,6rem)] font-bold leading-[0.95] tracking-[0.06em] text-[#fafafa]">
              EVEREST
            </h1>
            <p className="mx-auto mt-2 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-[0.08em] text-[#fafafa]">
              Electronics
            </p>
            <p className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-[#d4d4d4]">
              {settings.heroTagline}
            </p>
          </div>

          {/* Hero footer info — bottom of hero */}
          <div className="container-everest absolute bottom-10 left-0 right-0 z-10 flex items-center justify-between">
            <p className="text-sm tracking-wide text-[#b3b3b3]">
              EST. {settings.estYear} — INDONESIA
            </p>
            <a
              href="#retail"
              className="inline-flex items-center gap-2 text-sm tracking-[0.1em] font-medium text-[#c5a880]"
            >
              Explore Our System
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>

        {/* ============ 2. RETAIL / SERVICES (bg #fafafa) ============ */}
        <section id="retail" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-ink">
              Services
            </h2>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={waLink(wa, serviceWaMessage(settings.brandName, s.title))}
                  target="_blank"
                  rel="noopener"
                  className="group flex flex-col justify-between rounded-lg border border-[#d9d9d9] bg-white p-8 transition-colors hover:border-[#1e4394]"
                >
                  <div>
                    <h3 className="font-display text-[1.5rem] font-bold leading-tight text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-lg leading-relaxed text-graphite">{s.tagline}</p>
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

        {/* ============ 3. OFFICIAL DISTRIBUTORS ============ */}
        <section id="distributors" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-ink">
              Official Distributors
            </h2>
            <div className="mt-16 grid grid-cols-3 gap-x-10 gap-y-12 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {DISTRIBUTOR_LOGOS.map((b) => (
                <div
                  key={b.name}
                  className="flex items-center justify-center opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                >
                  <Image
                    src={`/brand/${b.name}.png`}
                    alt={b.name}
                    width={140}
                    height={60}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 4. FOR BUSINESS ============ */}
        <section id="bisnis" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-ink">
              For Business
            </h2>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {BUSINESS_OFFERS.map((o) => (
                <a
                  key={o.title}
                  href={waLink(wa, serviceWaMessage(settings.brandName, o.title))}
                  target="_blank"
                  rel="noopener"
                  className="group flex flex-col justify-between rounded-lg border border-[#d9d9d9] bg-white p-9 transition-colors hover:border-[#1e4394]"
                >
                  <div>
                    <h3 className="font-display text-[1.6rem] font-bold leading-tight text-ink">
                      {o.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-graphite">{o.desc}</p>
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

        {/* ============ 5. CLIENTS (500+ Mitra) ============ */}
        <section className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <p className="eyebrow">Dipercaya Oleh</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] text-ink">
              Dipercaya oleh 500+ Mitra Ternama
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

        {/* ============ 6. FIND US ============ */}
        <section id="lokasi" className="bg-[#fafafa] py-24">
          <div className="container-everest">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-ink">
              Find Us
            </h2>
            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {branches.map((b, bi) => (
                <div
                  key={b.id}
                  className={
                    "rounded-lg p-10 " + (bi % 2 === 0 ? "bg-[#1c1c1c]" : "bg-[#2b2b2b]")
                  }
                >
                  <h3 className="font-display text-2xl font-bold text-[#fafafa]">{b.name}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-[#b3b3b3]">{b.address}</p>
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

            {/* Hubungi Kami contact block */}
            <div className="mt-14">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] text-ink">
                Hubungi Kami
              </h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {/* Emails + phone */}
                <ul className="space-y-4">
                  {[
                    settings.emailMarketing,
                    settings.emailProject,
                    settings.phoneDisplay,
                    `+${settings.whatsappNumber}`,
                  ].map((line) => (
                    <li key={line} className="text-base text-ink">
                      {line}
                    </li>
                  ))}
                </ul>
                {/* Socials */}
                <ul className="space-y-4">
                  {[
                    { label: "@Instagram", href: settings.instagramUrl },
                    { label: "LinkedIn", href: settings.linkedinUrl },
                    { label: "Tiktok", href: settings.tiktokUrl },
                  ].map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener" className="text-base text-ink hover:text-navy">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
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