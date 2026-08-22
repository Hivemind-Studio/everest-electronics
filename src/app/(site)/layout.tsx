import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { getSettings } from "@/lib/data";
import { filterSameAs } from "@/lib/seo";
import { ScrollToTop } from "@/components/ScrollToTop";

export const dynamic = "force-dynamic";

/* Shared site shell for every public route (route group "(site)").
   The header/footer/WhatsApp bubble now live in ONE layout that
   persists across navigations - client-side transitions keep them
   mounted, so moving between pages no longer flashes/rebuilds the
   whole page frame. */

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  // S-F03: sitewide entity nodes — Organization (knowledge panel) + WebSite
  // (sitenames in search). sameAs only includes real profile URLs.
  const sameAs = filterSameAs([
    settings.instagramUrl,
    settings.facebookUrl,
    settings.youtubeUrl,
    settings.linkedinUrl,
  ]);
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.brandName,
    url: "https://everest-electronics.zeabur.app",
    logo: {
      "@type": "ImageObject",
      url: "https://everest-electronics.zeabur.app/apple-icon.png",
      width: 180,
      height: 180,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.brandName,
    url: "https://everest-electronics.zeabur.app",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <ScrollToTop />
      <Header
        brandName={settings.brandName}
        projectsUrl={settings.projectsUrl}
        whatsappNumber={settings.whatsappNumber}
      />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
      <FloatingWhatsApp number={settings.whatsappNumber} brandName={settings.brandName} />
    </div>
  );
}
