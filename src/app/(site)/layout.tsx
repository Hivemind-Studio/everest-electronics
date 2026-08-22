import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings } from "@/lib/data";
import { ScrollToTop } from "@/components/ScrollToTop";

export const dynamic = "force-dynamic";

/* Shared site shell for every public route (route group "(site)").
   The header/footer/WhatsApp bubble now live in ONE layout that
   persists across navigations - client-side transitions keep them
   mounted, so moving between pages no longer flashes/rebuilds the
   whole page frame. */

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header brandName={settings.brandName} projectsUrl={settings.projectsUrl} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}
