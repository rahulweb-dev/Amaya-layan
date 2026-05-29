'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Architecture() {
  /* ── Section 1 refs ── */
  const sec1Ref     = useRef<HTMLDivElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const smallImgRef = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const bigImgRef   = useRef<HTMLDivElement>(null);

  /* ── Section 2 refs ── */
  const sec2Ref     = useRef<HTMLDivElement>(null);
  const poolImgRef  = useRef<HTMLDivElement>(null);
  const ecoTextRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ─── Section 1 animations ─────────────────────────── */
    const ctx1 = gsap.context(() => {
      const st1 = { trigger: sec1Ref.current, start: 'top 72%' };

      // Heading: words drop in from y
      gsap.from(headingRef.current, {
        y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: st1,
      });

      // Small image slides from left
      gsap.from(smallImgRef.current, {
        x: -50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { ...st1, start: 'top 68%' },
      });

      // Left text block fades up
      gsap.from(textRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { ...st1, start: 'top 65%' },
      });

      // Large image slides from right
      gsap.from(bigImgRef.current, {
        x: 80, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { ...st1, start: 'top 68%' },
      });
    }, sec1Ref);

    /* ─── Section 2 animations ─────────────────────────── */
    const ctx2 = gsap.context(() => {
      const st2 = { trigger: sec2Ref.current, start: 'top 72%' };

      // Pool image slides from left
      gsap.from(poolImgRef.current, {
        x: -70, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: st2,
      });

      // Eco text slides from right
      gsap.from(ecoTextRef.current, {
        x: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: st2,
      });
    }, sec2Ref);

    return () => {
      ctx1.revert();
      ctx2.revert();
    };
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════
          SECTION 1 — IN HARMONY WITH NATURE
      ════════════════════════════════════════════════ */}
      <section ref={sec1Ref} className="bg-[#021A13] pt-20 md:pt-28 overflow-hidden">

        {/* Heading ─ large, padded */}
        <div className="max-w-[1700px] mx-auto px-8 md:px-16 mb-12 md:mb-16">
          <h2
            ref={headingRef}
            className="text-white font-light uppercase leading-[0.95] tracking-[0.03em]"
            style={{ fontSize: 'clamp(3rem, 8vw, 8.5rem)' }}
          >
            In Harmony With
            <br />
            Nature
          </h2>
        </div>

        {/* Two-column layout — full bleed on right */}
        <div className="flex flex-col md:flex-row items-stretch">

          {/* LEFT: small image + text */}
          <div className="w-full md:w-[42%] shrink-0 px-8 md:px-16 pb-12 md:pb-0 flex flex-col gap-8 justify-start">
            {/* Small image */}
            <div
              ref={smallImgRef}
              className="relative overflow-hidden"
              style={{ aspectRatio: '4/3' }}
            >
              <Image
                src="/i/homepage/piece-heaven-left.jpg"
                alt="Couple on balcony with hanging gardens"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
                draggable={false}
              />
            </div>

            {/* Text content */}
            <div ref={textRef} className="flex flex-col gap-4 pb-16 md:pb-20">
              <h3 className="text-white font-light uppercase tracking-[0.08em] text-[clamp(1.4rem,2.2vw,2.2rem)]">
                Bionic Architecture
              </h3>
              <p className="text-white/55 font-light text-[13.5px] md:text-[14.5px] leading-[1.85] max-w-[420px]">
                In collaboration with Dewan Architects, Layan Verde introduces a visionary
                concept inspired by nature itself. Blending human ingenuity with the raw beauty
                of the environment, the project embraces sustainability and energy efficiency to
                create a future-forward living experience.
              </p>
            </div>
          </div>

          {/* RIGHT: large architecture image — full bleed */}
          <div
            ref={bigImgRef}
            className="relative w-full md:flex-1 overflow-hidden"
            style={{ minHeight: 'clamp(300px, 55vw, 680px)' }}
          >
            <Image
              src="/i/homepage/architecture-right.jpg"
              alt="Layan Verde bionic architecture render"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 58vw"
              draggable={false}
            />
            {/* Subtle left fade into section bg */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#021A13] to-transparent" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 2 — UNIQUE ECOSYSTEM
      ════════════════════════════════════════════════ */}
      <section ref={sec2Ref} className="bg-[#021A13] overflow-hidden">

        <div className="flex flex-col md:flex-row items-center">

          {/* LEFT: large pool / landscape image — full bleed */}
          <div
            ref={poolImgRef}
            className="relative w-full md:w-[55%] shrink-0 overflow-hidden"
            style={{ height: 'clamp(320px, 45vw, 580px)' }}
          >
            <Image
              src="/i/homepage/amenities-1.jpg"
              alt="Aerial view of the unique ecosystem landscape"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
              draggable={false}
            />
            {/* Subtle right fade */}
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#021A13] to-transparent" />
          </div>

          {/* RIGHT: text content */}
          <div
            ref={ecoTextRef}
            className="w-full md:flex-1 flex flex-col gap-6 px-8 md:px-16 lg:px-20 py-16 md:py-0"
          >
            <h2
              className="text-white font-light uppercase tracking-[0.05em] leading-tight"
              style={{ fontSize: 'clamp(1.8rem,3.5vw,3.6rem)' }}
            >
              Unique Ecosystem
            </h2>
            <p className="text-white/55 font-light text-[13.5px] md:text-[14.5px] leading-[1.85] max-w-[440px]">
              Designed by SHMA, the landscape features over ten distinct recreational zones,
              each enhancing the natural surroundings and fostering a sense of tranquility
              and connection to nature.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
