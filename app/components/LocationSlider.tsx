'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { num: '10', label: 'LAGUNA PHUKET',  img: '/i/location/location-gallery/1.jpg' },
  { num: '20', label: 'PHUKET AIRPORT', img: '/i/location/location-gallery/2.jpg' },
  { num: '2',  label: 'LAYAN BEACH',    img: '/i/location/location-gallery/3.jpg' },
  { num: '5',  label: 'BOAT AVENUE',    img: '/i/location/location-gallery/4.jpg' },
  { num: '15', label: 'BLUE TREE',      img: '/i/location/location-gallery/5.jpg' },
  { num: '8',  label: 'BANG TAO BEACH', img: '/i/location/location-gallery/6.jpg' },
];

export default function LocationSlider() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const swiperRef   = useRef<SwiperType | null>(null);
  const arrowRef    = useRef<HTMLButtonElement>(null);
  const arrowIconRef = useRef<HTMLSpanElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  // ── Entrance + arrow animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards fade up on scroll
      gsap.from(cardsRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Arrow button entrance — scale in from 0 with bounce
      gsap.from(arrowRef.current, {
        scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        delay: 0.3,
      });

      // Continuous idle pulse on arrow icon
      gsap.to(arrowIconRef.current, {
        x: 5,
        repeat: -1,
        yoyo: true,
        duration: 0.75,
        ease: 'power1.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Arrow hover effects
  const onArrowEnter = useCallback(() => {
    gsap.killTweensOf(arrowIconRef.current);          // stop idle
    gsap.to(arrowRef.current,    { scale: 1.08, duration: 0.3, ease: 'power2.out' });
    gsap.to(arrowIconRef.current, { x: 8, duration: 0.3, ease: 'power2.out' });
  }, []);

  const onArrowLeave = useCallback(() => {
    gsap.to(arrowRef.current,    { scale: 1, duration: 0.4, ease: 'power2.out' });
    // Restart idle pulse
    gsap.to(arrowIconRef.current, {
      x: 5, repeat: -1, yoyo: true, duration: 0.75, ease: 'power1.inOut',
    });
  }, []);

  const onArrowClick = useCallback(() => {
    // Quick squish feedback
    gsap.timeline()
      .to(arrowRef.current,    { scale: 0.92, duration: 0.1, ease: 'power2.in' })
      .to(arrowRef.current,    { scale: 1.05, duration: 0.2, ease: 'power2.out' })
      .to(arrowRef.current,    { scale: 1,    duration: 0.15, ease: 'power2.inOut' });

    swiperRef.current?.slideNext();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#021A13] py-16 md:py-20 overflow-hidden">
      <div className="relative max-w-[1700px] mx-auto px-6 md:px-10">

        <div ref={cardsRef}>
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              640:  { slidesPerView: 1.6, spaceBetween: 20 },
              900:  { slidesPerView: 2.4, spaceBetween: 22 },
              1200: { slidesPerView: 3.2, spaceBetween: 24 },
              1500: { slidesPerView: 3.6, spaceBetween: 24 },
            }}
            grabCursor
            loop
          >
            {SLIDES.map((slide) => (
              <SwiperSlide key={slide.label}>
                <div className="relative overflow-hidden rounded-[4px] group"
                  style={{ height: 'clamp(380px, 50vw, 520px)' }}
                >
                  {/* Background image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.img}
                    alt={slide.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    draggable={false}
                  />

                  {/* Overlay gradients */}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Center content — number + mins */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <span
                      className="text-white font-light leading-none select-none"
                      style={{ fontSize: 'clamp(90px, 12vw, 148px)' }}
                    >
                      {slide.num}
                    </span>
                    <div className="flex flex-col items-center -mt-2">
                      <span className="text-white/80 text-[13px] font-light tracking-widest uppercase">mins</span>
                      <span className="text-white/80 text-[13px] font-light tracking-widest uppercase">by car</span>
                    </div>
                  </div>

                  {/* Place name bottom */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-7">
                    <span className="text-white text-[12px] uppercase tracking-[0.28em] font-light">
                      {slide.label}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── Mint arrow navigation button ── */}
        <button
          ref={arrowRef}
          onClick={onArrowClick}
          onMouseEnter={onArrowEnter}
          onMouseLeave={onArrowLeave}
          aria-label="Next slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full bg-[#a8d4c2] shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
          style={{ width: 72, height: 72 }}
        >
          <span
            ref={arrowIconRef}
            className="text-[#021A13] text-xl font-light"
            style={{ display: 'inline-block' }}
          >
            →
          </span>
        </button>
      </div>
    </section>
  );
}
