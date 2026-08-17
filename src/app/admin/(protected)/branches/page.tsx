import { prisma } from "@/lib/db";
import { createBranch, updateBranch, deleteBranch } from "./actions";

export const metadata = { title: "Cabang | Everest Electronics" };

export default async function AdminBranchesPage() {
  const branches = await prisma.branch.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Cabang</h1>
      <p className="mt-1 text-sm text-graphite">Kelola lokasi cabang &amp; kontak.</p>

      <form action={createBranch} className="mt-8 grid gap-3 rounded-xl border border-line-soft bg-white p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_120px_auto]">
        <input name="name" placeholder="Nama cabang" required className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        <input name="label" placeholder="Label (TELEPON / WHATSAPP)" className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        <input name="phone" placeholder="No. telepon" className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
        <button className="btn-navy px-5 py-2 text-sm">Tambah</button>
        <input name="address" placeholder="Alamat" className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy col-span-2 lg:col-span-4" />
      </form>

      <div className="mt-6 space-y-3">
        {branches.map((b) => (
          <form key={b.id} action={updateBranch} className="grid gap-3 rounded-xl border border-line-soft bg-white p-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_140px_auto]">
            <input type="hidden" name="id" value={b.id} />
            <input name="name" defaultValue={b.name} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            <input name="label" defaultValue={b.label} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            <input name="phone" defaultValue={b.phone} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy" />
            <div className="flex gap-3">
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-navy hover:bg-navy/5">Simpan</button>
              <button formAction={deleteBranch} className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">Hapus</button>
            </div>
            <input name="address" defaultValue={b.address} className="rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy sm:col-span-2 lg:col-span-4" />
          </form>
        ))}
      </div>
    </div>
  );
}