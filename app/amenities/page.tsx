'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    title: 'Community',
    subtitle: 'Spaces that make everyday connection natural',
    desc: 'A community lounge, card and games room, performance and events hall, rooftop social area, amphitheatre, and library — designed so connection feels easy and natural, not arranged or forced.',
    imgL: '/i/homepage/amenities-1.jpg',
    imgR: '/i/homepage/amenities-2.jpg',
    items: ['Community lounge', 'Card and games room', 'Performance and events hall', 'Rooftop social terrace', 'Stepped amphitheatre', 'Library and reading rooms'],
  },
  {
    title: 'Wellness',
    subtitle: 'Quiet support for an active, well-lived day',
    desc: 'An on-site clinic, physiotherapy room, meditation pavilion, spa, yoga studio, and therapy rooms — all designed around active ageing, movement, nutrition, and everyday routine.',
    imgL: '/i/homepage/amenities-2.jpg',
    imgR: '/i/homepage/piece-heaven-right.jpg',
    items: ['On-site clinic (planned)', 'Physiotherapy room', 'Meditation pavilion', 'Spa and therapy rooms', 'Yoga and movement studio', 'Wellness programmes'],
  },
  {
    title: 'Safety',
    subtitle: 'Reassurance designed in, not added on',
    desc: '24/7 security, CCTV across common areas, and emergency call points in every apartment — safety is woven into the architecture, not bolted on as an afterthought.',
    imgL: '/i/homepage/piece-heaven-left.jpg',
    imgR: '/i/homepage/amenities-1.jpg',
    items: ['24/7 security (planned)', 'CCTV in common areas', 'Emergency call points in every apartment', 'Intercom and access control', 'Fire safety systems', 'Gated community entry'],
  },
  {
    title: 'Convenience',
    subtitle: 'The practical parts of everyday life, quietly handled',
    desc: 'Housekeeping, laundry, and a concierge desk — the everyday practical details of life taken care of, quietly and efficiently, so your day belongs entirely to you.',
    imgL: '/i/homepage/amenities-1.jpg',
    imgR: '/i/homepage/architecture-right.jpg',
    items: ['Housekeeping service', 'Laundry and dry cleaning', 'Concierge desk', 'On-site pharmacy (planned)', 'Banking and postal services', 'EV charging points'],
  },
  {
    title: 'Nature',
    subtitle: 'Green, open, and unhurried',
    desc: 'Direct adjacency to a 600-acre reserve forest, walking and jogging trails, and reflective water bodies — open, green, and designed to move at a pace that suits you.',
    imgL: '/i/location/location.webp',
    imgR: '/i/homepage/piece-heaven-right.jpg',
    items: ['600-acre reserve forest — adjacent', 'Walking and jogging trails', 'Reflective water features', 'Sensory garden', 'Landscaped courtyards', 'Bird-watching areas'],
  },
  {
    title: 'Hospitality',
    subtitle: 'A clubhouse that feels like home, not a hotel',
    desc: 'A main dining hall, all-day café, and private dining — all within the 34,000 sq ft Club Amaya, thoughtfully crafted to feel welcoming, warm, and entirely your own.',
    imgL: '/i/homepage/amenities-2.jpg',
    imgR: '/i/homepage/amenities-1.jpg',
    items: ['Main dining hall', 'All-day café', 'Private dining room', 'Tiffin and meal delivery service', 'Guest suites (planned)', 'Catering for private occasions'],
  },
];

