import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Canonical production origin (matches the deployed Zeabur subdomain).
const SITE_URL = "https://everest-electronic.zeabur.app";
const OG_IMAGE = `${SITE_URL}/images/og-cover.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Everest Electronics | Electronics & Climate Systems",
    template: "%s | Everest Electronics",
  },
  description:
    "Rekan utama dalam penjualan dan layanan purna jual sistem pendingin udara terlengkap dan terpercaya di seluruh Indonesia sejak 1998.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Everest Electronics",
    title: "Everest Electronics | Electronics & Climate Systems",
    description:
      "Penjualan dan layanan purna jual sistem pendingin udara terlengkap dan terpercaya di seluruh Indonesia sejak 1998.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Everest Electronics" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Everest Electronics | Electronics & Climate Systems",
    description:
      "Penjualan dan layanan purna jual sistem pendingin udara terlengkap dan terpercaya di seluruh Indonesia sejak 1998.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${instrument.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}