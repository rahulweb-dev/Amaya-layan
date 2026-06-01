'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    title: 'COMMUNITY',
    subtitle: 'SPACES THAT MAKE EVERYDAY CONNECTION NATURAL',
    desc: 'A community lounge, card and games room, performance and events hall, and more — designed so connection feels easy and natural, not arranged or forced.',
    img: '/i/homepage/amenities-1.jpg',
  },
  {
    title: 'WELLNESS',
    subtitle: 'QUIET SUPPORT FOR AN ACTIVE, WELL-LIVED DAY',
    desc: 'An on-site clinic, physiotherapy room, meditation pavilion, and wellness programmes — all designed around active ageing, movement, nutrition, and everyday routine.',
    img: '/i/homepage/amenities-2.jpg',
  },
  {
    title: 'NATURE',
    subtitle: 'GREEN, OPEN, AND UNHURRIED',
    desc: 'Direct adjacency to a 600-acre reserve forest, walking and jogging trails, and reflective water bodies — open, green, and designed to move at a pace that suits you.',
    img: '/i/location/location.webp',
  },
  {
    title: 'HOSPITALITY',
    subtitle: 'A CLUBHOUSE THAT FEELS LIKE HOME, NOT A HOTEL',
    desc: 'A main dining hall, all-day café, and private dining — all within the 34,000 sq ft Club Amaya, thoughtfully crafted to feel welcoming, warm, and entirely your own.',
    img: '/i/homepage/piece-heaven-left.jpg',
  },
];

const N = ITEMS.length;

