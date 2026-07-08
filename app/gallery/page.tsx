'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

type Category =
  | 'All'
  | 'Architecture'
  | 'Landscape'
  | 'Amenities'
  | 'Community'
  | 'Wellness'
  | 'Location';

const FILTERS: Category[] = [
  'All',
  'Architecture',
  'Landscape',
  'Amenities',
  'Community',
  'Wellness',
  'Location',
];

const IMAGES: {
  src: string;
  alt: string;
  caption: string;
  category: Category;
  wide?: boolean;
  tall?: boolean;
}[] = [
  {
    src: '/images/towers-exterior.png',
    alt: 'Amaya — three towers in greenery',
    caption: 'The towers',
    category: 'Architecture',
    tall: true,
  },
  {
    src: '/images/courtyard-pool.jpg',
    alt: 'Amaya courtyard with pool terrace',
    caption: 'Courtyard & pool',
    category: 'Architecture',
  },
  {
    src: '/images/social-lounge.jpg',
    alt: 'Club Amaya social lounge',
    caption: 'Social lounge',
    category: 'Amenities',
  },
  {
    src: '/images/gym.jpg',
    alt: 'Amaya premium fitness centre',
    caption: 'Fitness centre',
    category: 'Amenities',
  },
  {
    src: '/images/landscape-water.webp',
    alt: 'Amaya landscaped water feature',
    caption: 'Water garden',
    category: 'Landscape',
    wide: true,
  },
  {
    src: '/images/cards-room.png',
    alt: 'Club Amaya cards and games room',
    caption: 'Cards room',
    category: 'Community',
  },
  {
    src: '/images/garden-walk.jpg',
    alt: 'Residents walking through Amaya gardens',
    caption: 'Garden walk',
    category: 'Community',
  },
  {
    src: '/images/nature-walk.png',
    alt: 'Morning walk in the reserve forest',
    caption: 'Forest walk',
    category: 'Wellness',
  },
  {
    src: '/images/residence-interior.png',
    alt: 'Life inside an Amaya residence',
    caption: 'Home interiors',
    category: 'Architecture',
    wide: true,
  },
  {
    src: '/images/residence-reading.png',
    alt: 'Residents at home with forest view',
    caption: 'Residence living',
    category: 'Architecture',
    tall: true,
  },
  {
    src: '/i/location/location-gallery/1.jpg',
    alt: 'The entrance — arrival driveway',
    caption: 'The entrance',
    category: 'Location',
  },
  {
    src: '/i/location/location-gallery/2.jpg',
    alt: 'Natural setting — reserve forest',
    caption: 'Reserve forest',
    category: 'Location',
  },
  {
    src: '/i/location/location-gallery/3.jpg',
    alt: 'Landscaped gardens',
    caption: 'Landscaped gardens',
    category: 'Landscape',
  },
  {
    src: '/i/location/location-gallery/4.jpg',
    alt: 'Walking trails through the forest',
    caption: 'Walking trails',
    category: 'Wellness',
  },
  {
    src: '/i/location/location-gallery/5.jpg',
    alt: 'Community gathering space',
    caption: 'Community spaces',
    category: 'Community',
  },
  {
    src: '/i/location/location-gallery/6.jpg',
    alt: 'Pool, reflected',
    caption: 'Pool, reflected',
    category: 'Amenities',
    wide: true,
  },
  {
    src: '/i/location/location-gallery/7.jpg',
    alt: 'Morning light through trees',
    caption: 'Morning light',
    category: 'Location',
  },
  {
    src: '/i/location/location-gallery/8.jpg',
    alt: 'Quiet courtyard at dusk',
    caption: 'Courtyard at dusk',
    category: 'Landscape',
  },
];

