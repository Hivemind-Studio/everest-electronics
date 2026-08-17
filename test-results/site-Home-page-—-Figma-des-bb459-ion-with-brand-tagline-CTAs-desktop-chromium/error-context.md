# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> Home page — Figma design sections >> renders Hero section with brand + tagline + CTAs
- Location: tests-e2e/site.spec.ts:14:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('EST. 1998 — INDONESIA')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('EST. 1998 — INDONESIA')

```

```yaml
- banner:
  - link "Everest Electronics":
    - /url: /
  - navigation "Utama":
    - link "Beranda":
      - /url: /
    - link "Tentang Kami":
      - /url: /#tentang
    - link "Layanan":
      - /url: /#layanan
    - link "Penghargaan":
      - /url: /#penghargaan
    - link "Blog":
      - /url: /#blog
    - link "Lokasi":
      - /url: /#lokasi
- main:
  - paragraph: 1998 — Indonesia
  - heading "EVEREST Electronics & Climate Systems" [level=1]
  - paragraph: Pioneering premium air conditioning and professional electronic integration across Indonesia with master craftsmanship.
  - link "Hubungi Kami":
    - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20berkonsultasi%20tentang%20sistem%20pendingin%20udara%20%2F%20AC.
  - link "Jelajahi Layanan":
    - /url: "#layanan"
  - paragraph: Tentang Kami
  - heading "Our Vision" [level=2]
  - paragraph: “Visi kami adalah menjadi rekanan utama dalam penjualan dan layanan purna jual sistem pendingin udara seluruh Indonesia.”
  - img "Sistem HVAC gedung"
  - paragraph: Visi & Misi
  - heading "Our Mission" [level=2]
  - text: "01"
  - heading "Kualitas Layanan yang Konsisten" [level=3]
  - paragraph: Menyediakan layanan dengan standard dan kualitas tinggi yang konsisten untuk memastikan kepuasan pelanggan yang bekelanjutan.
  - text: "02"
  - heading "Inovasi dalam Layanan" [level=3]
  - paragraph: Mengadopsi teknologi terbaru dan metode inovatif dalam setiap aspek layanan untuk meningkatkan efektivitas dan efisiensi operasional.
  - text: "03"
  - heading "Peningkatan Keterampilan & Pengetahuan" [level=3]
  - paragraph: Melakukan pelatihan dan pengembangan terus-menerus bagi tim kami untuk memastikan keahlian teknis terdepan di industri tata udara.
  - paragraph: What We Do
  - heading "Our Professional Services" [level=2]
  - paragraph: End-to-end climate solutions from corporate installation setups to periodic home ventilation maintenance.
  - link "Jual & Unit Baru Official distributor untuk brand AC ternama dunia dengan garansi resmi prima. Learn More":
    - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20tertarik%20dengan%20layanan%20*Jual%20%26%20Unit%20Baru*.%20Mohon%20informasinya.
    - img
    - heading "Jual & Unit Baru" [level=3]
    - paragraph: Official distributor untuk brand AC ternama dunia dengan garansi resmi prima.
    - text: Learn More
    - img
  - link "Clean & Service Perawatan berkala, cuci AC, isi freon, dan optimasi efisiensi kompresor. Learn More":
    - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20tertarik%20dengan%20layanan%20*Clean%20%26%20Service*.%20Mohon%20informasinya.
    - img
    - heading "Clean & Service" [level=3]
    - paragraph: Perawatan berkala, cuci AC, isi freon, dan optimasi efisiensi kompresor.
    - text: Learn More
    - img
  - link "Tukar Tambah Upgrade sistem AC lama Anda dengan unit baru yang ramah lingkungan dan hemat listrik. Learn More":
    - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20tertarik%20dengan%20layanan%20*Tukar%20Tambah*.%20Mohon%20informasinya.
    - img
    - heading "Tukar Tambah" [level=3]
    - paragraph: Upgrade sistem AC lama Anda dengan unit baru yang ramah lingkungan dan hemat listrik.
    - text: Learn More
    - img
  - link "Corporate HVAC Instalasi skala industri, sistem ducting, VRV/VRF untuk gedung dan mall bertingkat. Learn More":
    - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20tertarik%20dengan%20layanan%20*Corporate%20HVAC*.%20Mohon%20informasinya.
    - img
    - heading "Corporate HVAC" [level=3]
    - paragraph: Instalasi skala industri, sistem ducting, VRV/VRF untuk gedung dan mall bertingkat.
    - text: Learn More
    - img
  - paragraph: Our Pride
  - heading "Industry Awards" [level=2]
  - paragraph: Menyediakan layanan dengan standard dan kualitas tinggi yang konsisten untuk memastikan kepuasan pelanggan yang bekelanjutan di seluruh Indonesia.
  - img "Daikin Platinum Partner"
  - text: "2024"
  - heading "Daikin Platinum Partner" [level=3]
  - paragraph: Awarded by Panasonic Indonesia
  - img "Outstanding AC Contractor"
  - text: "2025"
  - heading "Outstanding AC Contractor" [level=3]
  - paragraph: Kategori Layanan & Penjualan Terbaik
  - img "Gree Golden Dealer"
  - text: "2025"
  - heading "Gree Golden Dealer" [level=3]
  - paragraph: Volume Penjualan VRF Terbesar Nasional
  - paragraph: Dipercaya Oleh
  - heading "500+ Mitra & Official Distributors" [level=2]
  - text: Daikin Panasonic Gree Samsung Sharp LG Midea Polytron Toshiba Aqua Mitsubishi Hisense Changhong
  - paragraph: Featured Promo
  - heading "Promo Clean & Service Menyambut Ramadhan" [level=3]
  - paragraph: Nikmati diskon paket cuci AC dan perawatan berkala untuk kenyamanan rumah ibadah dan keluarga Anda. Hubungi kami hari ini.
  - link "Claim Promo Now":
    - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20klaim%20promo%20Clean%20%26%20Service.%20Mohon%20detailnya.
  - paragraph: Insights & Updates
  - heading "Berita & Blog" [level=2]
  - paragraph: Menyediakan informasi edukatif seputar teknologi pendingin ruangan terbaru, tips perawatan mandiri, dan update proyek Everest.
  - link "Tips Merawat AC Agar Tetap Dingin & Hemat Listrik Tips Merawat AC Agar Tetap Dingin & Hemat Listrik Pelajari cara mudah melakukan pengecekan filter mandiri di rumah Anda secara berkala. Read":
    - /url: /blog/tips-merawat-ac-hemat-listrik
    - img "Tips Merawat AC Agar Tetap Dingin & Hemat Listrik"
    - heading "Tips Merawat AC Agar Tetap Dingin & Hemat Listrik" [level=3]
    - paragraph: Pelajari cara mudah melakukan pengecekan filter mandiri di rumah Anda secara berkala.
    - text: Read
    - img
  - link "Pentingnya Menjaga Kualitas Udara di Masa Transisi Pentingnya Menjaga Kualitas Udara di Masa Transisi Komitmen kami untuk selalu memberikan layanan purna jual terbaik standard internasional. Read":
    - /url: /blog/pentingnya-menjaga-kualitas-udara
    - img "Pentingnya Menjaga Kualitas Udara di Masa Transisi"
    - heading "Pentingnya Menjaga Kualitas Udara di Masa Transisi" [level=3]
    - paragraph: Komitmen kami untuk selalu memberikan layanan purna jual terbaik standard internasional.
    - text: Read
    - img
  - link "Mengenal Sistem AC Central VRV & VRF untuk Bisnis Mengenal Sistem AC Central VRV & VRF untuk Bisnis Kenapa sistem pendingin udara terpusat jauh lebih efisien untuk ruang kantor luas Anda. Read":
    - /url: /blog/mengenal-sistem-ac-central-vrv-vrf
    - img "Mengenal Sistem AC Central VRV & VRF untuk Bisnis"
    - heading "Mengenal Sistem AC Central VRV & VRF untuk Bisnis" [level=3]
    - paragraph: Kenapa sistem pendingin udara terpusat jauh lebih efisien untuk ruang kantor luas Anda.
    - text: Read
    - img
  - link "Everest Resmi Menjadi Partner Platinum Daikin Everest Resmi Menjadi Partner Platinum Daikin Bagaimana filter udara berteknologi HEPA mengurangi bakteri dan debu secara drastis. Read":
    - /url: /blog/partner-platinum-daikin
    - img "Everest Resmi Menjadi Partner Platinum Daikin"
    - heading "Everest Resmi Menjadi Partner Platinum Daikin" [level=3]
    - paragraph: Bagaimana filter udara berteknologi HEPA mengurangi bakteri dan debu secara drastis.
    - text: Read
    - img
  - link "Lihat Semua Artikel":
    - /url: /blog
  - paragraph: Contact & Locations
  - heading "Find Everest Near You" [level=2]
  - heading "Ciledug (Kantor Pusat)" [level=3]
  - paragraph: Jl. KH. Hasyim Ashari No.143 - 144, RT.007/RW.002, Sudimara Pinang, Kec. Pinang, Kota Tangerang, Banten 15145
  - paragraph: TELEPON
  - paragraph: 021-7329480 / 7344130
  - link "Buka Peta & Navigasi":
    - /url: https://maps.google.com/?q=Everest+Electronics+Ciledug
    - text: Buka Peta & Navigasi
    - img
  - heading "Gading Serpong" [level=3]
  - paragraph: Ruko Glaze 1 Blok B No. 19, Gading Serpong, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15810
  - paragraph: WHATSAPP SERVICES
  - paragraph: +62 877-3201-8235
  - link "Buka Peta & Navigasi":
    - /url: https://maps.google.com/?q=Everest+Electronics+Gading+Serpong
    - text: Buka Peta & Navigasi
    - img
  - heading "Butuh Konsultasi AC Skala Bisnis / Rumah Tangga?" [level=3]
  - paragraph: Tim engineering berpengalaman kami siap merancang sistem pendingin udara terbaik yang efisien, hemat listrik, dan rapi secara estetika.
  - link "Hubungi Tim Ahli Kami":
    - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20konsultasi%20AC%20skala%20bisnis%20%2F%20rumah%20tangga.
