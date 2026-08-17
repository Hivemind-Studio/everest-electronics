import Link from "next/link";
import { logoutAction } from "../actions";
import { requireAuth } from "@/lib/auth";
import { getSettings } from "@/lib/data";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAuth();
  const settings = await getSettings();

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line-soft bg-white">
        <div className="container-everest flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-display text-lg font-bold text-ink">
              {settings.brandName}
            </Link>
            <span className="rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold text-navy">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-graphite hover:text-ink">
              Lihat Situs ↗
            </Link>
            <form action={logoutAction}>
              <button className="text-sm font-medium text-graphite hover:text-red-600">
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>
      <nav className="border-b border-line-soft bg-white">
        <div className="container-everest flex gap-6 overflow-x-auto py-3 text-sm">
          {[
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/blog", label: "Artikel" },
            { href: "/admin/services", label: "Layanan" },
            { href: "/admin/awards", label: "Penghargaan" },
            { href: "/admin/branches", label: "Cabang" },
            { href: "/admin/settings", label: "Pengaturan" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="whitespace-nowrap font-medium text-graphite hover:text-navy">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
      <main className="container-everest py-10">{children}</main>
    </div>
  );
}