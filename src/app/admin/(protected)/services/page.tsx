import { prisma } from "@/lib/db";
import { createService, updateService, deleteService } from "./actions";

export const metadata = { title: "Layanan | Everest Electronics" };

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Layanan</h1>
      <p className="mt-1 text-sm text-graphite">Kelola layanan yang tampil di halaman utama.</p>

      <form action={createService} className="mt-8 grid gap-3 rounded-xl border border-line-soft bg-white p-5 sm:grid-cols-[1fr_1.5fr_90px_auto]">
        <input name="title" placeholder="Judul layanan" required className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        <input name="tagline" placeholder="Tagline" className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        <input name="sortOrder" type="number" defaultValue={0} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        <button className="btn-navy px-5 py-2 text-sm">Tambah</button>
      </form>

      <div className="mt-6 space-y-3">
        {services.map((s) => (
          <form key={s.id} action={updateService} className="grid gap-3 rounded-xl border border-line-soft bg-white p-5 sm:grid-cols-[1fr_1.5fr_90px_auto]">
            <input type="hidden" name="id" value={s.id} />
            <input name="title" defaultValue={s.title} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            <input name="tagline" defaultValue={s.tagline} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            <span className="flex items-center text-xs text-graphite">#{s.sortOrder}</span>
            <div className="flex gap-3">
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-navy hover:bg-navy/5">Simpan</button>
              <button formAction={deleteService} className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}