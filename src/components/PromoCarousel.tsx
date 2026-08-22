"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type PromoSlide = {
  image: string;
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Carousel promotion banner per Figma 161:3487.
 * Shows a "Promotion Banner" heading, prev/next arrow buttons and pagination dots.
 */
export function PromoCarousel({ slides }: { slides: PromoSlide[] }) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = Math.max(1, slides.length);

  const go = useCallback(
    (n: number) => setIndex(((n % count) + count) % count),
    [count],
  );

  const reset = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
  }, [count]);

  useEffect(() => {
    reset();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [reset]);

  const slide = slides[index] ?? slides[0];

  return (
    <div className="relative mb-20 overflow-hidden rounded-lg bg-[#d4d4d4]">
      {/* slide image/background */}
      <div className="absolute inset-0" aria-hidden="true">
        {slide.image ? (
          <Image src={slide.image} alt="" fill className="object-cover" sizes="100vw" />
        ) : null}
        <div className="absolute inset-0 bg-[#d4d4d4]/40" />
      </div>

      {/* heading */}
      <div className="relative z-10 flex min-h-[400px] flex-col items-center justify-center gap-6 p-10 text-center md:min-h-[683px]">
        {slide.eyebrow ? (
          <p className="eyebrow text-[#c5a880]">{slide.eyebrow}</p>
        ) : null}
        <h2 className="font-display text-[clamp(2.75rem,5vw,4.5rem)] font-bold leading-[1.05] text-[#000000]">
          {slide.title || "Promotion Banner"}
        </h2>
        {slide.ctaLabel && slide.ctaHref ? (
          <a
            href={slide.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1c1c1c] px-7 py-3.5 text-sm font-medium text-[#fafafa] transition-colors hover:bg-[#1e4394]"
          >
            {slide.ctaLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ) : null}
      </div>

      {/* carousel navigation (arrows + dots, per Figma) */}
      <div className="relative z-10 flex items-center justify-center gap-6 pb-10">
        <button
          type="button"
          aria-label="Sebelumnya"
          onClick={() => go(index - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1c1c1c] transition-colors hover:bg-[#1e4394] hover:text-white"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* pagination dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => { setIndex(i); reset(); }}
              className={`h-4 w-4 rounded-full transition-colors ${i === index ? "bg-[#1e4394]" : "bg-[#fafafa]"}`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Berikutnya"
          onClick={() => go(index + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1c1c1c] transition-colors hover:bg-[#1e4394] hover:text-white"
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}