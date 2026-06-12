'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    num: '01',
    title: 'Preventative Wellness',
    subtitle: 'Active ageing by design',
    desc: 'Programmes designed around active ageing — movement, nutrition, and routine — with trained staff support. Everything is designed to help residents stay well, not just respond when something goes wrong.',
    items: ['Fitness and yoga classes', 'Nutrition guidance', 'Walking and movement trails', 'Structured daily activity programmes'],
  },
  {
    num: '02',
    title: 'Everyday Support',
    subtitle: 'The practical, quietly handled',
    desc: 'Housekeeping, laundry, and concierge services managed by the Vera Vita team — the everyday practical details of life taken care of, quietly and efficiently, so your day belongs entirely to you.',
    items: ['Housekeeping and linen service', 'Laundry and dry cleaning', 'Concierge and errand support', 'Grocery and pharmacy assistance'],
  },
  {
    num: '03',
    title: 'On-Site Response',
    subtitle: 'Reassurance, always close',
    desc: 'Emergency call systems throughout every residence, with a trained response team on-site around the clock. Specialist care is coordinated via nearby hospitals when needed.',
    items: ['Emergency call points in every apartment', 'Trained on-site response staff', 'Hospital coordination protocols', '24/7 security and monitoring'],
  },
  {
    num: '04',
    title: 'Safety by Design',
    subtitle: 'Built in, not bolted on',
    desc: 'Wider corridors, lever handles, slip-resistant surfaces, ramp access, and considered lighting throughout. Safety is woven into the architecture so it never feels institutional.',
    items: ['Wider doorways and corridors', 'Lever-style door handles', 'Slip-resistant flooring', 'Ramp access throughout community'],
  },
  {
    num: '05',
    title: 'Active Ageing',
    subtitle: 'Movement for every level',
    desc: 'Fitness, yoga, swimming, walking trails, and group activities designed for all ability levels — the goal is daily independence, not performance.',
    items: ['Fully equipped fitness centre', 'Yoga and stretching studio', 'Swimming pool (planned)', 'Group fitness classes'],
  },
  {
    num: '06',
    title: 'Senior-Friendly Planning',
    subtitle: 'Dignity in every detail',
    desc: 'Apartments and common areas are designed around accessible doorway widths, bathroom layouts, and lighting levels that reduce risk without announcing themselves.',
    items: ['Accessible bathroom layouts', 'Optimised lighting throughout', 'Handrails in key areas', 'Step-free access everywhere'],
  },
];

const PRINCIPLES = [
  {
    title: 'Responsibility',
    desc: 'Long-term commitment to consistent standards across every aspect of community management and care delivery.',
  },
  {
    title: 'Response',
    desc: 'On-site staff and clear escalation protocols ensure every concern is addressed quickly, whether it\'s routine or urgent.',
  },
  {
    title: 'Reassurance',
    desc: 'Safety, hospitality, and dignity are not competing priorities at Amaya — they are the same thing, expressed in every service interaction.',
  },
];