function AccordionRow({
  item,
  idx,
  isActive,
  onToggle,

}: {
  item: (typeof CATEGORIES)[number];
  idx: number;
  isActive: boolean;
  onToggle: (idx: number) => void;
  imgLeftRef: React.RefObject<HTMLDivElement | null>;
  imgRightRef: React.RefObject<HTMLDivElement | null>;
  imgLInner: React.RefObject<HTMLImageElement | null>;
  imgRInner: React.RefObject<HTMLImageElement | null>;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isActive) {
      gsap.fromTo(contentRef.current, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.55, ease: 'power3.inOut' });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
    }
  }, [isActive]);

  return (
    <div className="border-b border-white/[0.08]">
      <button
        onClick={() => onToggle(idx)}
        className="w-full group py-6 md:py-7 cursor-pointer text-center"
        aria-expanded={isActive}
      >
        <h3
          className={`font-light uppercase tracking-wider leading-none text-center transition-colors duration-500 ${
            isActive ? 'text-[#d9a898]' : 'text-white/75 group-hover:text-white'
          }`}
          style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
        >
          {item.title}
        </h3>
      </button>

      <div ref={contentRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="pb-10 pt-1 flex flex-col items-center gap-5 max-w-2xl mx-auto text-center">
          <button
            onClick={() => onToggle(idx)}
            className="text-white/25 text-sm hover:text-white/50 transition-colors duration-200"
            aria-label="Collapse"
          >
            ×
          </button>
          <p className="text-white/35 text-[10px] md:text-[11px] uppercase tracking-[0.3em]">
            {item.subtitle}
          </p>
          <p className="text-white/55 text-[13.5px] md:text-[15px] font-light leading-[1.9] max-w-xl">
            {item.desc}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
            {item.items.map((i) => (
              <li key={i} className="flex items-center gap-2 text-white/40 text-[12px] font-light">
                <span className="w-[3px] h-[3px] rounded-full bg-white/25" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function AmenitiesPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imgLeftRef = useRef<HTMLDivElement>(null);
  const imgRightRef = useRef<HTMLDivElement>(null);
  const imgLInner = useRef<HTMLImageElement>(null);
  const imgRInner = useRef<HTMLImageElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.amenity-title-row', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      gsap.set(imgLeftRef.current, { x: '-100%' });
      gsap.set(imgRightRef.current, { x: '100%' });
      gsap.from('.amen-stat', {
        y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
      });
      gsap.from(ctaRef.current, {
        y: 35, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
      });
    });
    return () => ctx.revert();
  }, []);

  const toggle = useCallback((idx: number) => {
    const isSame = activeIdx === idx;

    if (isSame) {
      gsap.to(imgLeftRef.current, { x: '-100%', duration: 0.65, ease: 'power3.inOut' });
      gsap.to(imgRightRef.current, { x: '100%', duration: 0.65, ease: 'power3.inOut' });
      setActiveIdx(null);
    } else {
      if (imgLInner.current) imgLInner.current.src = CATEGORIES[idx].imgL;
      if (imgRInner.current) imgRInner.current.src = CATEGORIES[idx].imgR;
      gsap.to(imgLeftRef.current, { x: '0%', duration: 0.7, ease: 'power3.inOut' });
      gsap.to(imgRightRef.current, { x: '0%', duration: 0.7, ease: 'power3.inOut' });
      setActiveIdx(idx);
    }
  }, [activeIdx]);

  return (
    <main className="bg-[#021A13]">

      {/* HERO */}
      <PageHero
        label="Amaya — Amenities"
        title="Everything that makes a day good."
        description="More than 100 planned amenities across six categories — community, wellness, safety, convenience, nature, and hospitality."
        imgSrc="/i/homepage/amenities-1.jpg"
        imgAlt="Amaya amenities"
        height="h-[88vh] min-h-[600px]"
      />

      {/* STATS */}
      <section ref={statsRef} className="py-16 md:py-20 border-b border-white/[0.07]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-16 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { num: '100+', label: 'Planned amenities' },
              { num: '6', label: 'Lifestyle categories' },
              { num: '34,000', label: 'sq ft Club Amaya (planned)' },
              { num: '600', label: 'Acre reserve forest adjacent' },
            ].map(({ num, label }) => (
              <div key={label} className="amen-stat flex flex-col gap-2">
                <div className="text-white font-light leading-none" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.8rem)' }}>
                  {num}
                </div>
                <div className="text-white/35 text-[10px] uppercase tracking-[0.2em] leading-[1.7] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCORDION */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-20 md:py-28 xl:py-36 min-h-screen"
      >
        {/* Side images */}
        <div
          ref={imgLeftRef}
          className="absolute left-0 top-0 bottom-0 w-[26%] md:w-[20%] z-0 pointer-events-none"
          style={{ transform: 'translateX(-100%)' }}
        >
          <Image
            ref={imgLInner}
            src={CATEGORIES[0].imgL}
            alt=""
            fill
            className="object-cover"
            sizes="20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#021A13]" />
          <div className="absolute inset-0 bg-[#021A13]/25" />
        </div>

        <div
          ref={imgRightRef}
          className="absolute right-0 top-0 bottom-0 w-[26%] md:w-[20%] z-0 pointer-events-none"
          style={{ transform: 'translateX(100%)' }}
        >
          <Image
            ref={imgRInner}
            src={CATEGORIES[0].imgR}
            alt=""
            fill
            className="object-cover"
            sizes="20vw"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#021A13]" />
          <div className="absolute inset-0 bg-[#021A13]/25" />
        </div>

        {/* Header */}
        <div ref={headerRef} className="relative z-10 text-center mb-12 md:mb-16 px-6">
          <p className="text-white/35 text-[11px] uppercase tracking-[0.38em] mb-5">
            100+ Planned Amenities
          </p>
          <h2
            className="text-white font-light tracking-[0.025em] leading-[1.1]"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 4.2rem)' }}
          >
            Six categories. Endless daily comfort.
          </h2>
          <p className="text-white/40 font-light text-[13px] md:text-[14px] leading-[1.85] max-w-sm mx-auto mt-4">
            Tap any category to expand.
          </p>
        </div>

        {/* Accordion rows */}
        <div className="relative z-10 max-w-[860px] mx-auto px-6">
          {CATEGORIES.map((cat, idx) => (
            <AccordionRow
              key={cat.title}
              item={cat}
              idx={idx}
              isActive={activeIdx === idx}
              onToggle={toggle}
              imgLeftRef={imgLeftRef}
              imgRightRef={imgRightRef}
              imgLInner={imgLInner}
              imgRInner={imgRInner}
            />
          ))}
        </div>
      </section>

      {/* FULL AMENITY GRID */}
      <section className="py-20 md:py-32 bg-[#030e09]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-16 xl:px-24">
          <div className="text-center mb-14 md:mb-18">
            <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-5">All Categories</p>
            <h2
              className="text-white font-light"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 3.5rem)' }}
            >
              Everything at a glance.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className="flex flex-col gap-5 p-8 border border-white/[0.07] hover:border-white/18 transition-colors duration-400"
              >
                <h3
                  className="text-white font-light tracking-[0.02em]"
                  style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)' }}
                >
                  {cat.title}
                </h3>
                <p className="text-white/40 text-[13px] font-light leading-[1.85]">{cat.desc}</p>
                <ul className="flex flex-col gap-[8px] pt-4 border-t border-white/[0.07]">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/40 text-[12.5px] font-light">
                      <span className="mt-[6px] w-[3px] h-[3px] rounded-full bg-white/22 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-white/20 text-[11px] font-light leading-[1.8] max-w-xl mx-auto mt-10">
            All amenities are planned. Details and availability are subject to final confirmation.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-28 md:py-44 px-6 text-center">
        <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-6">Explore More</p>
        <h2
          className="text-white font-light leading-[1.1] mb-8 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
        >
          See the amenities in person.
        </h2>
        <p className="text-white/50 text-[14px] md:text-[15px] leading-[1.85] max-w-[440px] mx-auto mb-12">
          Visit our experience centre in Medchal to get a full feel for the planned amenities and community spaces.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-3 px-10 h-[52px] rounded-full bg-[#d9a898] text-[#021A13] uppercase text-[11px] tracking-[0.24em] hover:bg-[#c89585] transition-colors duration-300">
            Book a Visit
          </button>
          <button className="flex items-center gap-3 px-10 h-[52px] rounded-full border border-white/25 text-white/65 uppercase text-[11px] tracking-[0.24em] hover:border-white/50 hover:text-white transition-colors duration-300">
            Download Brochure
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
