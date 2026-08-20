"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Nav links per the new Figma design (Web page).
const LINKS = [
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/#retail", label: "Retail" },
  { href: "/#bisnis", label: "Bisnis" },
  { href: "/#lokasi", label: "Kontak" },
  { href: "/#lokasi", label: "Temukan Kami" },
  { href: "/blog", label: "Blogs" },
];

export function Header({
  brandName,
  projectsUrl,
}: {
  brandName: string;
  projectsUrl?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onHome = pathname === "/";

  // Track scroll to make the nav transparent at the very top, solid after.
  // Only meaningful on the homepage (dark hero); other pages stay solid.
  useEffect(() => {
    if (!onHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const solid = !onHome || scrolled || open;

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 " +
        (solid ? "border-b border-black/5 bg-[#fafaf9] shadow-sm" : "bg-transparent")
      }
    >
      <div className="container-everest flex h-16 items-center justify-between">
        <Link
          href="/"
          className={
            "font-display text-xl font-bold tracking-tight transition-colors " +
            (solid ? "text-ink" : "text-[#fafafa]")
          }
        >
          {brandName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Utama">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={
                "text-sm font-medium transition-colors " +
                (solid ? "text-ink/80 hover:text-ink" : "text-[#fafafa]/90 hover:text-white")
              }
            >
              {l.label}
            </Link>
          ))}
          {projectsUrl ? (
            <a
              href={projectsUrl}
              target="_blank"
              rel="noopener"
              className={
                "inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition-colors " +
                (solid
                  ? "bg-[#1c1c1c] text-[#fafafa] hover:bg-[#1e4394]"
                  : "bg-[#fafafa]/15 text-[#fafafa] hover:bg-[#fafafa] hover:text-[#1c1c1c]")
              }
            >
              Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ) : (
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden"
              aria-hidden="true"
            >
              Project
            </a>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className={
            "lg:hidden transition-colors " + (solid ? "text-ink" : "text-[#fafafa]")
          }
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
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-graphite"
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