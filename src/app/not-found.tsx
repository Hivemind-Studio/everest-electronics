import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSettings } from "@/lib/data";

/* Root 404 (T-F01): renders OUTSIDE the (site) route-group layout, so it
   mounts its own Header/Footer chrome. Settings are fetched here directly —
   both this component and SiteLayout may call getSettings() concurrently;
   Next.js request deduplication keeps that cheap. */

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const settings = await getSettings();
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        brandName={settings.brandName}
        projectsUrl={settings.projectsUrl}
        whatsappNumber={settings.whatsappNumber}
      />
      <main className="flex flex-1 items-center justify-center bg-paper pt-24 pb-20">
        <div className="container-everest text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] text-[#000]">
            Halaman tidak ditemukan
          </h1>
          <p className="mt-4 text-lg text-graphite">
            Maaf, halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
          </p>
          <Link href="/" className="link-arrow mt-8 inline-flex text-base font-medium text-navy">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}
