'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    num: '01',
    title: 'Senior-Friendly Design',
    desc: 'Wider doorways, lever handles, slip-resistant floors, ramp access, and thoughtfully planned lighting — every detail considered for ease and independence.',
  },
  {
    num: '02',
    title: 'Light & Air',
    desc: 'Natural brightness through cross ventilation and expansive windows ensures every residence feels open, fresh, and energising from morning to evening.',
  },
  {
    num: '03',
    title: 'Privacy by Layout',
    desc: 'Thoughtful apartment positioning maintains quiet and personal space while keeping you beautifully connected to the wider community when you choose.',
  },
  {
    num: '04',
    title: 'Maintenance Handled',
    desc: 'The Vera Vita team manages all upkeep and repairs, so your home stays in perfect condition without any of the burden falling to you.',
  },
];

const RESIDENCES = [
  {
    type: '1 BHK',
    area: 'Approx. 680 sq ft',
    carpet: '~560 sq ft',
    balconies: '1',
    features: ['Private balcony', 'Cross ventilation', 'Wider doorways', 'Emergency call points'],
    featured: false,
  },
  {
    type: '2 BHK',
    area: 'Approx. 950 sq ft',
    carpet: '~780 sq ft',
    balconies: '2',
    features: ['Two balconies', 'Slip-resistant flooring', 'Open living area', 'Emergency call points'],
    featured: false,
  },
  {
    type: '2.5 BHK',
    area: 'Approx. 1,150 sq ft',
    carpet: '~940 sq ft',
    balconies: '2',
    features: ['Dedicated study / flex room', 'Two generous balconies', 'Spacious storage', 'Emergency call points'],
    featured: true,
  },
  {
    type: '3 BHK',
    area: 'Approx. 1,400 sq ft',
    carpet: '~1,150 sq ft',
    balconies: '2',
    features: ['Guest bedroom', 'Large living and dining', 'Two balconies', 'Emergency call points'],
    featured: false,
  },
  {
    type: '3.5 BHK',
    area: 'Approx. 1,700 sq ft',
    carpet: '~1,380 sq ft',
    balconies: '3',
    features: ['Three balconies', 'Dedicated study', 'Generous proportions', 'Emergency call points'],
    featured: false,
  },
];

