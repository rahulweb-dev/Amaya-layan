import React from 'react';
import Image from 'next/image';

const apartments = [
  { name: '1 BHK', sizeRange: '560', price: '226,826' },
  { name: '2 BHK', sizeRange: '780', price: '643,097' },
  { name: '2.5 BHK', sizeRange: '940', price: '3,793,412' },
  { name: '3 BHK', sizeRange: '1,150', price: '643,097' },
  { name: '3.5 BHK', sizeRange: '1,380', price: '3,793,412' },
];

export default function ResidencesShowcase() {
  return (
    <section className='bg-[#F3F0EB] py-14 lg:py-8 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20'>
        {/* Heading — all screens */}
        <h2 className='text-[#10211D] uppercase font-light tracking-[0.12em] leading-[1.15] text-[28px] md:text-[48px] max-w-[620px] mb-8 md:mb-10 lg:mb-14'>
         Homes That  Breath
        </h2>

        {/* ── MOBILE LAYOUT (hidden on md+) ── */}
        <div className='md:hidden'>
          {/* Description text */}
          <div className='text-[#10211D]  text-[16px] leading-[1.9] mb-7'>
            <p className='mb-4'>
              All apartments come fully equipped, featuring premium furnishings
              and high-quality appliances.
            </p>
            <p>
              Advanced technological solutions and the &apos;Smart Home&apos;
              system bring extra comfort and a modern touch to your daily life.
            </p>
          </div>

          {/* Two images side-by-side — right one offset down */}
          <div className='grid grid-cols-2 gap-3 items-start'>
            <div className='relative aspect-3/4 overflow-hidden'>
              <Image
                src='/images/architecture-right.webp'
                alt='Bedroom'
                fill
                className='object-cover'
                sizes='50vw'
              />
            </div>
            <div className='relative aspect-4/3 overflow-hidden mt-10 hidden sm:block'>
              <Image
                src='/images/cards-room.png'
                alt='Living Room'
                fill
                className='object-cover'
                sizes='50vw'
              />
            </div>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (hidden below md) ── */}
        <div className='hidden md:grid lg:grid-cols-[1.25fr_0.85fr] gap-8 lg:gap-24 items-start'>
          {/* Left Image */}
          <div>
            <div className='relative aspect-[4/3] md:aspect-[4/4.8] overflow-hidden'>
              <Image
                src='/images/architecture-right.webp'
                alt='Bedroom'
                fill
                className='object-cover'
                sizes='55vw'
              />
            </div>
          </div>

          {/* Right Content */}
          <div className='flex flex-col gap-7 lg:gap-0'>
            {/* Description */}
            <div className='text-[#10211D] text-[13px] md:text-[18px] leading-[1.9] max-w-105'>
              <p className='mb-5'>
                All apartments come fully equipped, featuring premium
                furnishings and high-quality appliances.
              </p>
              <p>
                Advanced technological solutions and the &apos;Smart Home&apos;
                system bring extra comfort and a modern touch to your daily
                life.
              </p>
            </div>

            {/* Price */}
            {/* <div className='lg:mt-10'>
              <p className='text-[#10211D]/55 text-[16px] uppercase tracking-[0.22em] mb-3'>
                Starting from
              </p>
              <div className='flex items-end gap-8 lg:gap-20'>
                <div className='flex items-end gap-2'>
                  <span className='text-[28px] md:text-[44px] font-light text-[#10211D] leading-none'>
                    227,374
                  </span>
                  <span className='pb-1 text-[12px] text-[#10211D]/55'>$</span>
                </div>
                <div className='flex items-end gap-2'>
                  <span className='text-[28px] md:text-[44px] font-light text-[#10211D] leading-none'>
                    36
                  </span>
                  <span className='pb-1 text-[12px] text-[#10211D]/55'>M²</span>
                </div>
              </div>
            </div> */}

            {/* Bottom Image */}
            <div className='lg:mt-auto lg:pt-12'>
              <div className='relative w-full lg:h-[490px] lg:w-[320px] aspect-video lg:aspect-square overflow-hidden'>
                <Image
                  src='/images/cards-room.png'
                  alt='Living Room'
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 100vw, 320px'
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── APARTMENT TYPES ── */}
      <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 mt-12 lg:mt-20'>
        <div className='mb-7 md:mb-14'>
          <p className='uppercase text-[14px] md:text-[16px] tracking-[0.12em] text-[#10211D]'>
            Residence Types
          </p>
        </div>

        <div>
          {apartments.map((item) => (
            <div key={item.name} className='border-t border-[#0D2B24]'>
              {/* MOBILE row — name left, size M² right */}
              <div className='flex items-center justify-between py-5 md:hidden'>
                <h3 className='uppercase text-[21px] md:text-[48px] font-light tracking-[0.06em] text-[#0D2B24] leading-none'>
                  {item.name}
                </h3>
                <span className='text-[16px] tracking-[0.02em] text-[#0D2B24]'>
                  {item.sizeRange} sq ft
                </span>
              </div>

              {/* DESKTOP row — 4-column grid with price */}
              <div className='hidden md:grid grid-cols-[1.5fr_120px_1fr_180px] items-center gap-8 py-12'>
                <h3 className='uppercase text-[48px] font-light tracking-[0.08em] text-[#0D2B24] leading-none'>
                  {item.name}
                </h3>
                <div className='w-14 h-14 rounded-full border border-[#D8D3CC] flex items-center justify-center text-[#0D2B24] text-sm'>
                  i
                </div>
                {/* <div className='uppercase text-[21px] tracking-[0.08em] text-[#0D2B24] text-right'>
                  FROM {item.price} $
                </div> */}
                <div className='text-[17px] font-medium text-right text-[#0D2B24] tracking-[0.08em]'>
                  {item.sizeRange} sq ft
                </div>
              </div>
            </div>
          ))}
          <div className='border-t border-[#0D2B24]' />
        </div>
      </div>
    </section>
  );
}
