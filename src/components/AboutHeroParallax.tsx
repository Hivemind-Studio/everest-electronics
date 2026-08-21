"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { brandUrl } from "@/lib/brandAssets";

/**
 * About Us hero with parallax layers per Figma 162:5364 -> 162:5194.
 * - Background photo scales/moves slower (fixed feel)
 * - Logo translates down on scroll
 * - Corner accents translate inward (opposite direction)
 */
export function AboutHeroParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const accALeftRef = useRef<HTMLDivElement | null>(null);
  const accBRightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const viewport = window.innerHeight;
      // progress from 1 (section fully below) through 0 (section top at viewport top) to -1 (scrolled past)
      const progress = rect.top / viewport;
      const p = Math.max(-1.2, Math.min(1.4, progress));

      // Logo moves DOWN strongly as the section scrolls up
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${p * 120}px)`;
      }
      // Background moves UP faster than logo (strong parallax depth)
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${p * -180}px) scale(1.25)`;
      }
      // Corner accents translate inward strongly + vertical drift
      if (accALeftRef.current) {
        accALeftRef.current.style.transform = `translate(${p * 140}px, ${p * 40}px)`;
      }
      if (accBRightRef.current) {
        accBRightRef.current.style.transform = `translate(${p * -140}px, ${p * -50}px)`;
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[1024px] items-center justify-center overflow-hidden bg-[#fafafa]"
    >
      {/* background photo (parallax layer) */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
        <Image
          src={brandUrl("aboutHeroBg")}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {/* corner accents (parallax) */}
      <div
        ref={accALeftRef}
        className="absolute left-[-40px] top-[100px] hidden h-[280px] w-[420px] overflow-hidden rounded-xl opacity-80 will-change-transform md:block"
        aria-hidden="true"
      >
        <Image src={brandUrl("aboutHeroAccentA")} alt="" fill className="object-cover" sizes="420px" />
      </div>
      <div
        ref={accBRightRef}
        className="absolute bottom-[140px] right-[-40px] hidden h-[280px] w-[420px] overflow-hidden rounded-xl opacity-80 will-change-transform md:block"
        aria-hidden="true"
      >
        <Image src={brandUrl("aboutHeroAccentB")} alt="" fill className="object-cover" sizes="420px" />
      </div>
      {/* center logo (parallax) */}
      <div ref={logoRef} className="relative z-10 flex flex-col items-center px-6 text-center will-change-transform">
        <Image
          src={brandUrl("aboutHeroLogo")}
          alt="Everest Electronics"
          width={362}
          height={362}
          className="h-[220px] w-[220px] object-contain md:h-[362px] md:w-[362px]"
        />
      </div>
    </section>
  );
}