- contentinfo:
  - heading "Everest Electronics" [level=3]
  - paragraph: Rekan utama dalam penjualan dan layanan purna jual sistem pendingin udara terlengkap dan terpercaya di seluruh penjuru Indonesia semenjak 1998.
  - link "Instagram":
    - /url: https://instagram.com
    - text: I
  - link "Facebook":
    - /url: https://facebook.com
    - text: F
  - link "YouTube":
    - /url: https://youtube.com
    - text: "Y"
  - link "LinkedIn":
    - /url: https://linkedin.com
    - text: L
  - heading "Layanan" [level=4]
  - list:
    - listitem:
      - link "Jual Unit Baru":
        - /url: /#layanan
    - listitem:
      - link "Service & Clean":
        - /url: /#layanan
    - listitem:
      - link "Tukar Tambah":
        - /url: /#layanan
    - listitem:
      - link "Sistem AC Central":
        - /url: /#layanan
  - heading "Bisnis & VRF" [level=4]
  - list:
    - listitem:
      - link "VRV / VRF System":
        - /url: /#layanan
    - listitem:
      - link "Chiller System":
        - /url: /#layanan
    - listitem:
      - link "Ducting System":
        - /url: /#layanan
    - listitem:
      - link "Ventilation":
        - /url: /#layanan
  - heading "Perusahaan" [level=4]
  - list:
    - listitem:
      - link "Tentang Kami":
        - /url: /#tentang
    - listitem:
      - link "Daftar Penghargaan":
        - /url: /#penghargaan
    - listitem:
      - link "Mitra Terpercaya":
        - /url: /#blog
    - listitem:
      - link "Hubungi Kontak":
        - /url: /#lokasi
  - 'link "WHATSAPP SERVICES: +62 877-3201-8235"':
    - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20bertanya.
  - paragraph: Copyright © 2026 Everest Electronics. All rights reserved.
  - link "Terms of Service":
    - /url: "#"
  - link "Privacy Policy":
    - /url: "#"
