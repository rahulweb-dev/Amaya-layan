'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    title: 'COMMUNITY',
    subtitle: 'SPACES THAT MAKE EVERYDAY CONNECTION NATURAL',
    desc: 'A community lounge, card and games room, performance and events hall, and more — designed so connection feels easy and natural, not arranged or forced.',
    img: '/images/social-lounge.jpg',
  },
  {
    title: 'WELLNESS',
    subtitle: 'QUIET SUPPORT FOR AN ACTIVE, WELL-LIVED DAY',
    desc: 'An on-site clinic, physiotherapy room, meditation pavilion, and wellness programmes — all designed around active ageing, movement, nutrition, and everyday routine.',
    img: '/images/gym.jpg',
  },
  {
    title: 'NATURE',
    subtitle: 'GREEN, OPEN, AND UNHURRIED',
    desc: 'Direct adjacency to a 700-acre reserve forest, walking and jogging trails, and reflective water bodies — open, green, and designed to move at a pace that suits you.',
    img: '/images/garden-walk.jpg',
  },
  {
    title: 'HOSPITALITY',
    subtitle: 'A CLUBHOUSE THAT FEELS LIKE HOME, NOT A HOTEL',
    desc: 'A main dining hall, all-day café, and private dining — all within the 34,000 sq ft Club Amaya, thoughtfully crafted to feel welcoming, warm, and entirely your own.',
    img: '/images/cards-room.png',
  },
  {
    title: 'HEALTH CARE',
    subtitle: 'CARE WHEN NEEDED, FREEDOM ALWAYS',
    desc: 'Emergency call points in every apartment, trained on-site response staff, and hospital coordination — safety and care designed discreetly into everyday life.',
    img: '/images/courtyard-pool.jpg',
  },
];

const N = ITEMS.length;

function ArrowLeft() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
      <path d='M10 12L6 8L10 4' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
      <path d='M6 4L10 8L6 12' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none'>
      <path d='M7 2V12M3 8L7 12L11 8' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

