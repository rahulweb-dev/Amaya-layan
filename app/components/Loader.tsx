'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useLoading } from '@/hooks/useLoading';

export default function Loader() {
  const { progress, done } = useLoading(2800);

  const overlayRef   = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const barFillRef   = useRef<HTMLDivElement>(null);
  const counterRef   = useRef<HTMLSpanElement>(null);
  const lineLeftRef  = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const taglineRef   = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      gsap.set(logoRef.current, { scale: 0.78, opacity: 0, y: 16 });
      gsap.set([lineLeftRef.current, lineRightRef.current], { scaleX: 0, opacity: 0 });
      gsap.set(taglineRef.current, { opacity: 0, y: 10 });
      tl.to(logoRef.current, { scale: 1, opacity: 1, y: 0, duration: 1.2 }, 0.3)
        .to([lineLeftRef.current, lineRightRef.current], { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.9)
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.1);
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!barFillRef.current) return;
    gsap.to(barFillRef.current, { width: `${progress}%`, duration: 0.4, ease: 'power1.out' });
    if (counterRef.current) counterRef.current.textContent = String(progress);
  }, [progress]);

  useEffect(() => {
    if (!done) return;
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 0, y: -24, duration: 0.9, ease: 'power3.inOut',
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
          document.body.style.overflow = '';
        },
      });
    });
    return () => ctx.revert();
  }, [done]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-99999 flex flex-col items-center justify-center bg-navy-deep select-none"
      aria-hidden="true"
    >
      {/* Subtle warm radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(231,216,198,0.04) 0%, transparent 70%)' }}
      />

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-8 px-8">
        <div ref={logoRef} className="relative w-45 sm:w-55 md:w-65 h-15 sm:h-18 md:h-21">
          <Image src="/logos/Amaya_white_Logo.webp" alt="Amaya" fill className="object-contain object-center" priority />
        </div>

        <div className="flex items-center gap-4 w-full max-w-85">
          <div ref={lineLeftRef} className="flex-1 h-px bg-limestone/20 origin-right" />
          <p ref={taglineRef} className="text-limestone/40 text-[9px] uppercase tracking-[0.35em] whitespace-nowrap font-light">
            Senior Living
          </p>
          <div ref={lineRightRef} className="flex-1 h-px bg-limestone/20 origin-left" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-10 sm:bottom-14 left-0 right-0 px-8 sm:px-14 md:px-20 flex flex-col gap-3">
        <div className="relative w-full h-px bg-limestone/10 overflow-hidden rounded-full">
          <div
            ref={barFillRef}
            className="absolute left-0 top-0 h-full bg-brass/60 rounded-full"
            style={{ width: '0%' }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-limestone/25 text-[10px] uppercase tracking-[0.25em] font-light">Loading</span>
          <span className="text-limestone/40 text-[11px] tabular-nums font-light">
            <span ref={counterRef}>0</span>
            <span className="text-limestone/20">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
