'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface PageHeroProps {
  label?: string;
  title: string;
  titleBreak?: boolean;
  description?: string;
  imgSrc: string;
  imgAlt?: string;
  overlay?: string;
  height?: string;
  align?: 'center' | 'left';
}

export default function PageHero({
  label,
  title,
  description,
  imgSrc,
  imgAlt = '',
  overlay = 'bg-black/55',
  height = 'h-[88vh] min-h-[600px]',
  align = 'center',
}: PageHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = contentRef.current ? Array.from(contentRef.current.children) : [];
    if (!els.length) return;
    gsap.from(els, {
      y: 40, opacity: 0, duration: 1.15, stagger: 0.14,
      ease: 'power3.out', delay: 0.25,
    });
  }, []);

  const alignClass = align === 'left'
    ? 'items-start text-left px-8 md:px-16 xl:px-24'
    : 'items-center text-center px-6';

  return (
    <section className={`relative overflow-hidden ${height}`}>
      <Image src={imgSrc} alt={imgAlt} fill className="object-cover" priority sizes="100vw" />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#021A13]/70 via-transparent to-transparent" />

      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col justify-center gap-5 ${alignClass} max-w-[1700px] mx-auto`}
      >
        {label && (
          <p className="text-white/45 text-[11px] uppercase tracking-[0.45em]">{label}</p>
        )}
        <h1
          className="text-white font-light leading-[1.03] tracking-[0.025em] max-w-4xl"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 6.5rem)' }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-white/55 font-light text-[14px] md:text-[16px] leading-[1.85] max-w-[500px]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
