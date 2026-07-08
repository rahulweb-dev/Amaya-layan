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
  overlay = 'bg-navy-deep/60',
  height = 'h-[88vh] min-h-[600px]',
  align = 'center',
}: PageHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    const els = container ? Array.from(container.children) : [];
    if (!els.length) return;
    gsap.set(container, { opacity: 1 });
    gsap.set(els, { y: 40, opacity: 0 });
    const tween = gsap.to(els, {
      y: 0,
      opacity: 1,
      duration: 1.15,
      stagger: 0.14,
      ease: 'power3.out',
      delay: 0.2,
    });
    return () => {
      tween.kill();
      gsap.set(els, { clearProps: 'all' });
      gsap.set(container, { clearProps: 'opacity' });
    };
  }, []);

  const alignClass = align === 'left'
    ? 'items-start text-left px-8 md:px-16 xl:px-24'
    : 'items-center text-center px-6';

  return (
    <section className={`relative overflow-hidden ${height}`}>
      <Image src={imgSrc} alt={imgAlt} fill className="object-cover" priority sizes="100vw" />
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="absolute inset-0 bg-linear-to-t from-navy-deep/75 via-transparent to-transparent" />

      <div
        ref={contentRef}
        className={`absolute inset-0 flex flex-col justify-center gap-5 ${alignClass} max-w-425 mx-auto`}
        style={{ opacity: 0 }}
      >
        {label && (
          <p className="text-limestone/50 text-[16px] md:text-[21px] uppercase tracking-[0.45em]">{label}</p>
        )}
        <h1
          className="text-limestone font-light leading-[1.03] tracking-wide max-w-4xl text-[64px]"
          // style={{ fontSize: 'clamp(2.2rem, 5.5vw, 6.5rem)' }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-limestone/60 font-light text-[16px] md:text-[21px] leading-[1.85] max-w-125">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
