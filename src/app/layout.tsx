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

export const metadata: Metadata = {
  title: "Everest Electronics | Electronics & Climate Systems",
  description:
    "Rekan utama dalam penjualan dan layanan purna jual sistem pendingin udara terlengkap dan terpercaya di seluruh Indonesia sejak 1998.",
  metadataBase: new URL("https://everest-electronics.zeabur.app"),
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