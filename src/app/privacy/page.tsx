import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings, getBranches } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kebijakan Privasi | Everest Electronics",
  description: "Kebijakan privasi penggunaan data pada situs Everest Electronics.",
  alternates: { canonical: "/privacy" },
};

export default async function PrivacyPage() {
  const [settings, branches] = await Promise.all([getSettings(), getBranches()]);
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Header brandName={settings.brandName} projectsUrl={settings.projectsUrl} />
      <main className="flex-1">
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
      </main>
      <Footer settings={settings} branches={branches} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}