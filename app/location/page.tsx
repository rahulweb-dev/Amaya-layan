'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Location from '../components/Location';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';

gsap.registerPlugin(ScrollTrigger);

const NEARBY = [
  { category: 'Healthcare', items: ['Yashoda Hospitals — 12 km', 'Continental Hospitals — 14 km', 'Apollo Spectra — 10 km', 'Medchal Government Hospital — 3 km'] },
  { category: 'Education', items: ['ISB Hyderabad — 18 km', 'NALSAR University — 14 km', 'IIT Hyderabad — 22 km', 'International schools — 8–15 km'] },
  { category: 'Connectivity', items: ['Nehru Outer Ring Road — 15 min', 'Rajiv Gandhi Airport — 38 km', 'Secunderabad — 22 km', 'Hitech City — 18 km'] },
  { category: 'Nature', items: ['600-acre reserve forest — adjacent', 'Medchal Lake — 4 km', 'Walking and jogging trails — on-site', 'Open green courtyards — throughout'] },
];

export default function LocationPage() {
  const nearbyRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nearby-col', {
        y: 40, opacity: 0, duration: 0.95, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: nearbyRef.current, start: 'top 76%' },
      });
      gsap.from('.loc-gal-img', {
        y: 35, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: galleryRef.current, start: 'top 78%' },
      });
      gsap.from(ctaRef.current, {
        y: 35, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
      });
      gsap.from(quoteRef.current, {
        y: 25, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 82%' },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#021A13]">

      {/* HERO */}
      <PageHero
        label="Amaya — Location"
        title="Beside a 600-acre reserve forest."
        description="Adjacent to protected forest in Medchal, 15 minutes from Nehru Outer Ring Road, Hyderabad. The city is close when you want it, invisible when you do not."
        imgSrc="/i/location/location.webp"
        imgAlt="Medchal reserve forest aerial — Amaya location"
        height="h-[88vh] min-h-[600px]"
      />

      {/* MAP + TEXT — existing Location component */}
      <Location />

      {/* QUOTE BAND */}
      <section ref={quoteRef} className="py-20 md:py-28 px-6 text-center border-y border-white/[0.07]">
        <div className="max-w-[900px] mx-auto">
          <p className="text-white/20 text-[11px] uppercase tracking-[0.45em] mb-7">The Amaya Setting</p>
          <blockquote
            className="text-white font-light leading-[1.2] tracking-[0.025em]"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 4.2rem)' }}
          >
            &ldquo;The city is close when you want it, and invisible when you do not.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* NEARBY GRID */}
      <section ref={nearbyRef} className="py-24 md:py-36 px-6 md:px-16 xl:px-24 max-w-[1500px] mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-5">What&apos;s Nearby</p>
          <h2
            className="text-white font-light leading-[1.1]"
            style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
          >
            Everything within reach.
          </h2>
          <p className="text-white/45 font-light text-[14px] md:text-[15px] leading-[1.85] max-w-[480px] mx-auto mt-6">
            Hospitals, essential services, family access, and the open forest — all within comfortable reach of Amaya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
          {NEARBY.map(({ category, items }) => (
            <div key={category} className="nearby-col flex flex-col gap-5 border-t border-white/10 pt-7">
              <h3 className="text-white/70 text-[11px] uppercase tracking-[0.35em] font-light">{category}</h3>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/50 text-[13px] font-light leading-[1.7]">
                    <span className="mt-[7px] w-[3px] h-[3px] rounded-full bg-white/25 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION GALLERY */}
      <section ref={galleryRef} className="pb-20 md:pb-32 px-6 md:px-16 xl:px-24 max-w-[1500px] mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-4">The Setting</p>
          <h2
            className="text-white font-light"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 3.5rem)' }}
          >
            Green, open, and unhurried.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { src: '/i/location/location-gallery/1.jpg', span: 'col-span-2 row-span-2', h: 'h-[340px] md:h-[480px]' },
            { src: '/i/location/location-gallery/2.jpg', span: '', h: 'h-[160px] md:h-[232px]' },
            { src: '/i/location/location-gallery/3.jpg', span: '', h: 'h-[160px] md:h-[232px]' },
            { src: '/i/location/location-gallery/4.jpg', span: '', h: 'h-[160px] md:h-[232px]' },
            { src: '/i/location/location-gallery/5.jpg', span: '', h: 'h-[160px] md:h-[232px]' },
            { src: '/i/location/location-gallery/6.jpg', span: 'col-span-2', h: 'h-[200px] md:h-[240px]' },
            { src: '/i/location/location-gallery/7.jpg', span: '', h: 'h-[200px] md:h-[240px]' },
            { src: '/i/location/location-gallery/8.jpg', span: '', h: 'h-[200px] md:h-[240px]' },
          ].map(({ src, span, h }, i) => (
            <div
              key={src}
              className={`loc-gal-img relative overflow-hidden group ${span} ${h}`}
            >
              <Image
                src={src}
                alt={`Amaya location — image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* NATURE BAND */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(280px, 38vw, 500px)' }}>
        <Image
          src="/i/location/location-pano.jpg"
          alt="Medchal forest panorama"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#021A13]/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-5">
          <p className="text-white/40 text-[11px] uppercase tracking-[0.45em]">The Forest</p>
          <h2
            className="text-white font-light leading-[1.1] max-w-3xl"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 5rem)' }}
          >
            600 acres of reserve forest.<br />Right next door.
          </h2>
          <p className="text-white/50 font-light text-[14px] leading-[1.85] max-w-md">
            Morning walks, birdsong, open air. The forest is not a backdrop — it is a daily destination.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-28 md:py-44 px-6 text-center">
        <p className="text-white/35 text-[11px] uppercase tracking-[0.4em] mb-6">Come and See</p>
        <h2
          className="text-white font-light leading-[1.1] mb-8 max-w-2xl mx-auto"
          style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
        >
          See the location for yourself.
        </h2>
        <p className="text-white/50 text-[14px] md:text-[15px] leading-[1.85] max-w-[440px] mx-auto mb-12">
          Visit our experience centre in Medchal, Monday to Saturday, 10:00 to 18:00. The forest is five minutes on foot from the front entrance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-3 px-10 h-[52px] rounded-full bg-[#d9a898] text-[#021A13] uppercase text-[11px] tracking-[0.24em] hover:bg-[#c89585] transition-colors duration-300">
            Get Directions
          </button>
          <button className="flex items-center gap-3 px-10 h-[52px] rounded-full border border-white/25 text-white/65 uppercase text-[11px] tracking-[0.24em] hover:border-white/50 hover:text-white transition-colors duration-300">
            Book a Visit
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
