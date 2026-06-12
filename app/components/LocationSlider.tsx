'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { num: '15', label: 'OUTER RING ROAD',   img: '/i/location/location-gallery/1.jpg' },
  { num: '20', label: 'RAJIV GANDHI INTL', img: '/i/location/location-gallery/2.jpg' },
  { num: '5',  label: 'MEDCHAL',           img: '/i/location/location-gallery/3.jpg' },
  { num: '10', label: 'HITECH CITY',       img: '/i/location/location-gallery/4.jpg' },
  { num: '25', label: 'HUSSAIN SAGAR',     img: '/i/location/location-gallery/5.jpg' },
  { num: '30', label: 'SECUNDERABAD',      img: '/i/location/location-gallery/6.jpg' },
];

export default function LocationSlider() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const swiperRef    = useRef<SwiperType | null>(null);
  const arrowRef     = useRef<HTMLButtonElement>(null);
  const arrowIconRef = useRef<HTMLSpanElement>(null);
  const cardsRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(arrowRef.current, {
        scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        delay: 0.3,
      });
      gsap.to(arrowIconRef.current, { x: 5, repeat: -1, yoyo: true, duration: 0.75, ease: 'power1.inOut' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onArrowEnter = useCallback(() => {
    gsap.killTweensOf(arrowIconRef.current);
    gsap.to(arrowRef.current,     { scale: 1.08, duration: 0.3, ease: 'power2.out' });
    gsap.to(arrowIconRef.current, { x: 8, duration: 0.3, ease: 'power2.out' });
  }, []);

  const onArrowLeave = useCallback(() => {
    gsap.to(arrowRef.current,     { scale: 1, duration: 0.4, ease: 'power2.out' });
    gsap.to(arrowIconRef.current, { x: 5, repeat: -1, yoyo: true, duration: 0.75, ease: 'power1.inOut' });
  }, []);

  const onArrowClick = useCallback(() => {
    gsap.timeline()
      .to(arrowRef.current, { scale: 0.92, duration: 0.1, ease: 'power2.in' })
      .to(arrowRef.current, { scale: 1.05, duration: 0.2, ease: 'power2.out' })
      .to(arrowRef.current, { scale: 1,    duration: 0.15, ease: 'power2.inOut' });
    swiperRef.current?.slideNext();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#E7D8C6] py-16 md:py-20 xl:py-28 overflow-hidden">
      <div className="relative max-w-425 mx-auto px-6 md:px-10 xl:px-16 2xl:px-20">

        <div ref={cardsRef}>
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              640:  { slidesPerView: 1.6,  spaceBetween: 20 },
              900:  { slidesPerView: 2.4,  spaceBetween: 22 },
              1200: { slidesPerView: 3.2,  spaceBetween: 24 },
              1500: { slidesPerView: 3.6,  spaceBetween: 24 },
            }}
            grabCursor
            loop
          >
            {SLIDES.map((slide) => (
              <SwiperSlide key={slide.label}>
                <div
                  className="relative overflow-hidden rounded-sm group"
                  style={{ height: 'clamp(380px, 50vw, 520px)' }}
                >
                  <Image
                    src={slide.img}
                    alt={slide.label}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 90vw, (max-width: 900px) 65vw, (max-width: 1200px) 42vw, 30vw"
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-navy/25" />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-deep/70 via-transparent to-transparent" />

                  {/* Number + mins */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                    <span
                      className="text-limestone font-light leading-none select-none"
                      style={{ fontSize: 'clamp(90px, 12vw, 148px)' }}
                    >
                      {slide.num}
                    </span>
                    <div className="flex flex-col items-center -mt-2">
                      <span className="text-limestone/80 text-[13px] font-light tracking-widest uppercase">mins</span>
                      <span className="text-limestone/80 text-[13px] font-light tracking-widest uppercase">by car</span>
                    </div>
                  </div>

                  {/* Place name */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-7">
                    <span className="text-limestone text-[12px] uppercase tracking-[0.28em] font-light">
                      {slide.label}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Arrow button */}
        <button
          ref={arrowRef}
          onClick={onArrowClick}
          onMouseEnter={onArrowEnter}
          onMouseLeave={onArrowLeave}
          aria-label="Next slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full bg-limestone shadow-[0_4px_24px_rgba(35,56,74,0.25)]"
          style={{ width: 72, height: 72 }}
        >
          <span
            ref={arrowIconRef}
            className="text-navy text-xl font-light"
            style={{ display: 'inline-block' }}
          >
            →
          </span>
        </button>
      </div>
    </section>
  );
}
