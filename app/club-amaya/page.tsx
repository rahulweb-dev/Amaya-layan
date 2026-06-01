'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const SPACES = [
  {
    num: '01',
    title: 'Dining & Social Spaces',
    desc: 'A main dining hall, all-day café, and private dining room — designed to feel warm and welcoming, whether you\'re having a quiet meal alone or hosting family over a long lunch.',
    detail: 'The dining facilities at Club Amaya are designed around sociability without obligation. Come when you want, leave when you like. The café stays open all day, and private dining can be reserved for special occasions.',
  },
  {
    num: '02',
    title: 'Library & Reading Rooms',
    desc: 'Quiet, sunlit spaces stocked with books, periodicals, and comfortable seating — a place where the day slows down and the mind has room to wander.',
    detail: 'The library at Club Amaya is one of its most beloved spaces. Curated shelves, morning light, and a reading corner that invites you to stay a little longer than planned.',
  },
  {
    num: '03',
    title: 'Wellness & Therapy Rooms',
    desc: 'A thoughtfully appointed wellness suite with physiotherapy, massage therapy, and dedicated spaces for restorative treatments — all under one roof.',
    detail: 'The wellness suite is designed around recovery, maintenance, and active ageing. Physiotherapy, massage, and consultation rooms are managed by qualified practitioners and integrated into daily routines.',
  },
  {
    num: '04',
    title: 'Fitness & Movement Spaces',
    desc: 'A well-equipped fitness centre, yoga studio, and movement rooms planned for all ability levels — from morning stretches to more vigorous daily routines.',
    detail: 'The fitness spaces are designed specifically for residents aged 60 and above, with appropriate equipment, senior-safe surfaces, and professional instruction available throughout the week.',
  },
  {
    num: '05',
    title: 'Arts & Activity Studios',
    desc: 'Creative spaces for painting, craft, music, and more — where curiosity finds its outlet and communities form around shared interests.',
    detail: 'Activity studios host regular classes and workshops in visual arts, music, and crafts. The spaces are designed to be flexible — rearranged for classes, exhibitions, or quiet individual work.',
  },
  {
    num: '06',
    title: 'Performance & Events Hall',
    desc: 'A proper events hall for performances, film screenings, community gatherings, and private celebrations — built to bring the community together.',
    detail: 'The events hall accommodates the full community for cultural programmes, film evenings, guest lectures, and celebrations. It can also be reserved privately for family occasions.',
  },
];

