"use client";

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
        <source src="/video/index-hero-d.mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="max-w-5xl text-center text-white uppercase text-6xl font-light">
          A New Definition Of Resort Real Estate
        </h1>
      </div>
    </section>
  );
}