'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    title: 'SHOPPING DESTINATION',
    subtitle: 'DEDICATED RETAIL & LUXURY HUB',
    desc: 'A dedicated retail destination within the complex featuring luxury brands, boutiques, and lifestyle stores. An immersive shopping experience integrated into daily resort living.',
    imgL: '/i/homepage/amenities-1.jpg',
    imgR: '/i/homepage/amenities-2.jpg',
  },
  {
    title: "KIDS' CLUBS",
    subtitle: 'EDUCATIONAL & RECREATIONAL SPACES',
    desc: 'World-class facilities for children of all ages — from creative workshops to sports and adventure activities. Designed to inspire, educate, and entertain in a safe environment.',
    imgL: '/i/homepage/amenities-2.jpg',
    imgR: '/i/homepage/amenities-1.jpg',
  },
  {
    title: 'PET-FRIENDLY',
    subtitle: 'A HOME FOR YOUR ENTIRE FAMILY',
    desc: 'Layan Verde welcomes pets as part of the family. Dedicated pet areas, grooming stations, and pet-friendly zones ensure comfort and joy for every member of your household.',
    imgL: '/i/homepage/amenities-1.jpg',
    imgR: '/i/homepage/amenities-2.jpg',
  },
  {
    title: '20+ BARS, RESTAURANTS & CAFÉS',
    subtitle: 'A CULINARY JOURNEY WITHOUT LIMITS',
    desc: 'Over 20 dining concepts spanning international cuisines, artisan coffee bars, rooftop lounges, and fine dining restaurants — all within the development\'s vibrant social heart.',
    imgL: '/i/homepage/amenities-2.jpg',
    imgR: '/i/homepage/amenities-1.jpg',
  },
  {
    title: 'WORK & CREATIVITY',
    subtitle: 'A SPACE FOR INNOVATION AND INSPIRATION',
    desc: 'A modern and comfortable environment where entrepreneurs can bring ideas to life alongside like-minded professionals. The complex includes conference rooms, private offices, a coffee station, a podcast studio, meeting rooms and a 24/7 coworking space.',
    imgL: '/i/homepage/amenities-1.jpg',
    imgR: '/i/homepage/amenities-2.jpg',
  },
  {
    title: 'WELLNESS & SPA',
    subtitle: 'TOTAL MIND & BODY RENEWAL',
    desc: 'Premium wellness experiences for body, mind, and spirit. Full-service spa, hydrotherapy pools, meditation gardens, state-of-the-art fitness studios, and holistic treatment programs.',
    imgL: '/i/homepage/amenities-2.jpg',
    imgR: '/i/homepage/amenities-1.jpg',
  },
  {
    title: 'SPORTS & RECREATION',
    subtitle: 'ELITE FITNESS AT YOUR DOORSTEP',
    desc: 'Tennis courts, padel, swimming pools, yoga decks, and a fully equipped sports complex. Everything you need to maintain an active and balanced lifestyle without leaving home.',
    imgL: '/i/homepage/amenities-1.jpg',
    imgR: '/i/homepage/amenities-2.jpg',
  },
];

