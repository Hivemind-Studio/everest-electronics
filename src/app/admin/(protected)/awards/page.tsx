import { prisma } from "@/lib/db";
import { createAward, updateAward, deleteAward } from "./actions";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const metadata = { title: "Penghargaan | Everest Electronics" };

export default async function AdminAwardsPage() {
  const awards = await prisma.award.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Penghargaan</h1>
      <p className="mt-1 text-sm text-graphite">Kelola penghargaan yang tampil di halaman utama.</p>

      <h2 className="mt-8 font-display text-lg font-bold text-ink">Tambah Penghargaan</h2>
      <form action={createAward} className="mt-3 grid gap-4 rounded-xl border border-line-soft bg-white p-6 lg:grid-cols-3">
        <div>
          <label htmlFor="new-title" className="mb-1 block text-sm font-semibold text-ink">Judul</label>
          <input id="new-title" name="title" placeholder="Judul" required className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        </div>
        <div>
          <label htmlFor="new-detail" className="mb-1 block text-sm font-semibold text-ink">Detail</label>
          <input id="new-detail" name="detail" placeholder="Detail" className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        </div>
        <div>
          <label htmlFor="new-year" className="mb-1 block text-sm font-semibold text-ink">Tahun</label>
          <input id="new-year" name="year" placeholder="Tahun" className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        </div>
        <div className="lg:col-span-3">
          <ImageUploader name="imageUrl" label="Gambar Penghargaan" />
        </div>
        <div className="lg:col-span-3">
          <button className="btn-navy px-5 py-2 text-sm">Tambah</button>
        </div>
      </form>

      <h2 className="mt-10 font-display text-lg font-bold text-ink">Penghargaan yang Ada</h2>
      <div className="mt-3 space-y-4">
        {awards.map((a) => (
          <form key={a.id} action={updateAward} className="grid gap-4 rounded-xl border border-line-soft bg-white p-6 lg:grid-cols-3">
            <input type="hidden" name="id" value={a.id} />
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Judul</label>
              <input name="title" defaultValue={a.title} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Detail</label>
              <input name="detail" defaultValue={a.detail} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Tahun</label>
              <input name="year" defaultValue={a.year} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div className="lg:col-span-3">
              <ImageUploader name="imageUrl" label="Gambar Penghargaan" defaultValue={a.imageUrl} />
            </div>
            <div className="flex gap-3 lg:col-span-3">
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-navy hover:bg-navy/5">Simpan</button>
              <button formAction={deleteAward} className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
            </div>
          </form>
        ))}
      </div>
      {awards.length === 0 && (
        <p className="mt-4 text-sm text-graphite">Belum ada penghargaan.</p>
      )}
    </div>
  );
}