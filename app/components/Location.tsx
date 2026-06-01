'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: '15',  line1: 'Minutes',  line2: 'To Outer Ring Road' },
  { num: '600', line1: 'Acre',     line2: 'Reserve Forest' },
  { num: '100+', line1: 'Curated', line2: 'Amenities Planned' },
];

const MAP_PINS = [
  { id: 'airport',  label: "RAJIV GANDHI INT'L",  x: 38, y: 14, side: 'left'  as const },
  { id: 'hussain',  label: 'HUSSAIN SAGAR',        x: 76, y: 28, side: 'right' as const },
  { id: 'medchal',  label: 'AMAYA, MEDCHAL',       x: 26, y: 34, side: 'left'  as const, isMain: true },
  { id: 'orr',      label: 'OUTER RING ROAD',      x: 26, y: 46, side: 'left'  as const },
  { id: 'hitech',   label: 'HITECH CITY',          x: 72, y: 47, side: 'right' as const },
  { id: 'secun',    label: 'SECUNDERABAD',          x: 64, y: 76, side: 'right' as const },
];

export default function Location() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const mapWrapRef  = useRef<HTMLDivElement>(null);

  const ringRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const lineRefs  = useRef<(SVGLineElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.loc-item', {
        y: 32, opacity: 0, duration: 1, stagger: 0.11, ease: 'power3.out',
        scrollTrigger: { trigger: leftRef.current, start: 'top 76%' },
      });

      gsap.from(mapWrapRef.current, {
        x: 70, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });

      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        gsap.set(line, { strokeDasharray: 100, strokeDashoffset: 100 });
        gsap.to(line, {
          strokeDashoffset: 0, duration: 0.7, ease: 'power2.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 62%' },
        });
      });

      labelRefs.current.forEach((label, i) => {
        if (!label) return;
        gsap.from(label, {
          opacity: 0, duration: 0.5, ease: 'power2.out',
          delay: 0.4 + i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 62%' },
        });
      });
    }, sectionRef);

    ringRefs.current.forEach((r, i) => {
      if (!r) return;
      gsap.fromTo(r,
        { scale: 1, opacity: 0.6 },
        { scale: 3.5, opacity: 0, duration: 2.8, ease: 'power1.out', repeat: -1, delay: i * 0.9 }
      );
    });

    return () => ctx.revert();
  }, []);

  const mainPin = MAP_PINS.find((p) => p.isMain)!;

  return (
    <section ref={sectionRef} className="bg-[#021A13] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[42%_58%] min-h-screen">

        {/* ══════════════════════════════════
            LEFT — photo + text content
        ══════════════════════════════════ */}
        <div ref={leftRef} className="relative flex flex-col">

          {/* Aerial photo — fades to dark bg */}
          <div className="relative h-[36%] md:h-[40%] shrink-0 overflow-hidden">
            <Image
              src="/i/location/location.webp"
              alt="Medchal reserve forest aerial"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 42vw"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#021A13]/0 via-[#021A13]/20 to-[#021A13]" />
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-[#021A13]/60" />
          </div>

          {/* Text block */}
          <div className="flex-1 flex relative flex-col justify-start px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pb-14 md:pb-20 -mt-3 md:-mt-5 z-10">

            {/* Label */}
            <p className="loc-item text-white/40 text-[15px] uppercase tracking-[0.38em] mb-5 md:mb-6">
              Location
            </p>

            {/* Heading */}
            <h2
              className="loc-item text-white font-light leading-[1.05] tracking-[0.02em] mb-6 md:mb-8"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 5rem)' }}
            >
              Beside a 600-Acre<br />Reserve Forest.
            </h2>

            {/* Description */}
            <p className="loc-item text-white/55 font-light text-[14px] md:text-[15px] xl:text-[16px] leading-[1.85] max-w-120 xl:max-w-135 mb-10 md:mb-12">
              Adjacent to a 600-acre reserve forest in Medchal, around 15 minutes
              from Nehru Outer Ring Road, Hyderabad. Nearby hospitals and essential
              services. Easy access for visiting family.
            </p>

            {/* Stats */}
            <div className="loc-item flex gap-10 md:gap-14 xl:gap-16 mb-12 md:mb-14">
              {STATS.map(({ num, line1, line2 }) => (
                <div key={line2}>
                  <div
                    className="text-white font-light leading-none mb-2"
                    style={{ fontSize: 'clamp(2.4rem, 4vw, 5rem)' }}
                  >
                    {num}
                  </div>
                  <div className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.22em] leading-[1.65]">
                    {line1}
                  </div>
                  <div className="text-white/40 text-[9px] md:text-[10px] uppercase tracking-[0.22em]">
                    {line2}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="loc-item">
              <button className="group flex items-center gap-5 px-10 xl:px-12 h-13.5 xl:h-15 rounded-full bg-[#d9a898] text-[#021A13] uppercase text-[11px] xl:text-[12px] tracking-[0.24em] hover:bg-[#c89585] transition-colors duration-300 font-normal">
                See Location Details
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            RIGHT — full-height map
        ══════════════════════════════════ */}
        <div className="relative flex items-center justify-center bg-[#021A13] py-10 px-6 md:px-10 xl:px-14 min-h-125 md:min-h-0">
          <div ref={mapWrapRef} className="relative w-full max-w-140 xl:max-w-175 2xl:max-w-205">

            {/* Map image */}
            <Image
              src="/i/location/location-en-map.png"
              alt="Hyderabad area map"
              width={820}
              height={820}
              className="w-full h-auto"
              draggable={false}
            />

            {/* SVG connection lines */}
            <svg
              className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {MAP_PINS.map((pin, i) => {
                if (pin.isMain) return null;
                const lineLen = 7;
                const x2 = pin.side === 'left' ? pin.x - lineLen : pin.x + lineLen;
                return (
                  <line
                    key={pin.id}
                    ref={el => { lineRefs.current[i] = el; }}
                    x1={pin.x} y1={pin.y}
                    x2={x2}    y2={pin.y}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="0.22"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* Main Medchal line */}
              <line
                ref={el => { lineRefs.current[MAP_PINS.length] = el; }}
                x1={mainPin.x} y1={mainPin.y}
                x2={mainPin.x - 8} y2={mainPin.y}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.28"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Pin labels */}
            {MAP_PINS.map((pin, i) => (
              <div
                key={pin.id}
                ref={el => { labelRefs.current[i] = el; }}
                className="absolute"
                style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translateY(-50%)' }}
              >
                {/* Small dot */}
                {!pin.isMain && (
                  <div className="absolute w-[5px] h-[5px] rounded-full bg-white/50 -translate-x-1/2 -translate-y-1/2" />
                )}

                {/* Label text */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    pin.side === 'left'
                      ? 'right-[calc(100%+10px)] text-right'
                      : 'left-[calc(100%+10px)] text-left'
                  }`}
                >
                  <span className="text-white/60 text-[8px] md:text-[9px] xl:text-[10px] uppercase tracking-[0.18em] whitespace-nowrap font-light">
                    {pin.label}
                  </span>
                </div>
              </div>
            ))}

            {/* Pulsing marker — Amaya, Medchal */}
            <div
              className="absolute"
              style={{
                left: `${mainPin.x}%`,
                top: `${mainPin.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  ref={el => { ringRefs.current[i] = el; }}
                  className="absolute rounded-full border border-white/30"
                  style={{
                    width: 22, height: 22,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* Outer glow */}
              <div
                className="absolute rounded-full bg-white/10"
                style={{
                  width: 32, height: 32,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 24px 8px rgba(255,255,255,0.14)',
                }}
              />

              {/* Core dot */}
              <div
                className="relative z-10 rounded-full bg-white"
                style={{ width: 10, height: 10, boxShadow: '0 0 10px 4px rgba(255,255,255,0.6)' }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
