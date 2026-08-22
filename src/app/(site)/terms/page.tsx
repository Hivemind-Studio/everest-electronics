import Link from "next/link";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan Ketentuan penggunaan situs Everest Electronics.",
  alternates: { canonical: "/terms" },
  // S-F04: og:url must match the canonical (root layout defaults to "/")
  openGraph: { url: "/terms" },
};

export default async function TermsPage() {
  const settings = await getSettings();
  return (
    <>
        <section className="pt-32 pb-20">
          <div className="container-everest max-w-3xl">
            <h1 className="section-heading">Syarat &amp; Ketentuan</h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
              <p>
                Dengan mengakses situs {settings.brandName}, Anda menyetujui syarat dan
                ketentuan berikut ini.
              </p>
              <p>
                Seluruh konten, gambar, dan informasi pada situs ini adalah milik{" "}
                {settings.brandName} dan dilindungi hak cipta. Informasi layanan dapat
                berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.
              </p>
              <p>
                Untuk pertanyaan lebih lanjut, silakan hubungi kami melalui WhatsApp di{" "}
                {settings.whatsappDisplay} atau email {settings.emailMarketing}.
              </p>
              <p>
                <Link href="/" className="link-arrow text-sm">← Kembali ke Beranda</Link>
              </p>
            </div>
          </div>
        </section>
    </>
  );
}