/* ── Arrow icon helpers ───────────────────────────────────── */
function ArrowLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2V12M3 8L7 12L11 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Amenities() {
  const [activeIdx, setActiveIdx] = useState(0);
  const panelVisible = useRef(false);
  const isAnimating  = useRef(false);

  /* ── Refs ─────────────────────────────────────────────── */
  const sectionRef   = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const titleRefs    = useRef<(HTMLElement | null)[]>([]);
  const rowBgRefs    = useRef<(HTMLDivElement | null)[]>([]);

  const panelRef     = useRef<HTMLDivElement>(null);
  const panelBgRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const panelNavRef  = useRef<HTMLDivElement>(null);
  const panelBodyRef = useRef<HTMLDivElement>(null);
  const peekRef      = useRef<HTMLButtonElement>(null);

  // Stable ref that always points to the latest navigate fn (for keyboard handler)
  const navigateRef  = useRef<(dir: 1 | -1) => void>(() => {});
  const closePanelRef = useRef<() => void>(() => {});

  /* ── Swap panel background ───────────────────────────── */
  function swapPanelBg(idx: number, instant?: boolean) {
    panelBgRefs.current.forEach((el, i) => {
      if (!el) return;
      if (instant) {
        gsap.set(el, { opacity: i === idx ? 1 : 0 });
      } else {
        gsap.to(el, { opacity: i === idx ? 1 : 0, duration: 0.7, ease: 'power2.inOut', overwrite: true });
      }
    });
  }

  /* ── Hover: per-item local bg ────────────────────────── */
  function onEnter(idx: number) {
    if (panelVisible.current) return;
    const el = rowBgRefs.current[idx];
    if (el) gsap.to(el, { opacity: 1, duration: 0.5, ease: 'power2.inOut', overwrite: true });
    if (titleRefs.current[idx]) {
      gsap.to(titleRefs.current[idx], { scale: 1.035, color: '#ffffff', duration: 0.4, ease: 'power2.out', overwrite: true });
    }
  }

  function onLeave(idx: number) {
    if (panelVisible.current) return;
    const el = rowBgRefs.current[idx];
    if (el) gsap.to(el, { opacity: 0, duration: 0.45, ease: 'power2.inOut', overwrite: true });
    if (titleRefs.current[idx]) {
      gsap.to(titleRefs.current[idx], { scale: 1, color: 'rgba(255,255,255,0.65)', duration: 0.4, ease: 'power2.out', overwrite: true });
    }
  }

  /* ── Open expanded panel ─────────────────────────────── */
  function openPanel(idx: number) {
    if (isAnimating.current) return;
    isAnimating.current = true;
    panelVisible.current = true;

    setActiveIdx(idx);
    swapPanelBg(idx, true);

    rowBgRefs.current.forEach(el => { if (el) gsap.to(el, { opacity: 0, duration: 0.3 }); });
    titleRefs.current.forEach(el => { if (el) gsap.to(el, { scale: 1, color: 'rgba(255,255,255,0.65)', duration: 0.2 }); });

    gsap.set(panelRef.current,     { opacity: 0, pointerEvents: 'all' });
    gsap.set(panelNavRef.current,  { y: -24, opacity: 0 });
    gsap.set(panelBodyRef.current, { y:  36, opacity: 0 });
    gsap.set(peekRef.current,      { y:  20, opacity: 0 });

    gsap.timeline({ onComplete: () => { isAnimating.current = false; } })
      .to(panelRef.current,     { opacity: 1, duration: 0.4,  ease: 'power2.out' })
      .to(panelNavRef.current,  { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.2')
      .to(panelBodyRef.current, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.4')
      .to(peekRef.current,      { y: 0, opacity: 1, duration: 0.5,  ease: 'power3.out' }, '-=0.4');
  }

  /* ── Close expanded panel ────────────────────────────── */
  function closePanel() {
    if (isAnimating.current || !panelVisible.current) return;
    isAnimating.current = true;

    gsap.timeline({
      onComplete: () => {
        panelVisible.current = false;
        gsap.set(panelRef.current, { opacity: 0, pointerEvents: 'none' });
        isAnimating.current = false;
      },
    })
      .to([peekRef.current, panelBodyRef.current, panelNavRef.current], {
        opacity: 0, y: -18, duration: 0.3, stagger: 0.04, ease: 'power2.in',
      })
      .to(panelRef.current, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, '-=0.15');
  }

  /* ── Navigate prev / next ─────────────────────────────── */
  function navigate(dir: 1 | -1) {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setActiveIdx(prev => {
      const next = (prev + dir + N) % N;

      gsap.timeline({ onComplete: () => { isAnimating.current = false; } })
        .to([panelBodyRef.current, peekRef.current], {
          opacity: 0, y: dir > 0 ? -22 : 22, duration: 0.28, ease: 'power2.in',
        })
        .call(() => swapPanelBg(next))
        .set([panelBodyRef.current, peekRef.current], { y: dir > 0 ? 22 : -22, opacity: 0 })
        .to(panelBodyRef.current, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' })
        .to(peekRef.current,      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, '-=0.35');

      return next;
    });
  }

  const nextIdx = (activeIdx + 1) % N;
  const prevIdx = (activeIdx - 1 + N) % N;

  /* ── Init hidden states ──────────────────────────────── */
  useEffect(() => {
    gsap.set(panelRef.current, { opacity: 0, pointerEvents: 'none' });
    rowBgRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }));
    panelBgRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }));
  }, []);

  /* ── Scroll entrance animations ─────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(titleRefs.current.filter(Boolean), {
        y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── Keep action refs in sync after every render ────────── */
  useEffect(() => {
    navigateRef.current   = navigate;
    closePanelRef.current = closePanel;
  });

  /* ── Keyboard navigation (reads stable refs — no stale closure) ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!panelVisible.current) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigateRef.current(1);
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   navigateRef.current(-1);
      if (e.key === 'Escape') closePanelRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#021A13] overflow-hidden min-h-screen"
    >

      {/* ════════════════════════════════════════
          LIST MODE (always rendered in the DOM)
      ════════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col py-20 md:py-28 xl:py-36">

        {/* Section header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16 px-6">
          <p className="text-white/40 text-[11px] uppercase tracking-[0.38em] mb-4">
            100+ Planned Amenities
          </p>
          <h2
            className="text-white font-light tracking-[0.04em] leading-[1.2]"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 4rem)' }}
          >
            Everything that makes a day good.
          </h2>
          <p className="text-white/45 font-light text-[13px] md:text-[14px] leading-[1.8] max-w-md mx-auto mt-4">
            More than 100 planned amenities across four categories — each one designed
            around how people actually live.
          </p>
        </div>

        {/* Category rows — full viewport width so the hover bg covers the whole row */}
        <div className="w-full">
          {ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className="relative overflow-hidden border-b border-white/[0.07] last:border-0"
            >
              {/* ── LOCAL background image: absolute inset-0 on this full-width row ── */}
              <div
                ref={(el) => { rowBgRefs.current[idx] = el; }}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ opacity: 0 }}
              >
                <Image
                  src={item.img}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={idx === 0}
                />
                {/* Dark overlay so title text stays readable over the image */}
                <div className="absolute inset-0 bg-[#021A13]/58" />
              </div>

              {/* ── Title button — text centred within full-width row ── */}
              <button
                onMouseEnter={() => onEnter(idx)}
                onMouseLeave={() => onLeave(idx)}
                onClick={() => openPanel(idx)}
                className="relative z-10 w-full py-6 md:py-8 text-center cursor-pointer"
                aria-label={`Explore ${item.title}`}
              >
                <h3
                  ref={(el) => { titleRefs.current[idx] = el; }}
                  className="font-light uppercase tracking-wider leading-none will-change-transform inline-block"
                  style={{
                    fontSize: 'clamp(2.4rem, 6.5vw, 6.5rem)',
                    color: 'rgba(255,255,255,0.65)',
                  }}
                >
                  {item.title}
                </h3>
              </button>
            </div>
          ))}
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[1100px] mx-auto px-6 w-full mt-14 pt-14 border-t border-white/[0.08]">
          {[
            { num: '256',    label: 'Residences' },
            { num: '34,000', label: 'sq ft Clubhouse (planned)' },
            { num: '600',    label: 'Acre Reserve Forest' },
            { num: '100+',   label: 'Curated Amenities (planned)' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col gap-2">
              <div
                className="text-white font-light leading-none"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}
              >
                {num}
              </div>
              <div className="text-white/40 text-[10px] md:text-[11px] uppercase tracking-[0.18em] leading-[1.6]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          EXPANDED PANEL  (absolute, full-section)
      ════════════════════════════════════════ */}
      <div
        ref={panelRef}
        className="absolute inset-0 z-50 flex flex-col overflow-hidden"
        style={{ opacity: 0, pointerEvents: 'none' }}
      >

        {/* ── Full-bleed background images (one per item) ── */}
        {ITEMS.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => { panelBgRefs.current[i] = el; }}
            className="absolute inset-0 z-0"
            style={{ opacity: 0 }}
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Dark gradient overlay — on top of images, behind content */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(2,26,19,0.72) 0%, rgba(2,26,19,0.38) 45%, rgba(2,26,19,0.78) 100%)',
          }}
        />

        {/* ── Navigation bar ── */}
        <div
          ref={panelNavRef}
          className="relative z-[2] flex items-center justify-between px-6 md:px-12 xl:px-16 pt-7 md:pt-9"
        >
          {/* Prev */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
            aria-label={`Previous: ${ITEMS[prevIdx].title}`}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 group-hover:border-white/70 group-hover:bg-white/10 transition-all duration-300">
              <ArrowLeft />
            </span>
            <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[100px] text-left leading-tight">
              {ITEMS[prevIdx].title}
            </span>
          </button>

          {/* Close × */}
          <button
            onClick={closePanel}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-white/30 hover:border-white/70 hover:bg-white/10 text-white/55 hover:text-white transition-all duration-300 text-[22px] font-light leading-none"
            aria-label="Close"
          >
            ×
          </button>

          {/* Next */}
          <button
            onClick={() => navigate(1)}
            className="group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
            aria-label={`Next: ${ITEMS[nextIdx].title}`}
          >
            <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[100px] text-right leading-tight">
              {ITEMS[nextIdx].title}
            </span>
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 group-hover:border-white/70 group-hover:bg-white/10 transition-all duration-300">
              <ArrowRight />
            </span>
          </button>
        </div>

        {/* ── Main content (centered) ── */}
        <div
          ref={panelBodyRef}
          className="relative z-[2] flex-1 flex flex-col items-center justify-center text-center px-6 gap-5 md:gap-7 pb-28 md:pb-32"
        >
          {/* Counter */}
          <p className="text-white/35 text-[10px] uppercase tracking-[0.55em]">
            {String(activeIdx + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;{String(N).padStart(2, '0')}
          </p>

          {/* Title */}
          <h2
            className="text-white font-light uppercase tracking-wider leading-none"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)' }}
          >
            {ITEMS[activeIdx].title}
          </h2>

          {/* Hairline */}
          <div className="w-14 h-px bg-white/30" />

          {/* Subtitle */}
          <p className="text-white/55 text-[10px] md:text-[11px] uppercase tracking-[0.4em] max-w-[440px] leading-[1.95]">
            {ITEMS[activeIdx].subtitle}
          </p>

          {/* Description */}
          <p className="text-white/70 font-light text-[14px] md:text-[16px] leading-[1.95] max-w-[540px]">
            {ITEMS[activeIdx].desc}
          </p>

          {/* CTA */}
          <button
            onClick={closePanel}
            className="mt-2 flex items-center gap-3 px-8 h-[46px] rounded-full border border-white/25 hover:border-white/55 text-white/55 hover:text-white uppercase text-[11px] tracking-[0.24em] transition-all duration-300"
          >
            View All Amenities
          </button>
        </div>

        {/* ── Peek: next category peeks at the bottom ── */}
        <button
          ref={peekRef}
          onClick={() => navigate(1)}
          className="relative z-[2] flex items-center justify-center gap-3 py-6 md:py-7 w-full border-t border-white/[0.10] hover:bg-white/[0.04] transition-colors duration-400 cursor-pointer group"
          style={{ background: 'rgba(2,26,19,0.45)' }}
          aria-label={`Next: ${ITEMS[nextIdx].title}`}
        >
          <span
            className="text-white/38 group-hover:text-white/72 transition-colors duration-400 uppercase tracking-wider font-light"
            style={{ fontSize: 'clamp(1rem, 2.2vw, 2.2rem)' }}
          >
            {ITEMS[nextIdx].title}
          </span>
          <span className="text-white/30 group-hover:text-white/60 transition-colors duration-400">
            <ArrowDown />
          </span>
        </button>
      </div>

    </section>
  );
}
