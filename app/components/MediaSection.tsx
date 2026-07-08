'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

const SLIDES = [
  {
    thumbnail: '/images/media-thumbnail.webp',
    name: 'Mohammed Adib',
    role: 'Chief Designer, Dewan Architects',
    text: `The chief designer of the architectural firm, Dewan, shares his vision of the new symbol of Phuket — Layan Verde. We are discussing why this project could become a role model for the harmonious coexistence of humans and nature.`,
  },
  {
    thumbnail: '/images/architecture-right.webp',
    name: 'Priya Menon',
    role: 'Director of Living, Vera Vita',
    text: `Vera Vita's approach to senior living is rooted in independence and dignity. We design each community around the way people actually want to live — not around institutional schedules or clinical standards that belong in a different era.`,
  },
  {
    thumbnail: '/images/courtyard-pool.jpg',
    name: 'Rahul Sharma',
    role: 'Landscape Architect, Amaya',
    text: `The reserve forest is not a backdrop — it is the foundation of the entire design philosophy at Amaya. Every courtyard, trail, and terrace is oriented to draw the forest inward and make nature a genuine daily experience.`,
  },
];

export default function MediaSection() {
  const [current, setCurrent] = useState(0);
  const total = SLIDES.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const slide = SLIDES[current];

  return (
    <section className='bg-[#23384A] py-10 md:py-16'>
      <div className='max-w-[1700px] mx-auto px-5 md:px-10 lg:px-16'>
        {/* Header */}
        <div className='flex items-center justify-between mb-8 md:mb-14'>
          <h5 className='uppercase tracking-[0.12em] text-limestone text-[13px] md:text-[17px]'>
            Media
          </h5>

          <div className='flex items-center gap-5 md:gap-10'>
            <span className='text-limestone text-[13px] md:text-[17px]'>
              {current + 1}/{total}
            </span>

            <div className='flex gap-3 md:gap-5'>
              <button
                onClick={prev}
                aria-label='Previous slide'
                className='w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/60 flex items-center justify-center text-limestone transition-colors duration-200 hover:bg-[#f0e6d6] hover:text-[#01261F]'
              >
                <ArrowLeft size={20} className='md:hidden' strokeWidth={1.2} />
                <ArrowLeft
                  size={30}
                  className='hidden md:block'
                  strokeWidth={1.2}
                />
              </button>

              <button
                onClick={next}
                aria-label='Next slide'
                className='w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/60 flex items-center justify-center text-limestone transition-colors duration-200 hover:bg-[#f0e6d6] hover:text-[#01261F]'
              >
                <ArrowRight size={20} className='md:hidden' strokeWidth={1.2} />
                <ArrowRight
                  size={30}
                  className='hidden md:block'
                  strokeWidth={1.2}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Slide content */}
        <div className='grid lg:grid-cols-[1.55fr_0.7fr] gap-8 md:gap-12 lg:gap-24 items-start'>
          {/* Thumbnail */}
          <div>
            <div className='relative aspect-19/9 overflow-hidden'>
              <Image
                key={slide.thumbnail}
                src={slide.thumbnail}
                alt={slide.name}
                fill
                className='object-cover'
                sizes='(max-width: 1024px) 100vw, 60vw'
              />
              <button
                className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 rounded-full bg-[#BFD0C8] flex items-center justify-center hover:scale-105 transition-transform duration-200'
                aria-label='Play video'
              >
                <Play
                  size={22}
                  className='md:hidden'
                  fill='#01261F'
                  strokeWidth={1.5}
                />
                <Play
                  size={34}
                  className='hidden md:block'
                  fill='#01261F'
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </div>

          {/* Text */}
          <div className='pt-2 md:pt-4' key={current}>
            <h2 className='uppercase text-limestone font-light tracking-[0.08em] leading-none text-[22px] md:text-[32px] mb-2 md:mb-3'>
              {slide.name}
            </h2>
            <p className='text-limestone/40 text-[10px] md:text-[11px] uppercase tracking-[0.28em] mb-6 md:mb-12'>
              {slide.role}
            </p>
            <p className='text-limestone/90 text-[14px] md:text-[19px] leading-loose max-w-130'>
              {slide.text}
            </p>
          </div>
        </div>

        {/* Dot indicators */}
        <div className='flex gap-3 mt-8 md:mt-14'>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-0.5 transition-all duration-300 ${
                i === current ? 'w-10 bg-white' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
