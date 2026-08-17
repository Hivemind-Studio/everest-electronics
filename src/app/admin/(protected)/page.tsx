import Link from "next/link";
import { prisma } from "@/lib/db";

export const metadata = { title: "Dashboard | Everest Electronics" };

export default async function AdminDashboard() {
  const [services, awards, posts, branches] = await Promise.all([
    prisma.service.count(),
    prisma.award.count(),
    prisma.blogPost.count(),
    prisma.branch.count(),
  ]);

  const stats = [
    { label: "Layanan", value: services, href: "/admin/services" },
    { label: "Penghargaan", value: awards, href: "/admin/awards" },
    { label: "Artikel", value: posts, href: "/admin/blog" },
    { label: "Cabang", value: branches, href: "/admin/branches" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-graphite">Kelola konten situs Everest Electronics.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-xl border border-line-soft bg-white p-6 transition-all hover:border-navy hover:shadow-md">
            <p className="text-sm font-medium text-graphite">{s.label}</p>
            <p className="mt-2 font-display text-4xl font-bold text-ink">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-line-soft bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Mulai dari mana?</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link href="/admin/blog" className="rounded-lg border border-line-soft p-4 transition-colors hover:border-navy">
            <p className="font-semibold text-ink">✍️ Kelola Artikel</p>
            <p className="mt-1 text-sm text-graphite">Tambah &amp; edit artikel blog</p>
          </Link>
          <Link href="/admin/settings" className="rounded-lg border border-line-soft p-4 transition-colors hover:border-navy">
            <p className="font-semibold text-ink">⚙️ Pengaturan</p>
            <p className="mt-1 text-sm text-graphite">Kontak, WhatsApp, sosial media</p>
          </Link>
        </div>
      </div>
    </div>
  );
}