'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Architecture() {
  const sec1Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const smallImgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bigImgRef = useRef<HTMLDivElement>(null);

  const sec2Ref = useRef<HTMLDivElement>(null);
  const poolImgRef = useRef<HTMLDivElement>(null);
  const ecoTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx1 = gsap.context(() => {
      const st1 = { trigger: sec1Ref.current, start: 'top 72%' };
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: st1,
      });
      gsap.from(smallImgRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { ...st1, start: 'top 68%' },
      });
      gsap.from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.15,
        scrollTrigger: { ...st1, start: 'top 65%' },
      });
      gsap.from(bigImgRef.current, {
        x: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { ...st1, start: 'top 68%' },
      });
    }, sec1Ref);

    const ctx2 = gsap.context(() => {
      const st2 = { trigger: sec2Ref.current, start: 'top 72%' };
      gsap.from(poolImgRef.current, {
        x: -70,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: st2,
      });
      gsap.from(ecoTextRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: st2,
      });
    }, sec2Ref);

    return () => {
      ctx1.revert();
      ctx2.revert();
    };
  }, []);

  return (
    <>
      {/* ── SECTION 1: Homes ── */}
      <section
        ref={sec1Ref}
        className='bg-surface-alt pt-10 md:pt-28 xl:pt-36 overflow-hidden'
      >
        <div className='max-w-425 mx-auto px-5 sm:px-8 md:px-16 xl:px-24 mb-12 md:mb-16 xl:mb-20'>
          <h2
            ref={headingRef}
            className='text-navy font-light leading-[0.95] tracking-[0.03em] text-center  text-[95px] sm:block hidden'
            // style={{ fontSize: 'clamp(2.2rem, 8vw, 8.5rem)' }}
          >
            Homes That Feel
            <br />
            Exactly Like Home
          </h2>
        </div>

        <div className='flex flex-col md:flex-row items-stretch md:ml-34'>
          {/* LEFT: small image + text */}
            <div className='w-full md:w-[42%] shrink-0 px-8 md:px-16 xl:px-24'>
              <div
                ref={smallImgRef}
                className='relative overflow-hidden rounded-sm -mx-8 md:mx-0'
                style={{ aspectRatio: '4/3' }}
              >
                <Image
                  src='/images/courtyard-pool.jpg'
                  alt='Amaya courtyard and pool terrace'
                  fill
                  className='object-cover'
                />
              </div>
       

            <div ref={textRef} className='flex flex-col gap-4 pb-16 md:pb-20'>
              <h3 className='text-navy font-light uppercase tracking-[0.08em] text-[28px] md:text-[48px]'>
                Our Residences
              </h3>
              <p className='text-charcoal/60 font-light text-[16px] md:text-[21px] leading-[1.85] max-w-105'>
                Five configurations, every one designed for ease, light, and
                quiet comfort. Each planned with unusually generous balconies
                and open ventilation — from the well-proportioned 1 BHK to the
                spacious 3.5 BHK with three balconies and a dedicated study.
              </p>
              <div className='flex flex-col gap-2 mt-3'>
                {[
                  { type: '1 BHK', size: 'Approx. 680 sq ft' },
                  { type: '2.5 BHK', size: 'Approx. 1,150 sq ft' },
                  { type: '3.5 BHK', size: 'Approx. 1,700 sq ft' },
                ].map(({ type, size }) => (
                  <div
                    key={type}
                    className='flex items-center gap-3 text-charcoal/50 text-[16px] md:text-[21px] font-light'
                  >
                    <span className='w-2 h-2 rounded-full bg-brass/40 shrink-0' />
                    <span className='text-navy/80'>{type}</span>
                    <span className='text-charcoal/30'>—</span>
                    <span>{size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: large image — full bleed */}
          <div
            ref={bigImgRef}
            className='relative w-full md:flex-1 overflow-hidden hidden sm:block'
            style={{ minHeight: 'clamp(300px, 55vw, 680px)' }}
          >
            <Image
              src='/images/towers-exterior.png'
              alt='Amaya towers exterior'
              fill
              className='object-cover object-center'
              sizes='(max-width: 768px) 100vw, 58vw'
              draggable={false}
            />
            <div className='absolute inset-y-0 left-0 w-20 bg-linear-to-r from-surface-alt to-transparent' />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Club Amaya ── */}
      <section ref={sec2Ref} className='bg-surface overflow-hidden'>
        <div className='flex flex-col md:flex-row items-center'>
          {/* LEFT: clubhouse image — full bleed */}
          <div
            ref={poolImgRef}
            className='relative w-full md:w-[55%] shrink-0 overflow-hidden'
            style={{ height: 'clamp(320px, 45vw, 580px)' }}
          >
            <Image
              src='/images/social-lounge.jpg'
              alt='Club Amaya — social lounge'
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 55vw'
              draggable={false}
            />
            <div className='absolute inset-y-0 right-0 w-28 bg-linear-to-l from-surface to-transparent' />
          </div>

          {/* RIGHT: text content */}
          <div
            ref={ecoTextRef}
            className='w-full md:flex-1 flex flex-col gap-6 px-8 md:px-16 lg:px-20 xl:px-28 py-16 md:py-0'
          >
            {/* <p className="text-brass text-[11px] uppercase tracking-[0.32em]">Club Amaya</p> */}
            <h2
              className='text-navy font-light uppercase tracking-wider leading-tight text-[28px] md:text-[48px]'
              // style={{ fontSize: 'clamp(1.8rem,3.5vw,3.6rem)' }}
            >
              A Clubhouse That
              <br />
              Earns Its Name.
            </h2>
            <p className='text-charcoal/60 font-light text-[16px] md:text-[21px] leading-[1.85] max-w-110'>
              34,000 square feet of thoughtfully designed spaces for dining,
              wellness, creativity, fitness, and community — all under one
              beautifully crafted roof.
            </p>
            <ul className='flex flex-col gap-2 mt-1'>
              {[
                'Dining and social spaces',
                'Library and reading rooms',
                'Wellness and therapy rooms',
                'Fitness and movement spaces',
                'Arts and activity studios',
                'Performance and events hall',
              ].map((item) => (
                <li
                  key={item}
                  className='flex items-start gap-3 text-charcoal/55 text-[16px] md:text-[21px] font-light'
                >
                  <span className='mt-2.75 w-2 h-2 rounded-full bg-brass/40 shrink-0' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
