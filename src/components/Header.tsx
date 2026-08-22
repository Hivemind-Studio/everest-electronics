"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { brandUrl } from "@/lib/brandAssets";
import { waLink, projectWaMessage } from "@/lib/wa";

// Nav links per the Final Figma design (138-2366).
const LINKS = [
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/#layanan", label: "Layanan" },
  { href: "/#bisnis", label: "Bisnis" },
  { href: "/#lokasi", label: "Kontak" },
  { href: "/#lokasi", label: "Temukan Kami" },
  { href: "/blog", label: "Blogs" },
];

export function Header({
  brandName,
  projectsUrl,
  whatsappNumber,
}: {
  brandName: string;
  projectsUrl?: string;
  whatsappNumber?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#fafaf9] shadow-sm">
        <div className="container-everest flex h-[96px] items-center justify-between overflow-hidden">
          <Link href="/" aria-label={`${brandName} — Beranda`} className="flex items-center">
            <Image
              src={brandUrl("logo")}
              alt="Everest Electronics"
              width={72}
              height={72}
              className="h-[72px] w-[72px] object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Utama">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-[#2b2b2b] transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          {projectsUrl && (
            <a
              href={projectsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1c1c1c] px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-[#1c1c1c] hover:text-[#fafafa]"
            >
              Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
          <a
            href={
              whatsappNumber
                ? waLink(whatsappNumber, projectWaMessage(brandName))
                : "/#lokasi"
            }
            target={whatsappNumber ? "_blank" : undefined}
            rel={whatsappNumber ? "noopener" : undefined}
            className="inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
          >
            Project
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-ink transition-colors"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-black/5 bg-[#fafaf9] px-6 py-4 lg:hidden" aria-label="Utama mobile">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href} onClick={() => setOpen(false)} className="text-base font-medium text-graphite">
                  {l.label}
                </Link>
              </li>
            ))}
            {projectsUrl && (
              <li>
                <a
                  href={projectsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-navy px-5 py-3 text-sm"
                >
                  Project
                </a>
              </li>
            )}
            <li>
              <a
                href={
                  whatsappNumber
                    ? waLink(whatsappNumber, projectWaMessage(brandName))
                    : "/#lokasi"
                }
                target={whatsappNumber ? "_blank" : undefined}
                rel={whatsappNumber ? "noopener" : undefined}
                onClick={() => setOpen(false)}
                className="btn-navy px-5 py-3 text-sm"
              >
                Project
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}