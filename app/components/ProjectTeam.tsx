'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAMS = [
  {
    id: 'veravita',
    name: 'VERA VITA DEVELOPMENTS',
    company: 'Vera Vita Developments Pvt. Ltd.',
    role: 'Developer of Amaya',
    stats: [
      'Senior living specialists, Hyderabad',
      'Purpose-built community for independent adults 55+',
      'RERA registration in progress',
      'Designed around community, care, and wellbeing',
      'Located in Medchal, Nehru Outer Ring Road',
    ],
    projects: {
      label: 'Key Highlights',
      items: ['256 Residences planned', '34,000 sq ft Club Amaya', '600-Acre Reserve Forest adjoining', '100+ Curated Amenities (planned)'],
    },
    image: '/i/investment/management.jpg',
  },
  {
    id: 'clubamaya',
    name: 'CLUB AMAYA',
    company: 'Club Amaya',
    role: 'The community and wellness hub',
    stats: [
      '34,000 sq ft of planned community space',
      'Dining, wellness, creativity, and fitness',
      'Library and reading rooms',
      'Arts and activity studios',
      'Performance and events hall',
    ],
    projects: {
      label: 'Clubhouse Spaces',
      items: ['Dining and social spaces', 'Library and reading rooms', 'Wellness and therapy rooms', 'Fitness and movement spaces', 'Arts and activity studios'],
    },
    image: '/i/investment/la-green.jpg',
  },
];

export default function ProjectTeam() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  /* ── Intro refs ── */
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const paraRef     = useRef<HTMLDivElement>(null);
  const statNumRef  = useRef<HTMLDivElement>(null);
  const statLblRef  = useRef<HTMLParagraphElement>(null);

  /* ── Accordion content refs ── */
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Scroll-triggered intro animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const base = { trigger: sectionRef.current, start: 'top 72%' };

      gsap.from(headingRef.current, {
        y: 55, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: base,
      });
      gsap.from(paraRef.current, {
        y: 30, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.2,
        scrollTrigger: base,
      });
      gsap.from([statNumRef.current, statLblRef.current], {
        y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: statNumRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Set initial accordion heights ── */
  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { height: i === 0 ? 'auto' : 0 });
    });
  }, []);

  /* ── Accordion toggle ── */
  const toggle = useCallback((index: number) => {
    setOpenIndex(prev => {
      const next = prev === index ? null : index;
      contentRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === next) {
          gsap.to(el, { height: 'auto', duration: 0.58, ease: 'power3.out' });
        } else {
          gsap.to(el, { height: 0, duration: 0.42, ease: 'power3.in' });
        }
      });
      return next;
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#021A13]">

      {/* ══════════════════════════════════════
          INTRO — heading + paragraph + stat
      ══════════════════════════════════════ */}
      <div className="max-w-425 mx-auto px-5 sm:px-8 md:px-16 xl:px-24 pt-24 md:pt-32 xl:pt-40 pb-16 md:pb-24">

        {/* Two-column: heading | paragraph */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-20 md:mb-28 items-start">
          <h2
            ref={headingRef}
            className="text-white font-light leading-[1.02] tracking-[0.04em] text-center md:text-left"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 5.2rem)' }}
          >
            The People<br />Behind<br />Amaya.
          </h2>

          <div ref={paraRef} className="flex items-center md:pt-4">
            <p className="text-white/55 font-light text-[14px] md:text-[15px] leading-[1.95] max-w-120 text-center md:text-left mx-auto md:mx-0">
              Amaya is thoughtfully conceived by Vera Vita Developments, a team of
              senior living specialists dedicated to creating residential communities
              where independence is beautifully supported. Every detail — from the
              width of a doorway to the design of a common space — reflects a deep
              commitment to ease, dignity, and quiet reassurance.
            </p>
          </div>
        </div>

        {/* Large centered stat */}
        <div className="text-center">
          <div
            ref={statNumRef}
            className="text-white font-light leading-none"
            style={{ fontSize: 'clamp(2.6rem, 9vw, 10rem)' }}
          >
            256{' '}
            <span
              className="font-light text-white/50 uppercase tracking-[0.12em]"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 2.8rem)' }}
            >
              Residences
            </span>
          </div>
          <p
            ref={statLblRef}
            className="text-white/40 uppercase tracking-[0.3em] mt-4"
            style={{ fontSize: 'clamp(0.65rem, 1.1vw, 0.85rem)' }}
          >
            Planned at Amaya
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          ACCORDION — PROJECT TEAM
      ══════════════════════════════════════ */}
      <div className="max-w-425 mx-auto px-5 sm:px-8 md:px-16 xl:px-24 pb-24 md:pb-32 xl:pb-40">

        {/* Section label + top rule */}
        <div className="mb-0">
          <p className="text-white/40 text-[10px] uppercase tracking-[0.38em] mb-4">
            Behind Amaya
          </p>
          <div className="h-px bg-white/10" />
        </div>

        {/* Items */}
        {TEAMS.map((team, i) => (
          <div key={team.id}>

            {/* Header row */}
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between py-5 md:py-7 text-left group"
              aria-expanded={openIndex === i}
            >
              <h3
                className="text-white font-light uppercase tracking-wider transition-opacity duration-300 group-hover:opacity-70"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 4rem)' }}
              >
                {team.name}
              </h3>

              {/* Chevron */}
              <span
                className="shrink-0 ml-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-500"
                style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <svg
                  width="13" height="13" viewBox="0 0 24 24"
                  fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {/* Expandable content */}
            <div
              ref={el => { contentRefs.current[i] = el; }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-[55%_45%] mb-8">

                {/* LEFT — text */}
                <div className="bg-[#0d2a1e] px-8 md:px-12 py-10 md:py-14 flex flex-col gap-6">

                  <div>
                    <h4
                      className="font-light mb-1"
                      style={{ color: '#7da87a', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}
                    >
                      {team.company}
                    </h4>
                    <p className="text-white/70 font-light text-[14px] md:text-[15px]">
                      {team.role}
                    </p>
                  </div>

                  {/* Stats list */}
                  <ul className="flex flex-col gap-1.5">
                    {team.stats.map(s => (
                      <li key={s} className="flex items-start gap-3 text-white/65 font-light text-[13.5px] md:text-[14px] leading-snug">
                        <span className="mt-1.5 w-1.25 h-1.25 rounded-full bg-white/25 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>

                  {/* Projects */}
                  <div>
                    <p className="text-white/40 text-[11px] uppercase tracking-[0.22em] mb-3">
                      {team.projects.label}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {team.projects.items.map(p => (
                        <li key={p} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.25 h-1.25 rounded-full bg-white/20 shrink-0" />
                          <span
                            className="text-[13.5px] md:text-[14px] font-light leading-snug"
                            style={{ color: '#7da87a' }}
                          >
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* RIGHT — image */}
                <div className="relative min-h-70 md:min-h-100 overflow-hidden">
                  <Image
                    src={team.image}
                    alt={team.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            {/* Bottom rule */}
            <div className="h-px bg-white/10" />
          </div>
        ))}
      </div>
    </section>
  );
}
