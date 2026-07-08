import Image from 'next/image';

export default function SustainabilitySection() {
  return (
    <section className="relative h-[520px] md:h-[700px] lg:h-[800px] w-full overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/courtyard-pool_new.webp"
        alt="Eco Friendly Architecture"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay */}
      {/* <div className="absolute inset-0 bg-black/40 md:bg-black/30" /> */}

      {/* Green gradient — full overlay on mobile, side-fade on desktop */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-[#22384A]/90 via-[#22384A]/40 to-transparent md:bg-gradient-to-r md:from-[#22384A]/40 md:via-[#22384A]/70 md:to-[#22384A]/95" /> */}

      {/* Content */}
      <div className="absolute inset-0 z-10">
        <div className="h-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 flex justify-center md:justify-end items-end md:items-center pb-10 md:pb-0">

          <div className="w-full max-w-[560px] text-limestone">

            <p className="uppercase  text-center md:text-left text-[22px] md:text-[26px] lg:text-[34px]">
              Up To
            </p>

            <h2 className="font-medium text-center md:text-left leading-none text-[72px] md:text-[100px] lg:text-[131px]">
              65%
            </h2>

            <h3 className="uppercase tracking-[0.08em] text-center md:text-left text-[21px] md:text-[24px] lg:text-[34px] leading-[1.4] mt-4 md:mt-6 mb-5 md:mb-8">
            OPEN AND 
              <br />
             GREEN SPACE
            </h3>

            <p className="text-[16px] md:text-[16px] lg:text-[18px] leading-[1.85] text-limestone/80 max-w-[520px]">
              Gardens, walking paths, courts and outdoor areas across the site
            </p>

            {/* Bottom Logo */}
            {/* <div className="mt-8 md:mt-16 flex items-center gap-4 md:gap-5">
              <span className="text-4xl md:text-6xl font-bold">
                Edge
              </span>
              <span className="uppercase tracking-[0.15em] text-[12px] md:text-[21px]">
                Eco-Friendliness
              </span>
            </div> */}

          </div>
        </div>
      </div>

    </section>
  );
}