export default function ClubAmayaPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const spacesRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.space-row', {
        y: 35, opacity: 0, duration: 0.85, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: spacesRef.current, start: 'top 76%' },
      });
      gsap.from('.club-stat', {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
      });
      gsap.from('.feature-item', {
        y: 35, opacity: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: featureRef.current, start: 'top 78%' },
      });
      gsap.from(ctaRef.current, {
        y: 35, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
      });
    });
    return () => ctx.revert();
  }, []);

  const toggle = useCallback((idx: number) => {
    const prev = activeIdx;
    if (prev !== null && contentRefs.current[prev]) {
      gsap.to(contentRefs.current[prev], { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
    }
    if (prev === idx) {
      setActiveIdx(null);
    } else {
      setActiveIdx(idx);
      const el = contentRefs.current[idx];
      if (el) {
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.55, ease: 'power3.inOut' });
      }
    }
  }, [activeIdx]);

  return (
    <main className="bg-[#021A13]">

      {/* HERO */}
      <PageHero
        label="Club Amaya"
        title="The heart of the community."
        description="34,000 square feet of thoughtfully designed spaces for dining, wellness, creativity, fitness, and community — all under one beautifully crafted roof."
        imgSrc="/i/homepage/amenities-1.jpg"
        imgAlt="Club Amaya — clubhouse spaces"
        height="h-[88vh] min-h-[600px]"
      />

      {/* STATS STRIP */}
      <section ref={statsRef} className="py-16 md:py-20 border-b border-white/[0.07]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-16 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { num: '34,000', label: 'sq ft of clubhouse space (planned)' },
              { num: '6', label: 'distinct spaces and programmes' },
              { num: '100+', label: 'planned amenities across the community' },
              { num: '256', label: 'residents — one shared home' },
            ].map(({ num, label }) => (
              <div key={label} className="club-stat flex flex-col gap-2">
                <div className="text-white font-light leading-none" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.8rem)' }}>
                  {num}
                </div>
                <div className="text-white/35 text-[10px] uppercase tracking-[0.2em] leading-[1.7] mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO SPLIT */}
      <section className="overflow-hidden">
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Image */}
          <div
            className="relative w-full md:w-[52%] shrink-0 overflow-hidden"
            style={{ minHeight: 'clamp(300px, 42vw, 600px)' }}
          >
            <Image
              src="/i/homepage/amenities-2.jpg"
              alt="Club Amaya interior"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 52vw"
            />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#021A13] to-transparent" />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center gap-7 px-8 md:px-12 lg:px-20 xl:px-28 py-16 md:py-0">
            <p className="text-white/35 text-[11px] uppercase tracking-[0.4em]">About Club Amaya</p>
            <h2
              className="text-white font-light leading-[1.1] tracking-[0.02em]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 4rem)' }}
            >
              A clubhouse that<br />earns its name.
            </h2>
            <p className="text-white/55 font-light text-[14px] md:text-[15px] leading-[1.9] max-w-[420px]">
              Club Amaya is not a hotel lobby or a leisure facility bolted onto a residential block.
              It is the living centre of the community — the place where days begin and end well,
              where friendships form, and where life at Amaya is felt most fully.
            </p>
            <p className="text-white/55 font-light text-[14px] md:text-[15px] leading-[1.9] max-w-[420px]">
              Every space within the 34,000 sq ft clubhouse is planned around how people actually live — not how developers imagine they do.
            </p>
            <p className="text-white/35 font-light text-[13px] italic leading-[1.75] border-l border-white/12 pl-5">
              &ldquo;A clubhouse that feels like home, not a hotel.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* SPACES ACCORDION */}
      <section
        ref={spacesRef}
        className="py-24 md:py-36 px-6 md:px-16 xl:px-24 max-w-[1500px] mx-auto"
      >
        <div className="text-center mb-14 md:mb-20">
          <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-5">The Spaces</p>
          <h2
            className="text-white font-light leading-[1.1]"
            style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
          >
            Six spaces. One community.
          </h2>
        </div>

        <div className="max-w-[900px] mx-auto">
          {SPACES.map((space, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div key={space.num} className="space-row border-b border-white/[0.08]">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-start justify-between py-7 md:py-8 gap-6 group text-left"
                  aria-expanded={isActive}
                >
                  <div className="flex items-start gap-6 flex-1">
                    <span className="text-white/20 text-[11px] tracking-[0.3em] mt-[6px] shrink-0">{space.num}</span>
                    <div className="flex flex-col gap-2">
                      <h3
                        className={`font-light transition-colors duration-400 leading-[1.2] tracking-[0.02em] ${isActive ? 'text-[#d9a898]' : 'text-white/85 group-hover:text-white'}`}
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
                      >
                        {space.title}
                      </h3>
                      {!isActive && (
                        <p className="text-white/35 text-[13px] font-light leading-[1.75] max-w-[480px] hidden md:block">
                          {space.desc}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`text-[22px] font-light transition-all duration-400 mt-1 shrink-0 ${isActive ? 'text-[#d9a898] rotate-45' : 'text-white/30 group-hover:text-white/60'}`}>+</span>
                </button>

                <div
                  ref={(el) => { contentRefs.current[idx] = el; }}
                  style={{ height: 0, overflow: 'hidden', opacity: 0 }}
                >
                  <div className="pb-8 pl-0 md:pl-14 flex flex-col gap-4">
                    <p className="text-white/60 text-[14px] md:text-[15px] font-light leading-[1.9] max-w-[560px]">
                      {space.detail}
                    </p>
                    <p className="text-white/35 text-[13px] font-light leading-[1.75] max-w-[560px] md:hidden">
                      {space.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURES GRID */}
      <section ref={featureRef} className="py-20 md:py-32 bg-[#030e09]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-16 xl:px-24">
          <div className="text-center mb-14 md:mb-18">
            <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-5">What to expect</p>
            <h2
              className="text-white font-light"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 3.5rem)' }}
            >
              Everyday life at Club Amaya.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: '◉', label: 'Main Dining Hall', sub: 'Breakfast, lunch & dinner' },
              { icon: '◎', label: 'All-Day Café', sub: 'Open from early morning' },
              { icon: '◈', label: 'Private Dining', sub: 'For family occasions' },
              { icon: '◐', label: 'Library', sub: 'Quiet and sunlit' },
              { icon: '◑', label: 'Fitness Centre', sub: 'Senior-friendly equipment' },
              { icon: '◒', label: 'Yoga Studio', sub: 'Daily guided sessions' },
              { icon: '◓', label: 'Physiotherapy', sub: 'On-site practitioners' },
              { icon: '◔', label: 'Arts Studio', sub: 'Painting, craft & music' },
              { icon: '◕', label: 'Events Hall', sub: 'Performances & screenings' },
            ].map(({ icon, label, sub }) => (
              <div
                key={label}
                className="feature-item flex flex-col gap-3 p-6 md:p-8 border border-white/[0.07] hover:border-white/18 transition-colors duration-400 group"
              >
                <span className="text-white/20 text-[1.4rem] group-hover:text-white/35 transition-colors duration-400">{icon}</span>
                <div>
                  <div className="text-white/80 text-[13.5px] md:text-[14px] font-light tracking-[0.01em]">{label}</div>
                  <div className="text-white/30 text-[11.5px] font-light mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECOND IMAGE */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(300px, 45vw, 560px)' }}>
        <Image
          src="/i/homepage/piece-heaven-left.jpg"
          alt="Club Amaya community spaces"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-4">
          <p className="text-white/40 text-[11px] uppercase tracking-[0.4em]">Planned</p>
          <h2
            className="text-white font-light leading-[1.1]"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 5rem)' }}
          >
            34,000 sq ft.<br />Built for community.
          </h2>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-28 md:py-44 px-6 text-center">
        <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-6">Visit Club Amaya</p>
        <h2
          className="text-white font-light leading-[1.1] mb-8 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
        >
          Come and see it for yourself.
        </h2>
        <p className="text-white/50 text-[14px] md:text-[15px] leading-[1.85] max-w-[440px] mx-auto mb-12">
          Our experience centre gives you a feel for Club Amaya before it opens. Visit Monday to Saturday, 10:00 to 18:00, or request a private tour.
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
