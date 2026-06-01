'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

type PlanType = '1 BHK' | '2 BHK' | '2.5 BHK' | '3 BHK' | '3.5 BHK';

const TABS: PlanType[] = ['1 BHK', '2 BHK', '2.5 BHK', '3 BHK', '3.5 BHK'];

const PLANS: Record<PlanType, { variant: string; carpet: string; builtup: string; balconies: string; features: string[] }[]> = {
  '1 BHK': [
    {
      variant: 'Type A',
      carpet: '~560 sq ft',
      builtup: '~680 sq ft',
      balconies: '1',
      features: ['Living / Dining', 'Bedroom with wardrobe', 'Kitchen', 'Bathroom', 'Private balcony'],
    },
  ],
  '2 BHK': [
    {
      variant: 'Type A',
      carpet: '~780 sq ft',
      builtup: '~950 sq ft',
      balconies: '2',
      features: ['Living / Dining', '2 Bedrooms', 'Kitchen', '2 Bathrooms', '2 Balconies'],
    },
  ],
  '2.5 BHK': [
    {
      variant: 'Type A',
      carpet: '~940 sq ft',
      builtup: '~1,150 sq ft',
      balconies: '2',
      features: ['Living / Dining', '2 Bedrooms', 'Study / Flex room', 'Kitchen', '2 Bathrooms', '2 Balconies'],
    },
    {
      variant: 'Type B',
      carpet: '~960 sq ft',
      builtup: '~1,170 sq ft',
      balconies: '2',
      features: ['Living / Dining', '2 Bedrooms', 'Study / Flex room', 'Kitchen', '2 Bathrooms', '2 Balconies'],
    },
  ],
  '3 BHK': [
    {
      variant: 'Type A',
      carpet: '~1,150 sq ft',
      builtup: '~1,400 sq ft',
      balconies: '2',
      features: ['Living / Dining', '3 Bedrooms', 'Kitchen', '2 Bathrooms', '2 Balconies', 'Guest bedroom'],
    },
  ],
  '3.5 BHK': [
    {
      variant: 'Type A',
      carpet: '~1,380 sq ft',
      builtup: '~1,700 sq ft',
      balconies: '3',
      features: ['Living / Dining', '3 Bedrooms', 'Study', 'Kitchen', '3 Bathrooms', '3 Balconies'],
    },
  ],
};

