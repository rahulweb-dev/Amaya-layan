'use client';

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/Trees_swaying_in_breeze_202606061630.mp4" />
      </video>

      {/* Deep navy overlay */}
      <div className="absolute inset-0 bg-[#1D2F3F]/65" />

      {/* Subtle warm vignette at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1D2F3F]/80 via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-5 gap-7 md:gap-9">
        <p className="text-[#E7D8C6]/60 text-[11px] uppercase tracking-[0.45em]">
          Amaya — Medchal, Hyderabad
        </p>
        <h1
          className="max-w-5xl text-center text-[#FDFCFA] font-light leading-[1.08] tracking-[0.02em]"
          style={{ fontSize: 'clamp(2rem, 6vw, 6.5rem)' }}
        >
          Where life finds <br />its perfect rhythm.
        </h1>
        <p className="text-[#E7D8C6]/70 text-center font-light text-[14px] md:text-[16px] leading-[1.8] max-w-[500px]">
          Independent senior living by Vera Vita, designed around comfort,
          community, nature, and quiet reassurance.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button className="flex items-center gap-4 px-10 h-[52px] rounded-full bg-[#23384A] text-[#E7D8C6] uppercase text-[11px] tracking-[0.24em] hover:bg-[#1D2F3F] transition-colors duration-300 font-normal">
            Book a Visit
          </button>
          <button className="flex items-center gap-4 px-10 h-[52px] rounded-full border border-[#A9825A] text-[#A9825A] uppercase text-[11px] tracking-[0.24em] hover:bg-[#A9825A]/10 transition-colors duration-300 font-normal">
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
}