export default function Amenities() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const sectionRef   = useRef<HTMLDivElement>(null);
  const imgLeftRef   = useRef<HTMLDivElement>(null);
  const imgRightRef  = useRef<HTMLDivElement>(null);
  const imgLInner    = useRef<HTMLImageElement>(null);
  const imgRInner    = useRef<HTMLImageElement>(null);
  const arrowRef     = useRef<HTMLDivElement>(null);
  const titleRefs    = useRef<(HTMLElement | null)[]>([]);
  const contentRefs  = useRef<(HTMLDivElement | null)[]>([]);

  // ── Page entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRefs.current.filter(Boolean), {
        y: 45, opacity: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });

      // Set images off-screen initially
      gsap.set(imgLeftRef.current,  { x: '-100%' });
      gsap.set(imgRightRef.current, { x: '100%' });

      // Subtle arrow bounce
      gsap.to(arrowRef.current, {
        y: 8, repeat: -1, yoyo: true, duration: 1.2, ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Toggle item
  const toggleItem = useCallback((idx: number) => {
    const isSame = activeIdx === idx;
    const prevIdx = activeIdx;

    // Close previous content
    if (prevIdx !== null && contentRefs.current[prevIdx]) {
      gsap.to(contentRefs.current[prevIdx], {
        height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut',
      });
    }

    if (isSame) {
      // Collapse: slide images back out
      gsap.to(imgLeftRef.current,  { x: '-100%', duration: 0.65, ease: 'power3.inOut' });
      gsap.to(imgRightRef.current, { x: '100%',  duration: 0.65, ease: 'power3.inOut' });
      setActiveIdx(null);
    } else {
      // Open new content
      const el = contentRefs.current[idx];
      if (el) {
        gsap.fromTo(el,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.55, ease: 'power3.inOut' }
        );
      }

      // Swap image sources
      if (imgLInner.current)  imgLInner.current.src  = ITEMS[idx].imgL;
      if (imgRInner.current)  imgRInner.current.src  = ITEMS[idx].imgR;

      // Slide images in
      gsap.to(imgLeftRef.current,  { x: '0%', duration: 0.7, ease: 'power3.inOut' });
      gsap.to(imgRightRef.current, { x: '0%', duration: 0.7, ease: 'power3.inOut' });

      setActiveIdx(idx);
    }
  }, [activeIdx]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#021A13] overflow-hidden py-20 md:py-28 min-h-screen"
    >
      {/* ── Side background images ───────────────────────── */}
      <div
        ref={imgLeftRef}
        className="absolute left-0 top-0 bottom-0 w-[28%] md:w-[22%] z-0 pointer-events-none"
        style={{ transform: 'translateX(-100%)' }}
      >
        <Image
          ref={imgLInner}
          src={ITEMS[0].imgL}
          alt=""
          fill
          className="object-cover"
          sizes="22vw"
          draggable={false}
        />
        {/* Fade out toward center */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#021A13]" />
        <div className="absolute inset-0 bg-[#021A13]/30" />
      </div>

      <div
        ref={imgRightRef}
        className="absolute right-0 top-0 bottom-0 w-[28%] md:w-[22%] z-0 pointer-events-none"
        style={{ transform: 'translateX(100%)' }}
      >
        <Image
          ref={imgRInner}
          src={ITEMS[0].imgR}
          alt=""
          fill
          className="object-cover"
          sizes="22vw"
          draggable={false}
        />
        {/* Fade out toward center */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#021A13]" />
        <div className="absolute inset-0 bg-[#021A13]/30" />
      </div>

      {/* ── Accordion list ───────────────────────────────── */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        {ITEMS.map((item, idx) => {
          const isActive = activeIdx === idx;

          return (
            <div key={item.title}>
              {/* Title row */}
              <button
                onClick={() => toggleItem(idx)}
                className="w-full group py-5 md:py-6 cursor-pointer"
                aria-expanded={isActive}
              >
                <h3
                  ref={(el) => { titleRefs.current[idx] = el; }}
                  className={`
                    font-light uppercase tracking-[0.05em] leading-none text-center
                    transition-colors duration-500
                    text-[clamp(2rem,5vw,4.6rem)]
                    ${isActive
                      ? 'text-[#c9a882]'
                      : 'text-white/80 hover:text-white'
                    }
                  `}
                >
                  {item.title}
                </h3>
              </button>

              {/* Expandable content */}
              <div
                ref={(el) => { contentRefs.current[idx] = el; }}
                style={{ height: 0, overflow: 'hidden', opacity: 0 }}
              >
                <div className="pb-8 pt-1 flex flex-col items-center gap-4">
                  {/* × close indicator */}
                  <button
                    onClick={() => toggleItem(idx)}
                    className="text-white/30 text-sm hover:text-white/60 transition-colors duration-200 tracking-widest"
                    aria-label="Collapse"
                  >
                    ×
                  </button>

                  {/* Subtitle */}
                  <p className="text-white/40 text-[10px] md:text-[11px] uppercase tracking-[0.3em]">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-white/60 text-[13.5px] md:text-[14.5px] font-light leading-[1.85] max-w-[520px] text-center">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Right side scroll indicator ──────────────────── */}
      <div
        ref={arrowRef}
        className="fixed right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        {/* Thin vertical line */}
        <div className="w-px h-10 bg-white/20" />

        {/* Down arrow */}
        <svg
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
          className="text-white/35"
        >
          <path d="M5 0v12M1 8l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Thin vertical line below */}
        <div className="w-px h-6 bg-white/10" />
      </div>
    </section>
  );
}