function FloorPlanCard({
  plan,
  type,
  index,
}: {
  plan: (typeof PLANS)[PlanType][number];
  type: PlanType;
  index: number;
}) {
  return (
    <div
      className="fp-card group flex flex-col border border-white/[0.08] hover:border-white/20 transition-colors duration-500 bg-[#030e09]"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Plan illustration placeholder */}
      <div className="relative overflow-hidden bg-[#051a10] aspect-[4/3] flex items-center justify-center">
        {/* Stylised floor plan SVG placeholder */}
        <svg
          viewBox="0 0 200 150"
          className="w-[70%] max-w-[260px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
        >
          {/* outer wall */}
          <rect x="20" y="15" width="160" height="120" rx="1" />
          {/* living room */}
          <rect x="20" y="15" width="90" height="75" />
          {/* bedroom 1 */}
          <rect x="110" y="15" width="70" height="55" />
          {/* kitchen */}
          <rect x="20" y="90" width="50" height="45" />
          {/* bedroom 2 / study */}
          <rect x="70" y="90" width="60" height="45" />
          {/* bathroom */}
          <rect x="130" y="90" width="50" height="45" />
          {/* balcony */}
          <rect x="110" y="70" width="70" height="20" strokeDasharray="4 2" />
          {/* door arcs */}
          <path d="M70 15 Q70 30 55 30" strokeWidth="0.5" />
          <path d="M110 70 Q125 70 125 55" strokeWidth="0.5" />
        </svg>
        <div className="absolute bottom-4 left-5 flex flex-col gap-[3px]">
          <span className="text-white/20 text-[9px] uppercase tracking-[0.3em]">{type}</span>
          <span className="text-white/40 text-[11px] uppercase tracking-[0.2em]">{plan.variant}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030e09]/60 to-transparent pointer-events-none" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-5 p-7 md:p-8">
        <div>
          <h3
            className="text-white font-light tracking-[0.02em] leading-none"
            style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)' }}
          >
            {type}
            <span className="text-white/30 text-[13px] ml-2 tracking-normal">{plan.variant}</span>
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-5">
          {[
            { label: 'Carpet', val: plan.carpet },
            { label: 'Built-up', val: plan.builtup },
            { label: 'Balconies', val: plan.balconies },
          ].map(({ label, val }) => (
            <div key={label}>
              <div className="text-white/25 text-[9px] uppercase tracking-[0.22em] mb-1">{label}</div>
              <div className="text-white/65 text-[12.5px] font-light">{val}</div>
            </div>
          ))}
        </div>

        <ul className="flex flex-col gap-[8px]">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-white/45 text-[12.5px] font-light">
              <span className="mt-[6px] w-[3px] h-[3px] rounded-full bg-white/25 shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex gap-3 mt-1">
          <button className="flex-1 h-10 rounded-full border border-white/15 text-white/50 text-[10px] uppercase tracking-[0.2em] hover:border-white/35 hover:text-white transition-all duration-300">
            Download Plan
          </button>
          <button className="flex-1 h-10 rounded-full bg-[#d9a898] text-[#021A13] text-[10px] uppercase tracking-[0.2em] hover:bg-[#c89585] transition-colors duration-300">
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FloorPlansPage() {
  const [activeTab, setActiveTab] = useState<PlanType>('1 BHK');
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(tabsRef.current, {
        y: 25, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: tabsRef.current, start: 'top 85%' },
      });
      gsap.from(ctaRef.current, {
        y: 35, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.fp-card');
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }
    );
  }, [activeTab]);

  return (
    <main className="bg-[#021A13]">

      {/* HERO */}
      <PageHero
        label="Amaya — Floor Plans"
        title="Explore each home in detail."
        description="Six plan configurations across five bedroom types — each designed for ease, light, and thoughtful proportion."
        imgSrc="/i/homepage/piece-heaven-right.jpg"
        imgAlt="Amaya floor plans"
        height="h-[75vh] min-h-[520px]"
      />

      {/* TABS + GRID */}
      <section className="py-20 md:py-32 px-6 md:px-16 xl:px-24 max-w-[1500px] mx-auto">

        {/* Section label */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-4">Browse by configuration</p>
          <h2
            className="text-white font-light"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 3.5rem)' }}
          >
            Select a floor plan type.
          </h2>
        </div>

        {/* Filter tabs */}
        <div ref={tabsRef} className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-7 h-11 rounded-full text-[11px] uppercase tracking-[0.22em] transition-all duration-350 ${
                activeTab === tab
                  ? 'bg-white text-[#021A13]'
                  : 'border border-white/20 text-white/55 hover:border-white/45 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PLANS[activeTab].map((plan, i) => (
            <FloorPlanCard key={`${activeTab}-${plan.variant}`} plan={plan} type={activeTab} index={i} />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-white/22 text-[11px] font-light leading-[1.8] max-w-xl mx-auto mt-10">
          Floor plan illustrations are indicative. Final plans are subject to regulatory approval and may differ at handover.
        </p>
      </section>

      {/* OVERVIEW TABLE */}
      <section className="py-20 md:py-28 bg-[#030e09]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-16 xl:px-24">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-4">All Configurations</p>
            <h2
              className="text-white font-light"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 3.5rem)' }}
            >
              At a glance.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  {['Configuration', 'Carpet Area', 'Built-up Area', 'Balconies', ''].map((h) => (
                    <th key={h} className="text-left pb-5 text-white/30 text-[10px] uppercase tracking-[0.28em] font-light pr-8">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([
                  ['1 BHK', '~560 sq ft', '~680 sq ft', '1'],
                  ['2 BHK', '~780 sq ft', '~950 sq ft', '2'],
                  ['2.5 BHK', '~940–960 sq ft', '~1,150–1,170 sq ft', '2'],
                  ['3 BHK', '~1,150 sq ft', '~1,400 sq ft', '2'],
                  ['3.5 BHK', '~1,380 sq ft', '~1,700 sq ft', '3'],
                ] as const).map(([type, carpet, builtup, bal], i) => (
                  <tr
                    key={type}
                    className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <td className="py-5 text-white font-light text-[15px] md:text-[16px] pr-8">{type}</td>
                    <td className="py-5 text-white/55 text-[13px] font-light pr-8">{carpet}</td>
                    <td className="py-5 text-white/55 text-[13px] font-light pr-8">{builtup}</td>
                    <td className="py-5 text-white/55 text-[13px] font-light pr-8">{bal}</td>
                    <td className="py-5">
                      <button
                        onClick={() => setActiveTab(type as PlanType)}
                        className="text-[10px] uppercase tracking-[0.22em] text-[#d9a898] hover:text-white transition-colors duration-300"
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-28 md:py-44 px-6 text-center">
        <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-6">Next Step</p>
        <h2
          className="text-white font-light leading-[1.1] mb-8 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
        >
          Ready to choose your home?
        </h2>
        <p className="text-white/50 text-[14px] md:text-[15px] leading-[1.85] max-w-[420px] mx-auto mb-12">
          Book a visit to our experience centre and explore the show apartment. Our team will walk you through every configuration in detail.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-3 px-10 h-[52px] rounded-full bg-[#d9a898] text-[#021A13] uppercase text-[11px] tracking-[0.24em] hover:bg-[#c89585] transition-colors duration-300">
            Book a Visit
          </button>
          <button className="flex items-center gap-3 px-10 h-[52px] rounded-full border border-white/25 text-white/65 uppercase text-[11px] tracking-[0.24em] hover:border-white/50 hover:text-white transition-colors duration-300">
            Download Brochure
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
