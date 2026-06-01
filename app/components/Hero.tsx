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

      <div className='absolute inset-0 bg-black/40' />

      <div className='absolute inset-0 flex items-center justify-center px-5'>
        <h1
          className='max-w-5xl text-center text-white uppercase font-light leading-[1.1] tracking-[0.04em]'
          style={{ fontSize: 'clamp(1.8rem, 6vw, 4.5rem)' }}
        >
          Where life finds its perfect rhythm.
        </h1>
      </div>
    </section>
  );
}
