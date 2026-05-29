'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Location', href: '/location' },
  { name: 'Investment', href: '/investment' },
  { name: 'News', href: '/news' },
  { name: 'Contacts', href: '/contacts' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false); // stable ref to avoid stale closure in effects
  const pathname = usePathname();
  const menuInitialized = useRef(false);

  const bgRef = useRef<HTMLDivElement>(null);

  // Desktop navbar refs
  const dLeftRef = useRef<HTMLDivElement>(null);
  const dLogoRef = useRef<HTMLDivElement>(null);
  const dRightRef = useRef<HTMLDivElement>(null);
  const dHLine1 = useRef<HTMLSpanElement>(null);
  const dHLine2 = useRef<HTMLSpanElement>(null);
  const dHLine3 = useRef<HTMLSpanElement>(null);

  // Desktop sub-nav dropdown refs
  const subNavRef = useRef<HTMLDivElement>(null);
  const subNavLinksRef = useRef<HTMLDivElement>(null);

  // Mobile navbar refs
  const mLogoRef = useRef<HTMLDivElement>(null);
  const mRightRef = useRef<HTMLDivElement>(null);
  const mHLine1 = useRef<HTMLSpanElement>(null);
  const mHLine2 = useRef<HTMLSpanElement>(null);
  const mHLine3 = useRef<HTMLSpanElement>(null);

  // Mobile half-circle sheet refs
  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  // Close menu and reset frosted-glass on route change
  useEffect(() => {
    setMenuOpen(false);
    const atTop = window.scrollY <= 100;
    if (atTop) {
      setScrolled(false);
      scrolledRef.current = false;
      gsap.to(bgRef.current, { width: '0%', duration: 0.3, ease: 'power3.inOut', overwrite: true });
    }
  }, [pathname]);

  // Initial states
  useEffect(() => {
    if (mobileSheetRef.current) gsap.set(mobileSheetRef.current, { y: '110%' });
    if (subNavRef.current) gsap.set(subNavRef.current, { height: 0 });
  }, []);

  // Page load entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from([dLogoRef.current, mLogoRef.current], { y: -35, opacity: 0, duration: 1.1 }, 0)
      .from(dLeftRef.current, { y: -35, opacity: 0, duration: 1.1 }, 0.1)
      .from([dRightRef.current, mRightRef.current], { y: -35, opacity: 0, duration: 1.1 }, 0.2);
  }, []);

  // Scroll handler — tablet/desktop only, higher threshold (100px)
  useEffect(() => {
    const onScroll = () => {
      if (window.matchMedia('(max-width: 767px)').matches) return;
      const past = window.scrollY > 100;
      if (past === scrolledRef.current) return;
      scrolledRef.current = past;
      setScrolled(past);
      if (!menuOpen) {
        gsap.to(bgRef.current, {
          width: past ? '100%' : '0%',
          duration: past ? 0.75 : 0.55,
          ease: 'power3.inOut',
          overwrite: true,
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  const animateHamburger = (
    open: boolean,
    l1: React.RefObject<HTMLSpanElement | null>,
    l2: React.RefObject<HTMLSpanElement | null>,
    l3: React.RefObject<HTMLSpanElement | null>
  ) => {
    if (open) {
      gsap.to(l1.current, { y: 7, rotate: 45, duration: 0.45, ease: 'power2.inOut' });
      gsap.to(l2.current, { opacity: 0, scaleX: 0.5, duration: 0.3, ease: 'power2.in' });
      gsap.to(l3.current, { y: -7, rotate: -45, duration: 0.45, ease: 'power2.inOut' });
    } else {
      gsap.to(l1.current, { y: 0, rotate: 0, duration: 0.45, ease: 'power2.inOut' });
      gsap.to(l2.current, { opacity: 1, scaleX: 1, duration: 0.35, delay: 0.1, ease: 'power2.out' });
      gsap.to(l3.current, { y: 0, rotate: 0, duration: 0.45, ease: 'power2.inOut' });
    }
  };

  // Menu open/close animations
  useEffect(() => {
    if (!menuInitialized.current) {
      menuInitialized.current = true;
      return;
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile) {
      // ── Mobile: half-circle bottom sheet ──
      animateHamburger(menuOpen, mHLine1, mHLine2, mHLine3);

      const overlay = mobileOverlayRef.current;
      const sheet = mobileSheetRef.current;
      const linkItems = mobileLinksRef.current?.querySelectorAll<HTMLElement>('.mob-link');

      if (!overlay || !sheet) return;

      if (menuOpen) {
        gsap.set(overlay, { display: 'block', pointerEvents: 'all' });
        const tl = gsap.timeline();
        tl.to(sheet, { y: '0%', duration: 0.75, ease: 'power4.out' });
        if (linkItems?.length) {
          tl.fromTo(linkItems,
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
            '-=0.4'
          );
        }
      } else {
        const tl = gsap.timeline({
          onComplete: () => gsap.set(overlay, { display: 'none', pointerEvents: 'none' }),
        });
        if (linkItems?.length) {
          tl.to(linkItems, { y: 15, opacity: 0, duration: 0.2, stagger: 0.04, ease: 'power2.in' });
        }
        tl.to(sheet, { y: '110%', duration: 0.6, ease: 'power4.in' }, '-=0.1');
      }
    } else {
      // ── Tablet / Desktop: sub-nav dropdown below header ──
      animateHamburger(menuOpen, dHLine1, dHLine2, dHLine3);

      const subNav = subNavRef.current;
      const linkItems = subNavLinksRef.current?.querySelectorAll<HTMLElement>('.sub-link');

      if (!subNav) return;

      if (menuOpen) {
        const tl = gsap.timeline();
        tl.to(subNav, { height: 'auto', duration: 0.45, ease: 'power3.out' });
        if (linkItems?.length) {
          tl.fromTo(linkItems,
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power3.out' },
            '-=0.25'
          );
        }
      } else {
        const tl = gsap.timeline();
        if (linkItems?.length) {
          tl.to(linkItems, { y: -8, opacity: 0, duration: 0.2, stagger: 0.04, ease: 'power2.in' });
        }
        tl.to(subNav, { height: 0, duration: 0.35, ease: 'power3.in' }, '-=0.1');
      }
    }
  }, [menuOpen]);

  // Desktop text/border color: dark only when scrolled, white otherwise
  const dDark = scrolled;
  const dText = dDark ? 'text-[#021A13]' : 'text-white';
  const dBorder = dDark ? 'border-[#021A13]' : 'border-white';

  return (
    <>
      {/* ─── HEADER ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 z-[999] w-full">

        {/* Frosted-glass background (tablet/desktop, scroll-driven) */}
        <div
          ref={bgRef}
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0 bg-white/96 backdrop-blur-2xl shadow-[0_4px_40px_rgba(0,0,0,0.08)]"
        />

        {/* ── MOBILE NAVBAR (< 768px) ── */}
        <div className="md:hidden relative max-w-[1700px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* Logo left */}
            <div ref={mLogoRef} className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="9.5" />
                  <path d="M12 2.5c-2.5 3-4 5.8-4 9.5s1.5 6.5 4 9.5" />
                  <path d="M12 2.5c2.5 3 4 5.8 4 9.5s-1.5 6.5-4 9.5" />
                  <line x1="2.5" y1="12" x2="21.5" y2="12" />
                </svg>
              </div>
              <Link href="/">
                <span className="uppercase tracking-[0.25em] text-[13px] font-light text-white">LAYAN VERDE</span>
              </Link>
            </div>

            {/* Icons right */}
            <div ref={mRightRef} className="flex items-center gap-2">
              <a href="#" aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>

              <a href="#" aria-label="Telegram"
                className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center transition-all duration-300 hover:bg-[#229ED9] hover:border-[#229ED9]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
              </a>

              <a href="tel:+66761234567" aria-label="Call us"
                className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center transition-all duration-300 hover:bg-[#021A13] hover:border-[#021A13]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              </a>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="w-10 h-10 rounded-full border border-white text-white flex items-center justify-center transition-all duration-300 hover:bg-[#021A13] hover:border-[#021A13]"
              >
                <div className="flex flex-col gap-[5px] w-[15px]">
                  <span ref={mHLine1} className="block w-full h-[1.5px] bg-current origin-center" />
                  <span ref={mHLine2} className="block w-full h-[1.5px] bg-current origin-center" />
                  <span ref={mHLine3} className="block w-full h-[1.5px] bg-current origin-center" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── TABLET / DESKTOP NAVBAR (≥ 768px) ── */}
        <div className="hidden md:block relative">

          {/* Main header bar */}
          <div className={`relative max-w-[1700px] mx-auto px-6 md:px-10 transition-[padding] duration-500 ${dDark ? 'py-[14px]' : 'py-6'}`}>
            <div className="flex items-center justify-between">

              {/* Left — Menu trigger */}
              <div ref={dLeftRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  className={`group flex items-center gap-3 pl-4 pr-5 h-[42px] rounded-full border uppercase text-xs tracking-[0.18em] transition-colors duration-300 ${dBorder} ${dText} hover:bg-[#021A13] hover:text-white hover:border-[#021A13]`}
                >
                  <div className="flex flex-col gap-[5.5px] w-[18px]">
                    <span ref={dHLine1} className="block w-full h-[1.5px] bg-current origin-center" />
                    <span ref={dHLine2} className="block w-full h-[1.5px] bg-current origin-center" />
                    <span ref={dHLine3} className="block w-full h-[1.5px] bg-current origin-center" />
                  </div>
                  <span>{menuOpen ? 'Close' : 'Menu'}</span>
                </button>
              </div>

              {/* Center — Logo */}
              <div ref={dLogoRef} className="absolute left-1/2 -translate-x-1/2">
                <Link href="/">
                  <span className={`block uppercase tracking-[0.38em] text-lg md:text-[22px] font-light transition-colors duration-300 ${dText}`}>
                    LAYAN VERDE
                  </span>
                </Link>
              </div>

              {/* Right — Socials + CTA */}
              <div ref={dRightRef} className="flex items-center gap-3">
                <a href="#" aria-label="WhatsApp"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${dBorder} ${dText} hover:bg-[#25D366] hover:border-[#25D366] hover:text-white`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>

                <a href="#" aria-label="Telegram"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${dBorder} ${dText} hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                </a>

                <button className={`flex items-center px-6 h-[42px] rounded-full uppercase text-xs tracking-[0.18em] transition-all duration-300 ${
                  dDark ? 'bg-[#021A13] text-white hover:bg-[#0d3b28]' : 'bg-white text-[#021A13] hover:bg-white/90'
                }`}>
                  Get In Touch
                </button>
              </div>
            </div>
          </div>

          {/* Sub-nav dropdown — slides down when menu opens */}
          <div ref={subNavRef} className="overflow-hidden" style={{ height: 0 }}>
            <div className={`border-t px-6 md:px-10 py-[14px] ${scrolled ? 'border-black/[0.07]' : 'border-white/15'}`}>
              <nav ref={subNavLinksRef} className="max-w-[1700px] mx-auto flex items-center gap-8 md:gap-10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`sub-link text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap relative pb-[3px] ${
                      pathname === link.href
                        ? `font-medium ${scrolled ? 'text-[#021A13]' : 'text-white'}`
                        : `${scrolled ? 'text-[#021A13]/40 hover:text-[#021A13]' : 'text-white/50 hover:text-white'}`
                    }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className={`absolute bottom-0 left-0 right-0 h-px ${scrolled ? 'bg-[#021A13]' : 'bg-white'}`} />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE HALF-CIRCLE BOTTOM SHEET ──────────────────── */}
      <div
        ref={mobileOverlayRef}
        className="md:hidden fixed inset-0 z-[997]"
        style={{ display: 'none', pointerEvents: 'none' }}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[3px] cursor-pointer"
          onClick={() => setMenuOpen(false)}
        />

        <div
          ref={mobileSheetRef}
          className="absolute bottom-0 left-0 right-0 bg-[#021A13] overflow-hidden"
          style={{ borderRadius: '50% 50% 0 0 / 72px 72px 0 0' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-36 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 70%)' }} />

          <div className="flex justify-center pt-7 pb-1">
            <div className="w-10 h-[3px] rounded-full bg-white/15" />
          </div>

          <div className="flex items-center justify-center gap-2.5 pt-4 pb-5">
            <div className="w-6 h-6 rounded-full border border-white/25 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 2.5c-2.5 3-4 5.8-4 9.5s1.5 6.5 4 9.5" />
                <path d="M12 2.5c2.5 3 4 5.8 4 9.5s-1.5 6.5-4 9.5" />
                <line x1="2.5" y1="12" x2="21.5" y2="12" />
              </svg>
            </div>
            <span className="text-white/45 uppercase tracking-[0.3em] text-[10px] font-light">Layan Verde</span>
          </div>

          <nav ref={mobileLinksRef} className="px-7">
            {NAV_LINKS.map((link, i) => (
              <div key={link.href} className="mob-link border-b border-white/[0.07] last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-[13px] group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-white/20 text-[10px] tracking-[0.2em] tabular-nums w-5 shrink-0">0{i + 1}</span>
                    <span className={`text-[1.55rem] font-light uppercase tracking-wider transition-colors duration-300 ${
                      pathname === link.href ? 'text-white' : 'text-white/55 group-hover:text-white'
                    }`}>{link.name}</span>
                  </div>
                  <span className="text-white/20 group-hover:text-white/50 text-sm transition-colors duration-300">↗</span>
                </Link>
              </div>
            ))}
          </nav>

          <div className="mx-7 mt-4 pt-4 border-t border-white/[0.07] pb-10">
            <div className="flex gap-8 mb-5">
              <div>
                <div className="text-white/25 text-[9px] uppercase tracking-[0.2em] mb-1">Phone</div>
                <a href="tel:+66761234567" className="text-white/55 text-xs hover:text-white transition-colors">+66 76 123 456</a>
              </div>
              <div>
                <div className="text-white/25 text-[9px] uppercase tracking-[0.2em] mb-1">Email</div>
                <a href="mailto:info@layanverde.com" className="text-white/55 text-xs hover:text-white transition-colors">info@layanverde.com</a>
              </div>
            </div>
            <button className="w-full h-11 rounded-full bg-white text-[#021A13] uppercase text-[11px] tracking-[0.2em] active:bg-white/80 transition-colors duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