- link "Chat WhatsApp":
  - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20berkonsultasi%20tentang%20sistem%20pendingin%20udara%20%2F%20AC.
- alert
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | const ADMIN_PASSWORD =
  4   |   process.env.E2E_ADMIN_PASSWORD || "zV5FiY9UGexN0Tvf34tI7Ac1mhX682au";
  5   | 
  6   | /* =========================================================================
  7   |  * 1. PUBLIC PAGES — all 8 Figma sections render on the live deploy
  8   |  * =======================================================================*/
  9   | test.describe("Home page — Figma design sections", () => {
  10  |   test.beforeEach(async ({ page }) => {
  11  |     await page.goto("/");
  12  |   });
  13  | 
  14  |   test("renders Hero section with brand + tagline + CTAs", async ({ page }) => {
  15  |     await expect(page.getByRole("heading", { level: 1 })).toContainText("EVEREST");
  16  |     await expect(page.getByRole("link", { name: /Hubungi Kami/ })).toBeVisible();
  17  |     await expect(page.getByRole("link", { name: /Jelajahi Layanan/ })).toBeVisible();
> 18  |     await expect(page.getByText("EST. 1998 — INDONESIA")).toBeVisible();
      |                                                           ^ Error: expect(locator).toBeVisible() failed
  19  |   });
  20  | 
  21  |   test("renders Visi Misi (About) section", async ({ page }) => {
  22  |     await expect(page.getByRole("heading", { name: "Our Vision" })).toBeVisible();
  23  |     await expect(page.getByRole("heading", { name: "Our Mission" })).toBeVisible();
  24  |     await expect(page.getByText("01")).toBeVisible();
  25  |     await expect(page.getByText("03")).toBeVisible();
  26  |     await expect(page.getByText("Kualitas Layanan yang Konsisten")).toBeVisible();
  27  |   });
  28  | 
  29  |   test("renders all 4 Services cards", async ({ page }) => {
  30  |     for (const s of [
  31  |       "Jual & Unit Baru",
  32  |       "Clean & Service",
  33  |       "Tukar Tambah",
  34  |       "Corporate HVAC",
  35  |     ]) {
  36  |       await expect(page.getByRole("heading", { name: s })).toBeVisible();
  37  |     }
  38  |     await expect(page.getByRole("link", { name: /Learn More/ }).first()).toBeVisible();
  39  |   });
  40  | 
  41  |   test("renders Awards section", async ({ page }) => {
  42  |     await expect(page.getByRole("heading", { name: "Industry Awards" })).toBeVisible();
  43  |     await expect(page.getByText("Daikin Platinum Partner")).toBeVisible();
  44  |     await expect(page.getByText("2024")).toBeVisible();
  45  |   });
  46  | 
  47  |   test("renders Clients section with brand list", async ({ page }) => {
  48  |     await expect(page.getByRole("heading", { name: /500\+ Mitra/ })).toBeVisible();
  49  |     await expect(page.getByText("DAIKIN").first()).toBeVisible();
  50  |     await expect(page.getByText("PANASONIC")).toBeVisible();
  51  |     await expect(page.getByText("SAMSUNG")).toBeVisible();
  52  |   });
  53  | 
  54  |   test("renders Blog section + featured promo", async ({ page }) => {
  55  |     await expect(page.getByRole("heading", { name: "Berita & Blog" })).toBeVisible();
  56  |     await expect(page.getByText(/Promo Clean & Service Menyambut Ramadhan/)).toBeVisible();
  57  |     await expect(page.getByRole("link", { name: /Claim Promo Now/ })).toBeVisible();
  58  |   });
  59  | 
  60  |   test("renders all 4 blog cards linking to posts", async ({ page }) => {
  61  |     for (const t of [
  62  |       "Everest Resmi Menjadi Partner Platinum Daikin",
  63  |       "Mengenal Sistem AC Central VRV & VRF",
  64  |       "Pentingnya Menjaga Kualitas Udara",
  65  |       "Tips Merawat AC",
  66  |     ]) {
  67  |       await expect(page.getByRole("link", { name: new RegExp(t) }).first()).toBeVisible();
  68  |     }
  69  |   });
  70  | 
  71  |   test("renders Find Us (locations) section with both branches", async ({ page }) => {
  72  |     await expect(page.getByRole("heading", { name: "Find Everest Near You" })).toBeVisible();
  73  |     await expect(page.getByText("Ciledug (Kantor Pusat)")).toBeVisible();
  74  |     await expect(page.getByText("Gading Serpong")).toBeVisible();
  75  |     await expect(page.getByText(/021-7329480/)).toBeVisible();
  76  |     await expect(page.getByText(/\+62 877-3201-8235/)).toBeVisible();
  77  |   });
  78  | 
  79  |   test("renders Footer with columns + WhatsApp contact", async ({ page }) => {
  80  |     await expect(page.getByRole("contentinfo")).toBeVisible();
  81  |     await expect(page.getByText("LAYANAN")).toBeVisible();
  82  |     await expect(page.getByText("BISNIS & VRF")).toBeVisible();
  83  |     await expect(page.getByText("PERUSAHAAN")).toBeVisible();
  84  |     await expect(page.getByText(/Copyright © 2026/)).toBeVisible();
  85  |   });
  86  | });
  87  | 
  88  | /* =========================================================================
  89  |  * 2. WHATSAPP CTA links (primary conversion)
  90  |  * =======================================================================*/
  91  | test.describe("WhatsApp CTAs", () => {
  92  |   test("floating WhatsApp button links to wa.me with message", async ({ page }) => {
  93  |     await page.goto("/");
  94  |     const wa = page.getByRole("link", { name: /Chat WhatsApp/ });
  95  |     await expect(wa).toBeVisible();
  96  |     const href = await wa.getAttribute("href");
  97  |     expect(href).toContain("wa.me/6287732018235");
  98  |     expect(href).toContain("text=");
  99  |   });
  100 | 
  101 |   test("service cards deep-link to WhatsApp with service message", async ({ page }) => {
  102 |     await page.goto("/");
  103 |     const card = page.getByRole("link", { name: /Clean & Service.*Learn More/ });
  104 |     const href = await card.getAttribute("href");
  105 |     expect(href).toContain("wa.me/6287732018235");
  106 |   });
  107 | 
  108 |   test("consultation banner links to WhatsApp", async ({ page }) => {
  109 |     await page.goto("/");
  110 |     const cta = page.getByRole("link", { name: /Hubungi Tim Ahli Kami/ });
  111 |     await expect(cta).toBeVisible();
  112 |     expect(await cta.getAttribute("href")).toContain("wa.me");
  113 |   });
  114 | });
  115 | 
  116 | /* =========================================================================
  117 |  * 3. BLOG routes
  118 |  * =======================================================================*/
```