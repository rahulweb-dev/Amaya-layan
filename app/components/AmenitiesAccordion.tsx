"use client";

import { useState } from "react";
import Image from "next/image";
import { amenities } from "@/data/amenities";

export default function AmenitiesAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="max-w-7xl mx-auto py-24">

      {amenities.map((item, index) => (
        <div
          key={item.title}
          className="border-b border-stone/40"
        >
          <button
            onClick={() => setActive(index)}
            className="
              w-full
              flex
              justify-between
              items-center
              py-8
              text-left
            "
          >
            <h3 className="text-[16px] md:text-[21px] uppercase font-light text-navy">
              {item.title}
            </h3>
            <span className="text-3xl text-charcoal/50">
              {active === index ? "−" : "+"}
            </span>
          </button>

          {active === index && (
            <div className="grid md:grid-cols-2 gap-12 pb-12">

              <div className="relative h-[500px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h4 className="text-2xl uppercase mb-4 text-navy">
                  {item.subtitle}
                </h4>
                <p className="leading-8 text-[16px] md:text-[21px] text-charcoal/65">
                  {item.description}
                </p>
              </div>

            </div>
          )}
        </div>
      ))}
    </div>
  );
}
