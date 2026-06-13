'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { name: 'Residences', href: '/residences' },
  { name: 'Floor Plans', href: '/floor-plans' },
  { name: 'Club Amaya', href: '/club-amaya' },
  { name: 'Wellness', href: '/wellness' },
  { name: 'Location', href: '/location' },
  { name: 'Amenities', href: '/amenities' },
  { name: 'Gallery', href: '/gallery' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const pathname = usePathname();
  const menuInitialized = useRef(false);

  const bgRef = useRef<HTMLDivElement>(null);

  const dLeftRef = useRef<HTMLDivElement>(null);
  const dLogoRef = useRef<HTMLDivElement>(null);
  const dRightRef = useRef<HTMLDivElement>(null);
  const dHLine1 = useRef<HTMLSpanElement>(null);
  const dHLine2 = useRef<HTMLSpanElement>(null);
  const dHLine3 = useRef<HTMLSpanElement>(null);

  const subNavRef = useRef<HTMLDivElement>(null);
  const subNavLinksRef = useRef<HTMLDivElement>(null);

  const mLogoRef = useRef<HTMLDivElement>(null);
  const mRightRef = useRef<HTMLDivElement>(null);
  const mHLine1 = useRef<HTMLSpanElement>(null);
  const mHLine2 = useRef<HTMLSpanElement>(null);
  const mHLine3 = useRef<HTMLSpanElement>(null);

  const mobileOverlayRef = useRef<HTMLDivElement>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    const atTop = window.scrollY <= 100;
    if (atTop) {
      setScrolled(false);
      scrolledRef.current = false;
      gsap.to(bgRef.current, { width: '0%', duration: 0.3, ease: 'power3.inOut', overwrite: true });
    }
  }, [pathname]);

  useEffect(() => {
    if (mobileSheetRef.current) gsap.set(mobileSheetRef.current, { y: '110%' });
    if (subNavRef.current) gsap.set(subNavRef.current, { height: 0 });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from([dLogoRef.current, mLogoRef.current], { y: -35, opacity: 0, duration: 1.1 }, 0)
      .from(dLeftRef.current, { y: -35, opacity: 0, duration: 1.1 }, 0.1)
      .from([dRightRef.current, mRightRef.current], { y: -35, opacity: 0, duration: 1.1 }, 0.2);
  }, []);

  // Keep ref in sync so the scroll handler (registered once) reads live menuOpen value
  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 100;
      if (past === scrolledRef.current) return;
      scrolledRef.current = past;
      setScrolled(past);
      // When scrolling back to top, keep bg visible if menu is still open
      const showBg = past || menuOpenRef.current;
      gsap.to(bgRef.current, {
        width: showBg ? '100%' : '0%',
        duration: past ? 0.75 : 0.55,
        ease: 'power3.inOut',
        overwrite: true,
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  useEffect(() => {
    if (!menuInitialized.current) {
      menuInitialized.current = true;
      return;
    }

    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (isMobile) {
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
      animateHamburger(menuOpen, dHLine1, dHLine2, dHLine3);

      const subNav = subNavRef.current;
      const linkItems = subNavLinksRef.current?.querySelectorAll<HTMLElement>('.sub-link');

      if (!subNav) return;

      if (menuOpen) {
        // Show frosted bg immediately when menu opens
        gsap.to(bgRef.current, { width: '100%', duration: 0.4, ease: 'power3.out', overwrite: true });
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
        // Only hide bg on close if the page hasn't been scrolled past threshold
        if (!scrolledRef.current) {
          gsap.to(bgRef.current, { width: '0%', duration: 0.35, ease: 'power3.in', overwrite: true });
        }
        const tl = gsap.timeline();
        if (linkItems?.length) {
          tl.to(linkItems, { y: -8, opacity: 0, duration: 0.2, stagger: 0.04, ease: 'power2.in' });
        }
        tl.to(subNav, { height: 0, duration: 0.35, ease: 'power3.in' }, '-=0.1');
      }
    }
  }, [menuOpen]);

  // When scrolled OR menu open: navy text on limestone glass. When transparent: white text.
  const dDark = scrolled || menuOpen;
  const dText   = dDark ? 'text-[#23384A]' : 'text-white';
  const dBorder = dDark ? 'border-[#23384A]/30' : 'border-white/50';

  return (
    <>
      {/* ─── HEADER ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 z-[999] w-full">

        {/* Frosted-glass background — limestone tint when scrolled */}
        <div
          ref={bgRef}
          className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0 backdrop-blur-2xl shadow-[0_4px_40px_rgba(35,56,74,0.10)] border-b border-[#D8CEC3]/40"
          style={{ background: 'rgba(244,240,235,0.95)' }}
        />

        {/* ── MOBILE NAVBAR (< 768px) ── */}
        <div className="md:hidden relative max-w-[1700px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            <div ref={mLogoRef}>
              <Link href="/">
                <div className="relative h-10 w-35">
                  <Image
                    src="/logos/Amaya_white_Logo.webp"
                    alt="Amaya"
                    fill
                    className={`object-contain object-left transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
                    priority
                  />
                  <Image
                    src="/logos/Amaya_black_Logo.webp"
                    alt=""
                    fill
                    className={`object-contain object-left transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
                    priority
                  />
                </div>
              </Link>
            </div>

            <div ref={mRightRef} className="flex items-center gap-1.5">
              <a href="#" aria-label="WhatsApp"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white ${dBorder} ${dText}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>

              <a href="#" aria-label="Telegram"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white ${dBorder} ${dText}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
              </a>

              <a href="tel:+919800098000" aria-label="Call us"
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[#23384A] hover:border-[#23384A] hover:text-white ${dBorder} ${dText}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              </a>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 hover:bg-[#23384A] hover:border-[#23384A] hover:text-white ${dBorder} ${dText}`}
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

          <div className={`relative max-w-[1700px] mx-auto px-6 md:px-10 xl:px-16 2xl:px-20 transition-[padding] duration-500 ${dDark ? 'py-3.5' : 'py-6 xl:py-7'}`}>
            <div className="flex items-center justify-between">

              {/* Left — Menu trigger */}
              <div ref={dLeftRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  className={`group flex items-center gap-3 pl-4 pr-5 xl:pl-5 xl:pr-6 h-10.5 xl:h-12.5 rounded-full border uppercase text-[11px] tracking-[0.18em] transition-all duration-300 ${dBorder} ${dText} hover:bg-[#23384A] hover:text-[#E7D8C6] hover:border-[#23384A]`}
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
                  <div className="relative h-14 xl:h-16 w-55 xl:w-72">
                    <Image
                      src="/logos/Amaya_white_Logo.webp"
                      alt="Amaya"
                      fill
                      className={`object-contain object-center transition-opacity duration-500 ${dDark ? 'opacity-0' : 'opacity-100'}`}
                      priority
                    />
                    <Image
                      src="/logos/Amaya_black_Logo.webp"
                      alt=""
                      fill
                      className={`object-contain object-center transition-opacity duration-500 ${dDark ? 'opacity-100' : 'opacity-0'}`}
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Right — Socials + CTA */}
              <div ref={dRightRef} className="flex items-center gap-3">
                <a href="#" aria-label="WhatsApp"
                  className={`w-10 h-10 xl:w-12 xl:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${dBorder} ${dText} hover:bg-[#25D366] hover:border-[#25D366] hover:text-white`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                </a>

                <a href="#" aria-label="Telegram"
                  className={`w-10 h-10 xl:w-12 xl:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${dBorder} ${dText} hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white`}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                </a>

                <button className={`flex items-center px-6 xl:px-8 h-10.5 xl:h-12.5 rounded-full uppercase text-[11px] tracking-[0.18em] transition-all duration-300 ${
                  dDark
                    ? 'bg-[#23384A] text-[#E7D8C6] hover:bg-[#1D2F3F]'
                    : 'bg-white/95 text-[#23384A] hover:bg-white'
                }`}>
                  Book a Visit
                </button>
              </div>
            </div>
          </div>

          {/* Sub-nav dropdown */}
          <div ref={subNavRef} className="overflow-x-hidden overflow-y-hidden" style={{ height: 0 }}>
            <div className={`border-t px-6 md:px-10 xl:px-16 2xl:px-20 py-3.5 ${dDark ? 'border-stone/50' : 'border-white/15'}`}>
              <nav ref={subNavLinksRef} className="max-w-[1700px] mx-auto flex items-center gap-4 md:gap-5 lg:gap-7 xl:gap-10 overflow-x-auto scrollbar-none">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`sub-link text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap relative pb-[3px] ${
                      pathname === link.href
                        ? `font-medium ${dDark ? 'text-navy' : 'text-white'}`
                        : `${dDark ? 'text-navy/45 hover:text-navy' : 'text-white/50 hover:text-white'}`
                    }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className={`absolute bottom-0 left-0 right-0 h-px ${dDark ? 'bg-brass' : 'bg-white'}`} />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MOBILE BOTTOM SHEET ──────────────────────────────── */}
      <div
        ref={mobileOverlayRef}
        className="md:hidden fixed inset-0 z-[997]"
        style={{ display: 'none', pointerEvents: 'none' }}
      >
        <div
          className="absolute inset-0 bg-[#1D2F3F]/60 backdrop-blur-[3px] cursor-pointer"
          onClick={() => setMenuOpen(false)}
        />

        <div
          ref={mobileSheetRef}
          className="absolute bottom-0 left-0 right-0 bg-[#1D2F3F] overflow-hidden"
          style={{ borderRadius: '50% 50% 0 0 / 72px 72px 0 0' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-36 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(231,216,198,0.06) 0%, transparent 70%)' }} />

          <div className="flex justify-center pt-7 pb-1">
            <div className="w-10 h-[3px] rounded-full bg-[#E7D8C6]/20" />
          </div>

          <div className="flex items-center justify-center gap-2.5 pt-4 pb-5">
            <div className="w-6 h-6 rounded-full border border-[#E7D8C6]/25 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E7D8C6" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M12 2.5c-2.5 3-4 5.8-4 9.5s1.5 6.5 4 9.5" />
                <path d="M12 2.5c2.5 3 4 5.8 4 9.5s-1.5 6.5-4 9.5" />
                <line x1="2.5" y1="12" x2="21.5" y2="12" />
              </svg>
            </div>
            <span className="text-[#E7D8C6]/45 uppercase tracking-[0.3em] text-[10px] font-light">Amaya</span>
          </div>

          <nav ref={mobileLinksRef} className="px-7">
            {NAV_LINKS.map((link, i) => (
              <div key={link.href} className="mob-link border-b border-[#E7D8C6]/[0.08] last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-[13px] group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#E7D8C6]/20 text-[10px] tracking-[0.2em] tabular-nums w-5 shrink-0">0{i + 1}</span>
                    <span className={`text-[1.55rem] font-light uppercase tracking-wider transition-colors duration-300 ${
                      pathname === link.href ? 'text-[#E7D8C6]' : 'text-[#E7D8C6]/55 group-hover:text-[#E7D8C6]'
                    }`}>{link.name}</span>
                  </div>
                  <span className="text-[#E7D8C6]/20 group-hover:text-[#A9825A]/60 transition-colors duration-300">↗</span>
                </Link>
              </div>
            ))}
          </nav>

          <div className="mx-7 mt-4 pt-4 border-t border-[#E7D8C6]/[0.08] pb-10">
            <div className="flex gap-8 mb-5">
              <div>
                <div className="text-[#E7D8C6]/25 text-[9px] uppercase tracking-[0.2em] mb-1">Phone</div>
                <a href="tel:+919800098000" className="text-[#E7D8C6]/55 text-xs hover:text-[#E7D8C6] transition-colors">+91 98000 98000</a>
              </div>
              <div>
                <div className="text-[#E7D8C6]/25 text-[9px] uppercase tracking-[0.2em] mb-1">Email</div>
                <a href="mailto:hello@amaya.veravita.com" className="text-[#E7D8C6]/55 text-xs hover:text-[#E7D8C6] transition-colors">hello@amaya.veravita.com</a>
              </div>
            </div>
            <button className="w-full h-11 rounded-full bg-[#23384A] text-[#E7D8C6] uppercase text-[11px] tracking-[0.2em] hover:bg-[#1D2F3F] active:bg-[#1D2F3F] transition-colors duration-300">
              Book a Visit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
