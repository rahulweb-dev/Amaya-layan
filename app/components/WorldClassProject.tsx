'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { label: 'Nature',         src: '/i/homepage/piece-heaven-left.jpg' },
  { label: 'Architecture',   src: '/i/homepage/architecture-right.jpg' },
  { label: 'People',         src: '/i/homepage/amenities-1.jpg' },
  { label: 'Infrastructure', src: '/i/invest/favorable-conditions-bg-1.jpg' },
];

const BULLETS = [
  '200,000 m² of bionic architecture by Dewan',
  '16,500+ m² of landscape design by SHMA',
  '65+ world-class infrastructure amenities',
  'Panoramic sea-view apartments',
  'Up to 35% proven energy efficiency & sustainability with EDGE certification',
  'Hotel management by the renowned Dusit brand',
  '400+ industry professionals behind the project',
];

export default function WorldClassProject() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLParagraphElement>(null);
  const headlineRef   = useRef<HTMLHeadingElement>(null);
  const leftColRef    = useRef<HTMLDivElement>(null);
  const rightColRef   = useRef<HTMLDivElement>(null);
  const slideNameRef  = useRef<HTMLSpanElement>(null);

  const slideRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const currentIdx    = useRef(0);
  const isAnimating   = useRef(false);
  const [activeLabel, setActiveLabel] = useState(SLIDES[0].label);

  // ── ScrollTrigger entrance animations
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

  // ── Autoplay slideshow — no stale closure, uses ref for current index
  useEffect(() => {
    // Set initial state
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

  // ── Animate label text on slide change
  useEffect(() => {
    if (!slideNameRef.current) return;
    gsap.fromTo(
      slideNameRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }
    );
  }, [activeLabel]);

  return (
    <section ref={sectionRef} className="bg-[#021A13] py-20 md:py-28 xl:py-36 overflow-hidden">
      <div className="max-w-425 mx-auto px-5 sm:px-8 md:px-16 xl:px-24">

        {/* ── Section label */}
        <p
          ref={labelRef}
          className="text-center text-white/45 text-[11px] uppercase tracking-[0.35em] mb-10 md:mb-14"
        >
          A World-Class Project
        </p>

        {/* ── Big headline */}
        <h2
          ref={headlineRef}
          className="text-center text-white uppercase font-light tracking-[0.1em] leading-[1.25] text-[clamp(1.2rem,2.4vw,3.8rem)] max-w-275 mx-auto mb-20 md:mb-28 xl:mb-36"
        >
          Layan Verde is a global masterpiece of bionic
          architecture, set within an 8-hectare landscaped
          park. Designed for both living and investment, it is
          located in Bang&nbsp;Tao, Phuket&apos;s most sought-after
          and rapidly developing district
        </h2>

        {/* ── Two-column body */}
        <div className="grid grid-cols-1 md:grid-cols-[5fr_6fr] gap-14 md:gap-20 xl:gap-28 items-center">

          {/* LEFT — circular image autoplay */}
          <div ref={leftColRef} className="flex justify-center md:justify-start">
            <div
              className="relative rounded-full overflow-hidden"
              style={{ width: 'clamp(320px, 32vw, 620px)', height: 'clamp(320px, 32vw, 620px)' }}
            >
              {/* Slide frames */}
              {SLIDES.map((slide, i) => (
                <div
                  key={slide.label}
                  ref={(el) => { slideRefs.current[i] = el; }}
                  className="absolute inset-0"
                  style={{ opacity: 0, zIndex: 0 }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.label}
                    fill
                    className="object-cover"
                    sizes="460px"
                    priority={i === 0}
                  />
                </div>
              ))}

              {/* Bottom vignette so label is legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent z-10 pointer-events-none" />

              {/* Category label */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-10 z-20">
                <span
                  ref={slideNameRef}
                  className="text-white uppercase tracking-[0.35em] text-sm md:text-base font-light"
                >
                  {activeLabel}
                </span>
              </div>

              {/* Progress dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-[6px] z-20">
                {SLIDES.map((s) => (
                  <span
                    key={s.label}
                    className={`block rounded-full transition-all duration-500 ${
                      s.label === activeLabel
                        ? 'w-5 h-[3px] bg-white'
                        : 'w-[3px] h-[3px] bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — description */}
          <div ref={rightColRef} className="flex flex-col gap-8">
            <p className="text-white/65 font-light leading-[1.85] text-[14.5px] md:text-[15px]">
              Layan Verde is set to become a new centerpiece of Phuket, joining
              the island&apos;s most iconic developments. With its bionic
              architecture, carefully designed green spaces, and uniquely crafted
              apartments, it offers a perfect blend of elegance, comfort, and
              sustainability. Certified by Advanced EDGE for energy efficiency,
              Layan Verde is designed for those who seek a refined lifestyle in
              harmony with nature and cutting-edge technology.
            </p>

            <div>
              <p className="text-white font-light text-[14.5px] md:text-[15px] leading-[1.7] mb-5">
                Layan Verde: a visionary concept
                <br />
                unlike anything else in Phuket:
              </p>

              <ul className="flex flex-col gap-[10px]">
                {BULLETS.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-white/60 text-[13.5px] md:text-[14px] font-light leading-[1.65]"
                  >
                    <span className="mt-[8px] w-[5px] h-[5px] rounded-full bg-white/35 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
