'use client';

export default function Hero() {
  return (
    <section className='relative h-screen overflow-hidden'>
      <video
        autoPlay
        muted
        loop
        playsInline
        className='absolute inset-0 h-full w-full object-cover'
      >
        <source src='/video/index-hero-d.mp4' />
      </video>

      <div className='absolute inset-0 bg-black/45' />

      <div className='absolute inset-0 flex flex-col items-center justify-center px-5 gap-7 md:gap-9'>
        <h1
          className='max-w-5xl text-center text-white font-light leading-[1.1] tracking-[0.03em] '
          style={{ fontSize: 'clamp(1.8rem, 6vw, 6.5rem)' }}
        >
          Where life finds <br/>its perfect rhythm.
        </h1>
        <p className='text-white/65 text-center font-light text-[14px] md:text-[16px] leading-[1.75] max-w-[520px]'>
          Independent senior living by Vera Vita, designed around comfort,
          community, nature, and quiet reassurance.
        </p>
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-1'>
          <button className='flex items-center gap-4 px-10 h-[52px] rounded-full bg-white text-[#021A13] uppercase text-[11px] tracking-[0.24em] hover:bg-white/90 transition-colors duration-300 font-normal'>
            Book a Visit
          </button>
          <button className='flex items-center gap-4 px-10 h-[52px] rounded-full border border-white/70 text-white uppercase text-[11px] tracking-[0.24em] hover:bg-white/10 transition-colors duration-300 font-normal'>
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
}
