import Link from "next/link";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi penggunaan data pada situs Everest Electronics.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <>
        <section className="pt-32 pb-20">
          <div className="container-everest max-w-3xl">
            <h1 className="section-heading">Kebijakan Privasi</h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft">
              <p>
                {settings.brandName} menghargai privasi Anda. Situs ini tidak mengumpulkan
                data pribadi tanpa sepengetahuan Anda.
              </p>
              <p>
                Informasi yang Anda berikan melalui WhatsApp atau formulir kontak hanya
                digunakan untuk merespons pertanyaan dan memberikan layanan yang Anda
                minta. Data tidak dibagikan kepada pihak ketiga di luar keperluan layanan.
              </p>
              <p>
                Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, hubungi kami
                di {settings.emailMarketing}.
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