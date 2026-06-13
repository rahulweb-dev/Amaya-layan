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
    desc: 'Direct adjacency to a 700-acre reserve forest, walking and jogging trails, and reflective water bodies — open, green, and designed to move at a pace that suits you.',
    img: '/i/location/location.webp',
  },
  {
    title: 'HOSPITALITY',
    subtitle: 'A CLUBHOUSE THAT FEELS LIKE HOME, NOT A HOTEL',
    desc: 'A main dining hall, all-day café, and private dining — all within the 34,000 sq ft Club Amaya, thoughtfully crafted to feel welcoming, warm, and entirely your own.',
    img: '/i/homepage/piece-heaven-left.jpg',
  },
  {
    title: 'HEALTH CARE',
    subtitle: 'LOREM',
    desc: 'lorem20',
    img: '/i/homepage/piece-heaven-left.jpg',
  },
];

const N = ITEMS.length;

function ArrowLeft() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
      <path
        d='M10 12L6 8L10 4'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
      <path
        d='M6 4L10 8L6 12'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <path
        d='M7 2V12M3 8L7 12L11 8'
        stroke='currentColor'
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default function Amenities() {
  const [activeIdx, setActiveIdx] = useState(0);
  const panelVisible = useRef(false);
  const isAnimating = useRef(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLElement | null)[]>([]);
  const rowBgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const panelRef = useRef<HTMLDivElement>(null);
  const panelBgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelNavRef = useRef<HTMLDivElement>(null);
  const panelBodyRef = useRef<HTMLDivElement>(null);
  const peekRef = useRef<HTMLButtonElement>(null);

  const navigateRef = useRef<(dir: 1 | -1) => void>(() => {});
  const closePanelRef = useRef<() => void>(() => {});

  function swapPanelBg(idx: number, instant?: boolean) {
    panelBgRefs.current.forEach((el, i) => {
      if (!el) return;
      if (instant) gsap.set(el, { opacity: i === idx ? 1 : 0 });
      else
        gsap.to(el, {
          opacity: i === idx ? 1 : 0,
          duration: 0.7,
          ease: 'power2.inOut',
          overwrite: true,
        });
    });
  }

  function onEnter(idx: number) {
    if (panelVisible.current) return;
    const el = rowBgRefs.current[idx];
    if (el)
      gsap.to(el, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: true,
      });
    if (titleRefs.current[idx])
      gsap.to(titleRefs.current[idx], {
        scale: 1.035,
        color: '#E7D8C6',
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      });
  }

  function onLeave(idx: number) {
    if (panelVisible.current) return;
    const el = rowBgRefs.current[idx];
    if (el)
      gsap.to(el, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        overwrite: true,
      });
    if (titleRefs.current[idx])
      gsap.to(titleRefs.current[idx], {
        scale: 1,
        color: 'rgba(231,216,198,0.35)',
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      });
  }

  function openPanel(idx: number) {
    if (isAnimating.current) return;
    isAnimating.current = true;
    panelVisible.current = true;
    setActiveIdx(idx);
    swapPanelBg(idx, true);
    rowBgRefs.current.forEach((el) => {
      if (el) gsap.to(el, { opacity: 0, duration: 0.3 });
    });
    titleRefs.current.forEach((el) => {
      if (el)
        gsap.to(el, {
          scale: 1,
          color: 'rgba(231,216,198,0.35)',
          duration: 0.2,
        });
    });
    gsap.set(panelRef.current, { opacity: 0, pointerEvents: 'all' });
    gsap.set(panelNavRef.current, { y: -24, opacity: 0 });
    gsap.set(panelBodyRef.current, { y: 36, opacity: 0 });
    gsap.set(peekRef.current, { y: 20, opacity: 0 });
    gsap
      .timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      })
      .to(panelRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to(
        panelNavRef.current,
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        '-=0.2',
      )
      .to(
        panelBodyRef.current,
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
        '-=0.4',
      )
      .to(
        peekRef.current,
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.4',
      );
  }

  function closePanel() {
    if (isAnimating.current || !panelVisible.current) return;
    isAnimating.current = true;
    gsap
      .timeline({
        onComplete: () => {
          panelVisible.current = false;
          gsap.set(panelRef.current, { opacity: 0, pointerEvents: 'none' });
          isAnimating.current = false;
        },
      })
      .to([peekRef.current, panelBodyRef.current, panelNavRef.current], {
        opacity: 0,
        y: -18,
        duration: 0.3,
        stagger: 0.04,
        ease: 'power2.in',
      })
      .to(
        panelRef.current,
        { opacity: 0, duration: 0.35, ease: 'power2.inOut' },
        '-=0.15',
      );
  }

  function navigate(dir: 1 | -1) {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveIdx((prev) => {
      const next = (prev + dir + N) % N;
      gsap
        .timeline({
          onComplete: () => {
            isAnimating.current = false;
          },
        })
        .to([panelBodyRef.current, peekRef.current], {
          opacity: 0,
          y: dir > 0 ? -22 : 22,
          duration: 0.28,
          ease: 'power2.in',
        })
        .call(() => swapPanelBg(next))
        .set([panelBodyRef.current, peekRef.current], {
          y: dir > 0 ? 22 : -22,
          opacity: 0,
        })
        .to(panelBodyRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
        })
        .to(
          peekRef.current,
          { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
          '-=0.35',
        );
      return next;
    });
  }

  const nextIdx = (activeIdx + 1) % N;
  const prevIdx = (activeIdx - 1 + N) % N;

  useEffect(() => {
    gsap.set(panelRef.current, { opacity: 0, pointerEvents: 'none' });
    rowBgRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0 }));
    panelBgRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0 }));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(titleRefs.current.filter(Boolean), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    navigateRef.current = navigate;
    closePanelRef.current = closePanel;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!panelVisible.current) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        navigateRef.current(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigateRef.current(-1);
      if (e.key === 'Escape') closePanelRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative bg-[#23384A] overflow-hidden min-h-screen'
    >
      {/* ── LIST MODE ── */}
      <div className='relative z-10 flex flex-col py-20 md:py-28 xl:py-36'>
        {/* Section header */}
        <div ref={headerRef} className='text-center mb-12 md:mb-16 px-6'>
          <p className='text-brass text-[11px] uppercase tracking-[0.38em] mb-4'>
            100+ Planned Amenities
          </p>
          <h2
            className='text-limestone font-light tracking-[0.04em] leading-[1.2]'
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 4rem)' }}
          >
            Everything that makes a day good.
          </h2>
          <p className='text-limestone/60 font-light text-[13px] md:text-[14px] leading-[1.8] max-w-md mx-auto mt-4'>
            More than 100 planned amenities across four categories — each one
            designed around how people actually live.
          </p>
        </div>

        {/* Category rows */}
        <div className='w-full'>
          {ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className='relative overflow-hidden border-b border-limestone/15 last:border-0'
            >
              {/* Local bg image on hover */}
              <div
                ref={(el) => {
                  rowBgRefs.current[idx] = el;
                }}
                className='absolute inset-0 z-0 pointer-events-none'
                style={{ opacity: 0 }}
              >
                <Image
                  src={item.img}
                  alt=''
                  fill
                  className='object-cover'
                  sizes='100vw'
                  priority={idx === 0}
                />
                <div className='absolute inset-0 bg-navy/70' />
              </div>

              <button
                onMouseEnter={() => onEnter(idx)}
                onMouseLeave={() => onLeave(idx)}
                onClick={() => openPanel(idx)}
                className='relative z-10 w-full py-6 md:py-8 text-center cursor-pointer'
                aria-label={`Explore ${item.title}`}
              >
                <h3
                  ref={(el) => {
                    titleRefs.current[idx] = el;
                  }}
                  className='font-light uppercase tracking-wider leading-none will-change-transform inline-block'
                  style={{
                    fontSize: 'clamp(2.4rem, 6.5vw, 6.5rem)',
                    color: 'rgba(231,216,198,0.35)',
                  }}
                >
                  {item.title}
                </h3>
              </button>
            </div>
          ))}
        </div>

        {/* Key stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[1100px] mx-auto px-6 w-full mt-14 pt-14 border-t border-limestone/15'>
          {[
            { num: '256', label: 'Residences' },
            { num: '34,000', label: 'sq ft Clubhouse (planned)' },
            { num: '700', label: 'Acre Reserve Forest' },
            { num: '100+', label: 'Curated Amenities (planned)' },
          ].map(({ num, label }) => (
            <div key={label} className='flex flex-col gap-2'>
              <div
                className='text-limestone font-light leading-none text-center'
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}
              >
                {num}
              </div>
              <div className='text-limestone/45 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-center leading-[1.6]'>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXPANDED PANEL ── */}
      <div
        ref={panelRef}
        className='absolute inset-0 z-50 flex flex-col overflow-hidden'
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={item.title}
            ref={(el) => {
              panelBgRefs.current[i] = el;
            }}
            className='absolute inset-0 z-0'
            style={{ opacity: 0 }}
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              className='object-cover'
              sizes='100vw'
              priority={i === 0}
            />
          </div>
        ))}

        <div
          className='absolute inset-0 z-[1] pointer-events-none'
          style={{
            background:
              'linear-gradient(180deg, rgba(29,47,63,0.78) 0%, rgba(29,47,63,0.42) 45%, rgba(29,47,63,0.82) 100%)',
          }}
        />

        {/* Navigation bar */}
        <div
          ref={panelNavRef}
          className='relative z-[2] flex items-center justify-between px-6 md:px-12 xl:px-16 pt-7 md:pt-9'
        >
          <button
            onClick={() => navigate(-1)}
            className='group flex items-center gap-3 text-limestone/50 hover:text-limestone transition-colors duration-300'
            aria-label={`Previous: ${ITEMS[prevIdx].title}`}
          >
            <span className='flex items-center justify-center w-10 h-10 rounded-full border border-limestone/30 group-hover:border-limestone/60 group-hover:bg-limestone/10 transition-all duration-300'>
              <ArrowLeft />
            </span>
            <span className='hidden md:block text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[100px] text-left leading-tight'>
              {ITEMS[prevIdx].title}
            </span>
          </button>

          <button
            onClick={closePanel}
            className='flex items-center justify-center w-11 h-11 rounded-full border border-limestone/30 hover:border-limestone/60 hover:bg-limestone/10 text-limestone/55 hover:text-limestone transition-all duration-300 text-[22px] font-light leading-none'
            aria-label='Close'
          >
            ×
          </button>

          <button
            onClick={() => navigate(1)}
            className='group flex items-center gap-3 text-limestone/50 hover:text-limestone transition-colors duration-300'
            aria-label={`Next: ${ITEMS[nextIdx].title}`}
          >
            <span className='hidden md:block text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[100px] text-right leading-tight'>
              {ITEMS[nextIdx].title}
            </span>
            <span className='flex items-center justify-center w-10 h-10 rounded-full border border-limestone/30 group-hover:border-limestone/60 group-hover:bg-limestone/10 transition-all duration-300'>
              <ArrowRight />
            </span>
          </button>
        </div>

        {/* Main content */}
        <div
          ref={panelBodyRef}
          className='relative z-[2] flex-1 flex flex-col items-center justify-center text-center px-6 gap-5 md:gap-7 pb-28 md:pb-32'
        >
          <p className='text-limestone/40 text-[10px] uppercase tracking-[0.55em]'>
            {String(activeIdx + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;
            {String(N).padStart(2, '0')}
          </p>

          <h2
            className='text-limestone font-light uppercase tracking-wider leading-none'
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)' }}
          >
            {ITEMS[activeIdx].title}
          </h2>

          <div className='w-14 h-px bg-brass/50' />

          <p className='text-limestone/60 text-[10px] md:text-[11px] uppercase tracking-[0.4em] max-w-[440px] leading-[1.95]'>
            {ITEMS[activeIdx].subtitle}
          </p>

          <p className='text-limestone/80 font-light text-[14px] md:text-[16px] leading-[1.95] max-w-[540px]'>
            {ITEMS[activeIdx].desc}
          </p>

          <button
            onClick={closePanel}
            className='mt-2 flex items-center gap-3 px-8 h-[46px] rounded-full border border-limestone/25 hover:border-limestone/55 text-limestone/55 hover:text-limestone uppercase text-[11px] tracking-[0.24em] transition-all duration-300'
          >
            View All Amenities
          </button>
        </div>

        {/* Peek: next category */}
        <button
          ref={peekRef}
          onClick={() => navigate(1)}
          className='relative z-[2] flex items-center justify-center gap-3 py-6 md:py-7 w-full border-t border-limestone/[0.12] hover:bg-limestone/[0.04] transition-colors duration-300 cursor-pointer group'
          style={{ background: 'rgba(29,47,63,0.50)' }}
          aria-label={`Next: ${ITEMS[nextIdx].title}`}
        >
          <span
            className='text-limestone/40 group-hover:text-limestone/75 transition-colors duration-300 uppercase tracking-wider font-light'
            style={{ fontSize: 'clamp(1rem, 2.2vw, 2.2rem)' }}
          >
            {ITEMS[nextIdx].title}
          </span>
          <span className='text-limestone/30 group-hover:text-limestone/60 transition-colors duration-300'>
            <ArrowDown />
          </span>
        </button>
      </div>
    </section>
  );
}
