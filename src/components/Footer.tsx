import Link from "next/link";
import Image from "next/image";
import { waLink } from "@/lib/wa";
import { brandUrl } from "@/lib/brandAssets";
import type { SiteSettings, BranchItem } from "@/lib/data";

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

export function Footer({
  settings,
  branches,
}: {
  settings: SiteSettings;
  branches: BranchItem[];
}) {
  const whatsappBranch = branches.find((b) => b.label.includes("WHATSAPP")) || branches[0];

  return (
    <footer className="bg-navy-deep text-white">
      <div className="container-everest py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={brandUrl("logo")}
                alt="Everest Electronics"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <h3 className="font-display text-xl font-bold">{settings.brandName}</h3>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Rekan utama dalam penjualan dan layanan purna jual sistem pendingin udara
              terlengkap dan terpercaya di seluruh penjuru Indonesia semenjak {settings.estYear}.
            </p>
            <div className="mt-6 flex gap-4">
              {[
                { href: settings.instagramUrl, label: "Instagram" },
                { href: settings.facebookUrl, label: "Facebook" },
                { href: settings.youtubeUrl, label: "YouTube" },
                { href: settings.linkedinUrl, label: "LinkedIn" },
                { href: settings.tiktokUrl, label: "Tiktok" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/60 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {whatsappBranch && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <a
              href={waLink(settings.whatsappNumber, `Halo ${settings.brandName}, saya ingin bertanya.`)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
            >
              <span>{whatsappBranch.label}:</span>
              <span className="text-white">{settings.whatsappDisplay}</span>
            </a>
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="container-everest flex flex-col gap-3 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>{settings.copyright}</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-gold">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}