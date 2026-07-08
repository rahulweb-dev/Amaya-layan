'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const SLIDES = [
  { src: '/images/social-lounge.jpg',      alt: 'Amaya social lounge' },
  { src: '/images/courtyard-pool.jpg',     alt: 'Amaya courtyard and pool' },
  { src: '/images/garden-walk.jpg',        alt: 'Amaya gardens' },
  { src: '/images/nature-walk.png',        alt: 'Amaya reserve forest' },
  { src: '/images/towers-exterior.png',    alt: 'Amaya residences' },
  { src: '/images/gym.jpg',               alt: 'Amaya fitness centre' },
];

export default function HeroSlider() {
  const swiperRef       = useRef<SwiperType | null>(null);
  const containerRef    = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number; side: 'left' | 'right' } | null>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursor({ x, y, side: x < rect.width / 2 ? 'left' : 'right' });
  }, []);

  const onMouseLeave = useCallback(() => setCursor(null), []);

  const onClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !swiperRef.current) return;
    if (e.clientX - rect.left < rect.width / 2) {
      swiperRef.current.slidePrev();
    } else {
      swiperRef.current.slideNext();
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ cursor: 'none', height: 'clamp(420px, 72vh, 860px)' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        speed={900}
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: false, el: '.hs-pagination' }}
        onSwiper={(s) => { swiperRef.current = s; }}
        className="w-full h-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.src} className="w-full h-full">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.src})` }}
              aria-label={slide.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination dots */}
      <div className="hs-pagination absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 pointer-events-none" />

      {/* Custom cursor */}
      {cursor && (
        <div
          className="pointer-events-none absolute z-30 flex items-center justify-center"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-12 h-12 rounded-full bg-black backdrop-blur-sm border border-white/30 flex items-center justify-center">
            {cursor.side === 'left' ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4L6 9L11 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4L12 9L7 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
      )}

      <style>{`
        .hs-pagination .swiper-pagination-bullet {
          width: 28px;
          height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,0.35);
          opacity: 1;
          transition: background 0.3s, width 0.3s;
          pointer-events: auto;
        }
        .hs-pagination .swiper-pagination-bullet-active {
          background: rgba(255,255,255,0.9);
          width: 44px;
        }
      `}</style>
    </section>
  );
}
