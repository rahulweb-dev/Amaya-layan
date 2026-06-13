'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { label: 'Community', src: '/i/homepage/piece-heaven-left.jpg' },
  { label: 'Wellness',  src: '/i/homepage/architecture-right.jpg' },
  { label: 'Nature',    src: '/i/homepage/amenities-1.jpg' },
  { label: 'Spaces',    src: '/i/invest/favorable-conditions-bg-1.jpg' },
];

const BULLETS = [
  'Community by choice — neighbours who share your values, spaces that make connection natural',
  'Care when needed, freedom always — support close, discreet, and designed around your life',
  'Support close at hand — trained staff and everyday assistance are part of the community fabric',
  'Reassurance built into everyday living — ease and dignity in every design decision',
];

export default function WorldClassProject() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLParagraphElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const leftColRef   = useRef<HTMLDivElement>(null);
  const rightColRef  = useRef<HTMLDivElement>(null);
  const slideNameRef = useRef<HTMLSpanElement>(null);

  const slideRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const currentIdx  = useRef(0);
  const isAnimating = useRef(false);
  const [activeLabel, setActiveLabel] = useState(SLIDES[0].label);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ease = 'power3.out';
      gsap.from(labelRef.current, {
        y: 18, opacity: 0, duration: 0.9, ease,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
      gsap.from(headlineRef.current, {
        y: 40, opacity: 0, duration: 1.2, ease,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
      gsap.from(leftColRef.current, {
        x: -55, opacity: 0, duration: 1.1, ease,
        scrollTrigger: { trigger: leftColRef.current, start: 'top 80%' },
      });
      gsap.from(rightColRef.current, {
        x: 55, opacity: 0, duration: 1.1, ease, delay: 0.1,
        scrollTrigger: { trigger: rightColRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 });
    });
    const id = setInterval(() => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      const curr = currentIdx.current;
      const next = (curr + 1) % SLIDES.length;
      const currEl = slideRefs.current[curr];
      const nextEl = slideRefs.current[next];
      if (!currEl || !nextEl) { isAnimating.current = false; return; }
      gsap.set(nextEl, { opacity: 0, zIndex: 2 });
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currEl, { opacity: 0, zIndex: 0 });
          gsap.set(nextEl, { zIndex: 1 });
          currentIdx.current = next;
          setActiveLabel(SLIDES[next].label);
          isAnimating.current = false;
        },
      });
      tl.to(nextEl, { opacity: 1, duration: 1.4, ease: 'power2.inOut' });
    }, 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!slideNameRef.current) return;
    gsap.fromTo(slideNameRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }
    );
  }, [activeLabel]);

  return (
    <section ref={sectionRef} className="bg-[#23384A] py-20 md:py-28 xl:py-36 overflow-hidden">
      <div className="max-w-425 mx-auto px-5 sm:px-8 md:px-16 xl:px-24">

        <p ref={labelRef} className="text-center text-white text-[11px] uppercase tracking-[0.35em] mb-10 md:mb-14">
          Why Amaya
        </p>

        <h2
          ref={headlineRef}
          className="text-center text-white font-light tracking-[0.03em] leading-[1.2] text-[clamp(1.4rem,3.2vw,4.2rem)] max-w-275 mx-auto mb-20 md:mb-28 xl:mb-36"
        >
          Designed around a different idea of home.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-14 md:gap-20 xl:gap-28 items-center">

          {/* LEFT — circular image autoplay */}
          <div ref={leftColRef} className="flex justify-center md:justify-start">
            <div
              className="relative rounded-full overflow-hidden shadow-[0_20px_60px_rgba(35,56,74,0.12)]"
              style={{ width: 'clamp(320px, 32vw, 620px)', height: 'clamp(320px, 32vw, 620px)' }}
            >
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.label}
                  ref={(el) => { slideRefs.current[i] = el; }}
                  className="absolute inset-0"
                  style={{ opacity: 0, zIndex: 0 }}
                >
                  <Image src={slide.src} alt={slide.label} fill className="object-cover" sizes="460px" priority={i === 0} />
                </div>
              ))}

              <div className="absolute inset-0 bg-linear-to-t from-navy-deep/60 via-transparent to-transparent z-10 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-10 z-20">
                <span ref={slideNameRef} className="text-white uppercase tracking-[0.35em] text-sm md:text-base font-light">
                  {activeLabel}
                </span>
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
                {SLIDES.map((s) => (
                  <span
                    key={s.label}
                    className={`block rounded-full transition-all duration-500 ${
                      s.label === activeLabel ? 'w-5 h-0.75 bg-limestone' : 'w-0.75 h-0.75 bg-limestone/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — description */}
          <div ref={rightColRef} className="flex flex-col gap-8">
            <p className="text-limestone/70 font-light leading-[1.85] text-[14.5px] md:text-[15px]">
              Thoughtful homes for easier everyday living. A place where the
              rhythm of each day is yours to set, and where community, care,
              and nature are simply close at hand.
            </p>

            <div>
              <p className="text-limestone/85 font-light text-[14.5px] md:text-[15px] leading-[1.7] mb-5">
                Not a facility. Not a resort. A residential community
                <br />built for independence, with everything that makes
                <br />independence feel effortless:
              </p>

              <ul className="flex flex-col gap-2.5">
                {BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 text-limestone/60 text-[13.5px] md:text-[14px] font-light leading-[1.65]">
                    <span className="mt-2 w-1.25 h-1.25 rounded-full bg-brass/60 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-limestone/40 font-light text-[13px] md:text-[14px] italic leading-[1.7] border-l-2 border-brass/35 pl-5 mt-2">
              &ldquo;A life that is social when you want it, and quiet when you need it.&rdquo;
            </p>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-28 pt-14 md:pt-16 border-t border-limestone/15">
          {[
            { num: '256',    label: 'Residences' },
            { num: '34,000', label: 'sq ft Clubhouse (planned)' },
            { num: '700',    label: 'Acre Reserve Forest' },
            { num: '100+',   label: 'Curated Amenities (planned)' },
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col gap-2">
              <div className="text-limestone font-light leading-none" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)' }}>
                {num}
              </div>
              <div className="text-limestone/45 text-[10px] md:text-[11px] uppercase tracking-[0.18em] leading-[1.6]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
