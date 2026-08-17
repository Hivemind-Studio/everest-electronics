import { prisma } from "@/lib/db";
import { createService, updateService, deleteService } from "./actions";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const metadata = { title: "Layanan | Everest Electronics" };

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Layanan</h1>
      <p className="mt-1 text-sm text-graphite">Kelola layanan yang tampil di halaman utama.</p>

      <h2 className="mt-8 font-display text-lg font-bold text-ink">Tambah Layanan Baru</h2>
      <form action={createService} className="mt-3 grid gap-4 rounded-xl border border-line-soft bg-white p-6 lg:grid-cols-2">
        <div>
          <label htmlFor="new-title" className="mb-1 block text-sm font-semibold text-ink">Judul</label>
          <input id="new-title" name="title" placeholder="Judul layanan" required className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        </div>
        <div>
          <label htmlFor="new-tagline" className="mb-1 block text-sm font-semibold text-ink">Tagline</label>
          <input id="new-tagline" name="tagline" placeholder="Tagline" className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        </div>
        <div className="lg:col-span-2">
          <ImageUploader name="imageUrl" label="Gambar Layanan" />
        </div>
        <input type="hidden" name="sortOrder" value={services.length} />
        <div className="lg:col-span-2">
          <button className="btn-navy px-5 py-2 text-sm">Tambah</button>
        </div>
      </form>

      <h2 className="mt-10 font-display text-lg font-bold text-ink">Layanan yang Ada</h2>
      <div className="mt-3 space-y-4">
        {services.map((s) => (
          <form key={s.id} action={updateService} className="grid gap-4 rounded-xl border border-line-soft bg-white p-6 lg:grid-cols-2">
            <input type="hidden" name="id" value={s.id} />
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Judul</label>
              <input name="title" defaultValue={s.title} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Tagline</label>
              <input name="tagline" defaultValue={s.tagline} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div className="lg:col-span-2">
              <ImageUploader name="imageUrl" label="Gambar Layanan" defaultValue={s.imageUrl} />
            </div>
            <div className="flex gap-3 lg:col-span-2">
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-navy hover:bg-navy/5">Simpan</button>
              <button formAction={deleteService} className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
            </div>
          </form>
        ))}
      </div>
      {services.length === 0 && (
        <p className="mt-4 text-sm text-graphite">Belum ada layanan.</p>
      )}
    </div>
  );
}