export default function ResidencesPage() {
  const principlesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.principle-card', {
        y: 45, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: principlesRef.current, start: 'top 76%' },
      });
      gsap.from('.res-card', {
        y: 55, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 76%' },
      });
      gsap.from('.stat-num', {
        y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
      });
      gsap.from(ctaRef.current, {
        y: 35, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
      });
      gsap.from('.split-img', {
        x: -60, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: splitRef.current, start: 'top 72%' },
      });
      gsap.from('.split-text', {
        x: 60, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: splitRef.current, start: 'top 72%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-surface">

      {/* ── HERO ── */}
      <PageHero
        label="Amaya — Residences"
        title="Homes designed for the life you want to live."
        description="Five configurations, every one built around ease, light, and quiet comfort."
        imgSrc="/i/homepage/architecture-right.jpg"
        imgAlt="Amaya residences — architecture"
        height="h-[88vh] min-h-[600px]"
      />

      {/* ── INTRO SPLIT ── */}
      <section ref={splitRef} className="overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch min-h-120">
          <div className="split-img relative w-full md:w-[50%] shrink-0 overflow-hidden" style={{ minHeight: 'clamp(300px, 40vw, 560px)' }}>
            <Image
              src="/i/homepage/piece-heaven-left.jpg"
              alt="Amaya residence interior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-surface to-transparent" />
          </div>
          <div className="split-text flex flex-col justify-center gap-7 px-8 md:px-14 lg:px-20 xl:px-28 py-16 md:py-0">
            <p className="text-charcoal/40 text-[11px] uppercase tracking-[0.4em]">Our Homes</p>
            <h2
              className="text-navy font-light leading-[1.1] tracking-[0.02em]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 4rem)' }}
            >
              Not just a residence.<br />A way of living.
            </h2>
            <p className="text-charcoal/60 font-light text-[14px] md:text-[15px] leading-[1.9] max-w-105">
              Every apartment at Amaya is planned with unusually generous balconies and cross ventilation,
              senior-friendly fixtures, and a layout that feels genuinely easy to move through — not just accessible in theory.
            </p>
            <p className="text-charcoal/45 font-light text-[13px] md:text-[14px] italic leading-[1.75] border-l border-stone/55 pl-5">
              &ldquo;Independence feels beautifully supported.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── DESIGN PRINCIPLES ── */}
      <section ref={principlesRef} className="py-24 md:py-36 px-6 md:px-16 xl:px-24 max-w-375 mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-charcoal/40 text-[11px] uppercase tracking-[0.4em] mb-5">Design Philosophy</p>
          <h2
            className="text-navy font-light leading-[1.1] tracking-wide"
            style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
          >
            Built around independence.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {PRINCIPLES.map((p) => (
            <div key={p.num} className="principle-card flex flex-col gap-5 border-t border-stone/50 pt-8">
              <span className="text-charcoal/25 text-[11px] uppercase tracking-[0.35em]">{p.num}</span>
              <h3
                className="text-navy font-light leading-tight tracking-[0.02em]"
                style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.5rem)' }}
              >
                {p.title}
              </h3>
              <p className="text-charcoal/55 font-light text-[13.5px] leading-[1.9]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESIDENCES GRID ── */}
      <section className="py-20 md:py-32 bg-surface-alt">
        <div className="max-w-375 mx-auto px-6 md:px-16 xl:px-24">
          <div className="text-center mb-14 md:mb-20">
            <p className="text-charcoal/40 text-[11px] uppercase tracking-[0.4em] mb-5">Five Configurations</p>
            <h2
              className="text-navy font-light leading-[1.1]"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
            >
              Find your perfect home.
            </h2>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {RESIDENCES.map((r) => (
              <div
                key={r.type}
                className={`res-card relative flex flex-col gap-6 p-8 md:p-10 border transition-colors duration-500 group ${
                  r.featured
                    ? 'border-brass/35 bg-brass/5'
                    : 'border-stone/40 hover:border-navy/20 hover:bg-navy/5'
                }`}
              >
                {r.featured && (
                  <span className="absolute top-5 right-5 text-[9px] uppercase tracking-[0.3em] text-brass border border-brass/40 px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}

                <div>
                  <h3
                    className="text-navy font-light tracking-[0.02em] leading-none"
                    style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)' }}
                  >
                    {r.type}
                  </h3>
                  <p className="text-charcoal/40 text-[11px] uppercase tracking-[0.25em] mt-2">{r.area}</p>
                </div>

                <div className="flex gap-8 border-t border-stone/40 pt-5">
                  <div>
                    <div className="text-charcoal/30 text-[9px] uppercase tracking-[0.25em] mb-1.5">Carpet Area</div>
                    <div className="text-charcoal/65 text-[13px] font-light">{r.carpet}</div>
                  </div>
                  <div>
                    <div className="text-charcoal/30 text-[9px] uppercase tracking-[0.25em] mb-1.5">Balconies</div>
                    <div className="text-charcoal/65 text-[13px] font-light">{r.balconies}</div>
                  </div>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-charcoal/55 text-[13px] font-light leading-[1.6]">
                      <span className="mt-1.75 w-1 h-1 rounded-full bg-navy/25 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 flex gap-3">
                  <Link
                    href="/floor-plans"
                    className="flex-1 h-11 rounded-full border border-stone/55 text-charcoal/55 text-[11px] uppercase tracking-[0.2em] hover:border-navy/35 hover:text-navy transition-all duration-300 flex items-center justify-center"
                  >
                    Floor Plan
                  </Link>
                  <button
                    className={`flex-1 h-11 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                      r.featured
                        ? 'bg-brass text-white hover:bg-[#967043]'
                        : 'bg-navy/7 text-charcoal/70 hover:bg-navy/12 hover:text-navy'
                    }`}
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-charcoal/30 text-[11px] font-light leading-[1.75] max-w-xl mx-auto mt-10">
            All sizes are indicative. Final built-up and carpet areas are subject to regulatory approval and may differ at handover.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-20 md:py-28 border-y border-stone/40">
        <div className="max-w-375 mx-auto px-6 md:px-16 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
            {[
              { num: '256', label: 'Total Residences' },
              { num: '5', label: 'Configurations' },
              { num: '680–1,700', label: 'sq ft Range' },
              { num: '100%', label: 'Independent Living' },
            ].map(({ num, label }) => (
              <div key={label} className="stat-num flex flex-col gap-2">
                <div className="text-navy font-light leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>{num}</div>
                <div className="text-charcoal/40 text-[10px] uppercase tracking-[0.2em] leading-[1.7] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="py-28 md:py-44 px-6 text-center">
        <p className="text-charcoal/40 text-[11px] uppercase tracking-[0.4em] mb-6">Experience Centre</p>
        <h2
          className="text-navy font-light leading-[1.1] mb-8 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
        >
          Experience Amaya in person.
        </h2>
        <p className="text-charcoal/55 text-[14px] md:text-[15px] leading-[1.85] max-w-110 mx-auto mb-12">
          Our experience centre is open Monday to Saturday, 10:00 to 18:00. Come and see the show apartment and meet the Vera Vita team.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-3 px-10 h-13 rounded-full bg-brass text-white uppercase text-[11px] tracking-[0.24em] hover:bg-[#967043] transition-colors duration-300">
            Book a Visit
          </button>
          <button className="flex items-center gap-3 px-10 h-13 rounded-full border border-navy/25 text-charcoal/65 uppercase text-[11px] tracking-[0.24em] hover:border-navy/50 hover:text-navy transition-colors duration-300">
            Download Brochure
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