export default function WellnessPage() {
  const catRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cat-card', {
        y: 45, opacity: 0, duration: 0.95, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: catRef.current, start: 'top 76%' },
      });
      gsap.from('.principle-block', {
        y: 35, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: principlesRef.current, start: 'top 78%' },
      });
      gsap.from('.well-stat', {
        y: 28, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
      });
      gsap.from(ctaRef.current, {
        y: 35, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-surface">

      {/* HERO */}
      <PageHero
        label="Amaya — Wellness"
        title="Care when needed, freedom always."
        description="Support designed around resident life, not institutional schedules. Quiet, discreet, and always close at hand."
        imgSrc="/i/homepage/amenities-2.jpg"
        imgAlt="Amaya wellness — community spaces"
        height="h-[88vh] min-h-[600px]"
      />

      {/* INTRO */}
      <section className="py-20 md:py-32 px-6 md:px-16 xl:px-24 max-w-375 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20 xl:gap-32 items-center">
          <div className="flex flex-col gap-7">
            <p className="text-charcoal/40 text-[11px] uppercase tracking-[0.4em]">Our Approach</p>
            <h2
              className="text-navy font-light leading-[1.1] tracking-[0.02em]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 4rem)' }}
            >
              Independence feels<br />beautifully supported.
            </h2>
            <p className="text-charcoal/60 font-light text-[14px] md:text-[15px] leading-[1.9]">
              Wellness at Amaya is not a facility or a programme schedule pinned to a noticeboard.
              It is the way the community is designed, staffed, and managed — so that help is
              always available without anyone having to ask loudly for it.
            </p>
            <p className="text-charcoal/60 font-light text-[14px] md:text-[15px] leading-[1.9]">
              Every resident is different. Some will want daily fitness classes and an active social calendar.
              Others will want quiet days and good food. Amaya is built to accommodate both — simultaneously,
              without compromise.
            </p>
          </div>

          <div className="relative overflow-hidden" style={{ aspectRatio: '4/5', maxHeight: '520px' }}>
            <Image
              src="/i/homepage/piece-heaven-right.jpg"
              alt="Amaya wellness spaces"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* WELLNESS CATEGORIES */}
      <section ref={catRef} className="py-20 md:py-32 bg-surface-alt">
        <div className="max-w-375 mx-auto px-6 md:px-16 xl:px-24">
          <div className="text-center mb-14 md:mb-20">
            <p className="text-charcoal/40 text-[11px] uppercase tracking-[0.4em] mb-5">Six Categories</p>
            <h2
              className="text-navy font-light leading-[1.1]"
              style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
            >
              Wellness in every dimension.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.num}
                className="cat-card flex flex-col gap-5 p-8 md:p-10 border border-stone/40 hover:border-navy/20 transition-colors duration-500 group"
              >
                <div className="flex items-start justify-between">
                  <span className="text-charcoal/25 text-[11px] tracking-[0.35em]">{cat.num}</span>
                </div>
                <div>
                  <h3
                    className="text-navy font-light leading-[1.2] tracking-[0.02em] mb-1.5"
                    style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.45rem)' }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-brass/70 text-[10px] uppercase tracking-[0.3em]">{cat.subtitle}</p>
                </div>
                <p className="text-charcoal/55 font-light text-[13.5px] leading-[1.9]">{cat.desc}</p>
                <ul className="flex flex-col gap-2 mt-auto pt-4 border-t border-stone/40">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-charcoal/45 text-[12.5px] font-light">
                      <span className="mt-1.5 w-0.75 h-0.75 rounded-full bg-navy/25 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERA VITA PRINCIPLES */}
      <section
        ref={principlesRef}
        className="py-24 md:py-36 px-6 md:px-16 xl:px-24 max-w-375 mx-auto"
      >
        <div className="text-center mb-14 md:mb-20">
          <p className="text-charcoal/40 text-[11px] uppercase tracking-[0.4em] mb-5">Vera Vita Operating Principles</p>
          <h2
            className="text-navy font-light leading-[1.1]"
            style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
          >
            The promise behind the place.
          </h2>
          <p className="text-charcoal/50 font-light text-[14px] md:text-[15px] leading-[1.85] max-w-lg mx-auto mt-6">
            Vera Vita is the developer and long-term manager of Amaya. These are the operating principles that govern how the community is run.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="principle-block flex flex-col gap-5 border-t border-stone/50 pt-8">
              <h3
                className="text-navy font-light tracking-[0.02em]"
                style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)' }}
              >
                {p.title}
              </h3>
              <p className="text-charcoal/55 font-light text-[14px] leading-[1.9]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-16 md:py-24 border-y border-stone/40">
        <div className="max-w-375 mx-auto px-6 md:px-16 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { num: '24/7', label: 'On-site trained staff' },
              { num: '6', label: 'Wellness programme categories' },
              { num: '100+', label: 'Planned amenities' },
              { num: '0', label: 'Institutional compromises' },
            ].map(({ num, label }) => (
              <div key={label} className="well-stat flex flex-col gap-2">
                <div className="text-navy font-light leading-none" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.8rem)' }}>
                  {num}
                </div>
                <div className="text-charcoal/40 text-[10px] uppercase tracking-[0.2em] leading-[1.7] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL-WIDTH BAND */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(280px, 40vw, 520px)' }}>
        <Image
          src="/i/location/location.webp"
          alt="Amaya — nature and wellness"
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-5">
          <p className="text-limestone/50 text-[11px] uppercase tracking-[0.45em]">Nature as Wellness</p>
          <h2
            className="text-limestone font-light leading-[1.1] max-w-3xl"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 5rem)' }}
          >
            Beside a 600-acre<br />reserve forest.
          </h2>
          <p className="text-limestone/55 font-light text-[14px] leading-[1.85] max-w-md">
            The forest is not a view. It is a daily destination — for morning walks, quiet sitting, and the particular kind of restoration that only comes from being among trees.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-28 md:py-44 px-6 text-center">
        <p className="text-charcoal/40 text-[11px] uppercase tracking-[0.4em] mb-6">Learn More</p>
        <h2
          className="text-navy font-light leading-[1.1] mb-8 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
        >
          A life well lived, every day.
        </h2>
        <p className="text-charcoal/55 text-[14px] md:text-[15px] leading-[1.85] max-w-110 mx-auto mb-12">
          Speak to our team about how wellness and support work at Amaya. Visit the experience centre or request a brochure.
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
