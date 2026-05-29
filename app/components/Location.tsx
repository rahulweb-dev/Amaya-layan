'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: '2',  line1: 'Minutes', line2: 'To The Sea' },
  { num: '10', line1: 'Minutes', line2: 'To Laguna Phuket' },
  { num: '10', line1: 'Minutes', line2: 'To The Airport' },
];

// Positions as % of the map image width / height
// Tuned to match Phuket island geography
const MAP_PINS = [
  { id: 'airport',  label: 'AIRPORT',            x: 38, y: 14, side: 'left'  as const },
  { id: 'aopo',     label: 'AO PO GRAND MARINA',  x: 76, y: 28, side: 'right' as const },
  { id: 'bangtao',  label: 'BANG TAO BEACH',      x: 26, y: 34, side: 'left'  as const, isMain: true },
  { id: 'aqua',     label: 'AQUAPARK LAGUNA',      x: 26, y: 46, side: 'left'  as const },
  { id: 'robinson', label: 'ROBINSON',             x: 72, y: 47, side: 'right' as const },
  { id: 'phuket',   label: 'PHUKET TOWN',          x: 64, y: 76, side: 'right' as const },
];

export default function Location() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const mapWrapRef  = useRef<HTMLDivElement>(null);

  // Pulse rings (3 for staggered timing)
  const ringRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  // SVG line refs
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Left content stagger
      gsap.from('.loc-item', {
        y: 32, opacity: 0, duration: 1, stagger: 0.11, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 76%' },
      });

      // Map slide in from right
      gsap.from(mapWrapRef.current, {
        x: 70, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });

      // SVG lines draw in
      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        gsap.set(line, { strokeDasharray: 100, strokeDashoffset: 100 });
        gsap.to(line, {
          strokeDashoffset: 0, duration: 0.7, ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 62%' },
        });
      });

      // Labels fade in after lines
      labelRefs.current.forEach((label, i) => {
        if (!label) return;
        gsap.from(label, {
          opacity: 0, duration: 0.5, ease: 'power2.out',
          delay: 0.4 + i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 62%' },
        });
      });
    }, sectionRef);

    // Pulsing rings — infinite loops with stagger
    ringRefs.current.forEach((r, i) => {
      if (!r) return;
      gsap.fromTo(
        r,
        { scale: 1, opacity: 0.65 },
        { scale: 3.2, opacity: 0, duration: 2.8, ease: 'power1.out', repeat: -1, delay: i * 0.85 }
      );
    });

    return () => ctx.revert();
  }, []);

  const mainPin = MAP_PINS.find((p) => p.isMain)!;

  return (
    <section ref={sectionRef} className="bg-[#021A13] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">

        {/* ── LEFT COLUMN ──────────────────────────────── */}
        <div ref={leftRef} className="relative flex flex-col">

          {/* Aerial coastal image — fades into the dark bg */}
          <div className="relative h-[38%] md:h-[42%] shrink-0 overflow-hidden">
            <Image
              src="/i/location/location-intro.jpg"
              alt="Bang Tao coastline aerial"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#021A13]/0 via-[#021A13]/30 to-[#021A13]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#021A13]/70" />
          </div>

          {/* Text content */}
          <div className="flex-1 flex flex-col justify-start px-10 md:px-14 lg:px-20 pb-16 md:pb-24 -mt-4 md:-mt-6 relative z-10">

            <p className="loc-item text-white/40 text-[10px] uppercase tracking-[0.38em] mb-6">
              Location
            </p>

            <h2 className="loc-item text-white uppercase font-light leading-[1.1] tracking-[0.04em] text-[clamp(1.85rem,3.2vw,3rem)] mb-6 max-w-[480px]">
              The Island&apos;s Most<br />Desirable Area
            </h2>

            <p className="loc-item text-white/55 font-light text-[14px] leading-[1.85] max-w-[410px] mb-10">
              Surrounded by elite properties with an annual appreciation rate of
              10% and advanced European-standard infrastructure rated among the
              highest: Michelin-starred restaurants, golf courses, tennis courts,
              designer boutiques, a pristine beach, and more.
            </p>

            {/* Stats */}
            <div className="loc-item flex gap-8 md:gap-12 mb-12">
              {STATS.map(({ num, line1, line2 }) => (
                <div key={line2}>
                  <div className="text-white font-light text-[clamp(2rem,3vw,3rem)] leading-none mb-[6px]">
                    {num}
                  </div>
                  <div className="text-white/35 text-[9px] uppercase tracking-[0.22em] leading-[1.6]">
                    {line1}
                  </div>
                  <div className="text-white/35 text-[9px] uppercase tracking-[0.22em]">
                    {line2}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="loc-item">
              <button className="group flex items-center gap-4 px-8 h-[52px] rounded-full bg-[#d9a898] text-[#021A13] uppercase text-[11px] tracking-[0.22em] hover:bg-[#c89585] transition-colors duration-300">
                Find Out More
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN — Map ───────────────────────── */}
        <div className="relative flex items-center justify-center py-12 px-4 md:px-6">
          <div ref={mapWrapRef} className="relative w-full max-w-[480px]">

            {/* Island map image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/i/location/location-island.png"
              alt="Phuket island map"
              className="w-full h-auto"
              draggable={false}
            />

            {/* SVG overlay — connection lines */}
            <svg
              className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {MAP_PINS.map((pin, i) => {
                if (pin.isMain) return null;
                const lineLen = 6; // in viewBox units
                const x2 = pin.side === 'left' ? pin.x - lineLen : pin.x + lineLen;
                return (
                  <line
                    key={pin.id}
                    ref={(el) => { lineRefs.current[i] = el; }}
                    x1={pin.x}
                    y1={pin.y}
                    x2={x2}
                    y2={pin.y}
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="0.25"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* Main Bang Tao line */}
              <line
                ref={(el) => { lineRefs.current[MAP_PINS.length] = el; }}
                x1={mainPin.x}
                y1={mainPin.y}
                x2={mainPin.x - 7}
                y2={mainPin.y}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Pin labels — absolutely positioned */}
            {MAP_PINS.map((pin, i) => (
              <div
                key={pin.id}
                ref={(el) => { labelRefs.current[i] = el; }}
                className="absolute"
                style={{
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                  transform: 'translateY(-50%)',
                }}
              >
                {/* Small dot at map point */}
                {!pin.isMain && (
                  <div className="absolute w-[5px] h-[5px] rounded-full bg-white/45 -translate-x-1/2 -translate-y-1/2" />
                )}

                {/* Label text */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    pin.side === 'left'
                      ? 'right-[calc(100%+10px)] text-right'
                      : 'left-[calc(100%+10px)] text-left'
                  }`}
                >
                  <span className="text-white/55 text-[8.5px] md:text-[9px] uppercase tracking-[0.18em] whitespace-nowrap font-light">
                    {pin.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Pulsing marker at Bang Tao Beach */}
            <div
              className="absolute"
              style={{
                left: `${mainPin.x}%`,
                top: `${mainPin.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Three concentric pulse rings */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  ref={(el) => { ringRefs.current[i] = el; }}
                  className="absolute rounded-full border border-white/25"
                  style={{
                    width: 20, height: 20,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* Outer soft glow ring */}
              <div className="absolute rounded-full bg-white/10"
                style={{
                  width: 28, height: 28,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 20px 6px rgba(255,255,255,0.12)',
                }}
              />

              {/* Core white dot */}
              <div
                className="relative z-10 rounded-full bg-white"
                style={{
                  width: 9, height: 9,
                  boxShadow: '0 0 8px 3px rgba(255,255,255,0.55)',
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
