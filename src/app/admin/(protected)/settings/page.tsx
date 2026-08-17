import { getSettings } from "@/lib/data";
import { updateSettings } from "./actions";
import { ImageUploader } from "@/components/admin/ImageUploader";

export const metadata = { title: "Pengaturan | Everest Electronics" };

export default async function AdminSettingsPage() {
  const s = await getSettings();
  const fields: { key: keyof typeof s; label: string; type?: string; full?: boolean }[] = [
    { key: "brandName", label: "Nama Brand" },
    { key: "whatsappNumber", label: "No. WhatsApp (628xx format)" },
    { key: "whatsappDisplay", label: "WhatsApp (tampilan)" },
    { key: "phoneDisplay", label: "Telepon (tampilan)" },
    { key: "emailMarketing", label: "Email Marketing", full: true },
    { key: "emailProject", label: "Email Project", full: true },
    { key: "instagramUrl", label: "Instagram URL", full: true },
    { key: "facebookUrl", label: "Facebook URL", full: true },
    { key: "youtubeUrl", label: "YouTube URL", full: true },
    { key: "linkedinUrl", label: "LinkedIn URL", full: true },
    { key: "estYear", label: "Tahun Berdiri" },
    { key: "heroEyebrow", label: "Hero (teks besar)" },
    { key: "heroTitle", label: "Hero Subtitle", full: true },
    { key: "heroTagline", label: "Hero Tagline", full: true },
    { key: "copyright", label: "Copyright", full: true },
    { key: "projectsUrl", label: "URL Proyek/Portfolio (tombol Project)", full: true },
  ];

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-ink">Pengaturan</h1>
      <p className="mt-1 text-sm text-graphite">Konfigurasi branding, kontak &amp; WhatsApp.</p>

      <form action={updateSettings} className="mt-8 space-y-6 rounded-xl border border-line-soft bg-white p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key as string} className={f.full ? "sm:col-span-2" : ""}>
              <label htmlFor={f.key as string} className="mb-2 block text-sm font-semibold text-ink">
                {f.label}
              </label>
              <input
                id={f.key as string}
                name={f.key as string}
                type={f.type || "text"}
                defaultValue={String(s[f.key] ?? "")}
                className="w-full rounded-lg border border-line bg-white px-4 py-3 outline-none focus:border-navy"
              />
            </div>
          ))}
        </div>

        <div className="border-t border-line-soft pt-6">
          <h3 className="mb-4 font-display text-lg font-bold text-ink">Gambar Banner</h3>
          <div className="space-y-6">
            <ImageUploader name="heroImageUrl" label="Gambar Hero (background)" defaultValue={s.heroImageUrl} />
            <ImageUploader name="promoImageUrl" label="Gambar Promo (Featured Banner)" defaultValue={s.promoImageUrl} />
          </div>
        </div>

        <button className="btn-navy px-6 py-3 text-sm">Simpan Pengaturan</button>
      </form>
    </div>
  );
}