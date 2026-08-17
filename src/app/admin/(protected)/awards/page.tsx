import { prisma } from "@/lib/db";
import { createAward, updateAward, deleteAward } from "./actions";

export const metadata = { title: "Penghargaan | Everest Electronics" };

export default async function AdminAwardsPage() {
  const awards = await prisma.award.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Penghargaan</h1>
      <p className="mt-1 text-sm text-graphite">Kelola penghargaan yang tampil di halaman utama.</p>

      <form action={createAward} className="mt-8 grid gap-3 rounded-xl border border-line-soft bg-white p-5 sm:grid-cols-[1fr_1.5fr_80px_auto]">
        <input name="title" placeholder="Judul" required className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        <input name="detail" placeholder="Detail" className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        <input name="year" placeholder="Tahun" className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        <button className="btn-navy px-5 py-2 text-sm">Tambah</button>
      </form>

      <div className="mt-6 space-y-3">
        {awards.map((a) => (
          <form key={a.id} action={updateAward} className="grid gap-3 rounded-xl border border-line-soft bg-white p-5 sm:grid-cols-[1fr_1.5fr_80px_auto]">
            <input type="hidden" name="id" value={a.id} />
            <input name="title" defaultValue={a.title} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            <input name="detail" defaultValue={a.detail} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            <input name="year" defaultValue={a.year} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            <div className="flex gap-3">
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-navy hover:bg-navy/5">Simpan</button>
              <button formAction={deleteAward} className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}