function LightboxModal({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: (typeof IMAGES)[number];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.out' },
    );
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-9999 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-10'
      onClick={onClose}
    >
      <button
        className='absolute top-5 right-6 text-limestone/50 hover:text-limestone text-[28px] font-light transition-colors duration-200 z-10'
        onClick={onClose}
        aria-label='Close'
      >
        ×
      </button>
      <button
        className='absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-limestone/50 hover:text-limestone hover:border-white/50 transition-all duration-200 z-10'
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label='Previous'
      >
        ←
      </button>
      <button
        className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-limestone/50 hover:text-limestone hover:border-white/50 transition-all duration-200 z-10'
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label='Next'
      >
        →
      </button>

      <div
        className='relative max-w-5xl w-full max-h-[80vh] flex flex-col gap-4'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='relative w-full overflow-hidden'
          style={{ maxHeight: '70vh', aspectRatio: '16/10' }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className='object-contain'
            sizes='90vw'
            priority
          />
        </div>
        <div className='flex items-center justify-between px-1'>
          <div>
            <p className='text-limestone/80 text-[16px] md:text-[21px] font-light'>
              {item.caption}
            </p>
            <p className='text-limestone/35 text-[11px] uppercase tracking-[0.3em] mt-0.5'>
              {item.category}
            </p>
          </div>
          <p className='text-limestone/25 text-[11px] uppercase tracking-[0.2em]'>
            Press ← → to navigate
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === 'All'
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(filtersRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: filtersRef.current, start: 'top 88%' },
      });
      gsap.from(ctaRef.current, {
        y: 35,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top 82%' },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll('.gallery-item');
    gsap.fromTo(
      items,
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: 'power3.out' },
    );
  }, [activeFilter]);

  const currentItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  const closeLightbox = () => setLightboxIdx(null);
  const prevLightbox = () =>
    setLightboxIdx((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : 0,
    );
  const nextLightbox = () =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : 0));

  return (
    <main className='bg-surface'>
      {/* HERO */}
      <PageHero
        label='Amaya — Gallery'
        title='A glimpse of Amaya.'
        description='Architectural renders and visualisations of the community, its spaces, and the natural setting.'
        imgSrc='/images/towers-exterior.png'
        imgAlt='Amaya towers — gallery'
        height='h-[75vh] min-h-[500px]'
      />

      {/* FILTERS + GRID */}
      <section className='py-16 md:py-24 px-6 md:px-12 xl:px-20 max-w-425 mx-auto'>
        {/* Filters */}
        <div
          ref={filtersRef}
          className='flex flex-wrap justify-center gap-3 mb-10 md:mb-14'
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-6 h-10 rounded-full text-[11px] uppercase tracking-[0.22em] transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-navy text-limestone'
                  : 'border border-stone/55 text-charcoal/50 hover:border-navy/35 hover:text-navy'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className='text-center text-charcoal/30 text-[11px] uppercase tracking-[0.3em] mb-8'>
          {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
        </p>

        {/* Masonry-style grid */}
        <div
          ref={gridRef}
          className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4'
        >
          {filtered.map((img, i) => (
            <div
              key={img.src + i}
              className='gallery-item break-inside-avoid mb-3 md:mb-4 relative overflow-hidden group cursor-pointer'
              onClick={() => setLightboxIdx(i)}
            >
              <div
                className={`relative overflow-hidden w-full ${
                  img.tall
                    ? 'aspect-3/4'
                    : img.wide
                      ? 'aspect-video'
                      : 'aspect-4/3'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                />
                <div className='absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-colors duration-500' />

                <div className='absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <p className='text-limestone text-[16px] md:text-[21px] font-light leading-[1.3]'>
                    {img.caption}
                  </p>
                  <p className='text-limestone/50 text-[10px] uppercase tracking-[0.28em] mt-1'>
                    {img.category}
                  </p>
                </div>

                <div className='absolute top-4 right-4 w-8 h-8 rounded-full bg-limestone/0 group-hover:bg-limestone/20 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100'>
                  <svg
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    className='text-limestone'
                  >
                    <path
                      d='M1 1h4M1 1v4M11 11H7M11 11V7M11 1H7M11 1V5M1 11h4M1 11V7'
                      stroke='currentColor'
                      strokeWidth='1.2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className='text-center text-charcoal/28 text-[11px] font-light leading-[1.8] max-w-xl mx-auto mt-10'>
          All images are architectural renders and visualisations. The finished
          development may differ from representations shown.
        </p>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className='py-24 md:py-40 px-6 text-center border-t border-stone/40'
      >
        <p className='text-charcoal/40 text-[11px] uppercase tracking-[0.4em] mb-6'>
          Experience Centre
        </p>
        <h2 className='text-navy font-light leading-[1.1] mb-8 max-w-2xl mx-auto text-[28px] md:text-[53px]'>
          Come and see Amaya in person.
        </h2>
        <p className='text-charcoal/55 text-[16px] md:text-[21px] leading-[1.85] max-w-110 mx-auto mb-12'>
          Renders tell part of the story. Visit our experience centre in Medchal
          to feel the scale, the material quality, and the setting for yourself.
        </p>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <button className='flex items-center gap-3 px-10 h-13 rounded-full bg-brass text-limestone uppercase text-[11px] tracking-[0.24em] hover:bg-[#f0e6d6] hover:text-brass transition-colors duration-300'>
            Book a Visit
          </button>
          <button className='flex items-center gap-3 px-10 h-13 rounded-full border border-navy/25 text-charcoal/65 uppercase text-[11px] tracking-[0.24em] hover:border-navy/50 hover:text-navy transition-colors duration-300'>
            Download Brochure
          </button>
        </div>
      </section>

      <Footer />

      {/* LIGHTBOX */}
      {currentItem && (
        <LightboxModal
          item={currentItem}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
    </main>
  );
}
