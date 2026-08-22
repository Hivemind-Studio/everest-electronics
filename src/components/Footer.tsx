import Link from "next/link";
import Image from "next/image";
import { brandUrl } from "@/lib/brandAssets";
import type { SiteSettings } from "@/lib/data";
import type { ReactNode } from "react";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Layanan",
    links: [
      { label: "Jual Unit Baru", href: "/#retail" },
      { label: "Service & Clean", href: "/#retail" },
      { label: "Tukar Tambah", href: "/#retail" },
      { label: "Sistem AC Central", href: "/#retail" },
    ],
  },
  {
    title: "Bisnis & VRF",
    links: [
      { label: "VRV / VRF System", href: "/#bisnis" },
      { label: "Chiller System", href: "/#bisnis" },
      { label: "Ducting System", href: "/#bisnis" },
      { label: "Ventilation", href: "/#bisnis" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Daftar Penghargaan", href: "/tentang#penghargaan" },
      { label: "Mitra Terpercaya", href: "/#distributors" },
      { label: "Hubungi Kontak", href: "/#lokasi" },
    ],
  },
];

/* Outline social icons matching the Figma material-symbols-light set
   (24px box, ~2px stroke, #FAFAFA). TikTok intentionally absent — the
   design (node 138-2201) defines exactly four icons. */
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
      <path d="M16.67 3h-2.42A3.75 3.75 0 0 0 10.5 6.75V9.5H7.33v3.5h3.17V21h3.5v-8h2.84l.5-3.5h-3.34V7.08c0-.6.48-1.08 1.08-1.08h1.59V3Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
      <rect x="1.5" y="4.94" width="21" height="14.13" rx="4" />
      <path d="M10 9.2l4.8 2.8L10 14.8V9.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
      <circle cx="4.4" cy="4.9" r="1.7" fill="currentColor" stroke="none" />
      <path d="M2.9 9.3h3V21h-3z" />
      <path d="M9.4 21V9.3h3v1.7c.63-1.06 1.86-2 3.68-2 2.95 0 4.52 1.87 4.52 5.23V21h-3.1v-6.1c0-1.72-.62-2.74-2.05-2.74-1.53 0-2.75 1.02-2.75 3.05V21H9.4Z" />
    </svg>
  );
}

export function Footer({ settings }: { settings: SiteSettings }) {
  const socials: { label: string; href: string; icon: ReactNode }[] = [
    { label: "Instagram", href: settings.instagramUrl, icon: <InstagramIcon /> },
    { label: "Facebook", href: settings.facebookUrl, icon: <FacebookIcon /> },
    { label: "YouTube", href: settings.youtubeUrl, icon: <YoutubeIcon /> },
    { label: "LinkedIn", href: settings.linkedinUrl, icon: <LinkedinIcon /> },
  ];

  return (
    <footer className="bg-ink text-white">
      <div className="container-everest pt-24 pb-20 md:pt-36 md:pb-32 lg:pt-[220px] lg:pb-[208px]">
        {/* Logo — luminosity blend reproduces the Figma monochrome treatment */}
        <Image
          src={brandUrl("logo")}
          alt={settings.brandName}
          width={240}
          height={240}
          sizes="(max-width: 768px) 160px, 240px"
          className="h-40 w-40 object-contain mix-blend-luminosity md:h-60 md:w-60"
        />

        {/* Blurb + link columns */}
        <div className="mt-6 grid gap-x-12 gap-y-12 lg:mt-6 lg:grid-cols-[416px_1fr]">
          <div>
            <p className="max-w-[416px] text-base leading-[1.6] text-mist">
              Rekan utama dalam penjualan dan layanan purna jual sistem pendingin udara
              terlengkap dan terpercaya di seluruh penjuru Indonesia semenjak{" "}
              {settings.estYear}.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="text-paper transition-opacity hover:opacity-70"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:gap-x-20">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-lg font-bold leading-[22px] text-paper">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[15px] leading-[18px] text-mist transition-colors hover:text-paper"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 border-t border-ink-soft pt-8">
          <p className="text-sm leading-[17px] text-graphite">{settings.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
