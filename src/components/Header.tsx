"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/#tentang", label: "Tentang Kami" },
  { href: "/#layanan", label: "Layanan" },
  { href: "/#penghargaan", label: "Penghargaan" },
  { href: "/#blog", label: "Blog" },
  { href: "/#lokasi", label: "Lokasi" },
];

export function Header({ brandName }: { brandName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const section = href.split("#")[1];
    return section ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-paper/90 backdrop-blur">
      <div className="container-everest flex h-[72px] items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          {brandName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Utama">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={
                "text-sm font-medium transition-colors " +
                (isActive(l.href) ? "text-navy" : "text-graphite hover:text-ink")
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
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
        <nav className="border-t border-line-soft bg-paper px-6 py-4 lg:hidden" aria-label="Utama mobile">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={
                    "text-base font-medium " +
                    (isActive(l.href) ? "text-navy" : "text-graphite")
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}