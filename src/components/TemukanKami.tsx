import { getSettings, type BranchItem } from "@/lib/data";

/* Shared "Temukan Kami" section (Figma 138:2171 / 161:4009) — single source of
   truth used by home, tentang, and blog pages. Extracted verbatim from the
   Figma-matched home implementation so every page stays pixel-identical. */

export async function TemukanKami({ branches }: { branches: BranchItem[] }) {
  const settings = await getSettings();
  return (
  <section id="lokasi" className="min-h-[1024px] bg-[#fafafa] pt-[104px]">
    <div className="container-everest">
      <h2 className="font-display text-[clamp(2.5rem,4.4vw,4rem)] font-bold leading-[1.1] text-[#000]">
        Temukan<br />Kami
      </h2>
      <hr className="mt-5 border-t border-[#e5e5e5]" />
      <div className="mt-12 grid gap-12 lg:grid-cols-[540px_540px] lg:justify-between">
        {/* Office cards (left) */}
        <div className="space-y-6">
          {branches.map((b) => (
            <div key={b.id} className="rounded-xl border border-line-soft bg-white p-8">
              <h3 className="font-display text-[32px] font-bold leading-tight text-[#1c1c1c]">
                {b.name}
              </h3>
              <p className="mt-4 text-xl leading-relaxed text-[#b3b3b3]">{b.address}</p>
              <p className="mt-2 text-sm text-[#94a3b8]">{b.label}: {b.phone}</p>
              {b.mapUrl && (
                <a href={b.mapUrl} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 text-xl font-normal text-[#1c1c1c]">
                  {/* location pin icon */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M9.85723 8.44425C10.0937 8.20825 10.212 7.9225 10.212 7.587C10.212 7.251 10.0937 6.965 9.85723 6.729C9.62123 6.493 9.33548 6.375 8.99998 6.375C8.66448 6.375 8.37873 6.493 8.14273 6.729C7.90673 6.965 7.78873 7.251 7.78873 7.587C7.78873 7.922 7.90673 8.20775 8.14273 8.44425C8.37873 8.68025 8.66448 8.79825 8.99998 8.79825C9.33548 8.79825 9.62123 8.68025 9.85723 8.44425ZM8.99998 15.7642C7.23748 14.2057 5.90998 12.7522 5.01748 11.4037C4.12448 10.0553 3.67798 8.828 3.67798 7.722C3.67798 6.1355 4.19448 4.827 5.22748 3.7965C6.26098 2.7655 7.51848 2.25 8.99998 2.25C10.4815 2.25 11.739 2.7655 12.7725 3.7965C13.8055 4.827 14.322 6.1355 14.322 7.722C14.322 8.828 13.8757 10.0553 12.9832 11.4037C12.0902 12.7522 10.7625 14.2057 8.99998 15.7642Z" fill="#1C1C1C" />
                  </svg>
                  Buka di Peta
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Inquiries loop + map (right) */}
        <div className="rounded-xl border border-line-soft bg-white p-8">
          <div className="space-y-6">
            {/* hotline */}
            <div className="flex items-center gap-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M14.4 15C13.049 15 11.6945 14.689 10.3365 14.067C8.9785 13.445 7.72725 12.5617 6.58275 11.4172C5.44775 10.2727 4.567 9.0175 3.9405 7.6515C3.3135 6.285 3 4.9345 3 3.6V3H6.32925L6.96525 6.06225L4.94325 7.94475C5.28525 8.53775 5.6395 9.0795 6.006 9.57C6.3725 10.0605 6.75425 10.5028 7.15125 10.8968C7.55225 11.3168 8.00425 11.7093 8.50725 12.0743C9.01025 12.4393 9.58425 12.7992 10.2292 13.1542L12.1875 11.1233L15 11.6903V15H14.4Z" fill="#1C1C1C" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-[#94a3b8]">Cleaning &amp; Service Hotline</p>
                <p className="mt-1 text-lg font-bold text-[#131625]">{settings.phoneDisplay}</p>
              </div>
            </div>
            {/* emails */}
            <div className="flex items-center gap-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M8.14948 7.587L2.14947 3.66375V11.5387C2.14947 11.6733 2.19273 11.7837 2.27923 11.8702C2.36573 11.9567 2.47598 12 2.60998 12H10.1962V12.75H1.39948V2.25H14.8995V7.03875H14.1495V3.66375L8.14948 7.587ZM8.14948 6.75L13.9185 3H2.37973L8.14948 6.75ZM14.1495 15.7215C13.4685 15.7215 12.8895 15.483 12.4125 15.006C11.9355 14.529 11.697 13.95 11.697 13.269V9.894C11.697 9.4985 11.8337 9.164 12.1072 8.8905C12.3807 8.617 12.7152 8.4805 13.1107 8.481C13.5062 8.4815 13.8407 8.618 14.1142 8.8905C14.3877 9.164 14.5245 9.4985 14.5245 9.894V13.269H13.7745V9.894C13.7745 9.7075 13.7105 9.5505 13.5825 9.423C13.4545 9.295 13.297 9.231 13.11 9.231C12.923 9.231 12.766 9.295 12.639 9.423C12.512 9.551 12.448 9.708 12.447 9.894V13.269C12.447 13.737 12.614 14.1377 12.948 14.4713C13.2815 14.8048 13.6827 14.9715 14.1517 14.9715C14.6207 14.9715 15.021 14.8048 15.3525 14.4713C15.685 14.1377 15.8512 13.737 15.8512 13.269V10.269H16.6012V13.269C16.6012 13.95 16.3627 14.529 15.8857 15.006C15.4087 15.483 14.8305 15.7215 14.1495 15.7215ZM2.14947 3.66375L2.14873 3V12L2.14947 3.66375Z" fill="#1C1C1C" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-[#94a3b8]">Corporate Inquiries</p>
                <p className="mt-1 text-base text-[#131625]">{settings.emailMarketing}</p>
                <p className="text-base text-[#131625]">{settings.emailProject}</p>
              </div>
            </div>
            {/* web domain */}
            <div className="flex items-center gap-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9.85723 8.44425C10.0937 8.20825 10.212 7.9225 10.212 7.587C10.212 7.251 10.0937 6.965 9.85723 6.729C9.62123 6.493 9.33548 6.375 8.99998 6.375C8.66448 6.375 8.37873 6.493 8.14273 6.729C7.90673 6.965 7.78873 7.251 7.78873 7.587C7.78873 7.922 7.90673 8.20775 8.14273 8.44425C8.37873 8.68025 8.66448 8.79825 8.99998 8.79825C9.33548 8.79825 9.62123 8.68025 9.85723 8.44425ZM8.99998 15.7642C7.23748 14.2057 5.90998 12.7522 5.01748 11.4037C4.12448 10.0553 3.67798 8.828 3.67798 7.722C3.67798 6.1355 4.19448 4.827 5.22748 3.7965C6.26098 2.7655 7.51848 2.25 8.99998 2.25C10.4815 2.25 11.739 2.7655 12.7725 3.7965C13.8055 4.827 14.322 6.1355 14.322 7.722C14.322 8.828 13.8757 10.0553 12.9832 11.4037C12.0902 12.7522 10.7625 14.2057 8.99998 15.7642Z" fill="#1C1C1C" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-[#94a3b8]">Official Web domain</p>
                <p className="mt-1 text-base font-medium text-[#131625]">www.aceverestserpong.com</p>
              </div>
            </div>
          </div>
          {/* Map — real Google Maps embed of PT Everest Electronic */}
          <div className="relative mt-8 aspect-[540/375] overflow-hidden rounded-lg">
            <iframe
              title="Peta lokasi PT Everest Electronic"
              src="https://www.google.com/maps?q=PT.+Everest+Electronic&output=embed"
              width="540"
              height="375"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
