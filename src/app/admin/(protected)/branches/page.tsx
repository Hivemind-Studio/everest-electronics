import { prisma } from "@/lib/db";
import { createBranch, updateBranch, deleteBranch } from "./actions";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const metadata = { title: "Cabang | Everest Electronics" };

export default async function AdminBranchesPage() {
  const branches = await prisma.branch.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Cabang</h1>
      <p className="mt-1 text-sm text-graphite">Kelola lokasi cabang &amp; kontak.</p>

      <h2 className="mt-8 font-display text-lg font-bold text-ink">Tambah Cabang</h2>
      <form action={createBranch} className="mt-3 grid gap-4 rounded-xl border border-line-soft bg-white p-6 lg:grid-cols-2">
        <div>
          <label htmlFor="new-name" className="mb-1 block text-sm font-semibold text-ink">Nama cabang</label>
          <input id="new-name" name="name" placeholder="Nama cabang" required className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        </div>
        <div>
          <label htmlFor="new-label" className="mb-1 block text-sm font-semibold text-ink">Label (TELEPON / WHATSAPP)</label>
          <input id="new-label" name="label" placeholder="Label kontak" className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        </div>
        <div>
          <label htmlFor="new-phone" className="mb-1 block text-sm font-semibold text-ink">No. telepon</label>
          <input id="new-phone" name="phone" placeholder="No. telepon" className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        </div>
        <div>
          <label htmlFor="new-address" className="mb-1 block text-sm font-semibold text-ink">Alamat</label>
          <input id="new-address" name="address" placeholder="Alamat" className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        </div>
        <div className="lg:col-span-2">
          <ImageUploader name="imageUrl" label="Gambar Cabang (opsional)" />
        </div>
        <div className="lg:col-span-2">
          <button className="btn-navy px-5 py-2 text-sm">Tambah</button>
        </div>
      </form>

      <h2 className="mt-10 font-display text-lg font-bold text-ink">Cabang yang Ada</h2>
      <div className="mt-3 space-y-4">
        {branches.map((b) => (
          <form key={b.id} action={updateBranch} className="grid gap-4 rounded-xl border border-line-soft bg-white p-6 lg:grid-cols-2">
            <input type="hidden" name="id" value={b.id} />
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Nama cabang</label>
              <input name="name" defaultValue={b.name} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Label kontak</label>
              <input name="label" defaultValue={b.label} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">No. telepon</label>
              <input name="phone" defaultValue={b.phone} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">URL peta</label>
              <input name="mapUrl" defaultValue={b.mapUrl || ""} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div className="lg:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-ink">Alamat</label>
              <input name="address" defaultValue={b.address} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            </div>
            <div className="lg:col-span-2">
              <ImageUploader name="imageUrl" label="Gambar Cabang (opsional)" defaultValue={b.imageUrl} />
            </div>
            <div className="flex gap-3 lg:col-span-2">
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-navy hover:bg-navy/5">Simpan</button>
              <button formAction={deleteBranch} className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
            </div>
          </form>
        ))}
      </div>
      {branches.length === 0 && (
        <p className="mt-4 text-sm text-graphite">Belum ada cabang.</p>
      )}
    </div>
  );
}