export default function Amenities() {

  // ─── MOBILE accordion ───────────────────────────────────────────────────────
  const [mobileIdx, setMobileIdx] = useState<number | null>(null);
  const mobileSectionRef = useRef<HTMLElement>(null);
  const mContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mImgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    mContentRefs.current.forEach((el) => { if (el) gsap.set(el, { height: 0 }); });
    mImgRefs.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0 }); });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.amen-mob-row', {
        y: 26, opacity: 0, duration: 0.82, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: mobileSectionRef.current, start: 'top 74%' },
      });
    }, mobileSectionRef);
    return () => ctx.revert();
  }, []);

  const mobileToggle = useCallback((idx: number) => {
    setMobileIdx((prev) => {
      if (prev !== null && prev !== idx) {
        const pC = mContentRefs.current[prev];
        const pI = mImgRefs.current[prev];
        if (pC) gsap.to(pC, { height: 0, duration: 0.4, ease: 'power3.inOut' });
        if (pI) gsap.to(pI, { opacity: 0, duration: 0.3 });
      }
      if (prev === idx) {
        const c = mContentRefs.current[idx];
        const i = mImgRefs.current[idx];
        if (c) gsap.to(c, { height: 0, duration: 0.4, ease: 'power3.inOut' });
        if (i) gsap.to(i, { opacity: 0, duration: 0.3 });
        return null;
      }
      const c = mContentRefs.current[idx];
      const i = mImgRefs.current[idx];
      if (c) gsap.fromTo(c, { height: 0 }, { height: 'auto', duration: 0.55, ease: 'power3.out' });
      if (i) gsap.to(i, { opacity: 1, duration: 0.65, delay: 0.08 });
      return idx;
    });
  }, []);

  // ─── DESKTOP panel ──────────────────────────────────────────────────────────
  const [deskIdx, setDeskIdx] = useState(0);
  const panelVisible = useRef(false);
  const isAnimating = useRef(false);

  const deskSectionRef = useRef<HTMLDivElement>(null);
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
      else gsap.to(el, { opacity: i === idx ? 1 : 0, duration: 0.7, ease: 'power2.inOut', overwrite: true });
    });
  }

  function onEnter(idx: number) {
    if (panelVisible.current) return;
    const el = rowBgRefs.current[idx];
    if (el) gsap.to(el, { opacity: 1, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' });
    if (titleRefs.current[idx]) gsap.to(titleRefs.current[idx], { scale: 1.035, color: '#E7D8C6', opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  }

  function onLeave(idx: number) {
    if (panelVisible.current) return;
    const el = rowBgRefs.current[idx];
    if (el) gsap.to(el, { opacity: 0, duration: 0.45, ease: 'power2.inOut', overwrite: 'auto' });
    if (titleRefs.current[idx]) gsap.to(titleRefs.current[idx], { scale: 1, color: 'rgba(231,216,198,0.45)', opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
  }

  function openPanel(idx: number) {
    if (isAnimating.current) return;
    isAnimating.current = true;
    panelVisible.current = true;
    setDeskIdx(idx);
    swapPanelBg(idx, true);
    rowBgRefs.current.forEach((el) => { if (el) gsap.to(el, { opacity: 0, duration: 0.3, overwrite: 'auto' }); });
    titleRefs.current.forEach((el) => { if (el) gsap.to(el, { scale: 1, color: 'rgba(231,216,198,0.45)', opacity: 1, duration: 0.2, overwrite: 'auto' }); });
    gsap.set(panelRef.current, { opacity: 0, pointerEvents: 'all' });
    gsap.set(panelNavRef.current, { y: -24, opacity: 0 });
    gsap.set(panelBodyRef.current, { y: 36, opacity: 0 });
    gsap.set(peekRef.current, { y: 20, opacity: 0 });
    gsap.timeline({ onComplete: () => { isAnimating.current = false; } })
      .to(panelRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      .to(panelNavRef.current, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, '-=0.2')
      .to(panelBodyRef.current, { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }, '-=0.4')
      .to(peekRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.4');
  }

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
      .to([peekRef.current, panelBodyRef.current, panelNavRef.current], { opacity: 0, y: -18, duration: 0.3, stagger: 0.04, ease: 'power2.in' })
      .to(panelRef.current, { opacity: 0, duration: 0.35, ease: 'power2.inOut' }, '-=0.15');
  }

  function navigate(dir: 1 | -1) {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const next = (deskIdx + dir + N) % N;
    gsap.timeline({ onComplete: () => { isAnimating.current = false; } })
      .to([panelBodyRef.current, peekRef.current], { opacity: 0, y: dir > 0 ? -22 : 22, duration: 0.28, ease: 'power2.in', overwrite: true })
      .call(() => { swapPanelBg(next); setDeskIdx(next); })
      .set([panelBodyRef.current, peekRef.current], { y: dir > 0 ? 22 : -22, opacity: 0 })
      .to(panelBodyRef.current, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' })
      .to(peekRef.current, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, '-=0.35');
  }

  const nextIdx = (deskIdx + 1) % N;
  const prevIdx = (deskIdx - 1 + N) % N;

  useEffect(() => {
    gsap.set(panelRef.current, { opacity: 0, pointerEvents: 'none' });
    rowBgRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0 }));
    panelBgRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0 }));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: deskSectionRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo(titleRefs.current.filter(Boolean),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: deskSectionRef.current, start: 'top 72%', once: true } }
      );
    }, deskSectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    navigateRef.current = navigate;
    closePanelRef.current = closePanel;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!panelVisible.current) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigateRef.current(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigateRef.current(-1);
      if (e.key === 'Escape') closePanelRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          MOBILE — accordion (below md)
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={mobileSectionRef}
        className="md:hidden bg-[#071B16] py-16"
      >
        <div className="px-5 sm:px-8">
          <p className="text-[#5DA882]/60 text-[11px] uppercase tracking-[0.48em] mb-12">
            100+ Planned Amenities
          </p>
          <div>
            {ITEMS.map((item, idx) => {
              const isActive = mobileIdx === idx;
              return (
                <div
                  key={item.title}
                  className="amen-mob-row relative border-t border-limestone/10 overflow-hidden"
                >
                  <div
                    ref={(el) => { mImgRefs.current[idx] = el; }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: 0 }}
                  >
                    <Image src={item.img} alt={item.title} fill className="object-cover" sizes="100vw" priority={idx === 0} />
                    <div className="absolute inset-0 bg-[#071B16]/72" />
                  </div>

                  <button
                    onClick={() => mobileToggle(idx)}
                    className="relative z-10 w-full flex items-center justify-between py-6 text-left"
                    aria-expanded={isActive}
                  >
                    <h3
                      className="font-light tracking-[0.025em] leading-none uppercase transition-colors duration-500 text-[1.75rem]"
                      style={{ color: isActive ? 'rgba(231,216,198,1)' : 'rgba(231,216,198,0.45)' }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className="relative z-10 shrink-0 ml-5 leading-none transition-all duration-500 text-limestone/40 text-[1.1rem]"
                      style={{ display: 'inline-block', transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      ∨
                    </span>
                  </button>

                  <div
                    ref={(el) => { mContentRefs.current[idx] = el; }}
                    className="relative z-10 overflow-hidden"
                    style={{ height: 0 }}
                  >
                    <div className="pb-10 pt-1 flex flex-col gap-5 max-w-2xl">
                      <p className="text-limestone/40 text-[10px] uppercase tracking-[0.44em]">
                        {item.subtitle}
                      </p>
                      <p className="text-limestone/70 font-light text-[16px] md:text-[21px] leading-[1.9]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-limestone/10" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DESKTOP — original full-screen panel design (md and up)
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={deskSectionRef}
        className='relative hidden md:block bg-[#23384A] overflow-hidden '
      >
        {/* ── LIST MODE ── */}
        <div className='relative z-10 flex flex-col py-20 md:py-28 xl:py-36'>
          <div ref={headerRef} className='text-center mb-12 md:mb-16 px-6'>
            <h2 className='text-limestone font-light tracking-[0.04em] leading-[1.2] text-[28px]'>
              Everything that makes a day good.
            </h2>
          </div>

          <div className='w-full'>
            {ITEMS.map((item, idx) => (
              <div key={item.title} className='relative overflow-hidden border-b border-limestone/15 last:border-0'>
                <div
                  ref={(el) => { rowBgRefs.current[idx] = el; }}
                  className='absolute inset-0 z-0 pointer-events-none'
                  style={{ opacity: 0 }}
                >
                  <Image src={item.img} alt='' fill className='object-cover' sizes='100vw' priority={idx === 0} />
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
                    ref={(el) => { titleRefs.current[idx] = el; }}
                    className='font-light uppercase tracking-wider leading-none will-change-transform inline-block md:text-[77px]'
                    style={{ color: 'rgba(231,216,198,0.45)' }}
                  >
                    {item.title}
                  </h3>
                </button>
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
              ref={(el) => { panelBgRefs.current[i] = el; }}
              className='absolute inset-0 z-0'
              style={{ opacity: 0 }}
            >
              <Image src={item.img} alt={item.title} fill className='object-cover' sizes='100vw' priority={i === 0} />
            </div>
          ))}

          <div
            className='absolute inset-0 z-[1] pointer-events-none'
            style={{ background: 'linear-gradient(180deg, rgba(29,47,63,0.78) 0%, rgba(29,47,63,0.42) 45%, rgba(29,47,63,0.82) 100%)' }}
          />

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

          <div
            ref={panelBodyRef}
            className='relative z-[2] flex-1 flex flex-col items-center justify-center text-center px-6 gap-5 md:gap-7 pb-28 md:pb-32'
          >
            <p className='text-limestone/40 text-[10px] uppercase tracking-[0.55em]'>
              {String(deskIdx + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;{String(N).padStart(2, '0')}
            </p>

            <h2
              className='text-limestone font-light uppercase tracking-wider leading-none'
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)' }}
            >
              {ITEMS[deskIdx].title}
            </h2>

            <div className='w-14 h-px bg-brass/50' />

            <p className='text-limestone/60 text-[10px] md:text-[11px] uppercase tracking-[0.4em] max-w-[440px] leading-[1.95]'>
              {ITEMS[deskIdx].subtitle}
            </p>

            <p className='text-limestone/80 font-light text-[19px] leading-[1.95] max-w-[540px]'>
              {ITEMS[deskIdx].desc}
            </p>
          </div>

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
    </>
  );
}
