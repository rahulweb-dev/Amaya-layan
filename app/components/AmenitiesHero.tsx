"use client";

import { useEffect } from "react";
import gsap from "@/lib/gsap";

export default function AmenitiesHero() {
  useEffect(() => {
    gsap.from(".amenity-circle", {
      scale: 0.5,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="amenity-circle absolute w-64 h-64 rounded-full border border-[#2C5347]" />
        <div className="amenity-circle absolute w-96 h-96 rounded-full border border-[#2C5347]" />
        <div className="amenity-circle absolute w-[34rem] h-[34rem] rounded-full border border-[#2C5347]" />

      </div>

      <div className="relative z-10 text-center">

        <h2 className="text-6xl md:text-8xl uppercase font-light">
          Live At The Heart
        </h2>

        <p className="max-w-2xl mx-auto mt-8 text-lg">
          A self-sufficient urban cluster with world-class infrastructure.
        </p>

      </div>

    </div>
  );
}