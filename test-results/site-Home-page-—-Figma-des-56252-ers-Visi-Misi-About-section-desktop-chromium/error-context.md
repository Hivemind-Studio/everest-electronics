# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> Home page — Figma design sections >> renders Visi Misi (About) section
- Location: tests-e2e/site.spec.ts:21:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('01')
Expected: visible
Error: strict mode violation: getByText('01') resolved to 3 elements:
    1) <span class="font-display text-2xl font-bold text-gold">01</span> aka getByText('01', { exact: true })
    2) <p class="mt-1 font-display text-lg font-semibold text-navy">+62 877-3201-8235</p> aka locator('#lokasi').getByText('+62 877-3201-')
    3) <span class="text-white">+62 877-3201-8235</span> aka getByRole('link', { name: 'WHATSAPP SERVICES: +62 877-3201-' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('01')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - link "Everest Electronics" [ref=e5] [cursor=pointer]:
          - /url: /
        - navigation "Utama" [ref=e6]:
          - link "Beranda" [ref=e7] [cursor=pointer]:
            - /url: /
          - link "Tentang Kami" [ref=e8] [cursor=pointer]:
            - /url: /#tentang
          - link "Layanan" [ref=e9] [cursor=pointer]:
            - /url: /#layanan
          - link "Penghargaan" [ref=e10] [cursor=pointer]:
            - /url: /#penghargaan
          - link "Blog" [ref=e11] [cursor=pointer]:
            - /url: /#blog
          - link "Lokasi" [ref=e12] [cursor=pointer]:
            - /url: /#lokasi
    - main [ref=e13]:
      - generic [ref=e17]:
        - paragraph [ref=e18]: 1998 — Indonesia
        - heading "EVEREST Electronics & Climate Systems" [level=1] [ref=e19]:
          - text: EVEREST
          - generic [ref=e20]: Electronics & Climate Systems
        - paragraph [ref=e21]: Pioneering premium air conditioning and professional electronic integration across Indonesia with master craftsmanship.
        - generic [ref=e22]:
          - link "Hubungi Kami" [ref=e23] [cursor=pointer]:
            - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20berkonsultasi%20tentang%20sistem%20pendingin%20udara%20%2F%20AC.
          - link "Jelajahi Layanan" [ref=e24] [cursor=pointer]:
            - /url: "#layanan"
      - generic [ref=e26]:
        - generic [ref=e27]:
          - paragraph [ref=e28]: Tentang Kami
          - heading "Our Vision" [level=2] [ref=e29]
          - paragraph [ref=e30]: “Visi kami adalah menjadi rekanan utama dalam penjualan dan layanan purna jual sistem pendingin udara seluruh Indonesia.”
          - img "Sistem HVAC gedung" [ref=e32]
        - generic [ref=e33]:
          - paragraph [ref=e34]: Visi & Misi
          - heading "Our Mission" [level=2] [ref=e35]
          - generic [ref=e36]:
            - generic [ref=e37]:
              - generic [ref=e38]: "01"
              - generic [ref=e39]:
                - heading "Kualitas Layanan yang Konsisten" [level=3] [ref=e40]
                - paragraph [ref=e41]: Menyediakan layanan dengan standard dan kualitas tinggi yang konsisten untuk memastikan kepuasan pelanggan yang bekelanjutan.
            - generic [ref=e42]:
              - generic [ref=e43]: "02"
              - generic [ref=e44]:
                - heading "Inovasi dalam Layanan" [level=3] [ref=e45]
                - paragraph [ref=e46]: Mengadopsi teknologi terbaru dan metode inovatif dalam setiap aspek layanan untuk meningkatkan efektivitas dan efisiensi operasional.
            - generic [ref=e47]:
              - generic [ref=e48]: "03"
              - generic [ref=e49]:
                - heading "Peningkatan Keterampilan & Pengetahuan" [level=3] [ref=e50]
                - paragraph [ref=e51]: Melakukan pelatihan dan pengembangan terus-menerus bagi tim kami untuk memastikan keahlian teknis terdepan di industri tata udara.
      - generic [ref=e53]:
        - paragraph [ref=e54]: What We Do
        - heading "Our Professional Services" [level=2] [ref=e55]
        - paragraph [ref=e56]: End-to-end climate solutions from corporate installation setups to periodic home ventilation maintenance.
        - generic [ref=e57]:
          - link [ref=e58] [cursor=pointer]:
            - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20tertarik%20dengan%20layanan%20*Jual%20%26%20Unit%20Baru*.%20Mohon%20informasinya.
            - generic [ref=e59]:
              - heading "Jual & Unit Baru" [level=3] [ref=e63]
              - paragraph [ref=e64]: Official distributor untuk brand AC ternama dunia dengan garansi resmi prima.
            - generic [ref=e65]: Learn More
          - link [ref=e68] [cursor=pointer]:
            - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20tertarik%20dengan%20layanan%20*Clean%20%26%20Service*.%20Mohon%20informasinya.
            - generic [ref=e69]:
              - heading "Clean & Service" [level=3] [ref=e73]
              - paragraph [ref=e74]: Perawatan berkala, cuci AC, isi freon, dan optimasi efisiensi kompresor.
            - generic [ref=e75]: Learn More
          - link [ref=e78] [cursor=pointer]:
            - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20tertarik%20dengan%20layanan%20*Tukar%20Tambah*.%20Mohon%20informasinya.
            - generic [ref=e79]:
              - heading "Tukar Tambah" [level=3] [ref=e83]
              - paragraph [ref=e84]: Upgrade sistem AC lama Anda dengan unit baru yang ramah lingkungan dan hemat listrik.
            - generic [ref=e85]: Learn More
          - link [ref=e88] [cursor=pointer]:
            - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20tertarik%20dengan%20layanan%20*Corporate%20HVAC*.%20Mohon%20informasinya.
            - generic [ref=e89]:
              - heading "Corporate HVAC" [level=3] [ref=e93]
              - paragraph [ref=e94]: Instalasi skala industri, sistem ducting, VRV/VRF untuk gedung dan mall bertingkat.
            - generic [ref=e95]: Learn More
      - generic [ref=e99]:
        - generic [ref=e100]:
          - generic [ref=e101]:
            - paragraph [ref=e102]: Our Pride
            - heading "Industry Awards" [level=2] [ref=e103]
          - paragraph [ref=e104]: Menyediakan layanan dengan standard dan kualitas tinggi yang konsisten untuk memastikan kepuasan pelanggan yang bekelanjutan di seluruh Indonesia.
        - generic [ref=e105]:
          - generic [ref=e106]:
            - img "Daikin Platinum Partner" [ref=e108]
            - generic [ref=e109]:
              - text: "2024"
              - heading "Daikin Platinum Partner" [level=3] [ref=e110]
              - paragraph [ref=e111]: Awarded by Panasonic Indonesia
          - generic [ref=e112]:
            - img "Outstanding AC Contractor" [ref=e114]
            - generic [ref=e115]:
              - text: "2025"
              - heading "Outstanding AC Contractor" [level=3] [ref=e116]
              - paragraph [ref=e117]: Kategori Layanan & Penjualan Terbaik
          - generic [ref=e118]:
            - img "Gree Golden Dealer" [ref=e120]
            - generic [ref=e121]:
              - text: "2025"
              - heading "Gree Golden Dealer" [level=3] [ref=e122]
              - paragraph [ref=e123]: Volume Penjualan VRF Terbesar Nasional
      - generic [ref=e125]:
        - paragraph [ref=e126]: Dipercaya Oleh
        - heading "500+ Mitra & Official Distributors" [level=2] [ref=e127]
        - generic [ref=e128]:
          - generic [ref=e129]: Daikin
          - generic [ref=e130]: Panasonic
          - generic [ref=e131]: Gree
          - generic [ref=e132]: Samsung
          - generic [ref=e133]: Sharp
          - generic [ref=e134]: LG
          - generic [ref=e135]: Midea
          - generic [ref=e136]: Polytron
          - generic [ref=e137]: Toshiba
          - generic [ref=e138]: Aqua
          - generic [ref=e139]: Mitsubishi
          - generic [ref=e140]: Hisense
          - generic [ref=e141]: Changhong
      - generic [ref=e143]:
        - generic [ref=e147]:
          - generic [ref=e148]:
            - paragraph [ref=e149]: Featured Promo
            - heading "Promo Clean & Service Menyambut Ramadhan" [level=3] [ref=e150]
            - paragraph [ref=e151]: Nikmati diskon paket cuci AC dan perawatan berkala untuk kenyamanan rumah ibadah dan keluarga Anda. Hubungi kami hari ini.
          - link "Claim Promo Now" [ref=e152] [cursor=pointer]:
            - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20klaim%20promo%20Clean%20%26%20Service.%20Mohon%20detailnya.
        - paragraph [ref=e153]: Insights & Updates
        - heading "Berita & Blog" [level=2] [ref=e154]
        - paragraph [ref=e155]: Menyediakan informasi edukatif seputar teknologi pendingin ruangan terbaru, tips perawatan mandiri, dan update proyek Everest.
        - generic [ref=e156]:
          - link [ref=e157] [cursor=pointer]:
            - /url: /blog/tips-merawat-ac-hemat-listrik
            - img "Tips Merawat AC Agar Tetap Dingin & Hemat Listrik" [ref=e159]
            - generic [ref=e160]:
              - heading "Tips Merawat AC Agar Tetap Dingin & Hemat Listrik" [level=3] [ref=e161]
              - paragraph [ref=e162]: Pelajari cara mudah melakukan pengecekan filter mandiri di rumah Anda secara berkala.
              - generic [ref=e163]: Read
          - link [ref=e166] [cursor=pointer]:
            - /url: /blog/pentingnya-menjaga-kualitas-udara
            - img "Pentingnya Menjaga Kualitas Udara di Masa Transisi" [ref=e168]
            - generic [ref=e169]:
              - heading "Pentingnya Menjaga Kualitas Udara di Masa Transisi" [level=3] [ref=e170]
              - paragraph [ref=e171]: Komitmen kami untuk selalu memberikan layanan purna jual terbaik standard internasional.
              - generic [ref=e172]: Read
          - link [ref=e175] [cursor=pointer]:
            - /url: /blog/mengenal-sistem-ac-central-vrv-vrf
            - img "Mengenal Sistem AC Central VRV & VRF untuk Bisnis" [ref=e177]
            - generic [ref=e178]:
              - heading "Mengenal Sistem AC Central VRV & VRF untuk Bisnis" [level=3] [ref=e179]
              - paragraph [ref=e180]: Kenapa sistem pendingin udara terpusat jauh lebih efisien untuk ruang kantor luas Anda.
              - generic [ref=e181]: Read
          - link [ref=e184] [cursor=pointer]:
            - /url: /blog/partner-platinum-daikin
            - img "Everest Resmi Menjadi Partner Platinum Daikin" [ref=e186]
            - generic [ref=e187]:
              - heading "Everest Resmi Menjadi Partner Platinum Daikin" [level=3] [ref=e188]
              - paragraph [ref=e189]: Bagaimana filter udara berteknologi HEPA mengurangi bakteri dan debu secara drastis.
              - generic [ref=e190]: Read
        - link "Lihat Semua Artikel" [ref=e194] [cursor=pointer]:
          - /url: /blog
      - generic [ref=e196]:
        - paragraph [ref=e197]: Contact & Locations
        - heading "Find Everest Near You" [level=2] [ref=e198]
        - generic [ref=e199]:
          - generic [ref=e200]:
            - heading "Ciledug (Kantor Pusat)" [level=3] [ref=e201]
            - paragraph [ref=e202]: Jl. KH. Hasyim Ashari No.143 - 144, RT.007/RW.002, Sudimara Pinang, Kec. Pinang, Kota Tangerang, Banten 15145
            - generic [ref=e203]:
              - paragraph [ref=e204]: TELEPON
              - paragraph [ref=e205]: 021-7329480 / 7344130
            - link "Buka Peta & Navigasi" [ref=e206] [cursor=pointer]:
              - /url: https://maps.google.com/?q=Everest+Electronics+Ciledug
          - generic [ref=e210]:
            - heading "Gading Serpong" [level=3] [ref=e211]
            - paragraph [ref=e212]: Ruko Glaze 1 Blok B No. 19, Gading Serpong, Kecamatan Kelapa Dua, Kabupaten Tangerang, Banten 15810
            - generic [ref=e213]:
              - paragraph [ref=e214]: WHATSAPP SERVICES
              - paragraph [ref=e215]: +62 877-3201-8235
            - link "Buka Peta & Navigasi" [ref=e216] [cursor=pointer]:
              - /url: https://maps.google.com/?q=Everest+Electronics+Gading+Serpong
        - generic [ref=e220]:
          - generic [ref=e221]:
            - heading "Butuh Konsultasi AC Skala Bisnis / Rumah Tangga?" [level=3] [ref=e222]
            - paragraph [ref=e223]: Tim engineering berpengalaman kami siap merancang sistem pendingin udara terbaik yang efisien, hemat listrik, dan rapi secara estetika.
          - link "Hubungi Tim Ahli Kami" [ref=e224] [cursor=pointer]:
            - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20konsultasi%20AC%20skala%20bisnis%20%2F%20rumah%20tangga.
    - contentinfo [ref=e225]:
      - generic [ref=e226]:
        - generic [ref=e227]:
          - generic [ref=e228]:
            - heading "Everest Electronics" [level=3] [ref=e229]
            - paragraph [ref=e230]: Rekan utama dalam penjualan dan layanan purna jual sistem pendingin udara terlengkap dan terpercaya di seluruh penjuru Indonesia semenjak 1998.
            - generic [ref=e231]:
              - link "Instagram" [ref=e232] [cursor=pointer]:
                - /url: https://instagram.com
                - text: I
              - link "Facebook" [ref=e233] [cursor=pointer]:
                - /url: https://facebook.com
                - text: F
              - link "YouTube" [ref=e234] [cursor=pointer]:
                - /url: https://youtube.com
                - text: "Y"
              - link "LinkedIn" [ref=e235] [cursor=pointer]:
                - /url: https://linkedin.com
                - text: L
          - generic [ref=e236]:
            - heading "Layanan" [level=4] [ref=e237]
            - list [ref=e238]:
              - listitem [ref=e239]:
                - link "Jual Unit Baru" [ref=e240] [cursor=pointer]:
                  - /url: /#layanan
              - listitem [ref=e241]:
                - link "Service & Clean" [ref=e242] [cursor=pointer]:
                  - /url: /#layanan
              - listitem [ref=e243]:
                - link "Tukar Tambah" [ref=e244] [cursor=pointer]:
                  - /url: /#layanan
              - listitem [ref=e245]:
                - link "Sistem AC Central" [ref=e246] [cursor=pointer]:
                  - /url: /#layanan
          - generic [ref=e247]:
            - heading "Bisnis & VRF" [level=4] [ref=e248]
            - list [ref=e249]:
              - listitem [ref=e250]:
                - link "VRV / VRF System" [ref=e251] [cursor=pointer]:
                  - /url: /#layanan
              - listitem [ref=e252]:
                - link "Chiller System" [ref=e253] [cursor=pointer]:
                  - /url: /#layanan
              - listitem [ref=e254]:
                - link "Ducting System" [ref=e255] [cursor=pointer]:
                  - /url: /#layanan
              - listitem [ref=e256]:
                - link "Ventilation" [ref=e257] [cursor=pointer]:
                  - /url: /#layanan
          - generic [ref=e258]:
            - heading "Perusahaan" [level=4] [ref=e259]
            - list [ref=e260]:
              - listitem [ref=e261]:
                - link "Tentang Kami" [ref=e262] [cursor=pointer]:
                  - /url: /#tentang
              - listitem [ref=e263]:
                - link "Daftar Penghargaan" [ref=e264] [cursor=pointer]:
                  - /url: /#penghargaan
              - listitem [ref=e265]:
                - link "Mitra Terpercaya" [ref=e266] [cursor=pointer]:
                  - /url: /#blog
              - listitem [ref=e267]:
                - link "Hubungi Kontak" [ref=e268] [cursor=pointer]:
                  - /url: /#lokasi
        - 'link "WHATSAPP SERVICES: +62 877-3201-8235" [ref=e270] [cursor=pointer]':
          - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20bertanya.
          - generic [ref=e271]: "WHATSAPP SERVICES:"
          - generic [ref=e272]: +62 877-3201-8235
      - generic [ref=e274]:
        - paragraph [ref=e275]: Copyright © 2026 Everest Electronics. All rights reserved.
        - generic [ref=e276]:
          - link "Terms of Service" [ref=e277] [cursor=pointer]:
            - /url: "#"
          - link "Privacy Policy" [ref=e278] [cursor=pointer]:
            - /url: "#"
    - link "Chat WhatsApp" [ref=e279] [cursor=pointer]:
      - /url: https://wa.me/6287732018235?text=Halo%20Everest%20Electronics%2C%20saya%20ingin%20berkonsultasi%20tentang%20sistem%20pendingin%20udara%20%2F%20AC.
  - alert [ref=e282]
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
  18  |     await expect(page.getByText("EST. 1998 — INDONESIA")).toBeVisible();
  19  |   });
  20  | 
  21  |   test("renders Visi Misi (About) section", async ({ page }) => {
  22  |     await expect(page.getByRole("heading", { name: "Our Vision" })).toBeVisible();
  23  |     await expect(page.getByRole("heading", { name: "Our Mission" })).toBeVisible();
> 24  |     await expect(page.getByText("01")).toBeVisible();
      |                                        ^ Error: expect(locator).toBeVisible() failed
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
  119 | test.describe("Blog", () => {
  120 |   test("blog index lists seeded posts", async ({ page }) => {
  121 |     await page.goto("/blog");
  122 |     await expect(page.getByRole("heading", { name: "Berita & Blog" })).toBeVisible();
  123 |     await expect(page.getByText("Everest Resmi Menjadi Partner Platinum Daikin")).toBeVisible();
  124 |   });
```